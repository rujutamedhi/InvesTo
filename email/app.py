from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Update with frontend URL

# Flask-Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'madhurajangle2004@gmail.com'  
app.config['MAIL_PASSWORD'] = 'obyf xczb elyv ugsi'  # Use an app password
app.config['MAIL_DEFAULT_SENDER'] = 'madhurajangle2004@gmail.com'

mail = Mail(app)

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    try:
        msg = Message(
            subject="Collaboration Invitation",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[data['email']]
        )
        msg.body = f"""
        Hello {data['username']},

        You have been invited to collaborate with a partner.

        Your Authority: {data['authority']}%
        Partner's Authority: {100 - int(data['authority'])}%

        Please accept the invitation to proceed.

        Best regards,
        Collaboration Team
        """
        mail.send(msg)

        return jsonify({'message': 'Collaboration invite sent successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/application-email', methods=['POST'])
def application_email():
    data = request.json
    recipient_email = data.get('email')
    
    try:
        msg = Message('Application Submitted', recipients=[recipient_email])
        msg.body = "Your application has been submitted successfully. We will contact you soon."
        mail.send(msg)

        return jsonify({'message': 'Confirmation email sent!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5006)
