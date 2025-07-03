from django.contrib import admin
from account.models import UserExtension,Problem,TestCase
# Register your models here.
admin.site.register(UserExtension)
admin.site.register(Problem)

admin.site.register(TestCase)