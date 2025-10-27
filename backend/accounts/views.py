from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, get_user_model
import json

from rest_framework.authtoken.models import Token

User = get_user_model()




User = get_user_model()


# ==========================
# ✅ REGISTER USER
# ==========================
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

            # Automatically generate token
            Token.objects.create(user=user)

            return JsonResponse({'message': 'User registered successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'message': f'Error: {str(e)}'}, status=500)

    return JsonResponse({'message': 'Invalid request method'}, status=405)


# ==========================
# ✅ LOGIN USER
# ==========================
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(username=username, password=password)

            if user is not None:
                # Get or create token for the authenticated user
                token, _ = Token.objects.get_or_create(user=user)
                return JsonResponse({
                    'message': 'Login successful',
                    'token': token.key,
                    'user_id': user.id,
                    'username': user.username
                }, status=200)
            else:
                return JsonResponse({'message': 'Invalid username or password'}, status=401)

        except Exception as e:
            return JsonResponse({'message': f'Error: {str(e)}'}, status=500)

    return JsonResponse({'message': 'Invalid request method'}, status=405)



