from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Job, Application
from .serializers import JobListSerializer, JobDetailSerializer, ApplicationSerializer


class JobListView(generics.ListAPIView):
    serializer_class = JobListSerializer

    def get_queryset(self):
        qs = Job.objects.filter(is_active=True)
        department = self.request.query_params.get('department')
        experience_level = self.request.query_params.get('experience_level')
        if department:
            qs = qs.filter(department__iexact=department)
        if experience_level:
            qs = qs.filter(experience_level=experience_level)
        return qs


class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.filter(is_active=True)
    serializer_class = JobDetailSerializer
    lookup_field = 'slug'


class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'success': True, 'message': 'Application received — we will review it shortly.'},
            status=status.HTTP_201_CREATED,
        )