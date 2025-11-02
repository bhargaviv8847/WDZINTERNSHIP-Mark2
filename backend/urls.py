from django.contrib import admin
from django.urls import path
from accounts import views  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),

    path('upload/', views.VideoUploadView.as_view(), name='video-upload'),
    path('videos/', views.VideoListView.as_view(), name='video-list'),
]
