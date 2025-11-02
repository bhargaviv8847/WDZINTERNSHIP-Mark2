from rest_framework import serializers
from .models import Account, Video


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

    def validate_video_file(self, value):
        
        max_size = 100 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError("File too large (max 100MB).")

        valid_types = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv']
        content_type = getattr(value, 'content_type', None)

        if content_type not in valid_types:
            raise serializers.ValidationError("Unsupported file type.")
        return value

