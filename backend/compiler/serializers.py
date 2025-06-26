from rest_framework import serializers
from .models import Compile_Submission

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compile_Submission
        fields = ['id', 'user', 'language', 'input_data', 'output_data', 'timestamp']
        read_only_fields = ['id', 'user', 'output_data', 'timestamp']
