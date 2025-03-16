from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password 
from .models import User
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