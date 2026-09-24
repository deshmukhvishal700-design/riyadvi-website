from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from .models import ContactEnquiry, ConsultationRequest, HealthCheckupLead, LeadMagnetLead
from .serializers import (
    ContactEnquirySerializer,
    ConsultationRequestSerializer,
    HealthCheckupLeadSerializer,
    LeadMagnetLeadSerializer,
)


class BaseLeadCreateView(generics.CreateAPIView):
    """Shared create-only behaviour with a consistent success response shape."""

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'success': True, 'message': 'Thank you — we will be in touch shortly.', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
        )


class ContactEnquiryCreateView(BaseLeadCreateView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer


class ConsultationRequestCreateView(BaseLeadCreateView):
    queryset = ConsultationRequest.objects.all()
    serializer_class = ConsultationRequestSerializer


class HealthCheckupLeadCreateView(BaseLeadCreateView):
    queryset = HealthCheckupLead.objects.all()
    serializer_class = HealthCheckupLeadSerializer


class LeadMagnetLeadCreateView(BaseLeadCreateView):
    queryset = LeadMagnetLead.objects.all()
    serializer_class = LeadMagnetLeadSerializer