import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from core.config import settings

# Re-define conf to avoid import issues with relative paths if running as script
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=settings.USE_CREDENTIALS,
    VALIDATE_CERTS=settings.VALIDATE_CERTS
)

async def resend_email(email_addr):
    # 1. Connect to DB
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.DATABASE_NAME]
    
    # 2. Find User
    print(f"Looking for user {email_addr}...")
    user = await db["users"].find_one({"email": email_addr})
    
    if not user:
        print("❌ User not found!")
        return

    if user.get("is_active"):
        print("⚠️ User is already active!")
        return

    token = user.get("verification_token")
    if not token:
        print("❌ No verification token found on user!")
        return

    # 3. Send Email
    print(f"Found token: {token}")
    print(f"Sending email to {email_addr}...")
    
    html = f"""
    <h3>Verify your email (Resent)</h3>
    <p>You requested a new verification link.</p>
    <a href="http://localhost:8000/auth/verify/{token}">Verify Email</a>
    """

    message = MessageSchema(
        subject="Resent Verification Link",
        recipients=[email_addr],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        print("✅ Email sent successfully!")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

if __name__ == "__main__":
    import sys
    target_email = "sabikelkhayr@gmail.com"
    asyncio.run(resend_email(target_email))
