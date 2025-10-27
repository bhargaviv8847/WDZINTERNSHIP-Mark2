from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from courses.models import Course       # ✅ Absolute import
from courses.serializers import CourseSerializer  # ✅ Absolute import

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('-id')
    serializer_class = CourseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.AllowAny]
permission_classes = [permissions.IsAuthenticated] 