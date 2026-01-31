"""Script de diagnostic pour tester la connexion au chatbot"""
import asyncio
import httpx
from core.config import settings

async def test_connection():
    print("=== Diagnostic de la connexion au chatbot ===\n")
    print(f"Configuration:")
    print(f"  - CHATBOT_API_BASE_URL: {settings.CHATBOT_API_BASE_URL}")
    print(f"  - CHATBOT_API_USERNAME: {settings.CHATBOT_API_USERNAME}")
    print(f"  - CHATBOT_API_PASSWORD: {'*' * len(settings.CHATBOT_API_PASSWORD) if settings.CHATBOT_API_PASSWORD else 'None'}")
    print()
    
    # Test 1: Vérifier que l'API externe est accessible
    print("1. Test de connexion à l'API externe du chatbot...")
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(f"{settings.CHATBOT_API_BASE_URL.replace('/api/v1', '')}/")
            if response.status_code == 200:
                print("   [OK] API externe accessible")
            else:
                print(f"   [ERREUR] API externe retourne {response.status_code}")
    except httpx.ConnectError:
        print(f"   [ERREUR] Impossible de se connecter a {settings.CHATBOT_API_BASE_URL}")
        print("   [INFO] Verifiez que l'API du chatbot est demarree sur le port 8001")
        return
    except Exception as e:
        print(f"   [ERREUR] {e}")
        return
    
    # Test 2: Authentification
    print("\n2. Test d'authentification...")
    if settings.CHATBOT_API_USERNAME and settings.CHATBOT_API_PASSWORD:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{settings.CHATBOT_API_BASE_URL}/auth/token",
                    data={
                        "username": settings.CHATBOT_API_USERNAME,
                        "password": settings.CHATBOT_API_PASSWORD
                    },
                    headers={"Content-Type": "application/x-www-form-urlencoded"}
                )
                if response.status_code == 200:
                    token = response.json().get("access_token")
                    print("   [OK] Authentification reussie")
                    print(f"   Token obtenu: {token[:20]}...")
                    
                    # Test 3: Creer une conversation
                    print("\n3. Test de creation de conversation...")
                    headers = {"Authorization": f"Bearer {token}"}
                    response = await client.post(
                        f"{settings.CHATBOT_API_BASE_URL}/conversations/",
                        headers=headers,
                        json={}
                    )
                    if response.status_code == 200:
                        convo_id = response.json().get("convo_id")
                        print(f"   [OK] Conversation creee: {convo_id}")
                        
                        # Test 4: Poser une question
                        print("\n4. Test d'envoi de message...")
                        response = await client.post(
                            f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/ask",
                            headers=headers,
                            json={
                                "message": "Bonjour, test de connexion",
                                "settings": {
                                    "model": "llama-3.3-70b-versatile",
                                    "temperature": 0.2
                                }
                            }
                        )
                        if response.status_code == 200:
                            result = response.json()
                            answer = result.get("answer", "")
                            print(f"   [OK] Message envoye avec succes")
                            print(f"   Reponse: {answer[:100]}...")
                        else:
                            print(f"   [ERREUR] Erreur lors de l'envoi: {response.status_code}")
                            print(f"   Detail: {response.text}")
                    else:
                        print(f"   [ERREUR] Erreur lors de la creation: {response.status_code}")
                        print(f"   Detail: {response.text}")
                else:
                    print(f"   [ERREUR] Authentification echouee: {response.status_code}")
                    print(f"   Detail: {response.text}")
        except Exception as e:
            print(f"   [ERREUR] {e}")
    else:
        print("   [ATTENTION] Credentials non configures")
        print("   [INFO] Configurez CHATBOT_API_USERNAME et CHATBOT_API_PASSWORD")
    
    print("\n[OK] Diagnostic termine")

if __name__ == "__main__":
    asyncio.run(test_connection())

