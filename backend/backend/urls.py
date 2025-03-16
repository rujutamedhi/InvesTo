"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import SignupView, LoginView, CollaborationRequestView, UserProfileView, update_wallet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/login', LoginView.as_view(), name='login'),
    path('api/user/signup', SignupView.as_view(), name='signup'),
    path('api/collaboration-request/', CollaborationRequestView.as_view(), name='collaboration-request'),
    path('api/user/profile/<str:email>', UserProfileView.as_view(), name='user-profile'),
    path("api/user/update-wallet/<str:email>", update_wallet, name="update-wallet"),
]
