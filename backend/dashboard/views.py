from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from account.models import UserExtension,Problem
from .serializers import ProblemSerializer,ProblemViewSerializer
from django.shortcuts import get_object_or_404


# Create your views here.


class CreateProblemView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request):
        try:
            user_extension=UserExtension.objects.get(user=request.user)
            if user_extension.role !='admin':
                return Response(
                    {"error":"Only admins can create problems"},
                    status=status.HTTP_403_FORBIDDEN
                )
        except UserExtension.DoesNotExist:
            return Response(
                {"error": "User extension not found"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer=ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




class ProblemListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            user_extension = user.extension  # via related_name='extension'
        except UserExtension.DoesNotExist:
            return Response({"detail": "User extension not found."}, status=status.HTTP_403_FORBIDDEN)

        if user_extension.role != 'admin':
            return Response({"detail": "You are not authorized to view this resource."}, status=status.HTTP_403_FORBIDDEN)

        problems = Problem.objects.all()
        serializer = ProblemViewSerializer(problems, many=True)
        return Response(serializer.data)