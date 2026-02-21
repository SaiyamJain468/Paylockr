"""
utils.py — Shared helpers for the document processing service.
No dependency on Supabase or the main TypeScript project.
"""

import io
import logging
import json
import sys
from typing import Optional

import httpx

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

def setup_logger(name: str = "doc-service") -> logging.Logger:
    """Configure and return a structured JSON logger."""
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger  # already configured

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(_JSONFormatter())
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    return logger


class _JSONFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:  # noqa: D102
        payload = {
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        if record.exc_info:
            payload["exc_info"] = self.formatException(record.exc_info)
        return json.dumps(payload)


logger = setup_logger()

# ---------------------------------------------------------------------------
# File helpers
# ---------------------------------------------------------------------------

FILE_SIZE_LIMIT_MB = 25
_MAGIC = {
    b"%PDF": "pdf",
    b"\x89PNG": "png",
    b"\xff\xd8\xff": "jpeg",
    b"GIF8": "gif",
    b"BM": "bmp",
    b"II*\x00": "tiff",
    b"MM\x00*": "tiff",
    b"RIFF": "webp",
}


def detect_file_type(data: bytes) -> str:
    """Return a file-type string by inspecting magic bytes."""
    for magic, ftype in _MAGIC.items():
        if data[: len(magic)] == magic:
            return ftype
    return "unknown"


def validate_file_size(data: bytes, limit_mb: float = FILE_SIZE_LIMIT_MB) -> None:
    """Raise ValueError if file exceeds the size limit."""
    size_mb = len(data) / (1024 * 1024)
    if size_mb > limit_mb:
        raise ValueError(
            f"File size {size_mb:.1f} MB exceeds maximum allowed {limit_mb} MB"
        )


async def fetch_file_from_url(url: str, timeout_s: float = 30.0) -> bytes:
    """
    Async-fetch a file from a public URL and return raw bytes.
    Raises httpx.HTTPError or ValueError on failure.
    """
    logger.info(f"Fetching file from URL: {url}")
    async with httpx.AsyncClient(follow_redirects=True, timeout=timeout_s) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.content

    validate_file_size(data)
    file_type = detect_file_type(data)
    logger.info(f"Fetched {len(data)} bytes, detected type: {file_type}")
    return data


def bytes_to_stream(data: bytes) -> io.BytesIO:
    """Wrap raw bytes in a seekable BytesIO stream."""
    return io.BytesIO(data)


def is_image_type(file_type: str) -> bool:
    return file_type in {"png", "jpeg", "gif", "bmp", "tiff", "webp"}


def is_pdf_type(file_type: str) -> bool:
    return file_type == "pdf"
