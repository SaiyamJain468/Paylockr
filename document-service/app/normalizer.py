"""
normalizer.py — Parse raw text/table rows into structured transaction records.

Two-phase approach:
  Phase 1: Regex + heuristic parsing (always runs, no API calls)
  Phase 2: Optional LLM normalization via Gemini (runs only when LLM_ENABLED=true)

Output schema per transaction:
  {
    "date":        "YYYY-MM-DD",
    "description": "string",
    "amount":      float,
    "type":        "debit" | "credit",
    "balance":     float | None
  }
"""

from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass, field, asdict
from datetime import datetime
from typing import List, Optional, Tuple

from app.utils import setup_logger

logger = setup_logger("normalizer")

# ---------------------------------------------------------------------------
# Output types
# ---------------------------------------------------------------------------

@dataclass
class Transaction:
    date: str
    description: str
    amount: float
    type: str              # "debit" or "credit"
    balance: Optional[float] = None

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class NormalizeResult:
    transactions: List[Transaction] = field(default_factory=list)
    confidence: float = 0.0          # 0.0–1.0


# ---------------------------------------------------------------------------
# Date patterns (ordered most-to-least specific)
# ---------------------------------------------------------------------------

_DATE_PATTERNS: List[Tuple[re.Pattern, str]] = [
    # ISO: 2024-01-31
    (re.compile(r"\b(\d{4}-\d{2}-\d{2})\b"), "%Y-%m-%d"),
    # DD/MM/YYYY or DD-MM-YYYY (4-digit year)
    (re.compile(r"\b(\d{2}[/\-]\d{2}[/\-]\d{4})\b"), None),
    # DD MMM YYYY  e.g. 31 Jan 2024
    (re.compile(r"\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b", re.I), None),
    # MMM DD, YYYY
    (re.compile(r"\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})\b", re.I), None),
    # DD/MM/YY or DD-MM-YY  (2-digit year — e.g. 01-01-26 from HDFC/SBI screenshots)
    (re.compile(r"\b(\d{2}[/\-]\d{2}[/\-]\d{2})\b"), "%d-%m-%y"),
]

_MONTH_MAP = {m: str(i).zfill(2) for i, m in enumerate(
    ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"], 1
)}


def _parse_date(raw: str) -> Optional[str]:
    """Try to parse a date string and return ISO YYYY-MM-DD or None."""
    raw = raw.strip()
    # DD/MM/YYYY or DD-MM-YYYY (4-digit year)
    m = re.match(r"^(\d{2})[/\-](\d{2})[/\-](\d{4})$", raw)
    if m:
        try:
            return f"{m.group(3)}-{m.group(2)}-{m.group(1)}"
        except Exception:
            pass
    # DD/MM/YY or DD-MM-YY (2-digit year — e.g. 01-01-26)
    m = re.match(r"^(\d{2})[/\-](\d{2})[/\-](\d{2})$", raw)
    if m:
        try:
            # Use strptime to handle century correctly (2000s vs 1900s)
            sep = "-" if "-" in raw else "/"
            return datetime.strptime(raw, f"%d{sep}%m{sep}%y").strftime("%Y-%m-%d")
        except Exception:
            pass
    # DD MMM YYYY
    m = re.match(r"^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$", raw)
    if m:
        mon = _MONTH_MAP.get(m.group(2).lower()[:3])
        if mon:
            return f"{m.group(3)}-{mon}-{m.group(1).zfill(2)}"
    # MMM DD, YYYY
    m = re.match(r"^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$", raw)
    if m:
        mon = _MONTH_MAP.get(m.group(1).lower()[:3])
        if mon:
            return f"{m.group(3)}-{mon}-{m.group(2).zfill(2)}"
    # Try known format strings
    for fmt in ("%Y-%m-%d", "%d/%m/%y", "%m/%d/%Y", "%Y%m%d"):
        try:
            return datetime.strptime(raw, fmt).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return None


# ---------------------------------------------------------------------------
# Amount patterns
# ---------------------------------------------------------------------------

