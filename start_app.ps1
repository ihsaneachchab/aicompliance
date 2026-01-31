$BackendPath = "$PSScriptRoot\Backend"
$ChatbotPath = "$PSScriptRoot\chatbot_iso9001_conformite"
$FrontendPath = "$PSScriptRoot\Frontend"

Write-Host "Starting Unified AI Platform..." -ForegroundColor Green

# Start Backend
if (Test-Path $BackendPath) {
    Write-Host "Starting Backend Service..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BackendPath'; Write-Host 'Backend Service'; uvicorn main:app --reload --host 0.0.0.0 --port 8000"
} else {
    Write-Host "Backend directory not found at $BackendPath" -ForegroundColor Red
}

# Start Chatbot
if (Test-Path $ChatbotPath) {
    Write-Host "Starting Chatbot Service..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ChatbotPath'; Write-Host 'Chatbot Service'; python run.py"
} else {
    Write-Host "Chatbot directory not found at $ChatbotPath" -ForegroundColor Red
}

# Start Frontend
if (Test-Path $FrontendPath) {
    Write-Host "Starting Frontend Service..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FrontendPath'; Write-Host 'Frontend Service'; npm run dev"
} else {
    Write-Host "Frontend directory not found at $FrontendPath" -ForegroundColor Red
}

# Wait a moment for services to initialize then open browser
Start-Sleep -Seconds 5
Write-Host "Opening Browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host "All services started!" -ForegroundColor Green
