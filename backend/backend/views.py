from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import User
import requests
from django.contrib.auth.hashers import make_password

class SignupView(APIView):
    def post(self, request):
        data = request.data

        # Extract PAN & Aadhaar files from request (Temporary Processing)
        pan_card = request.FILES.get("pan_card")
        aadhaar_card = request.FILES.get("aadhaar_card")

        if not pan_card or not aadhaar_card:
            return Response({"message": "PAN and Aadhaar verification required"}, status=status.HTTP_400_BAD_REQUEST)

        # Gemini API for Document OCR (Temporary Processing)
        gemini_api_key = "IzaSyCK1CEVeImXWsT_VwXcHAW3G_YGhJAGWH8"
        headers = {"Authorization": f"Bearer {gemini_api_key}"}

        # PAN Card Verification (OCR Extraction)
        pan_response = requests.post(
            "https://gemini-api.com/extract_text",
            headers=headers,
            files={"file": pan_card}
        ).json()

        # Aadhaar Card Verification (OCR Extraction)
        aadhaar_response = requests.post(
            "https://gemini-api.com/extract_text",
            headers=headers,
            files={"file": aadhaar_card}
        ).json()

        # Extract names from PAN & Aadhaar
        extracted_pan_name = pan_response.get("name", "").strip()
        extracted_aadhaar_name = aadhaar_response.get("name", "").strip()
        entered_name = data.get("username", "").strip()

        # Name Matching Validation
        if entered_name.lower() != extracted_pan_name.lower() or entered_name.lower() != extracted_aadhaar_name.lower():
            return Response({"message": "Name mismatch! Registration denied."}, status=status.HTTP_400_BAD_REQUEST)

        # Hash password before storing
        data["password"] = make_password(data["password"])

        # Save user (Without storing documents)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
