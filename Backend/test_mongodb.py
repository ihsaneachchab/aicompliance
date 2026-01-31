"""
Script de test de connexion MongoDB Atlas
"""
import asyncio
import sys
from pathlib import Path

# Ajouter le répertoire parent au path
sys.path.insert(0, str(Path(__file__).parent))

from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings

async def test_mongodb_connection():
    """Tester la connexion à MongoDB Atlas"""
    print("=" * 60)
    print("TEST DE CONNEXION MONGODB ATLAS")
    print("=" * 60)
    print()
    
    print(f"URL MongoDB: {settings.MONGODB_URL[:50]}...")
    print(f"Database: {settings.DATABASE_NAME}")
    print()
    
    try:
        print("Tentative de connexion...")
        
        # Créer le client
        client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000,
            uuidRepresentation="standard"
        )
        
        # Tester la connexion
        await client.admin.command("ping")
        print("✅ Connexion réussie!")
        print()
        
        # Obtenir la base de données
        db = client[settings.DATABASE_NAME]
        
        # Lister les collections
        collections = await db.list_collection_names()
        print(f"Collections existantes ({len(collections)}):")
        for coll in collections:
            count = await db[coll].count_documents({})
            print(f"  - {coll}: {count} documents")
        print()
        
        # Tester l'insertion
        print("Test d'insertion...")
        test_collection = db.test_connection
        result = await test_collection.insert_one({
            "test": "connection_test",
            "timestamp": "2026-01-30"
        })
        print(f"✅ Document inséré avec ID: {result.inserted_id}")
        
        # Supprimer le document de test
        await test_collection.delete_one({"_id": result.inserted_id})
        print("✅ Document de test supprimé")
        print()
        
        # Fermer la connexion
        client.close()
        print("✅ Connexion fermée proprement")
        print()
        
        print("=" * 60)
        print("RÉSULTAT: MongoDB Atlas est correctement configuré! ✅")
        print("=" * 60)
        
        return True
        
    except Exception as e:
        print(f"❌ ERREUR: {e}")
        print()
        print("=" * 60)
        print("RÉSULTAT: Problème de connexion MongoDB ❌")
        print("=" * 60)
        print()
        print("Vérifications à faire:")
        print("1. Le cluster MongoDB Atlas est-il actif?")
        print("2. L'adresse IP est-elle autorisée (0.0.0.0/0)?")
        print("3. Le nom d'utilisateur et mot de passe sont-ils corrects?")
        print("4. Le mot de passe est-il correctement encodé dans l'URL?")
        print()
        
        return False

if __name__ == "__main__":
    result = asyncio.run(test_mongodb_connection())
    sys.exit(0 if result else 1)
