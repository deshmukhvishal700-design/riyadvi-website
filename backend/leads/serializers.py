from rest_framework import serializers
from .models import ContactEnquiry, ConsultationRequest, HealthCheckupLead, LeadMagnetLead


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ['id', 'name', 'email', 'phone', 'company', 'requirement', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class ConsultationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationRequest
        fields = ['id', 'name', 'email', 'phone', 'company', 'preferred_date', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at']


class HealthCheckupLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthCheckupLead
        fields = [
            'id', 'business_name', 'contact_name', 'email', 'phone', 'industry',
            'has_website', 'website_url', 'marketing_channels',
            'current_tech_stack', 'challenges', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class LeadMagnetLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadMagnetLead
        fields = ['id', 'name', 'company', 'email', 'phone', 'created_at']
        read_only_fields = ['id', 'created_at']