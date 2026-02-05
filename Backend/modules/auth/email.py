from typing import List
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from core.config import settings

conf = ConnectionConfig(
    MAIL_USERNAME=settings.SMTP_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=settings.USE_CREDENTIALS,
    VALIDATE_CERTS=settings.VALIDATE_CERTS
)

def get_verification_email_template(token: str, base_url: str = "http://localhost:8000") -> str:
    """Generate a professional HTML email template for email verification"""
    verification_url = f"{base_url}/auth/verify/{token}"
    
    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Welcome!</h1>
                            </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                            <td style="padding: 40px;">
                                <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                                <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                    Thanks for signing up! We're excited to have you on board. To complete your registration and activate your account, please verify your email address by clicking the button below.
                                </p>
                                
                                <!-- CTA Button -->
                                <table role="presentation" style="margin: 30px 0;">
                                    <tr>
                                        <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                            <a href="{verification_url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                                                Verify Email Address
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                    Or copy and paste this link into your browser:
                                </p>
                                <p style="margin: 10px 0 0 0; color: #667eea; font-size: 14px; word-break: break-all;">
                                    {verification_url}
                                </p>
                                
                                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eeeeee;">
                                
                                <p style="margin: 0; color: #999999; font-size: 13px; line-height: 1.6;">
                                    If you didn't create an account with us, you can safely ignore this email.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 40px; background-color: #f8f8f8; border-radius: 0 0 8px 8px; text-align: center;">
                                <p style="margin: 0; color: #999999; font-size: 12px;">
                                    © 2024 Your Company. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    return html


async def send_verification_email(email: EmailStr, token: str):
    """Send verification email to the user"""
    # Get base URL from settings or use default
    base_url = getattr(settings, 'BASE_URL', 'http://localhost:8000')
    
    html = get_verification_email_template(token, base_url)

    message = MessageSchema(
        subject="Verify Your Email Address - Action Required",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    
    try:
        await fm.send_message(message)
        print(f"✓ Verification email sent successfully to {email}")
        return True
    except Exception as e:
        print(f"✗ Failed to send email to {email}")
        print(f"Error details: {str(e)}")
        print("=" * 70)
        print("DEVELOPMENT MODE - VERIFICATION LINK:")
        print(f"{base_url}/auth/verify/{token}")
        print("=" * 70)
        # Re-raise in production, or handle as needed
        if getattr(settings, 'ENVIRONMENT', 'development') == 'production':
            raise
        return False


async def send_welcome_email(email: EmailStr, username: str):
    """Send a welcome email after successful verification"""
    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <tr>
                            <td style="padding: 40px; text-align: center;">
                                <h1 style="margin: 0 0 20px 0; color: #667eea; font-size: 32px; font-weight: 600;">🎉 Welcome, {username}!</h1>
                                <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                    Your email has been verified successfully. You're all set to start using our platform!
                                </p>
                                <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                    If you have any questions, feel free to reach out to our support team.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Welcome to Our Platform! 🎉",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )
    
    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        print(f"✓ Welcome email sent to {email}")
        return True
    except Exception as e:
        print(f"✗ Failed to send welcome email: {str(e)}")
        return False