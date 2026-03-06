# Add to document-service/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(
    filename='errors.log',
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class ErrorLog(BaseModel):
    message: str
    stack: str = None
    context: dict = None
    timestamp: str
    userId: str = None

@app.post("/log-error")
async def log_error(error: ErrorLog):
    logging.error(f"Frontend Error: {error.message} | User: {error.userId} | Context: {error.context}")
    return {"status": "logged"}
