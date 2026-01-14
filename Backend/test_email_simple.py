import asyncio
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from core.config import settings

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

async def test_email():
    print("--- Configuration Check ---")
    print(f"Server: {settings.MAIL_SERVER}:{settings.MAIL_PORT}")
    print(f"User: {settings.MAIL_USERNAME}")
    print(f"From: {settings.MAIL_FROM}")
    # Mask password
    pwd_len = len(settings.MAIL_PASSWORD) if settings.MAIL_PASSWORD else 0
    print(f"Password: {'*' * pwd_len} (Length: {pwd_len})")
    print("---------------------------")

    try:
        if not settings.MAIL_USERNAME or "@" not in settings.MAIL_USERNAME:
             print(f"ERROR: Invalid MAIL_USERNAME: '{settings.MAIL_USERNAME}'")
             return

        message = MessageSchema(
            subject="Test Email from AI Platform",
            recipients=[settings.MAIL_USERNAME], # Send to self
            body="If you see this, email configuration is workings!",
            subtype=MessageType.html
        )
    except Exception as e:
         print(f"ERROR: Failed to create MessageSchema: {e}")
         return

    fm = FastMail(conf)
    try:
        print("Attempting to send email...")
        await fm.send_message(message)
        print("✅ SUCCESS: Email sent successfully!")
    except Exception as e:
        print("❌ FAILURE: Could not send email.")
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_email())
