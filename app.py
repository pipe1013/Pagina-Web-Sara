from flask import Flask, render_template, request, redirect, url_for, flash
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)

# Genera una clave secreta aleatoria
app.secret_key = os.urandom(24)

# Configuración del correo electrónico
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 465  # Usamos SSL
SMTP_USERNAME = 'felipemorenobuitrago506@gmail.com'
SMTP_PASSWORD = 'Monica1013F'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        question = request.form['question']
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']

        # Construir el mensaje
        subject = "Nueva pregunta desde el sitio web"
        message_body = f"""
        Has recibido una nueva pregunta.

        Pregunta: {question}
        Nombre: {name}
        Correo Electrónico: {email}
        Teléfono: {phone}
        """

        msg = MIMEText(message_body)
        msg['Subject'] = subject
        msg['From'] = email
        msg['To'] = SMTP_USERNAME

        try:
            # Conexión al servidor SMTP con SSL
            server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(email, SMTP_USERNAME, msg.as_string())
            server.quit()
            flash("Gracias por tu pregunta. Nos pondremos en contacto contigo pronto.", "success")
        except Exception as e:
            flash(f"Lo sentimos, hubo un error al enviar tu pregunta: {str(e)}", "danger")
        
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
