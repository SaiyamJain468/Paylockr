@echo off
title PayLockr - Git Upload
color 0E

echo ========================================
echo    UPLOADING PAYLOCKR TO GITHUB
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo Please install Git from https://git-scm.com
    pause
    exit /b 1
)

echo [1/6] Checking for sensitive files...
echo.

REM Verify .env files are not staged
if exist .env.local (
    echo [WARNING] .env.local exists - verifying it's in .gitignore...
    findstr /C:".env.local" .gitignore >nul
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] .env.local is NOT in .gitignore!
        echo Add it before continuing.
        pause
        exit /b 1
    )
    echo [OK] .env.local is protected
)

echo.
echo [2/6] Initializing Git repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Repository already initialized
)

echo.
echo [3/6] Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/saiyamjain468s-projects/paylockr.git
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to add remote repository
    pause
    exit /b 1
)

echo.
echo [4/6] Staging files...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to stage files
    pause
    exit /b 1
)

echo.
echo [5/6] Checking what will be committed...
echo.
git status
echo.

echo ========================================
echo   REVIEW FILES ABOVE
echo ========================================
echo.
echo Make sure NO .env files are listed!
echo.
set /p CONFIRM="Continue with commit? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo Upload cancelled.
    pause
    exit /b 0
)

echo.
echo [6/6] Committing and pushing...
git commit -m "Initial commit: PayLockr - AI-powered tax management for Indian freelancers"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Commit failed
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main --force
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Push failed. You may need to:
    echo 1. Authenticate with GitHub
    echo 2. Check repository permissions
    echo 3. Run: git push -u origin main
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESSFULLY UPLOADED TO GITHUB!
echo ========================================
echo.
echo Repository: https://github.com/saiyamjain468s-projects/paylockr
echo.
pause
