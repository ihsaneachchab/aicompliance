# Script pour arrêter tous les processus Python et redémarrer le backend
Write-Host "=== ARRET DE TOUS LES PROCESSUS PYTHON ===" -ForegroundColor Red

# Arrêter tous les processus Python (sauf ceux du chatbot externe)
Get-Process python -ErrorAction SilentlyContinue | Where-Object { 
    $_.Path -notlike "*chatbot_iso9001_conformite*" 
} | ForEach-Object {
    Write-Host "Arret du processus PID: $($_.Id) - $($_.Path)" -ForegroundColor Yellow
    Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 3

# Vérifier que le port 8000 est libre
$port8000 = netstat -ano | findstr ":8000"
if ($port8000) {
    Write-Host "ATTENTION: Le port 8000 est encore utilise!" -ForegroundColor Red
    $port8000
} else {
    Write-Host "Port 8000 libre" -ForegroundColor Green
}

Write-Host "`n=== DEMARRAGE DU BACKEND ===" -ForegroundColor Green
Set-Location "$PSScriptRoot"

# Démarrer le backend dans une nouvelle fenêtre
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$PSScriptRoot'; Write-Host 'Demarrage du backend...' -ForegroundColor Green; uvicorn main:app --reload --host 0.0.0.0 --port 8000"
)

Write-Host "Backend demarre dans une nouvelle fenetre PowerShell" -ForegroundColor Green
Write-Host "Attendez 5 secondes puis testez: curl http://localhost:8000/api/chatbot/status" -ForegroundColor Cyan




