# =============================================================================
# PayLockr Document Processing Service — Dockerfile
# =============================================================================
# Multi-stage build based on python:3.11-slim.
# System deps: Tesseract OCR, Ghostscript (Camelot), OpenCV runtime libs.
# =============================================================================

FROM python:3.11-slim AS base

# Avoid interactive prompts during apt installs
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ---------------------------------------------------------------------------
# System dependencies
# ---------------------------------------------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
        # Tesseract OCR engine
        tesseract-ocr \
        tesseract-ocr-eng \
        # Ghostscript — required by Camelot (lattice mode)
        ghostscript \
        # OpenCV runtime shared libs
        libgl1-mesa-glx \
        libglib2.0-0 \
        libsm6 \
        libxrender1 \
        libxext6 \
        # PDF dependencies for PyMuPDF / pdfplumber
        libmupdf-dev \
        # curl for healthcheck
        curl \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------------------------------------
# Python dependencies
# ---------------------------------------------------------------------------
WORKDIR /service

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ---------------------------------------------------------------------------
# Application code
# ---------------------------------------------------------------------------
COPY app/ ./app/
COPY .env.example .env.example

# ---------------------------------------------------------------------------
# Runtime configuration 
# ---------------------------------------------------------------------------
EXPOSE 8000

# Healthcheck — hits /health every 30s; marks container unhealthy after 3 failures
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run with uvicorn; workers=1 keeps memory low — scale via Docker replicas
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
