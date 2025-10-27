from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=50, default="3 Months")
    level = models.CharField(max_length=50, default="Beginner")
    rating = models.FloatField(default=4.5)

    def __str__(self):
        return self.title
