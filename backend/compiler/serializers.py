from rest_framework import serializers
from .models import Compile_Submission,SubmitSubmission
from account.models import TestCase

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compile_Submission
        fields = ['id', 'user', 'language', 'input_data', 'output_data', 'timestamp']
        read_only_fields = ['id', 'user', 'output_data', 'timestamp']

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ['id', 'input', 'correct_output']
class SubmitSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmitSubmission
        fields = [
            'id',
            'user',
            'problem',
            'language',
            'code',
            'passed_count',
            'total_count',
            'result',
            'timestamp'
        ]
        read_only_fields = ['id', 'user', 'problem', 'passed_count', 'total_count', 'result', 'timestamp']
