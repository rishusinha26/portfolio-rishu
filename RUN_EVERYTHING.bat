@echo off
title Portfolio - All Services
color 0A

echo.
echo  ========================================
echo    STARTING PORTFOLIO APPLICATION
echo  ========================================
echo.

REM Start Backend
echo  [1/3] Starting Backend...
start "Backend Server" cmd /k "cd /d %~dp0backend && echo Backend Starting... && npm run dev"
timeout /t 4 >nul

REM Start Frontend  
echo  [2/3] Starting Frontend...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && echo Frontend Starting... && npm run dev"
timeout /t 4 >nul

REM Seed Database
echo  [3/3] Seeding Database...
echo.
echo  Add sample data to database? (Y/N)
choice /C YN /N /M "Press Y for Yes, N for No: "
if errorlevel 2 goto open_browser
start "Database Seeder" cmd /c "cd /d %~dp0backend && node scripts\seedData.js && pause"

:open_browser
timeout /t 3 >nul
echo.
echo  ========================================
echo    OPENING PORTFOLIO...
echo  ========================================
echo.
start http://localhost:5173

echo.
echo  Backend:  http://localhost:5000
echo  Frontend: http://localhost:5173
echo.
echo  All services are running!
echo  Close the server windows to stop.
echo.
pause
