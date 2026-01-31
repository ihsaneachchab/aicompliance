# Configuration du Chatbot RAG ISO 9001

Ce guide explique comment configurer et utiliser le chatbot RAG intégré dans l'application.

## 📋 Prérequis

1. **API du Chatbot RAG** : L'API du chatbot doit être démarrée et accessible
   - Repository : https://github.com/kaoutar263/chatbot_iso9001_conformite
   - Documentation API : https://raw.githubusercontent.com/kaoutar263/chatbot_iso9001_conformite/main/api_docs.md

2. **Backend FastAPI** : Le backend principal doit être configuré et démarré

3. **Authentification** : L'utilisateur doit être connecté pour utiliser le chatbot

## ⚙️ Configuration

### 1. Configuration de l'URL de l'API du Chatbot

Par défaut, l'URL de l'API du chatbot est configurée dans `Backend/core/config.py` :

```python
CHATBOT_API_BASE_URL: str = "http://localhost:8000/api/v1"
```

**Important** : Si l'API du chatbot tourne sur un port différent (par exemple 8001), vous devez :

#### Option A : Modifier le fichier `.env`

Créez ou modifiez le fichier `Backend/.env` :

```env
CHATBOT_API_BASE_URL=http://localhost:8001/api/v1
CHATBOT_API_TIMEOUT=60
```

#### Option B : Modifier directement `config.py`

Changez la valeur dans `Backend/core/config.py` :

```python
CHATBOT_API_BASE_URL: str = "http://localhost:8001/api/v1"  # Port différent
```

### 2. Installation des dépendances

Assurez-vous que toutes les dépendances sont installées :

```bash
cd Backend
pip install -r requirements.txt
```

La dépendance `httpx>=0.25.0` est nécessaire pour communiquer avec l'API du chatbot.

### 3. Démarrer l'API du Chatbot

Suivez les instructions du repository du chatbot pour démarrer l'API :

```bash
# Exemple (à adapter selon le repository)
cd chatbot_iso9001_conformite
# Suivre les instructions de démarrage du repository
```

L'API doit être accessible à l'URL configurée (par défaut `http://localhost:8000/api/v1`).

### 4. Démarrer le Backend Principal

```bash
cd Backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Note** : Si l'API du chatbot tourne aussi sur le port 8000, vous devrez :
- Soit changer le port du backend principal (ex: `--port 8002`)
- Soit changer le port de l'API du chatbot
- Soit configurer l'URL du chatbot dans `.env` pour pointer vers un autre port

## 🚀 Utilisation

### Endpoints Disponibles

Le backend expose les endpoints suivants pour le chatbot :

- `GET /api/chatbot/status` - Vérifie le statut de l'API du chatbot
- `POST /api/chatbot/conversations` - Crée une nouvelle conversation
- `GET /api/chatbot/conversations` - Liste toutes les conversations
- `GET /api/chatbot/conversations/{convo_id}/history` - Récupère l'historique
- `POST /api/chatbot/conversations/{convo_id}/ask` - Pose une question au chatbot
- `POST /api/chatbot/conversations/{convo_id}/documents` - Upload un document pour une conversation
- `POST /api/chatbot/documents/global` - Upload un document global
- `GET /api/chatbot/conversations/{convo_id}/documents` - Liste les documents d'une conversation
- `GET /api/chatbot/documents/global` - Liste les documents globaux
- `DELETE /api/chatbot/conversations/{convo_id}/documents/{filename}` - Supprime un document

### Frontend

Le frontend utilise automatiquement ces endpoints. L'utilisateur peut :

1. **Créer une nouvelle conversation** : Cliquer sur "Nouvelle conversation"
2. **Poser des questions** : Taper une question dans le champ de saisie
3. **Voir les citations** : Les réponses incluent des citations des documents sources
4. **Gérer les documents** : Uploader des documents pour enrichir les réponses

### Paramètres du Modèle

L'utilisateur peut configurer :
- **Modèle** : Par défaut `llama-3.3-70b-versatile`
- **Temperature** : Par défaut `0.2` (contrôle la créativité des réponses)

## 🔍 Dépannage

### Erreur "Failed to fetch"

1. Vérifiez que l'API du chatbot est démarrée :
   ```bash
   curl http://localhost:8000/api/v1/health
   # ou le port configuré
   ```

2. Vérifiez l'URL dans `.env` ou `config.py`

3. Vérifiez les logs du backend pour voir les erreurs détaillées

### Erreur "Chatbot API unavailable"

1. Vérifiez que l'API du chatbot répond :
   ```bash
   curl http://localhost:8000/api/v1/health
   ```

2. Vérifiez la configuration de l'URL dans `.env`

3. Vérifiez que le port n'est pas déjà utilisé par un autre service

### Erreur d'authentification

1. Assurez-vous d'être connecté (token valide dans localStorage)

2. Vérifiez que le token est envoyé dans les headers :
   - Le frontend envoie automatiquement `Authorization: Bearer <token>`

### Les citations ne s'affichent pas

1. Vérifiez que l'API du chatbot retourne bien les citations dans la réponse

2. Vérifiez la console du navigateur pour les erreurs JavaScript

3. Assurez-vous que les documents sont bien uploadés dans la base de connaissances

## 📝 Notes

- L'authentification utilise l'email de l'utilisateur comme identifiant pour l'API du chatbot
- Les conversations sont sauvegardées à la fois dans l'API du chatbot et localement (localStorage)
- Les documents peuvent être uploadés soit pour une conversation spécifique, soit dans la base globale
- Le timeout par défaut est de 60 secondes (configurable via `CHATBOT_API_TIMEOUT`)

## 🔗 Liens Utiles

- Repository du Chatbot : https://github.com/kaoutar263/chatbot_iso9001_conformite
- Documentation API : https://raw.githubusercontent.com/kaoutar263/chatbot_iso9001_conformite/main/api_docs.md





