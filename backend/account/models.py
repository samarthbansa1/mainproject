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
    answer_code=models.TextField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    def __str__(self):
        return f"{self.problem_statement[:50]}..."  
    

class UserExtension(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='extension')
    college_name = models.CharField(max_length=255, blank=True)
    solved_questions = models.ManyToManyField(Problem, blank=True, related_name='solved_by')

    def __str__(self):
        return f"{self.user.username}'s extension"
    

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    problem = models.ForeignKey('Problem', on_delete=models.CASCADE, related_name='submissions')
    verdict = models.BooleanField()  # True for 'yes' (correct), False for 'no' (incorrect)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission by {self.user.username} for {self.problem.id} - {'Accepted' if self.verdict else 'Rejected'}"
    
class TestCase(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='test_cases')
    input = models.TextField(help_text="Input data for the test case")
    correct_output = models.TextField(help_text="Expected output for the test case")

    def __str__(self):
        return f"Test case for Problem #{self.problem.id}"





