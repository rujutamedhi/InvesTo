from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'madhurajangle2004@gmail.com'  
app.config['MAIL_PASSWORD'] = 'obyf xczb elyv ugsi'  
app.config['MAIL_DEFAULT_SENDER'] = 'madhurajangle2004@gmail.com'

mail = Mail(app)

# MongoDB Configuration
client = MongoClient("mongodb+srv://shravanipatil1427:Shweta2509@cluster0.hfdxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['Cluster0']
collaborations = db["collaborations"]
@app.route('/get-collaboration-requests', methods=['GET'])
def get_collaboration_requests():
    print("API Hit!")  # Debugging log
    receiver_email = request.args.get("email")
    if not receiver_email:
        return jsonify({"error": "Receiver email is required"}), 400

    requests = list(collaborations.find({"receiver_email": receiver_email}, {"_id": 0}))
    print("Requests:", requests)  # Debugging log
    return jsonify(requests), 200

@app.route('/send-collaboration-request', methods=['POST'])
def send_collaboration_request():
    data = request.json

    # Ensure both authorities sum up to 100
    if int(data["sender_authority"]) + int(data["receiver_authority"]) != 100:
        return jsonify({"error": "Sender and receiver authority must sum up to 100"}), 400

    # Store the request in MongoDB
    collaboration_data = {
        "sender_email": data["sender_email"],
        "receiver_email": data["receiver_email"],
        "sender_authority": int(data["sender_authority"]),
        "receiver_authority": int(data["receiver_authority"]),
        "message": data["message"],
        "status": "pending"  # Default status
    }

    collaborations.insert_one(collaboration_data)

    try:
        # Send email to the receiver
        msg = Message(
            subject="Collaboration Invitation",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[data['receiver_email']]
        )
        msg.body = f"""
        Hello,

        You have been invited to collaborate.

        Sender: {data['sender_email']}
        Sender's Authority: {data['sender_authority']}%
        Your Authority: {data['receiver_authority']}%

        Message: {data['message']}

        Please accept the invitation to proceed.

        Best regards,
        Collaboration Team
        """
        mail.send(msg)

        return jsonify({'message': 'Collaboration request sent and stored successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5006)
