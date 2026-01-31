# Guide de Test du Chatbot RAG

Ce guide vous explique comment tester le chatbot intégré étape par étape.

## 🧪 Tests Rapides

### Test 1 : Vérifier le statut de l'API du chatbot

```bash
# Test direct de l'API du chatbot (si elle est démarrée)
curl http://localhost:8000/api/v1/health

# Ou via le backend principal
curl http://localhost:8000/api/chatbot/status
```

**Résultat attendu** :
```json
{
  "status": "connected",
  "chatbot_api": "online"
}
```

### Test 2 : Tester via l'interface Swagger

1. Démarrez le backend :
   ```bash
   cd Backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. Ouvrez dans votre navigateur : http://localhost:8000/docs

3. Testez l'endpoint `/api/chatbot/status` :
   - Cliquez sur `GET /api/chatbot/status`
   - Cliquez sur "Try it out"
   - Cliquez sur "Execute"
   - Vérifiez la réponse

## 🔐 Tests avec Authentification

### Étape 1 : Créer un utilisateur et obtenir un token

```bash
# 1. Créer un utilisateur
curl -X POST "http://localhost:8000/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "test@example.com",
    "password": "testpassword123",
    "full_name": "Test User"
  }'

# 2. Se connecter et obtenir un token
curl -X POST "http://localhost:8000/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=testpassword123"
```

**Résultat attendu** :
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Copiez le token** pour les tests suivants.

### Étape 2 : Créer une conversation

```bash
# Remplacez YOUR_TOKEN par le token obtenu
curl -X POST "http://localhost:8000/api/chatbot/conversations" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

**Résultat attendu** :
```json
{
  "convo_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Copiez le `convo_id`** pour les tests suivants.

### Étape 3 : Poser une question au chatbot

```bash
# Remplacez YOUR_TOKEN et CONVO_ID
curl -X POST "http://localhost:8000/api/chatbot/conversations/CONVO_ID/ask" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quelle est la différence entre action corrective et préventive selon ISO 9001?",
    "settings": {
      "model": "llama-3.3-70b-versatile",
      "temperature": 0.2
    }
  }'
```

**Résultat attendu** :
```json
{
  "answer": "Selon la norme ISO 9001:2015...",
  "citations": [
    {
      "source": "ISO_9001.pdf",
      "doc": "excerpt text...",
      "chunk_id": "global_iso_0"
    }
  ]
}
```

### Étape 4 : Récupérer l'historique

```bash
curl -X GET "http://localhost:8000/api/chatbot/conversations/CONVO_ID/history" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Étape 5 : Lister les conversations

```bash
curl -X GET "http://localhost:8000/api/chatbot/conversations" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🌐 Tests via l'Interface Web

### Préparation

1. **Démarrer le backend** :
   ```bash
   cd Backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Démarrer le frontend** (dans un autre terminal) :
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Démarrer l'API du chatbot** (si nécessaire, dans un troisième terminal) :
   ```bash
   # Suivre les instructions du repository du chatbot
   # https://github.com/kaoutar263/chatbot_iso9001_conformite
   ```

### Test dans le navigateur

1. **Ouvrir l'application** :
   - Allez sur http://localhost:5173

2. **Se connecter** :
   - Cliquez sur "Connexion"
   - Utilisez les identifiants créés précédemment (ou créez un nouveau compte)

3. **Accéder au Chat Bot** :
   - Dans le menu latéral, cliquez sur "Chat Bot"

4. **Créer une nouvelle conversation** :
   - Cliquez sur le bouton "Nouvelle conversation" (ou l'icône +)

5. **Poser une question** :
   - Tapez une question dans le champ de saisie, par exemple :
     - "Qu'est-ce que l'ISO 9001:2015?"
     - "Quelle est la différence entre action corrective et préventive?"
     - "Comment documenter un processus selon ISO 9001?"
   - Appuyez sur Entrée ou cliquez sur le bouton d'envoi

6. **Vérifier la réponse** :
   - La réponse du chatbot devrait apparaître
   - Si des citations sont disponibles, elles apparaîtront sous la réponse
   - Vérifiez que les citations affichent les sources et extraits de documents

7. **Tester plusieurs questions** :
   - Posez plusieurs questions dans la même conversation
   - Vérifiez que l'historique est conservé

8. **Tester une nouvelle conversation** :
   - Créez une nouvelle conversation
   - Vérifiez que les conversations précédentes sont listées dans la sidebar

## 🐛 Tests de Dépannage

### Test si l'API du chatbot n'est pas disponible

Si l'API du chatbot n'est pas démarrée, vous devriez voir :

1. **Dans la console du navigateur** (F12) :
   - Erreur "Failed to fetch" ou "Network error"

2. **Dans les logs du backend** :
   - Erreur de connexion à l'API du chatbot

3. **Dans l'interface** :
   - Message d'erreur affiché à l'utilisateur

### Test avec un port différent

Si l'API du chatbot tourne sur un autre port (ex: 8001) :

1. **Créer/modifier `Backend/.env`** :
   ```env
   CHATBOT_API_BASE_URL=http://localhost:8001/api/v1
   ```

2. **Redémarrer le backend**

3. **Tester à nouveau**

## 📋 Checklist de Test Complète

- [ ] Backend démarre sans erreur
- [ ] Endpoint `/api/chatbot/status` répond
- [ ] Authentification fonctionne (création utilisateur + login)
- [ ] Création de conversation fonctionne
- [ ] Envoi de message fonctionne
- [ ] Réponse du chatbot reçue
- [ ] Citations affichées (si disponibles)
- [ ] Historique chargé correctement
- [ ] Liste des conversations fonctionne
- [ ] Interface web fonctionne
- [ ] Gestion des erreurs fonctionne (si API indisponible)

## 🔧 Script de Test Automatisé

Créez un fichier `test_chatbot.sh` (Linux/Mac) ou `test_chatbot.ps1` (Windows) :

```bash
#!/bin/bash

BASE_URL="http://localhost:8000"
EMAIL="test@example.com"
PASSWORD="testpassword123"

echo "1. Création d'un utilisateur..."
curl -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"username\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"full_name\":\"Test User\"}"

echo -e "\n2. Connexion..."
TOKEN=$(curl -s -X POST "$BASE_URL/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$EMAIL&password=$PASSWORD" | jq -r '.access_token')

echo "Token: $TOKEN"

echo -e "\n3. Vérification du statut du chatbot..."
curl -X GET "$BASE_URL/api/chatbot/status" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n4. Création d'une conversation..."
CONVO_ID=$(curl -s -X POST "$BASE_URL/api/chatbot/conversations" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq -r '.convo_id')

echo "Conversation ID: $CONVO_ID"

echo -e "\n5. Envoi d'une question..."
curl -X POST "$BASE_URL/api/chatbot/conversations/$CONVO_ID/ask" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quelle est la différence entre action corrective et préventive?",
    "settings": {
      "model": "llama-3.3-70b-versatile",
      "temperature": 0.2
    }
  }' | jq '.'

echo -e "\n✅ Tests terminés!"
```

## 📝 Notes

- Assurez-vous que MongoDB est connecté (pour l'authentification)
- L'API du chatbot doit être démarrée pour que les tests fonctionnent
- Les tests peuvent échouer si l'API du chatbot n'est pas configurée correctement
- Vérifiez les logs du backend pour plus de détails en cas d'erreur





