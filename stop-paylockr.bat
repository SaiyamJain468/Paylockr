@echo off
title PayLockr - Stop Services
color 0C

echo ========================================
echo    STOPPING PAYLOCKR SERVICES
echo ========================================
echo.

REM Kill Node.js processes (Frontend)
echo Stopping Frontend...
taskkill /F /IM node.exe >nul 2>&1

REM Kill Python processes (Document Service)
echo Stopping Document Service...
taskkill /F /IM python.exe >nul 2>&1

echo.
echo ========================================
echo   ALL SERVICES STOPPED
echo ========================================
echo.
timeout /t 2 /nobreak >nul