_AMOUNT_RE = re.compile(
    r"(?:₹|INR|Rs\.?|USD|\$|£|€|EUR)?\s*"
    r"([\d,]+(?:\.\d{1,2})?)"
)
_CR_MARKERS = re.compile(r"\b(cr|credit|received|deposit|refund|reversal)\b", re.I)
_DR_MARKERS = re.compile(r"\b(dr|debit|paid|payment|purchase|withdraw|fee|charge)\b", re.I)
# UPI reference markers — strongest signal (e.g. UPI/DR/978584154770/...)
_UPI_DR_RE = re.compile(r"UPI/DR/", re.I)
_UPI_CR_RE = re.compile(r"UPI/CR/", re.I)


def _parse_amount(raw: str) -> Optional[float]:
    """Extract numeric amount from a string, strip commas and currency symbols."""
    m = _AMOUNT_RE.search(raw)
    if m:
        try:
            return float(m.group(1).replace(",", ""))
        except ValueError:
            pass
    return None


def _detect_type(row_text: str, amount_str: str = "") -> str:
    """Heuristically decide debit or credit from surrounding text.
    
    Priority order:
    1. UPI/DR or UPI/CR in the reference string (strongest signal)
    2. CR/DR keyword markers
    3. Default to debit
    """
    combined = row_text + " " + amount_str
    # UPI references are the most reliable signal
    if _UPI_DR_RE.search(combined):
        return "debit"
    if _UPI_CR_RE.search(combined):
        return "credit"
    combined_lower = combined.lower()
    cr = bool(_CR_MARKERS.search(combined_lower))
    dr = bool(_DR_MARKERS.search(combined_lower))
    if cr and not dr:
        return "credit"
    return "debit"


# ---------------------------------------------------------------------------
# Main normalizer — Phase 1: Regex
# ---------------------------------------------------------------------------

def normalize_text(text: str) -> NormalizeResult:
    """
    Parse raw text (from PDF or OCR) into structured transactions.
    Each line is treated as a potential transaction row.
    """
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    transactions = _parse_lines(lines)
    confidence = _compute_confidence(transactions, len(lines))
    return NormalizeResult(transactions=transactions, confidence=confidence)


def normalize_table_rows(rows: List[List[str]]) -> NormalizeResult:
    """
    Parse structured table rows (from Camelot) into transactions.
    Column heuristics: try to identify date / description / amount / balance columns.
    """
    if not rows:
        return NormalizeResult()

    header, data_rows = _detect_header(rows)
    transactions = _parse_table_rows(data_rows, header)
    confidence = _compute_confidence(transactions, len(data_rows))
    return NormalizeResult(transactions=transactions, confidence=confidence)


# ---------------------------------------------------------------------------
# Line parser
# ---------------------------------------------------------------------------

def _parse_lines(lines: List[str]) -> List[Transaction]:
    """
    Parse OCR lines into transactions.

    Handles two layouts:
    A) Single amount column:  date  desc  amount  balance
    B) Split credit/debit:    date  desc  ref  credit  debit  balance
       (as seen in HDFC/SBI UPI screenshots — one of credit/debit is '0')
    """
    transactions: List[Transaction] = []
    for line in lines:
        date_val = _extract_date_from_line(line)
        if date_val is None:
            continue   # no date → probably a header or noise
        amounts = _AMOUNT_RE.findall(line)
        if not amounts:
            continue

        parsed_amounts = []
        for a in amounts:
            try:
                v = float(a.replace(",", ""))
                parsed_amounts.append(v)
            except ValueError:
                pass

        if not parsed_amounts:
            continue

        # --- Detect split credit/debit layout ---
        # Layout B: 3+ amounts where one of the middle values is 0
        # e.g. [0, 1000.00, 1385.40]  → debit=1000, balance=1385.40
        #      [2200.00, 0, 2336.40]  → credit=2200, balance=2336.40
        if len(parsed_amounts) >= 3:
            *mid, balance = parsed_amounts
            # Find the first non-zero value among the middle amounts
            non_zero = [(i, v) for i, v in enumerate(mid) if v > 0]
            if len(non_zero) == 1:
                col_idx, amount = non_zero[0]
                # col_idx==0 → credit column came first → credit
                # col_idx==1 → debit column came first → debit
                # Also respect UPI/DR/CR markers
                tx_type = _detect_type(line)
                # If no UPI marker, use column position as tiebreak
                if not (_UPI_DR_RE.search(line) or _UPI_CR_RE.search(line)):
                    # Assume layout: [..., credit, debit, balance]
                    # credit_col = second-to-last-2, debit_col = second-to-last
                    # col_idx 0 = credit, col_idx 1 (or higher, last of mid) = debit
                    if col_idx == 0 and len(mid) >= 2:
                        tx_type = "credit"
                    elif col_idx == len(mid) - 1 and len(mid) >= 2:
                        tx_type = "debit"
                desc = _strip_date_amounts(line)
                transactions.append(Transaction(
                    date=date_val,
                    description=desc[:120],
                    amount=amount,
                    type=tx_type,
                    balance=balance,
                ))
                continue

        # --- Standard single-amount layout ---
        if len(parsed_amounts) >= 2:
            amount = parsed_amounts[-2]
            balance = parsed_amounts[-1]
        else:
            amount = parsed_amounts[0]
            balance = None

        if amount <= 0:
            continue  # skip zero/negative amounts

        desc = _strip_date_amounts(line)
        tx_type = _detect_type(line)
        transactions.append(Transaction(
            date=date_val,
            description=desc[:120],
            amount=amount,
            type=tx_type,
            balance=balance,
        ))
    return transactions


