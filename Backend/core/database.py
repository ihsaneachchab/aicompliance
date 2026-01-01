from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database():
    if not settings.DATABASE_NAME:
         print("CRITICAL ERROR: DATABASE_NAME not set in settings!")
    return db.client[settings.DATABASE_NAME]

async def connect_to_mongo():
    try:
        print(f"Connecting to MongoDB at {settings.MONGODB_URL}...")
        # Add serverSelectionTimeoutMS to fail faster if no DB
        db.client = AsyncIOMotorClient(settings.MONGODB_URL, serverSelectionTimeoutMS=5000)
        
        # Trigger a command to verify connection
        await db.client.admin.command('ping')
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(f"ERROR: Could not connect to MongoDB. Error: {e}")
        print("SUGGESTION: confirm that your local MongoDB server is running (usually on port 27017).")

async def close_mongo_connection():
    db.client.close()
    print("Closed MongoDB connection")
