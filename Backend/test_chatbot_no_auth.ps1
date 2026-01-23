# Script de Test du Chatbot SANS Authentification
# Usage: .\test_chatbot_no_auth.ps1

$BASE_URL = "http://localhost:8000"

Write-Host "=== Test du Chatbot RAG (SANS Authentification) ===" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier le statut du chatbot
Write-Host "1. Vérification du statut du chatbot..." -ForegroundColor Yellow
try {
    $statusResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/status" `
        -Method GET
    
    Write-Host "   Statut: $($statusResponse.status)" -ForegroundColor $(if ($statusResponse.status -eq "connected") { "Green" } else { "Yellow" })
    if ($statusResponse.chatbot_api) {
        Write-Host "   API Chatbot: $($statusResponse.chatbot_api)" -ForegroundColor $(if ($statusResponse.chatbot_api -eq "online") { "Green" } else { "Red" })
    }
    if ($statusResponse.error) {
        Write-Host "   Erreur: $($statusResponse.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "   ⚠ Erreur lors de la vérification du statut: $_" -ForegroundColor Yellow
}

# 2. Créer une conversation (TEST)
Write-Host ""
Write-Host "2. Création d'une conversation (TEST)..." -ForegroundColor Yellow
try {
    $convoResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/test/conversations" `
        -Method POST `
        -ContentType "application/json" `
        -Body "{}"
    
    $CONVO_ID = $convoResponse.convo_id
    Write-Host "   ✓ Conversation créée: $CONVO_ID" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Erreur lors de la création de conversation: $_" -ForegroundColor Red
    Write-Host "   Détails: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "   $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "   ⚠ Assurez-vous que:" -ForegroundColor Yellow
    Write-Host "   1. Le backend est démarré (uvicorn main:app --reload --host 0.0.0.0 --port 8000)" -ForegroundColor White
    Write-Host "   2. L'API du chatbot est démarrée et accessible à l'URL configurée" -ForegroundColor White
    Write-Host "   3. Vérifiez l'URL dans Backend/.env ou Backend/core/config.py" -ForegroundColor White
    exit 1
}

# 3. Poser une question
Write-Host ""
Write-Host "3. Envoi d'une question au chatbot..." -ForegroundColor Yellow
try {
    $askBody = @{
        message = "Quelle est la différence entre action corrective et préventive selon ISO 9001?"
        settings = @{
            model = "llama-3.3-70b-versatile"
            temperature = 0.2
        }
    } | ConvertTo-Json

    $askResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/test/conversations/$CONVO_ID/ask" `
        -Method POST `
        -ContentType "application/json" `
        -Body $askBody
    
    Write-Host "   ✓ Réponse reçue!" -ForegroundColor Green
    Write-Host ""
    Write-Host "   Réponse:" -ForegroundColor Cyan
    $answer = $askResponse.answer
    if ($answer) {
        $preview = if ($answer.Length -gt 300) { $answer.Substring(0, 300) + "..." } else { $answer }
        Write-Host "   $preview" -ForegroundColor White
    } else {
        Write-Host "   (Pas de réponse dans la réponse)" -ForegroundColor Yellow
    }
    
    if ($askResponse.citations) {
        Write-Host ""
        Write-Host "   Citations: $($askResponse.citations.Count)" -ForegroundColor Cyan
        foreach ($citation in $askResponse.citations) {
            Write-Host "   - $($citation.source)" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "   ✗ Erreur lors de l'envoi de la question: $_" -ForegroundColor Red
    Write-Host "   Détails: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "   $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}

# 4. Récupérer l'historique
Write-Host ""
Write-Host "4. Récupération de l'historique..." -ForegroundColor Yellow
try {
    $historyResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/test/conversations/$CONVO_ID/history" `
        -Method GET
    
    Write-Host "   ✓ Historique récupéré: $($historyResponse.history.Count) messages" -ForegroundColor Green
    if ($historyResponse.history.Count -gt 0) {
        Write-Host "   Dernier message: $($historyResponse.history[-1].role) - $($historyResponse.history[-1].content.Substring(0, [Math]::Min(50, $historyResponse.history[-1].content.Length)))..." -ForegroundColor Gray
    }
} catch {
    Write-Host "   ⚠ Erreur lors de la récupération de l'historique: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Tests terminés! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Ces endpoints de test n'utilisent pas d'authentification." -ForegroundColor Yellow
Write-Host "Pour utiliser avec authentification, utilisez les endpoints normaux:" -ForegroundColor Yellow
Write-Host "- POST /api/chatbot/conversations (avec token)" -ForegroundColor White
Write-Host "- POST /api/chatbot/conversations/{id}/ask (avec token)" -ForegroundColor White


