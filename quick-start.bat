@echo off
title PayLockr Quick Start
color 0B

echo Starting PayLockr...
echo.

REM Start Document Service
start "Document Service" cmd /k "cd /d "%~dp0..\document-service" && call .venv\Scripts\activate && python -m uvicorn app.main:app --reload --port 8000"

REM Wait 3 seconds
timeout /t 3 /nobreak >nul

REM Start Frontend
start "Frontend" cmd /k "cd /d "%~dp0" && npm run dev"

REM Wait 5 seconds
timeout /t 5 /nobreak >nul

REM Open browser
start http://localhost:5173

echo.
echo PayLockr is starting in separate windows...
echo Close those windows to stop the services.
echo.
timeout /t 3 /nobreak >nul
exit
