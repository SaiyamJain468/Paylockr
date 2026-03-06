"""
ocr.py — Image preprocessing (OpenCV) + OCR (Tesseract).

Handles:
  * Raw image bytes (JPEG, PNG, TIFF, etc.)
  * PNG bytes produced by pdf_parser.pdf_pages_to_images()

Pipeline per page/image:
  grayscale → deskew → adaptive-threshold → denoise → Tesseract
"""

from __future__ import annotations

import io
from typing import List

import numpy as np
from PIL import Image

from app.utils import setup_logger

logger = setup_logger("ocr")


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def extract_text_from_image(image_bytes: bytes) -> str:
    """
    Run the full OCR pipeline on a single image given as raw bytes.
    Returns extracted text as a string.
    """
    img = _load_image(image_bytes)
    img = _preprocess(img)
    text = _run_tesseract(img)
    logger.info(f"OCR extracted {len(text.split())} words from image")
    return text


def extract_text_from_images(images: List[bytes]) -> str:
    """
    Run OCR on a list of images (e.g. PDF pages) and concatenate results.
    """
    parts: List[str] = []
    for i, img_bytes in enumerate(images, start=1):
        logger.info(f"OCR processing image/page {i}/{len(images)}")
        parts.append(extract_text_from_image(img_bytes))
    return "\n".join(parts)


# ---------------------------------------------------------------------------
# Image loading
# ---------------------------------------------------------------------------

def _load_image(data: bytes) -> np.ndarray:
    """Load image bytes → OpenCV BGR numpy array."""
    try:
        import cv2
        buf = np.frombuffer(data, np.uint8)
        img = cv2.imdecode(buf, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("cv2.imdecode returned None")
        return img
    except Exception as exc:
        logger.warning(f"cv2 load failed ({exc}), falling back to Pillow")
        pil_img = Image.open(io.BytesIO(data)).convert("RGB")
        return np.array(pil_img)[:, :, ::-1].copy()  # RGB → BGR


# ---------------------------------------------------------------------------
# Preprocessing pipeline
# ---------------------------------------------------------------------------

def _preprocess(img: np.ndarray) -> np.ndarray:
    """Apply a sequence of image enhancement steps for better OCR accuracy."""
    import cv2

    # 1. Grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 2. Upscale if too small (helps Tesseract)
    h, w = gray.shape
    if max(h, w) < 1000:
        scale = 1000 / max(h, w)
        gray = cv2.resize(gray, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)

    # 3. Deskew
    gray = _deskew(gray)

    # 4. Adaptive thresholding (handles uneven lighting)
    binary = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY, 31, 10
    )

    # 5. Denoise
    denoised = cv2.fastNlMeansDenoising(binary, h=10)

    return denoised


def _deskew(gray: np.ndarray) -> np.ndarray:
    """Straighten a slightly rotated document image."""
    import cv2

    coords = np.column_stack(np.where(gray < 128))
    if len(coords) < 10:
        return gray

    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = 90 + angle
    if abs(angle) < 0.5:
        return gray      # negligible skew — skip

    h, w = gray.shape
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(
        gray, M, (w, h),
        flags=cv2.INTER_CUBIC,
        borderMode=cv2.BORDER_REPLICATE,
    )
    logger.debug(f"Deskewed by {angle:.2f}°")
    return rotated


# ---------------------------------------------------------------------------
# Tesseract OCR
# ---------------------------------------------------------------------------

# Tesseract config tuned for financial documents
# PSM 4 = single column of variable-size text — best for tabular bank statement screenshots
# No character whitelist: preserves full UPI references (UPI/DR/..., UPI/CR/...)
_TESS_CONFIG = (
    "--oem 3 "   # LSTM engine
    "--psm 4"    # Single column of variable-size text
)


def _run_tesseract(img: np.ndarray) -> str:
    """Run Tesseract on a preprocessed numpy image array."""
    try:
        import pytesseract
    except ImportError:
        raise RuntimeError(
            "pytesseract is not installed. Run: pip install pytesseract"
        )

    pil_img = Image.fromarray(img)
    text = pytesseract.image_to_string(pil_img, config=_TESS_CONFIG)
    return text.strip()
