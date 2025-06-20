from django.contrib import admin
from account.models import UserExtension,Problem,Submission,TestCase
# Register your models here.
admin.site.register(UserExtension)
admin.site.register(Problem)
admin.site.register(Submission)
admin.site.register(TestCase)