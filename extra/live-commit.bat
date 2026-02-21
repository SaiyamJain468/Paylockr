@echo off
echo 🔴 LIVE BUILDING MODE - Paylockr
echo ================================
echo.
echo This script will help you make realistic commits as you "build live"
echo.

:menu
echo Choose an action:
echo [1] Quick fix (typo, styling)
echo [2] Add feature
echo [3] Bug fix
echo [4] Update docs
echo [5] Refactor code
echo [6] Exit
echo.
set /p choice="Enter choice (1-6): "

if "%choice%"=="1" goto quickfix
if "%choice%"=="2" goto feature
if "%choice%"=="3" goto bugfix
if "%choice%"=="4" goto docs
if "%choice%"=="5" goto refactor
if "%choice%"=="6" goto end
goto menu

:quickfix
echo.
set /p file="Enter file to update (e.g., src/pages/Dashboard.tsx): "
set /p msg="What did you fix? (e.g., button styling): "
git add %file%
git commit -m "style: Fix %msg%"
git push
echo ✅ Pushed: style: Fix %msg%
echo.
goto menu

:feature
echo.
set /p file="Enter file to update: "
set /p msg="What feature? (e.g., dark mode toggle): "
git add %file%
git commit -m "feat: Add %msg%"
git push
echo ✅ Pushed: feat: Add %msg%
echo.
goto menu

:bugfix
echo.
set /p file="Enter file to update: "
set /p msg="What bug? (e.g., tax calculation error): "
git add %file%
git commit -m "fix: Resolve %msg%"
git push
echo ✅ Pushed: fix: Resolve %msg%
echo.
goto menu

:docs
echo.
set /p msg="What docs change? (e.g., API documentation): "
git add README.md
git commit -m "docs: Update %msg%"
git push
echo ✅ Pushed: docs: Update %msg%
echo.
goto menu

:refactor
echo.
set /p file="Enter file to update: "
set /p msg="What refactor? (e.g., extract utility function): "
git add %file%
git commit -m "refactor: %msg%"
git push
echo ✅ Pushed: refactor: %msg%
echo.
goto menu

:end
echo.
echo 👋 Happy building!
pause
