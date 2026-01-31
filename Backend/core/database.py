from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database():
    if not settings.DATABASE_NAME:
        raise RuntimeError("DATABASE_NAME is not set in environment variables")
    return db.client[settings.DATABASE_NAME]

async def connect_to_mongo():
    try:
        print(f"Connecting to MongoDB at {settings.MONGODB_URL}...")

        db.client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000,
            uuidRepresentation="standard"
        )

        # Verify connection
        await db.client.admin.command("ping")

        print("Successfully connected to MongoDB Atlas")

    except Exception as e:
        print("MongoDB connection failed")
        print(f"Error: {e}")
        print("Checklist:")
        print("- MongoDB Atlas cluster is running")
        print("- IP is whitelisted (0.0.0.0/0)")
        print("- Username/password are correct")
        print("- Password is URL-encoded")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("MongoDB connection closed")
