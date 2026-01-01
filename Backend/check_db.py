
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check():
    uri = "mongodb://localhost:27017"
    print(f"Attempting to connect to {uri}...")
    try:
        client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=2000)
        await client.admin.command('ping')
        print("✅ SUCCESS: MongoDB is running and accessible!")
    except Exception as e:
        print("❌ FAILURE: Could not connect to MongoDB.")
        print(f"Error details: {e}")
        print("\nPossible causes:")
        print("1. MongoDB is NOT installed.")
        print("2. MongoDB service is NOT running.")
        print("3. MongoDB is running on a different port (not 27017).")

if __name__ == "__main__":
    asyncio.run(check())
