from django.urls import path
from .views import (
    ContactEnquiryCreateView,
    ConsultationRequestCreateView,
    HealthCheckupLeadCreateView,
    LeadMagnetLeadCreateView,
)

urlpatterns = [
    path('contact/', ContactEnquiryCreateView.as_view(), name='api-contact'),
    path('consultation/', ConsultationRequestCreateView.as_view(), name='api-consultation'),
    path('health-checkup/', HealthCheckupLeadCreateView.as_view(), name='api-health-checkup'),
    path('lead-magnet/', LeadMagnetLeadCreateView.as_view(), name='api-lead-magnet'),
]