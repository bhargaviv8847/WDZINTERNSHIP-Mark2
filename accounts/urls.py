# backend/urls.py
from django.urls import path, re_path
from django.contrib import admin
from accounts import views
from .views import FrontendAppView,CourseViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),

    # Catch all other paths and serve React frontend
    re_path(r'^.*$', FrontendAppView.as_view(), name='frontend'),
    path('', include(router.urls)),
]
