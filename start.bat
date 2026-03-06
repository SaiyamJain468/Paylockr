@echo off
echo Starting PayLockr...
echo.

start "Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "npm run dev"

echo.
echo ✅ PayLockr is starting...
echo 🔧 Backend: http://localhost:3001
echo 🌐 Frontend: http://localhost:5173
echo.
pause
