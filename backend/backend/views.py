from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer, CollaborationRequestSerializer, JointAccountSerializer
from django.contrib.auth.hashers import check_password 
from .models import User, CollaborationRequest, JointAccount
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from bson.objectid import ObjectId
from pymongo import MongoClient
import json 
from django.core.serializers import serialize
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.views import View
import requests
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from bson.decimal128 import Decimal128
class LoginView(APIView):
    def post(self, request):
        print("reached")
        email = request.data.get('email')
        password = request.data.get('password')
        print(password)
        user = authenticate(request, username=email, password=password)
        print(user)

        if user is not None:
            serializer = UserSerializer(user)

            return JsonResponse({
                'message': 'Login successful',
                'email': user.email  
            }, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


FLASK_SERVER_URL = "http://127.0.0.1:5500/verify-documents" 

class SignupView(APIView):
    def post(self, request):
        data = request.data

        pan_card = request.FILES.get("pan_card")
        aadhaar_card = request.FILES.get("aadhaar_card")

        if not pan_card or not aadhaar_card:
            return Response({"message": "PAN and Aadhaar required"}, status=status.HTTP_400_BAD_REQUEST)
        files = {
            "pan_card": pan_card,
            "aadhaar_card": aadhaar_card
        }
        payload = {"username": data.get("username", "").strip()}

        try:
            response = requests.post(FLASK_SERVER_URL, files=files, data=payload)
            result = response.json()

            if response.status_code != 200 or result.get("status") != "verified":
                return Response({"message": "Verification failed. " + result.get("reason", "Unknown error")},
                                status=status.HTTP_400_BAD_REQUEST)
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
             user = serializer.save()
             print("User created successfully:", user)
             return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
            else :
              print("Signup Error:", serializer.errors)
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except requests.exceptions.RequestException as e:
            return Response({"error": "Flask server error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UserProfileView(APIView):
    def get(self, request, email):
        try:
            # Query the user from the database using the email
            user = User.objects.get(email=email)
            wallet_balance = str(user.wallet_balance) if isinstance(user.wallet_balance, Decimal128) else user.wallet_balance
            # Return user data as JSON
            return JsonResponse({
                'status': 'success',
                'message': f'Profile found for {email}',
                'data': {
                    'username': user.username,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    
                    'age': user.age,
                    
                    'city': user.city,
                    
                    'risk_profile': user.risk_profile,
                    'wallet_balance': wallet_balance,
                    'gender': user.gender,
                    
                    
                }
            })
            
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User not found.'})
        
        
    def patch(self, request, email):  # Add PATCH method
        user = User.objects.get(email=email)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        return Response(serializer.errors, status=400)
    


class BondsView(APIView):
    def get(self, request):
        response = requests.get(f"https://api.twelvedata.com/bonds?apikey=d1b4c902740849cebfe6d9a88b253800")
        return Response(response.json(), status=response.status_code)
    
    
from bson import ObjectId  # ✅ Import ObjectId for MongoDB compatibility


@csrf_exempt
def update_wallet(request, email):
    if request.method == "POST":  # ✅ Use POST to update wallet
        try:
            data = json.loads(request.body)
            new_balance = data.get("new_balance")

            if new_balance is None:
                return JsonResponse({"error": "New balance is required"}, status=400)

            print(f"Updating wallet for: {email}, New Balance: {new_balance}")  # ✅ Debugging

            # ✅ Use `get()` instead of `get_or_create()` to prevent new entry creation
            user = User.objects.filter(email=email).first()  # Gets the first matching user

            if user:
                print(f"User found. Updating balance...")  # ✅ Debugging
                user.wallet_balance = new_balance
                user.save()
            else:
                print(f"User not found. Creating new user...")  # ✅ Debugging
                user = User.objects.create(email=email, wallet_balance=new_balance)

                # ✅ Delete previous duplicate entries (if any exist)
                User.objects.filter(email=email).delete()

            return JsonResponse(
                {"message": "Wallet updated", "new_balance": user.wallet_balance},
                status=200
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except Exception as e:
            print(f"Error updating wallet: {e}")  # ✅ Debugging
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


class CollaborationRequestView(APIView):
    def post(self, request):
        sender_email = request.data.get("sender_email")
        receiver_email = request.data.get("receiver_email")
        sender_authority = request.data.get("sender_authority")
        receiver_authority = request.data.get("receiver_authority")
        
        # 🔹 Fetch sender and receiver using `id`, which corresponds to MongoDB `_id`
        sender = User.objects.filter(email=sender_email).first()
        receiver = User.objects.filter(email=receiver_email).first()

        print("Sender Object:", sender)
        print("Receiver Object:", receiver)

        if not sender or not receiver:
            return Response({"error": "Sender or Receiver not found"}, status=400)

        # ✅ Extract the `id` (MongoDB `_id`)
        sender_id = str(sender._id)  # Use `.id` instead of `._id`
        receiver_id = str(receiver._id)

        print("Sender ID:", sender_id)
        print("Receiver ID:", receiver_id)

        if not sender_id or not receiver_id:
            return Response({"error": "Invalid user IDs"}, status=400)

        # 🔹 Create CollaborationRequest using MongoDB `id`
        collab_request = CollaborationRequest.objects.create(
            sender_id=ObjectId(sender_id),  # ✅ Use MongoDB ObjectId
            receiver_id=ObjectId(receiver_id),
            sender_authority=sender_authority,
            receiver_authority=receiver_authority,
            status="pending"
        )

        return Response({
            "message": "Collaboration request sent successfully!",
            "request_id": str(collab_request.id)
        }, status=status.HTTP_201_CREATED)








class CollaborationAcceptView(APIView):
    """
    API to accept a collaboration request and create a joint account.
    """
    def post(self, request, request_id):
        try:
            collab_request = CollaborationRequest.objects.get(id=request_id)

            if collab_request.status != "pending":
                return Response({"error": "Request already processed"}, status=400)

            # Update status to accepted
            collab_request.status = "accepted"
            collab_request.save()

            # Create Joint Account
            joint_account = JointAccount.objects.create(
                user1=collab_request.sender,
                user2=collab_request.receiver,
                authority1=collab_request.sender_authority,
                authority2=collab_request.receiver_authority
            )

            return Response({
                "message": "Collaboration accepted, joint account created!",
                "joint_account_id": joint_account.id
            }, status=status.HTTP_201_CREATED)

        except CollaborationRequest.DoesNotExist:
            return Response({"error": "Request not found"}, status=404)


class CollaborationRejectView(APIView):
    """
    API to reject a collaboration request.
    """
    def post(self, request, request_id):
        try:
            collab_request = CollaborationRequest.objects.get(id=request_id)

            if collab_request.status != "pending":
                return Response({"error": "Request already processed"}, status=400)

            # Update status to rejected
            collab_request.status = "rejected"
            collab_request.save()

            return Response({"message": "Collaboration request rejected"}, status=status.HTTP_200_OK)

        except CollaborationRequest.DoesNotExist:
            return Response({"error": "Request not found"}, status=404)


class CollaborationListView(APIView):
    """
    API to list pending collaboration requests for a user.
    """
    def get(self, request, user_email):
        user = get_object_or_404(User, email=user_email)
        requests = CollaborationRequest.objects.filter(receiver=user, status="pending")
        serializer = CollaborationRequestSerializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)