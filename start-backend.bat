@echo off
title PayLockr - Backend Service
color 0A

echo ========================================
echo    PAYLOCKR - STARTING BACKEND ONLY
echo ========================================
echo.

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo [1/3] Navigating to document-service directory...
cd /d "%~dp0document-service"

echo [2/3] Setting up Python environment...
if not exist .venv (
    echo Creating virtual environment...
    python -m venv .venv
)

call .venv\Scripts\activate

echo [3/3] Installing dependencies and starting server...
pip install -q -r requirements.txt

echo.
echo ==========================================
echo   DOCUMENT SERVICE RUNNING ON PORT 8000
echo ==========================================
echo.
echo Backend API: http://localhost:8000
echo API Docs:    http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the service
echo.

uvicorn app.main:app --reload --port 8000