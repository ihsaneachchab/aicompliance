from typing import List
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
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

async def send_verification_email(email: EmailStr, token: str):
    html = f"""
    <h3>Verify your email</h3>
    <p>Thanks for registering. Please click the link below to verify your email:</p>
    <a href="http://localhost:8000/auth/verify/{token}">Verify Email</a>
    """

    message = MessageSchema(
        subject="Account Verification",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        print(f"Verification email sent to {email}")
    except Exception as e:
        print(f"Failed to send email to {email}: {e}")
        print("="*50)
        print(f"VERIFICATION LINK (DEV MODE): http://localhost:8000/auth/verify/{token}")
        print("="*50)
