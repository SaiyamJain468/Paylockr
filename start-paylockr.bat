@echo off
title PayLockr - Starting Services
color 0A

echo ========================================
echo    PAYLOCKR - STARTING ALL SERVICES
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo [1/4] Checking dependencies...
echo.

REM Start Document Service in new window
echo [2/4] Starting Document Service (Python Backend)...
start "PayLockr - Document Service" cmd /k "cd /d "%~dp0..\document-service" && if not exist .venv (echo Creating virtual environment... && python -m venv .venv) && call .venv\Scripts\activate && echo Installing dependencies... && pip install -q -r requirements.txt && echo. && echo ========================================== && echo   DOCUMENT SERVICE RUNNING ON PORT 8000 && echo ========================================== && echo. && python -m uvicorn app.main:app --reload --port 8000"

REM Wait for document service to start
echo Waiting for Document Service to initialize...
timeout /t 5 /nobreak >nul

REM Start Frontend in new window
echo [3/4] Starting Frontend (React App)...
start "PayLockr - Frontend" cmd /k "cd /d "%~dp0" && echo Installing dependencies... && npm install && echo. && echo ========================================== && echo   FRONTEND RUNNING ON PORT 5173 && echo ========================================== && echo. && npm run dev"

echo.
echo [4/4] Services starting...
echo.
echo ========================================
echo   PAYLOCKR IS STARTING!
echo ========================================
echo.
echo Frontend:         http://localhost:5173
echo Document Service: http://localhost:8000
echo API Docs:         http://localhost:8000/docs
echo.
echo Press any key to open PayLockr in browser...
pause >nul

REM Open browser
start http://localhost:5173

echo.
echo ========================================
echo   SERVICES ARE RUNNING
echo ========================================
echo.
echo Close this window to stop all services
echo Or close individual service windows
echo.
pause
