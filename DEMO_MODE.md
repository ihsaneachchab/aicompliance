# 🚀 Mode Démo - Accès Direct sans Authentification

Ce guide explique comment utiliser le mode démo pour tester l'application sans avoir besoin de se connecter ou de configurer MongoDB.

## ✨ Fonctionnalités

Le mode démo permet de :
- ✅ Accéder directement au dashboard
- ✅ Tester toutes les fonctionnalités de l'application
- ✅ Utiliser le chatbot (si l'API est configurée)
- ✅ Tester l'interface utilisateur complète
- ❌ **Sans** avoir besoin de MongoDB
- ❌ **Sans** avoir besoin de créer un compte

## 🎯 Comment utiliser le Mode Démo

### Méthode 1 : Depuis la page de connexion

1. **Démarrez le backend** :
   ```powershell
   cd Backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Démarrez le frontend** :
   ```powershell
   cd Frontend
   npm run dev
   ```

3. **Ouvrez l'application** :
   - Allez sur http://localhost:5173
   - Vous serez redirigé vers la page de connexion

4. **Cliquez sur le bouton "🚀 Mode Démo (Accès Direct)"** :
   - Le bouton est en bas du formulaire de connexion
   - Il a un fond dégradé violet-rose

5. **Vous serez automatiquement connecté** et redirigé vers le dashboard !

### Méthode 2 : Accès direct via URL

Si vous êtes déjà en mode démo, vous pouvez accéder directement aux pages :
- http://localhost:5173/dashboard
- http://localhost:5173/chat
- http://localhost:5173/analyse
- http://localhost:5173/generation
- etc.

## 👤 Utilisateur Démo

L'utilisateur de démo a les caractéristiques suivantes :
- **Email** : `demo@example.com`
- **Nom** : `Utilisateur Démo`
- **Rôle** : `Responsable Qualité`
- **Entreprise** : `Entreprise Démo`
- **Service** : `ISO 9001`

## 🔧 Fonctionnalités Disponibles en Mode Démo

### ✅ Fonctionnel
- **Dashboard** : Affichage complet avec KPIs
- **Chat Bot** : Interface fonctionnelle (si API chatbot configurée)
- **Analyse de Conformité** : Interface et simulation
- **Génération de Documents** : Interface et simulation
- **Gestion des Non-Conformités** : Interface Kanban/Liste
- **Bibliothèque** : Interface de navigation
- **Profil** : Affichage des informations de démo

### ⚠️ Limitations
- Les données ne sont **pas sauvegardées** dans MongoDB
- Les données sont stockées uniquement dans le **localStorage** du navigateur
- Les conversations du chatbot nécessitent l'API du chatbot (si configurée)
- L'authentification réelle ne fonctionne pas (pas de MongoDB)

## 🧪 Tester le Chatbot en Mode Démo

Pour tester le chatbot en mode démo :

1. **Assurez-vous que l'API du chatbot est démarrée** (si vous l'avez)
2. Allez dans **"Chat Bot"** depuis le menu
3. Cliquez sur **"Nouvelle conversation"**
4. Posez une question

**Note** : Si l'API du chatbot n'est pas configurée, vous verrez des erreurs, mais l'interface fonctionnera quand même.

## 🔄 Retour au Mode Normal

Pour revenir au mode normal avec authentification :

1. **Déconnectez-vous** (menu utilisateur → Déconnexion)
2. **Supprimez le localStorage** :
   - Ouvrez la console du navigateur (F12)
   - Tapez : `localStorage.clear()`
3. **Rechargez la page**

## 📝 Notes Techniques

### Backend
- Endpoint `/auth/demo/login` : Crée un token de démo
- Endpoint `/auth/demo/user` : Retourne l'utilisateur de démo
- Fonction `get_current_user_or_demo()` : Permet l'accès sans authentification réelle

### Frontend
- Fonction `Auth.demoLogin()` : Se connecte en mode démo
- Vérification d'authentification modifiée pour accepter le mode démo
- Données stockées dans `localStorage` avec la clé `currentUser`

## 🐛 Dépannage

### Le bouton "Mode Démo" ne fonctionne pas
1. Vérifiez que le backend est démarré
2. Vérifiez la console du navigateur (F12) pour les erreurs
3. Vérifiez que `app.js` est bien chargé

### Redirection vers /login en permanence
1. Vérifiez que `Auth.demoLogin()` a bien été appelée
2. Vérifiez le localStorage : `localStorage.getItem('currentUser')`
3. Rechargez la page après la connexion démo

### Les données ne persistent pas
- C'est normal ! Le mode démo utilise uniquement le localStorage
- Les données sont perdues si vous videz le cache du navigateur
- Pour une persistance réelle, configurez MongoDB et utilisez le mode normal

## ✅ Checklist de Test

- [ ] Backend démarré sur le port 8000
- [ ] Frontend démarré sur le port 5173
- [ ] Page de connexion accessible
- [ ] Bouton "Mode Démo" visible et fonctionnel
- [ ] Redirection vers le dashboard après clic
- [ ] Dashboard s'affiche correctement
- [ ] Menu latéral fonctionne
- [ ] Navigation entre les pages fonctionne
- [ ] Chat Bot accessible (interface)
- [ ] Autres pages accessibles

## 🎉 C'est tout !

Vous pouvez maintenant tester toutes les fonctionnalités de l'application sans avoir besoin de configurer MongoDB ou de créer un compte.

**Bon test !** 🚀




