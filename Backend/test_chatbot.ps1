# Script de Test du Chatbot pour Windows PowerShell
# Usage: .\test_chatbot.ps1

$BASE_URL = "http://localhost:8000"
$EMAIL = "test@example.com"
$PASSWORD = "testpassword123"

Write-Host "=== Test du Chatbot RAG ===" -ForegroundColor Cyan
Write-Host ""

# 1. Créer un utilisateur
Write-Host "1. Création d'un utilisateur..." -ForegroundColor Yellow
try {
    $signupBody = @{
        email = $EMAIL
        username = $EMAIL
        password = $PASSWORD
        full_name = "Test User"
    } | ConvertTo-Json

    $signupResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/signup" `
        -Method POST `
        -ContentType "application/json" `
        -Body $signupBody `
        -ErrorAction SilentlyContinue
    
    Write-Host "   ✓ Utilisateur créé" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ Utilisateur peut-être déjà existant (c'est OK)" -ForegroundColor Yellow
}

# 2. Se connecter
Write-Host "2. Connexion..." -ForegroundColor Yellow
try {
    $loginBody = "username=$EMAIL&password=$PASSWORD"
    $loginResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/token" `
        -Method POST `
        -ContentType "application/x-www-form-urlencoded" `
        -Body $loginBody
    
    $TOKEN = $loginResponse.access_token
    Write-Host "   ✓ Token obtenu: $($TOKEN.Substring(0, 20))..." -ForegroundColor Green
} catch {
    Write-Host "   ✗ Erreur de connexion: $_" -ForegroundColor Red
    exit 1
}

# 3. Vérifier le statut du chatbot
Write-Host "3. Vérification du statut du chatbot..." -ForegroundColor Yellow
try {
    $statusResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/status" `
        -Method GET `
        -Headers @{ "Authorization" = "Bearer $TOKEN" }
    
    Write-Host "   Statut: $($statusResponse.status)" -ForegroundColor $(if ($statusResponse.status -eq "connected") { "Green" } else { "Yellow" })
    if ($statusResponse.chatbot_api) {
        Write-Host "   API Chatbot: $($statusResponse.chatbot_api)" -ForegroundColor $(if ($statusResponse.chatbot_api -eq "online") { "Green" } else { "Red" })
    }
} catch {
    Write-Host "   ⚠ Erreur lors de la vérification du statut: $_" -ForegroundColor Yellow
}

# 4. Créer une conversation
Write-Host "4. Création d'une conversation..." -ForegroundColor Yellow
try {
    $convoResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/conversations" `
        -Method POST `
        -Headers @{ "Authorization" = "Bearer $TOKEN" } `
        -ContentType "application/json" `
        -Body "{}"
    
    $CONVO_ID = $convoResponse.convo_id
    Write-Host "   ✓ Conversation créée: $CONVO_ID" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Erreur lors de la création de conversation: $_" -ForegroundColor Red
    exit 1
}

# 5. Poser une question
Write-Host "5. Envoi d'une question au chatbot..." -ForegroundColor Yellow
try {
    $askBody = @{
        message = "Quelle est la différence entre action corrective et préventive selon ISO 9001?"
        settings = @{
            model = "llama-3.3-70b-versatile"
            temperature = 0.2
        }
    } | ConvertTo-Json

    $askResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/conversations/$CONVO_ID/ask" `
        -Method POST `
        -Headers @{ "Authorization" = "Bearer $TOKEN" } `
        -ContentType "application/json" `
        -Body $askBody
    
    Write-Host "   ✓ Réponse reçue!" -ForegroundColor Green
    Write-Host ""
    Write-Host "   Réponse:" -ForegroundColor Cyan
    Write-Host "   $($askResponse.answer.Substring(0, [Math]::Min(200, $askResponse.answer.Length)))..." -ForegroundColor White
    
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

# 6. Récupérer l'historique
Write-Host ""
Write-Host "6. Récupération de l'historique..." -ForegroundColor Yellow
try {
    $historyResponse = Invoke-RestMethod -Uri "$BASE_URL/api/chatbot/conversations/$CONVO_ID/history" `
        -Method GET `
        -Headers @{ "Authorization" = "Bearer $TOKEN" }
    
    Write-Host "   ✓ Historique récupéré: $($historyResponse.history.Count) messages" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ Erreur lors de la récupération de l'historique: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Tests terminés! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour tester via l'interface web:" -ForegroundColor Yellow
Write-Host "1. Démarrez le frontend: cd Frontend && npm run dev" -ForegroundColor White
Write-Host "2. Ouvrez http://localhost:5173" -ForegroundColor White
Write-Host "3. Connectez-vous avec: $EMAIL / $PASSWORD" -ForegroundColor White
Write-Host "4. Allez dans 'Chat Bot' et testez!" -ForegroundColor White