def _extract_date_from_line(line: str) -> Optional[str]:
    for pattern, _ in _DATE_PATTERNS:
        m = pattern.search(line)
        if m:
            parsed = _parse_date(m.group(1))
            if parsed:
                return parsed
    return None


def _strip_date_amounts(line: str) -> str:
    """Remove dates and amounts from a line to get the description."""
    cleaned = line
    for pattern, _ in _DATE_PATTERNS:
        cleaned = pattern.sub("", cleaned)
    cleaned = re.sub(r"(?:₹|INR|Rs\.?|USD|\$|£|€|EUR)?\s*[\d,]+(?:\.\d{1,2})?", "", cleaned)
    cleaned = re.sub(r"\s{2,}", " ", cleaned).strip(" ,-|/")
    return cleaned or "Transaction"


# ---------------------------------------------------------------------------
# Table row parser
# ---------------------------------------------------------------------------

def _detect_header(rows: List[List[str]]) -> Tuple[Optional[List[str]], List[List[str]]]:
    """Detect a header row heuristically (no amounts in it)."""
    if not rows:
        return None, rows
    first = rows[0]
    has_amount = any(_AMOUNT_RE.search(cell) for cell in first)
    if not has_amount:
        return [c.lower() for c in first], rows[1:]
    return None, rows


_COL_HINTS = {
    "date": ["date", "txn date", "value date", "transaction date"],
    "desc": ["description", "particulars", "narration", "details", "remarks"],
    "debit": ["debit", "dr", "withdrawal", "payment"],
    "credit": ["credit", "cr", "deposit", "received"],
    "balance": ["balance", "closing balance", "bal"],
    "amount": ["amount", "txn amount"],
}


def _col_index(header: Optional[List[str]], hints: List[str]) -> Optional[int]:
    if not header:
        return None
    for i, h in enumerate(header):
        for hint in hints:
            if hint in h:
                return i
    return None


def _parse_table_rows(rows: List[List[str]], header: Optional[List[str]]) -> List[Transaction]:
    transactions: List[Transaction] = []
    date_col = _col_index(header, _COL_HINTS["date"])
    desc_col = _col_index(header, _COL_HINTS["desc"])
    debit_col = _col_index(header, _COL_HINTS["debit"])
    credit_col = _col_index(header, _COL_HINTS["credit"])
    amount_col = _col_index(header, _COL_HINTS["amount"])
    bal_col = _col_index(header, _COL_HINTS["balance"])

    for row in rows:
        if len(row) < 2:
            continue

        # --- Date ---
        raw_date = row[date_col] if date_col is not None and date_col < len(row) else ""
        if not raw_date:
            raw_date = _extract_date_from_row(row)
        date_val = _parse_date(raw_date) if raw_date else None
        if not date_val:
            continue

        # --- Description ---
        desc = row[desc_col].strip() if desc_col is not None and desc_col < len(row) else ""
        if not desc:
            # Concatenate all non-amount-like non-date cells
            desc = " ".join(
                c for c in row
                if not _AMOUNT_RE.search(c) and not _extract_date_from_line(c)
            )
        desc = desc[:120] or "Transaction"

        # --- Amount & type ---
        debit_amt = _parse_amount(row[debit_col]) if debit_col is not None and debit_col < len(row) else None
        credit_amt = _parse_amount(row[credit_col]) if credit_col is not None and credit_col < len(row) else None
        amt_cell = _parse_amount(row[amount_col]) if amount_col is not None and amount_col < len(row) else None

        if debit_amt:
            amount, tx_type = debit_amt, "debit"
        elif credit_amt:
            amount, tx_type = credit_amt, "credit"
        elif amt_cell:
            amount = amt_cell
            tx_type = _detect_type(" ".join(row))
        else:
            continue  # no amount → skip

        # --- Balance ---
        balance = _parse_amount(row[bal_col]) if bal_col is not None and bal_col < len(row) else None

        transactions.append(Transaction(
            date=date_val,
            description=desc,
            amount=amount,
            type=tx_type,
            balance=balance,
        ))
    return transactions


