from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from account.models import Problem


User = get_user_model()

class Compile_Submission(models.Model):
    LANGUAGE_CHOICES = [
        ('python', 'Python'),
        ('java', 'Java'),
        ('cpp', 'C++'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='compiler_submissions')
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES)
    input_data = models.TextField(blank=True)
    output_data = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.language} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"

class SubmitSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submit_submissions')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='submissions')
    language = models.CharField(max_length=10, choices=Compile_Submission.LANGUAGE_CHOICES)
    code = models.TextField()
    passed_count = models.IntegerField(default=0)
    total_count = models.IntegerField(default=0)
    result = models.TextField(blank=True)  # e.g. "Passed 3/5 test cases"
    timestamp = models.DateTimeField(auto_now_add=True)
