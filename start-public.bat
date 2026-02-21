@echo off
title PayLockr - Full Stack + Public URL
color 0A

echo ========================================
echo    PAYLOCKR - PUBLIC DEPLOYMENT
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not installed!
    pause
    exit /b 1
)

REM Check Python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python not installed!
    pause
    exit /b 1
)

echo [1/4] Starting Backend Service...
start "PayLockr - Backend" cmd /k "cd /d "%~dp0..\document-service" && if not exist .venv (python -m venv .venv) && call .venv\Scripts\activate && pip install -q -r requirements.txt && echo Backend running on port 8000 && python -m uvicorn app.main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

echo [2/4] Starting Frontend Service...
start "PayLockr - Frontend" cmd /k "cd /d "%~dp0" && npm install && echo Frontend running on port 3000 && npm run dev"

timeout /t 5 /nobreak >nul

echo [3/4] Starting Cloudflare Tunnel...
start "PayLockr - Public URL" cmd /k "cd /d "%~dp0" && call start-cloudflare-tunnel.bat"

echo.
echo [4/4] All services starting...
echo.
echo ==========================================
echo   PAYLOCKR IS NOW PUBLIC!
echo ==========================================
echo.
echo Local Access:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo.
echo Public Access:
echo   Check the "PayLockr - Public URL" window
echo   Look for: https://xxxxx.trycloudflare.com
echo.
echo Share that URL with anyone to access your app!
echo.
pause
