from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import Course
from .serializers import CourseSerializer
import json

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

User = get_user_model()


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            # Check if username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'Username already exists'}, status=400)

            # Create the user
            user = User.objects.create_user(username=username, email=email, password=password)

            return JsonResponse({'message': 'User registered successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'message': f'Error: {str(e)}'}, status=500)

    return JsonResponse({'message': 'Invalid request method'}, status=405)


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(username=username, password=password)

            if user is not None:
                return JsonResponse({
                    'message': 'Login successful',
                    'user_id': user.id,
                    'username': user.username
                }, status=200)
            else:
                return JsonResponse({'message': 'Invalid username or password'}, status=401)

        except Exception as e:
            return JsonResponse({'message': f'Error: {str(e)}'}, status=500)

    return JsonResponse({'message': 'Invalid request method'}, status=405)
