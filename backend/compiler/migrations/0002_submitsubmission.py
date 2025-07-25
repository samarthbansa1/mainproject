# Generated by Django 5.2.3 on 2025-07-03 10:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0005_delete_submission"),
        ("compiler", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="SubmitSubmission",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "language",
                    models.CharField(
                        choices=[
                            ("python", "Python"),
                            ("java", "Java"),
                            ("cpp", "C++"),
                        ],
                        max_length=10,
                    ),
                ),
                ("code", models.TextField()),
                ("passed_count", models.IntegerField(default=0)),
                ("total_count", models.IntegerField(default=0)),
                ("result", models.TextField(blank=True)),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                (
                    "problem",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="submissions",
                        to="account.problem",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="submit_submissions",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
