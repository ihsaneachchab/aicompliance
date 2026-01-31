# Diagnostic MongoDB Atlas - Problème de Connexion

## ⚠️ Problème Détecté

**Erreur:** `WinError 10054 - Une connexion existante a dû être fermée par l'hôte distant`

**Cause probable:** 
- Firewall Windows bloque la connexion
- Antivirus bloque les requêtes DNS
- Serveur DNS local (192.168.11.1) ne peut pas résoudre l'adresse MongoDB Atlas

## 🔧 Solutions

### Option 1: Vérifier MongoDB Atlas (⭐ Recommandé)

1. Connectez-vous à https://cloud.mongodb.com
2. Allez dans **"Network Access"** (dans le menu de gauche)
3. Vérifiez que `0.0.0.0/0` est dans la liste des IPs autorisées
4. Si non présent:
   - Cliquez sur **"Add IP Address"**
   - Sélectionnez **"Allow Access from Anywhere"**
   - Confirmez

### Option 2: Changer le DNS

Le serveur DNS actuel (192.168.11.1) semble avoir des problèmes.

**Essayer avec un DNS public:**
- **Google DNS:** 8.8.8.8 et 8.8.4.4
- **Cloudflare DNS:** 1.1.1.1 et 1.0.0.1

**Comment changer:**
1. Panneau de configuration → Réseau et Internet → Centre Réseau
2. Cliquer sur votre connexion active
3. Propriétés → IPv4 → Propriétés
4. Utiliser les serveurs DNS suivants: `8.8.8.8` et `8.8.4.4`

### Option 3: Vérifier le Firewall

**Désactiver temporairement pour tester:**
1. Panneau de configuration → Pare-feu Windows Defender
2. Activer ou désactiver le Pare-feu
3. Désactiver temporairement
4. Tester la connexion
5. **Important:** Réactiver après le test!

### Option 4: Utiliser l'URL MongoDB standard

Si le problème persiste, essayez d'utiliser l'URL standard au lieu de SRV:

**Actuel (SRV):**
```
mongodb+srv://jijo84162_db_user:moNGO12.@cluster0.9ctagdw.mongodb.net/?appName=Cluster0
```

**Alternative (Standard):**
```
mongodb://jijo84162_db_user:moNGO12.@cluster0-shard-00-00.9ctagdw.mongodb.net:27017,cluster0-shard-00-01.9ctagdw.mongodb.net:27017,cluster0-shard-00-02.9ctagdw.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin
```

(Vous pouvez obtenir l'URL complète depuis MongoDB Atlas → Connect → Connect your application)

## ❓ Questions

1. **Avez-vous déjà réussi à vous connecter à ce cluster depuis cette machine?**
2. **Le chatbot fonctionne-t-il actuellement?** (Il utilise aussi MongoDB Atlas)
3. **Êtes-vous derrière un proxy d'entreprise ou un VPN?**

## 🧪 Test Rapide

Une fois le problème résolu, testez avec:

```bash
cd Backend
python test_mongodb.py
```

Si ça fonctionne, vous verrez:
```
✅ Connexion réussie!
✅ MongoDB Atlas est correctement configuré!
```

## 📝 Note

Le module d'analyse ISO 9001 peut fonctionner **sans MongoDB** pour les tests initiaux. MongoDB est utilisé uniquement pour sauvegarder l'historique des analyses. L'analyse elle-même utilise ChromaDB (local) et Groq API.
