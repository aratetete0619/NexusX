import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_confirmation_email(user_email, confirmation_code):
    try:
        smtp_server = os.getenv("SMTP_SERVER")
        smtp_port = os.getenv("SMTP_PORT")
        smtp_username = os.getenv("SMTP_USERNAME")
        smtp_password = os.getenv("SMTP_PASSWORD")
        from_email = os.getenv("FROM_EMAIL")

        subject = "Confirm your email"
        # Note the change in the URL here
        body = f"""
        Dear User,

        Please confirm your email by clicking on the following link:

        http://localhost:3000/confirm/{confirmation_code}

        If you did not request this confirmation, no further action is required.

        Best Regards,
        Your Awesome App
        """

        # Create a multipart message
        msg = MIMEMultipart()
        msg["From"] = from_email
        msg["To"] = user_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        # Connect to the server and send the message
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        text = msg.as_string()
        server.sendmail(from_email, user_email, text)
        server.quit()
    except Exception as e:
        raise Exception(f"Failed to send confirmation email: {str(e)}")
