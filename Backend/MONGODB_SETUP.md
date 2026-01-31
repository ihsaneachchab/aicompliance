# Configuration MongoDB Atlas - Guide Complet

## 📋 Étapes pour finaliser la configuration

### 1. Obtenir la chaîne de connexion

1. Dans MongoDB Atlas, cliquez sur **"Connect"** à côté de votre cluster
2. Choisissez **"Connect your application"**
3. Sélectionnez **"Python"** et version **"3.6 or later"**
4. **Copiez la chaîne de connexion** qui ressemble à :
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 2. Créer un utilisateur de base de données

1. Dans le menu de gauche, cliquez sur **"Database Access"**
2. Cliquez sur **"Add New Database User"**
3. Choisissez **"Password"** comme méthode d'authentification
4. Entrez un **nom d'utilisateur** (ex: `aicompliance_user`)
5. **Générez un mot de passe** (ou créez-en un) et **COPIEZ-LE** (vous ne pourrez plus le voir après)
6. Donnez les privilèges **"Atlas admin"** ou **"Read and write to any database"**
7. Cliquez sur **"Add User"**

### 3. Configurer l'accès réseau

1. Dans le menu de gauche, cliquez sur **"Network Access"**
2. Cliquez sur **"Add IP Address"**
3. Pour le développement, cliquez sur **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ **Note** : En production, ajoutez uniquement votre IP spécifique
4. Cliquez sur **"Confirm"**

### 4. Créer le fichier .env

1. Dans le dossier `Backend/`, créez un fichier nommé `.env`
2. Copiez le contenu suivant et remplacez les valeurs :

```env
# MongoDB Atlas Connection
# Remplacez USERNAME par votre nom d'utilisateur MongoDB
# Remplacez PASSWORD par votre mot de passe MongoDB
# Remplacez cluster0.xxxxx.mongodb.net par votre URL de cluster
MONGODB_URL=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=ai_platform_db

# Security
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email Configuration (optionnel)
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_password
MAIL_FROM=your_email@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
USE_CREDENTIALS=True
VALIDATE_CERTS=True

# Chatbot RAG API
CHATBOT_API_BASE_URL=http://localhost:8000/api/v1
CHATBOT_API_TIMEOUT=60
```

**Exemple concret** :
```env
MONGODB_URL=mongodb+srv://aicompliance_user:MonMotDePasse123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=ai_platform_db
```

### 5. Tester la connexion

Exécutez le script de test :

```powershell
cd Backend
python check_db.py
```

**Résultat attendu** :
```
Attempting to connect to mongodb+srv://...
✅ SUCCESS: MongoDB Atlas is running and accessible!
✅ Connected to database: ai_platform_db
```

## ⚠️ Points importants

1. **Ne partagez JAMAIS** votre fichier `.env` (il contient vos mots de passe)
2. Le fichier `.env` doit être dans le dossier `Backend/` (pas `Backend/Backend/`)
3. **Pas d'espaces** autour du `=` dans le fichier `.env`
4. L'URL doit commencer par `mongodb+srv://` (pas `mongodb://`)
5. Remplacez `<username>` et `<password>` dans l'URL par vos vrais identifiants

## 🔍 Dépannage

### Erreur "Authentication failed"
- Vérifiez que le nom d'utilisateur et le mot de passe sont corrects
- Vérifiez qu'il n'y a pas d'espaces dans l'URL
- Assurez-vous que l'utilisateur a été créé dans "Database Access"

### Erreur "No servers found"
- Vérifiez que l'accès réseau est configuré ("Network Access")
- Vérifiez que votre IP est autorisée (ou utilisez "Allow Access from Anywhere" pour le dev)

### Erreur "Connection timeout"
- Vérifiez votre connexion internet
- Vérifiez que le cluster est actif (pas en pause)
- Vérifiez l'URL de connexion

## ✅ Checklist

- [ ] Cluster créé dans MongoDB Atlas
- [ ] Utilisateur de base de données créé
- [ ] Accès réseau configuré (IP autorisée)
- [ ] Chaîne de connexion obtenue
- [ ] Fichier `.env` créé avec la bonne URL
- [ ] Test de connexion réussi (`python check_db.py`)

Une fois toutes ces étapes terminées, votre application pourra se connecter à MongoDB Atlas !




