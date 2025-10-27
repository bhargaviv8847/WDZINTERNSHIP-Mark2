from rest_framework import serializers
from courses.models import Course   # ✅ Absolute import

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
