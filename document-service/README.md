# PayLockr — Document Processing Service

A standalone **Python / FastAPI** microservice that extracts structured financial transactions from bank statements and invoices (PDFs and images). Fully isolated from the main TypeScript/Supabase project — integrates via HTTP only.

---

## Quick Start

### Prerequisites
| Tool | Install |
|------|---------|
| Python 3.11+ | [python.org](https://python.org) |
| Tesseract OCR | `winget install UB-Mannheim.TesseractOCR` (Windows) / `apt install tesseract-ocr` (Linux) |
| Ghostscript *(optional, for Camelot table extraction)* | `winget install ArtifexSoftware.Ghostscript` / `apt install ghostscript` |

### Setup
```bash
cd document-service

# 1. Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # Linux/Mac

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Configure environment
copy .env.example .env
# Edit .env — set GEMINI_API_KEY if you want LLM normalization

# 4. Run the service
uvicorn app.main:app --reload --port 8000
```

The service will be available at **http://localhost:8000**  
Interactive API docs at **http://localhost:8000/docs**

---

## API Reference

### `GET /health`
Liveness check.
```json
{ "status": "ok", "service": "document-processing" }
```

---

### `POST /process-document`
Process a file via **multipart upload**.

```bash
curl -X POST http://localhost:8000/process-document \
  -F "file=@bank_statement.pdf" \
  -F "bank_name=HDFC"
```

---

### `POST /process-document/url`
Process a file via **URL** (TypeScript/Supabase integration point).

```bash
curl -X POST http://localhost:8000/process-document/url \
  -H "Content-Type: application/json" \
  -d '{ "file_url": "https://your-supabase-project.supabase.co/storage/v1/object/public/statements/file.pdf" }'
```

**Request body:**
```json
{
  "file_url": "string (required)",
  "user_id":  "string (optional)",
  "bank_name": "string (optional)"
}
```

---

### Response Format (both endpoints)
```json
{
  "transactions": [
    {
      "date": "2024-01-15",
      "description": "UPI/Swiggy Food Order",
      "amount": 450.00,
      "type": "debit",
      "balance": 12350.00
    }
  ],
  "confidence": 0.92,
  "pages_processed": 3,
  "extraction_method": "camelot"
}
```

| Field | Description |
|-------|-------------|
| `transactions` | Array of parsed transactions |
| `confidence` | 0.0–1.0 quality score |
| `pages_processed` | Number of PDF pages (1 for images) |
| `extraction_method` | `pdfplumber` / `camelot` / `ocr` / `ocr+llm` |

---

## TypeScript Integration

```typescript
// Call from your TypeScript backend after uploading to Supabase Storage
const response = await fetch('http://localhost:8000/process-document/url', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    file_url: supabasePublicUrl,
    user_id: currentUser.id,
    bank_name: 'HDFC',
  }),
});

const { transactions, confidence } = await response.json();
// Store transactions in your Supabase database
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Server port |
| `LLM_ENABLED` | `false` | Enable Gemini LLM normalization |
| `GEMINI_API_KEY` | _(empty)_ | Your Gemini API key |
| `FILE_SIZE_LIMIT_MB` | `25` | Max upload size |
| `LOG_LEVEL` | `INFO` | Logging verbosity |

---

## Docker

```bash
# Build
docker build -t paylockr-doc-service .

# Run
docker run -p 8000:8000 --env-file .env paylockr-doc-service

# Health check
curl http://localhost:8000/health
```

---

## Processing Pipeline

```
Input (PDF or image)
       │
       ├─ Image? ──────────────────────────────┐
       │                                        │
       └─ PDF?                                OpenCV preprocess
              │                                        │
              ├─ Text PDF                     Tesseract OCR
              │     ├─ Tables found?                    │
              │     │    └─ Camelot extraction           │
              │     └─ No tables                        │
              │          └─ pdfplumber text              │
              └─ Scanned PDF                            │
                    └─ Render to images ────────────────┘
                                │
                         Regex normalizer
                                │
                     (optional) LLM phase
                                │
                         JSON response
```

---

## Folder Structure

```
document-service/
├── app/
│   ├── __init__.py
│   ├── main.py            ← FastAPI app + endpoint routing
│   ├── pdf_parser.py      ← pdfplumber / PyMuPDF extraction
│   ├── ocr.py             ← OpenCV preprocessing + Tesseract
│   ├── table_extractor.py ← Camelot table extraction
│   ├── normalizer.py      ← Regex parsing + optional Gemini LLM
│   └── utils.py           ← File fetch, type detection, logging
├── .env.example
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## Isolation Guarantee

This service has **zero coupling** to the main PayLockr TypeScript project:

- ❌ No Supabase SDK
- ❌ No shared database connections
- ❌ No shared environment variables (separate `.env`)
- ✅ Communicates only via HTTP JSON
- ✅ Deployable independently (Docker-ready)
- ✅ If this service is down, the main app continues to work normally
