# Configuration de l'Authentification pour l'API du Chatbot

Ce guide explique comment configurer l'authentification avec l'API du chatbot RAG selon la [documentation officielle](https://raw.githubusercontent.com/kaoutar263/chatbot_iso9001_conformite/main/api_docs.md).

## 🔐 Authentification avec l'API du Chatbot

L'API du chatbot nécessite une authentification via Bearer Token. Il y a deux façons de configurer cela :

### Option 1 : Authentification Automatique (Recommandé)

Le backend peut s'authentifier automatiquement auprès de l'API du chatbot en utilisant des credentials configurés.

1. **Créer ou modifier le fichier `Backend/.env`** :

```env
# Chatbot RAG API
CHATBOT_API_BASE_URL=http://localhost:8000/api/v1
CHATBOT_API_TIMEOUT=60

# Credentials pour l'API du chatbot (optionnel)
# Si ces valeurs sont définies, le backend s'authentifiera automatiquement
CHATBOT_API_USERNAME=votre_email@example.com
CHATBOT_API_PASSWORD=votre_mot_de_passe
```

2. **Créer un compte dans l'API du chatbot** :
   - Suivez les instructions du repository : https://github.com/kaoutar263/chatbot_iso9001_conformite
   - Créez un utilisateur avec `/auth/signup`
   - Utilisez ces credentials dans le fichier `.env`

3. **Le backend s'authentifiera automatiquement** :
   - Lors de la première requête, le backend appellera `/auth/token` de l'API du chatbot
   - Le token sera mis en cache et réutilisé pour toutes les requêtes suivantes

### Option 2 : Mode Démo (Sans Authentification)

Si vous ne configurez pas les credentials, le backend utilisera un token de démo (`demo_token`). Cela fonctionne si l'API du chatbot accepte ce token en mode développement.

**Note** : Cette option peut ne pas fonctionner si l'API du chatbot exige une authentification stricte.

## 📋 Configuration Complète

Exemple de fichier `.env` complet :

```env
# MongoDB Atlas (si configuré)
MONGODB_URL=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=ai_platform_db

# Chatbot RAG API
CHATBOT_API_BASE_URL=http://localhost:8000/api/v1
CHATBOT_API_TIMEOUT=60

# Credentials pour l'API du chatbot (optionnel)
CHATBOT_API_USERNAME=user@example.com
CHATBOT_API_PASSWORD=password123

# Security
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🔍 Vérification

Pour vérifier que l'authentification fonctionne :

1. **Vérifier le statut** :
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:8000/api/chatbot/status" -Method GET
   ```

2. **Tester la création d'une conversation** :
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:8000/api/chatbot/test/conversations" `
     -Method POST -ContentType "application/json" -Body "{}"
   ```

3. **Vérifier les logs du backend** :
   - Si l'authentification échoue, vous verrez un warning dans les logs
   - Le backend utilisera alors le token de démo

## ⚠️ Important

- **URL de l'API** : Par défaut, l'API du chatbot est sur `http://localhost:8000/api/v1`
  - Si votre backend principal tourne aussi sur le port 8000, vous devez changer l'URL
  - Modifiez `CHATBOT_API_BASE_URL` dans `.env` pour pointer vers le bon port

- **Token en cache** : Le token est mis en cache pour éviter de s'authentifier à chaque requête
  - Si le token expire, le backend essaiera de se ré-authentifier automatiquement

- **Mode Démo** : Si les credentials ne sont pas configurés, le backend utilisera `demo_token`
  - Cela peut fonctionner si l'API du chatbot accepte ce token en développement
  - Pour la production, configurez toujours les credentials

## 🐛 Dépannage

### Erreur "Authentication failed"

1. Vérifiez que les credentials sont corrects dans `.env`
2. Vérifiez que l'utilisateur existe dans l'API du chatbot
3. Vérifiez que l'API du chatbot est accessible

### Erreur "Connection refused"

1. Vérifiez que l'API du chatbot est démarrée
2. Vérifiez l'URL dans `CHATBOT_API_BASE_URL`
3. Vérifiez que le port n'est pas déjà utilisé

### Le token ne fonctionne pas

1. Vérifiez les logs du backend pour voir si l'authentification a réussi
2. Essayez de vous authentifier manuellement avec l'API du chatbot
3. Vérifiez que le token n'a pas expiré

## 📝 Notes

- L'authentification est automatique si les credentials sont configurés
- Le token est mis en cache pour améliorer les performances
- Le mode démo fonctionne sans credentials mais peut avoir des limitations




