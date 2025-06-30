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
        data=serializer.data

        for i , problem in enumerate(problems):
            data[i]['id']=problem.id
        return Response(serializer.data)
    

class ProblemDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, p_id):
        user=request.user
        try:
            user_extension=user.extension
        except UserExtension.DoesNotExist:
            return Response({"detail": "User extension not found."}, status=status.HTTP_403_FORBIDDEN)
        if user_extension.role!='admin':
            return Response({"detail": "You are not authorized to view this resource."}, status=status.HTTP_403_FORBIDDEN)
        try:
            problem = Problem.objects.get(id=p_id)
        except Problem.DoesNotExist:
            return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProblemSerializer(problem)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, p_id):
        try:
            problem = Problem.objects.get(id=p_id)
        except Problem.DoesNotExist:
            return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user is admin
        try:
            user_extension = UserExtension.objects.get(user=request.user)
            if user_extension.role != 'admin':
                return Response({"error": "Only admins can update problems"}, status=status.HTTP_403_FORBIDDEN)
        except UserExtension.DoesNotExist:
            return Response({"error": "User extension not found"}, status=status.HTTP_403_FORBIDDEN)

        serializer = ProblemSerializer(problem, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, p_id):
        try:
            problem = Problem.objects.get(id=p_id)
        except Problem.DoesNotExist:
            return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user is admin
        try:
            user_extension = UserExtension.objects.get(user=request.user)
            if user_extension.role != 'admin':
                return Response({"error": "Only admins can delete problems"}, status=status.HTTP_403_FORBIDDEN)
        except UserExtension.DoesNotExist:
            return Response({"error": "User extension not found"}, status=status.HTTP_403_FORBIDDEN)

        problem.delete()
        return Response({'message': 'Problem deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
