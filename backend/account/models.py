from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Problem(models.Model):
    CATEGORY_CHOICES = [
        ('arr', 'Arrays'),
        ('matrix', 'Matrix'),
        ('math', 'Mathematics'),
        ('dp', 'Dynamic programming'),
        ('graph', 'Graphs'),
    ]
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    problem_statement = models.TextField()
    problem_category=models.CharField(max_length=50,choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    examples = models.JSONField(default=list, blank=True) 
    def __str__(self):
        return f"{self.problem_statement[:50]}..."  
    

class UserExtension(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='extension')
    college_name = models.CharField(max_length=255, blank=True)
    # cant find the error where this filed i getting all the questions default 
    solved_questions = models.ManyToManyField(Problem, blank=True, related_name='solved_by')
    solved_problems = models.ManyToManyField(Problem, blank=True, related_name='solved_by_single')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.user.username}'s extension"
    

    
class TestCase(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='test_cases')
    input = models.TextField(help_text="Input data for the test case")
    correct_output = models.TextField(help_text="Expected output for the test case")

    def __str__(self):
        return f"Test case for Problem #{self.problem.id}"





