from django.urls import path
from .views import JobListView, JobDetailView, ApplicationCreateView

urlpatterns = [
    path('jobs/', JobListView.as_view(), name='api-jobs-list'),
    path('jobs/<slug:slug>/', JobDetailView.as_view(), name='api-jobs-detail'),
    path('applications/', ApplicationCreateView.as_view(), name='api-applications'),
]