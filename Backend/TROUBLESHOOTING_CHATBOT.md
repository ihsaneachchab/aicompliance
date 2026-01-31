# Guide de Dépannage - Chatbot

## Problème : Les messages ne s'affichent pas dans le chat

### Étape 1 : Vérifier que tous les services sont démarrés

1. **API externe du chatbot** (port 8001) :
   ```bash
   cd "C:\Users\IJJA ID SAID\chatbot_iso9001_conformite"
   .\.venv\Scripts\activate
   python run.py
   ```
   Vérifier : http://localhost:8001/docs doit être accessible

2. **Backend principal** (port 8000) :
   ```bash
   cd Backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   Vérifier : http://localhost:8000/docs doit être accessible

3. **Frontend** (port 5173) :
   ```bash
   cd Frontend
   npm run dev
   ```

### Étape 2 : Vérifier la configuration

Vérifiez que `Backend/core/config.py` contient :
```python
CHATBOT_API_BASE_URL: str = "http://localhost:8001/api/v1"
CHATBOT_API_USERNAME: Optional[str] = "admin@aicompliance.com"
CHATBOT_API_PASSWORD: Optional[str] = "admin123"
```

### Étape 3 : Tester la connexion

Exécutez le script de diagnostic :
```bash
cd Backend
python test_chatbot_connection.py
```

### Étape 4 : Vérifier les logs du navigateur

1. Ouvrez la console du navigateur (F12)
2. Allez sur http://localhost:5173/chat
3. Envoyez un message
4. Regardez les erreurs dans la console

### Étape 5 : Vérifier l'ingestion des documents

L'API externe du chatbot nécessite que les documents ISO soient ingérés :
```bash
cd "C:\Users\IJJA ID SAID\chatbot_iso9001_conformite"
.\.venv\Scripts\activate
python -m app.ingestion
```

### Problèmes courants

#### "Not Found" sur les endpoints
- **Cause** : Le backend principal n'a pas été redémarré
- **Solution** : Arrêtez et redémarrez le backend principal

#### "Cannot connect to chatbot API"
- **Cause** : L'API externe n'est pas démarrée
- **Solution** : Démarrez l'API externe sur le port 8001

#### "Internal Server Error" lors de l'envoi de message
- **Cause** : Les documents ISO ne sont pas ingérés
- **Solution** : Exécutez `python -m app.ingestion`

#### Le message ne s'affiche pas du tout
- **Cause** : Erreur JavaScript silencieuse
- **Solution** : Vérifiez la console du navigateur (F12)

### Test manuel des endpoints

1. **Créer une conversation** :
   ```bash
   curl -X POST "http://localhost:8000/api/chatbot/conversations" \
     -H "Authorization: Bearer demo_token" \
     -H "Content-Type: application/json" \
     -d "{}"
   ```

2. **Envoyer un message** (remplacez CONVO_ID) :
   ```bash
   curl -X POST "http://localhost:8000/api/chatbot/conversations/CONVO_ID/ask" \
     -H "Authorization: Bearer demo_token" \
     -H "Content-Type: application/json" \
     -d '{"message": "Bonjour", "settings": {"model": "llama-3.3-70b-versatile", "temperature": 0.2}}'
   ```




