from djongo import models
from django.core.validators import RegexValidator
from django.core.validators import FileExtensionValidator
from django.contrib.auth.hashers import make_password
from django.utils.timezone import now 
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.timezone import now
from django.conf import settings
from pymongo import MongoClient
from bson import ObjectId

from bson.objectid import ObjectId

def generate_object_id():
    return str(ObjectId())

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=10,
        validators=[RegexValidator(r'^[7-9][0-9]{9}$', message="Phone number must start with 7-9 and have 10 digits.")]
    )
    age=models.IntegerField(default=0)
    city=models.CharField(max_length=50,default='')
    gender = models.CharField(max_length=25)
    risk_profile = models.CharField(max_length=20, choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')])
    wallet_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00) 

   
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.username
    

