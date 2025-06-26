from rest_framework import serializers
from account.models import Problem  # Import your Problem model


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model =Problem
        fields = [
            'problem_statement', 
            'problem_category', 
            'difficulty',
            'examples',  # <--- NEW FIELD
        ]


class ProblemViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['problem_statement', 'problem_category', 'difficulty']
