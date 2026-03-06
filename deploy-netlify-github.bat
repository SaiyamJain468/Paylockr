@echo off
echo ========================================
echo PayLockr - GitHub + Netlify Deployment
echo ========================================
echo.

:: Build the project
echo [1/4] Building project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

:: Initialize git if needed
if not exist .git (
    echo [2/4] Initializing Git repository...
    git init
    git branch -M main
) else (
    echo [2/4] Git already initialized
)

:: Add and commit
echo [3/4] Committing changes...
git add .
git commit -m "Deploy: PayLockr with Gemini API fix"

:: Push to GitHub
echo [4/4] Pushing to GitHub...
set /p REPO_URL="Enter GitHub repo URL (e.g., https://github.com/username/paylockr.git): "
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main --force

echo.
echo ✅ Pushed to GitHub!
echo.
echo Next steps for Netlify:
echo 1. Go to https://app.netlify.com
echo 2. Click "Add new site" → "Import an existing project"
echo 3. Connect to GitHub and select your repository
echo 4. Build settings:
echo    - Build command: npm run build
echo    - Publish directory: dist
echo 5. Add environment variables in Netlify dashboard
echo.
pause
