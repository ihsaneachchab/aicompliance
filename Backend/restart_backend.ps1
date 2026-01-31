# Script pour redémarrer le backend proprement
Write-Host "Arret des processus Python sur le port 8000..." -ForegroundColor Yellow

# Trouver et arrêter les processus sur le port 8000
$port = 8000
$connections = netstat -ano | findstr ":$port"
if ($connections) {
    $connections | ForEach-Object {
        $parts = $_ -split '\s+'
        $pid = $parts[-1]
        if ($pid -and $pid -ne "0") {
            Write-Host "Arret du processus PID: $pid" -ForegroundColor Red
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
}

Start-Sleep -Seconds 2

Write-Host "Demarrage du backend..." -ForegroundColor Green
Set-Location "$PSScriptRoot"
uvicorn main:app --reload --host 0.0.0.0 --port 8000




