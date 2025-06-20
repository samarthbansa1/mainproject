from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserExtension

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
