from django.urls import path
from .views import RegisterView,UserLoginView

urlpatterns = [
    path('api/auth/reg/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', UserLoginView.as_view(), name='login'),

]
