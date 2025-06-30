# For user registration/login and JWT token handling
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Problem
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken,TokenError

from .serializers import RegisterSerializer, LoginSerializer,ProblemSerializer

# Create your views here.


class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # Allow anyone to register
    def post(self, request):
                # Check if username already exists
        if User.objects.filter(username=request.data.get('username')).exists():
            return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "user":{
                "username":user.username,
                "college_name":user.extension.college_name
            },
            "tokens":{
                "refresh":str(refresh),
                "access":str(refresh.access_token),
            }
        },status=status.HTTP_201_CREATED)



class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "username": user.username,
                "email": user.email,
                "college_name": user.extension.college_name  # From UserExtension model
            },
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        }, status=status.HTTP_200_OK)



class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            college_name = user.extension.college_name  # Assuming OneToOne field 'extension'
        except Exception:
            college_name = None

        return Response({
            "validated": True,
            "username": user.username,
            "college_name": college_name
        }, status=status.HTTP_200_OK)


class ProblemsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # All problems
        problems = Problem.objects.all()
        serializer = ProblemSerializer(problems, many=True)

        # Solved problems for this user
        try:
            user_extension = request.user.extension
            solved_problems = user_extension.solved_questions.all()
            solved_ids = [problem.id for problem in solved_problems]
        except UserExtension.DoesNotExist:
            # If user extension not found, fallback to empty list
            solved_ids = []

        return Response({
            "problems": serializer.data,
            "solved_problem_ids": solved_ids
        })


class ProblemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, p_id):
        problem = get_object_or_404(Problem, id=p_id)

        serializer = ProblemSerializer(problem)

        # Default solved = False
        solved = False
        try:
            user_extension = request.user.extension
            if user_extension.solved_questions.filter(id=problem.id).exists():
                solved = True
        except UserExtension.DoesNotExist:
            solved = False

        # Convert to dict and add solved
        data = serializer.data
        data['solved'] = solved

        return Response(data)



class LogoutAPIView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except (KeyError, TokenError):
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)