@echo off
title PayLockr - Cloudflare Tunnel Setup
color 0E

echo ========================================
echo    CLOUDFLARE TUNNEL SETUP
echo ========================================
echo.

REM Check if cloudflared is installed
where cloudflared >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [1/3] Installing Cloudflare Tunnel...
    echo.
    echo Downloading cloudflared...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile 'cloudflared.exe'"
    
    if exist cloudflared.exe (
        echo Installation successful!
        echo.
    ) else (
        echo [ERROR] Failed to download cloudflared
        echo Please download manually from: https://github.com/cloudflare/cloudflared/releases
        pause
        exit /b 1
    )
) else (
    echo [1/3] Cloudflared already installed
    echo.
)

echo [2/3] Starting Cloudflare Tunnel...
echo.
echo ==========================================
echo   CREATING PUBLIC URL FOR PORT 3000
echo ==========================================
echo.
echo Your PayLockr app will be accessible via a public URL
echo The URL will be displayed below (look for https://...)
echo.
echo Press Ctrl+C to stop the tunnel
echo.

echo [3/3] Tunnel starting...
echo.

REM Start tunnel
if exist cloudflared.exe (
    cloudflared.exe tunnel --url http://localhost:3000
) else (
    cloudflared tunnel --url http://localhost:3000
)
