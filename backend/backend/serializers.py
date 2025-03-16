from rest_framework import serializers
from .models import User, CollaborationRequest, JointAccount
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError
from pymongo import MongoClient
from bson import ObjectId


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone_number', 'gender', 'age', 'city', 'risk_profile', 'wallet_balance']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password) 
        user.save()
        return user

class CollaborationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollaborationRequest
        fields = '__all__'


class JointAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = JointAccount
        fields = '_all_'