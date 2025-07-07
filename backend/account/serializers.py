from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserExtension,Problem
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    college_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'college_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        college_name = validated_data.pop('college_name')
        user = User.objects.create_user(**validated_data)
        UserExtension.objects.create(user=user, college_name=college_name)
        return user
    
    # def to_representation(self, instance):
    #     rep = super().to_representation(instance)
    #     rep['college_name'] = instance.extension.college_name  # Access via OneToOne relationship
    #     return rep




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")
    


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id','problem_statement', 'problem_category', 'difficulty']


class LeaderboardUserSerializer(serializers.ModelSerializer):
    solved_questions_count = serializers.IntegerField()
    college_name = serializers.CharField(source='extension.college_name')

    class Meta:
        model = User
        fields = ['username', 'college_name', 'solved_questions_count']
