from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model

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
