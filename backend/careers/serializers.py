from rest_framework import serializers
from .models import Job, Application


class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'slug', 'department', 'location', 'experience_level', 'posted_at']


class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'slug', 'department', 'location', 'experience_level',
            'description', 'responsibilities', 'requirements', 'posted_at',
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'job', 'name', 'email', 'phone', 'resume', 'message', 'submitted_at']
        read_only_fields = ['id', 'submitted_at']