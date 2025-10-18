from django.contrib import admin
from django.urls import path
from accounts import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.welcome, name='home'),  # 👈 This makes "/" the home page
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
]