def _extract_date_from_row(row: List[str]) -> str:
    for cell in row:
        for pat, _ in _DATE_PATTERNS:
            m = pat.search(cell)
            if m:
                return m.group(1)
    return ""


# ---------------------------------------------------------------------------
# Confidence scoring
# ---------------------------------------------------------------------------

def _compute_confidence(transactions: List[Transaction], total_lines: int) -> float:
    if not transactions:
        return 0.0
    # Count well-formed transactions
    well_formed = sum(
        1 for t in transactions
        if t.date and t.amount > 0 and t.description
    )
    base = well_formed / max(len(transactions), 1)
    coverage = min(len(transactions) / max(total_lines, 1) * 5, 1.0)
    return round((base * 0.8 + coverage * 0.2), 3)


# ---------------------------------------------------------------------------
# Phase 2: Optional LLM normalization (Gemini)
# ---------------------------------------------------------------------------

LLM_ENABLED = os.getenv("LLM_ENABLED", "false").lower() == "true"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")


async def llm_normalize(raw_text: str, transactions: List[Transaction]) -> List[Transaction]:
    """
    Send raw_text to Gemini and ask it to correct/augment the parsed transactions.
    Falls back to original transactions on any error.
    Only called when LLM_ENABLED=true and GEMINI_API_KEY is set.
    """
    if not LLM_ENABLED or not GEMINI_API_KEY:
        return transactions

    logger.info("LLM normalization enabled — calling Gemini")
    prompt = _build_llm_prompt(raw_text, transactions)

    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        raw_json = _extract_json_from_llm(response.text)
        corrected = json.loads(raw_json)
        result = []
        for item in corrected:
            result.append(Transaction(
                date=item.get("date", ""),
                description=item.get("description", ""),
                amount=float(item.get("amount", 0)),
                type=item.get("type", "debit"),
                balance=item.get("balance"),
            ))
        logger.info(f"LLM returned {len(result)} transactions")
        return result
    except Exception as exc:
        logger.error(f"LLM normalization failed: {exc} — using regex results")
        return transactions


def _build_llm_prompt(raw_text: str, parsed: List[Transaction]) -> str:
    parsed_preview = json.dumps([t.to_dict() for t in parsed[:5]], indent=2)
    return f"""You are a financial data extraction assistant.

Given the raw text from a bank statement and an initial parse, correct or complete the transaction list.

Raw text (first 2000 chars):
{raw_text[:2000]}

Initial parse (first 5):
{parsed_preview}

Return ONLY a valid JSON array of transactions matching this schema exactly:
[{{"date":"YYYY-MM-DD","description":"string","amount":number,"type":"debit|credit","balance":number|null}}]

Rules:
- date must be YYYY-MM-DD
- amount must be a positive number
- type must be exactly "debit" or "credit"
- balance can be null if unknown
- Return all transactions you can find, not just the sample
- Do not include any explanation or markdown, only the JSON array"""


def _extract_json_from_llm(text: str) -> str:
    """Strip markdown code fences if present."""
    text = text.strip()
    m = re.search(r"```(?:json)?\s*([\s\S]+?)\s*```", text)
    if m:
        return m.group(1)
    return text
