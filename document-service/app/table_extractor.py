"""
table_extractor.py — Extract tabular data from text-based PDFs using Camelot.

Two extraction modes tried in order:
  1. Lattice — for PDFs with visible grid lines (most bank statements)
  2. Stream  — for PDFs where columns are separated by whitespace only

Returns a list of rows (each row = list of strings), ready for the normalizer.
"""

from __future__ import annotations

import io
import tempfile
import os
from typing import List

from app.utils import setup_logger

logger = setup_logger("table-extractor")

# Camelot requires a file path, not a stream — we use a temp file.


def extract_tables(data: bytes) -> List[List[str]]:
    """
    Extract all table rows from a PDF byte payload.

    Returns a flat list of rows across all tables and pages.
    Each row is a list of cell strings.
    Returns an empty list if Camelot is not available or no tables found.
    """
    try:
        import camelot
    except ImportError:
        logger.warning(
            "camelot-py not installed — table extraction skipped. "
            "Install with: pip install camelot-py[cv]"
        )
        return []

    rows: List[List[str]] = []

    # Camelot needs a real file path — write to a temp file
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp.write(data)
        tmp_path = tmp.name

    try:
        # --- Try lattice first (bordered tables) ---
        tables = _read_with_camelot(camelot, tmp_path, flavor="lattice")

        if not tables:
            logger.info("Lattice extraction found no tables — trying stream mode")
            tables = _read_with_camelot(camelot, tmp_path, flavor="stream")

        for table in tables:
            df = table.df
            for _, row in df.iterrows():
                cleaned_row = [str(cell).strip() for cell in row]
                # Skip fully-empty rows
                if any(cell for cell in cleaned_row):
                    rows.append(cleaned_row)

        logger.info(f"Camelot extracted {len(rows)} rows from {len(tables)} tables")
    except Exception as exc:
        logger.error(f"Camelot extraction error: {exc}")
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass

    return rows


# ---------------------------------------------------------------------------
# Internal helper
# ---------------------------------------------------------------------------

def _read_with_camelot(camelot, path: str, flavor: str):
    """
    Run camelot.read_pdf with a given flavor.
    Returns list of Table objects, or empty list on failure.
    """
    try:
        tables = camelot.read_pdf(path, pages="all", flavor=flavor)
        logger.info(
            f"Camelot ({flavor}) found {tables.n} tables "
            f"(avg accuracy: {_avg_accuracy(tables):.1f}%)"
        )
        # Filter out low-accuracy tables
        return [t for t in tables if t.accuracy >= 50]
    except Exception as exc:
        logger.warning(f"Camelot {flavor} mode failed: {exc}")
        return []


def _avg_accuracy(tables) -> float:
    if not tables.n:
        return 0.0
    return sum(t.accuracy for t in tables) / tables.n
