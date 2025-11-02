# Portfolio - Start All Services
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PORTFOLIO - START ALL SERVICES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "[ERROR] Backend .env file not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item "backend\.env.template" "backend\.env"
    Write-Host ""
    Write-Host "Please edit backend\.env and update:" -ForegroundColor Yellow
    Write-Host "- MONGO_URI (if using MongoDB Atlas)" -ForegroundColor Yellow
    Write-Host "- EMAIL credentials (if needed)" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue"
}

# Start Backend
Write-Host "[Step 1/4] Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "[Step 2/4] Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 3

# Wait for servers
Write-Host "[Step 3/4] Waiting for servers to start..." -ForegroundColor Green
Start-Sleep -Seconds 5

# Ask about seeding
Write-Host "[Step 4/4] Database Setup" -ForegroundColor Green
$seed = Read-Host "Do you want to add sample data to database? (Y/N)"
if ($seed -eq "Y" -or $seed -eq "y") {
    Write-Host "Populating database with sample data..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; node scripts\seedData.js" -WindowStyle Normal
    Start-Sleep -Seconds 2
} else {
    Write-Host "Skipping database seeding..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ALL SERVICES STARTED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SERVERS ARE RUNNING" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the server windows to stop them." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
