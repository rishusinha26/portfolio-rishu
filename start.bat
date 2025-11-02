@echo off
echo ========================================
echo   Portfolio Application Startup
echo ========================================
echo.

REM Check if .env exists
if not exist "backend\.env" (
    echo [ERROR] Backend .env file not found!
    echo.
    echo Please create backend\.env file with:
    echo PORT=5000
    echo NODE_ENV=development
    echo MONGO_URI=mongodb://localhost:27017/portfolio
    echo FRONTEND_URL=http://localhost:5173
    echo.
    pause
    exit /b 1
)

echo [1/3] Checking MongoDB connection...
echo.

echo [2/3] Starting Backend Server...
start "Portfolio Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend Server...
start "Portfolio Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open browser...
pause >nul

start http://localhost:5173

echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
