"""
pdf_parser.py — Extract text from text-based PDFs.

Strategy:
  1. Try pdfplumber (best for financial tables / formatted PDFs).
  2. Fall back to PyMuPDF (fitz) if pdfplumber yields no text.
  3. If still empty, signal that the PDF is scanned → caller should use OCR.
"""

from __future__ import annotations

import io
from dataclasses import dataclass, field
from typing import List

from app.utils import bytes_to_stream, setup_logger

logger = setup_logger("pdf-parser")


@dataclass
class ParsedPage:
    page_number: int
    text: str
    has_tables: bool = False
    table_data: List[List[str]] = field(default_factory=list)


@dataclass
class PdfParseResult:
    pages: List[ParsedPage] = field(default_factory=list)
    is_scanned: bool = False          # True → caller should run OCR
    used_fallback: bool = False       # True → pdfplumber failed, used PyMuPDF

    @property
    def full_text(self) -> str:
        return "\n".join(p.text for p in self.pages if p.text)


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def parse_pdf(data: bytes) -> PdfParseResult:
    """
    Parse a PDF from raw bytes.
    Returns a PdfParseResult; if is_scanned=True the caller must use OCR.
    """
    result = _try_pdfplumber(data)
    if result is None or not result.full_text.strip():
        logger.info("pdfplumber yielded no text — trying PyMuPDF fallback")
        result = _try_pymupdf(data)
        if result:
            result.used_fallback = True

    if result is None or not result.full_text.strip():
        logger.warning("PDF appears to be scanned — signalling OCR required")
        result = PdfParseResult(is_scanned=True)

    return result


# ---------------------------------------------------------------------------
# pdfplumber extraction
# ---------------------------------------------------------------------------

def _try_pdfplumber(data: bytes) -> PdfParseResult | None:
    try:
        import pdfplumber
    except ImportError:
        logger.warning("pdfplumber not installed — skipping")
        return None

    try:
        result = PdfParseResult()
        with pdfplumber.open(bytes_to_stream(data)) as pdf:
            for i, page in enumerate(pdf.pages, start=1):
                text = page.extract_text() or ""
                tables = page.extract_tables() or []
                parsed_tables: List[List[str]] = []
                for table in tables:
                    # Flatten each row, convert None → ""
                    cleaned = [
                        [str(cell) if cell is not None else "" for cell in row]
                        for row in table
                    ]
                    parsed_tables.extend(cleaned)

                result.pages.append(
                    ParsedPage(
                        page_number=i,
                        text=text,
                        has_tables=bool(tables),
                        table_data=parsed_tables,
                    )
                )
        logger.info(f"pdfplumber extracted {len(result.pages)} pages")
        return result
    except Exception as exc:
        logger.error(f"pdfplumber error: {exc}")
        return None


# ---------------------------------------------------------------------------
# PyMuPDF fallback
# ---------------------------------------------------------------------------

def _try_pymupdf(data: bytes) -> PdfParseResult | None:
    try:
        import fitz  # PyMuPDF
    except ImportError:
        logger.warning("PyMuPDF not installed — skipping")
        return None

    try:
        result = PdfParseResult()
        doc = fitz.open(stream=data, filetype="pdf")
        for i, page in enumerate(doc, start=1):
            text = page.get_text("text") or ""
            result.pages.append(ParsedPage(page_number=i, text=text))
        doc.close()
        logger.info(f"PyMuPDF extracted {len(result.pages)} pages")
        return result
    except Exception as exc:
        logger.error(f"PyMuPDF error: {exc}")
        return None


# ---------------------------------------------------------------------------
# Render PDF pages to images (for scanned PDFs)
# ---------------------------------------------------------------------------

def pdf_pages_to_images(data: bytes) -> List[bytes]:
    """
    Convert each PDF page to a PNG byte string using PyMuPDF.
    Used as pre-step before OCR on scanned PDFs.
    """
    try:
        import fitz
    except ImportError:
        raise RuntimeError("PyMuPDF is required for scanned PDF → image conversion")

    images: List[bytes] = []
    doc = fitz.open(stream=data, filetype="pdf")
    for page in doc:
        mat = fitz.Matrix(2.0, 2.0)          # 2× zoom for sharper OCR
        pix = page.get_pixmap(matrix=mat, alpha=False)
        images.append(pix.tobytes("png"))
    doc.close()
    logger.info(f"Converted {len(images)} PDF pages to images for OCR")
    return images
