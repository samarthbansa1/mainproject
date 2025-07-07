from django.urls import path
from .views import RegisterView,LoginView,ProfileView,ProblemsView,ProblemDetailView,LogoutAPIView,LeaderboardView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    
    path('api/auth/reg/', RegisterView.as_view(), name='register'),
    #login and gettint the the token 
    path('api/auth/login/', LoginView.as_view(), name='login'),
    #refreshing the token
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #validation for profile 
    path('api/auth/profile/', ProfileView.as_view(), name='profile'),
    #validation then send problem list
    path('api/auth/problems/', ProblemsView.as_view(), name='problems'),
    #speicific problem 
    path('api/auth/problems/<int:p_id>/', ProblemDetailView.as_view(), name='problem-detail'),
    #logout url
    path('api/auth/logout/', LogoutAPIView.as_view(), name='logout'),
    #leaderboard
    path('api/auth/leaderboard/', LeaderboardView.as_view(), name='leaderboard'),



]
