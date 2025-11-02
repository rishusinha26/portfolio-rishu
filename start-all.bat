@echo off
echo ========================================
echo   PORTFOLIO - START ALL SERVICES
echo ========================================
echo.

REM Check if .env exists
if not exist "backend\.env" (
    echo [ERROR] Backend .env file not found!
    echo.
    echo Creating .env file from template...
    copy "backend\.env.template" "backend\.env"
    echo.
    echo Please edit backend\.env and update:
    echo - MONGO_URI (if using MongoDB Atlas)
    echo - EMAIL credentials (if needed)
    echo.
    echo Press any key to continue...
    pause >nul
)

echo [Step 1/4] Starting Backend Server...
start "Portfolio Backend" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [Step 2/4] Starting Frontend Server...
start "Portfolio Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 3 /nobreak >nul

echo [Step 3/4] Waiting for servers to start...
timeout /t 5 /nobreak >nul

echo [Step 4/4] Populating Database with Sample Data...
echo.
choice /C YN /M "Do you want to add sample data to database"
if errorlevel 2 goto skip_seed
if errorlevel 1 goto run_seed

:run_seed
start "Database Seeder" cmd /k "cd /d %~dp0backend && node scripts\seedData.js"
timeout /t 2 /nobreak >nul
goto done

:skip_seed
echo Skipping database seeding...

:done
echo.
echo ========================================
echo   ALL SERVICES STARTED!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Opening browser...
timeout /t 2 /nobreak >nul
start http://localhost:5173
echo.
echo ========================================
echo   SERVERS ARE RUNNING
echo ========================================
echo.
echo Close the server windows to stop them.
echo.
pause
