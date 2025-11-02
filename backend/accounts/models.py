from django.contrib.auth.models import AbstractUser
from django.db import models
class User(AbstractUser):
    def __str__(self):
        return self.username
class Account(models.Model):   
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text="Duration in hours")

    def __str__(self):
        return self.title

def upload_video_path(instance, filename):
    return f'videos/{instance.title}/{filename}'


class Video(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    video_file = models.FileField(upload_to=upload_video_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
