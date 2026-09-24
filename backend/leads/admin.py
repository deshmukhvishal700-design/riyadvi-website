from django.contrib import admin
from .models import ContactEnquiry, ConsultationRequest, HealthCheckupLead, LeadMagnetLead


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'company', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'company')
    readonly_fields = ('created_at',)


@admin.register(ConsultationRequest)
class ConsultationRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'preferred_date', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email')
    readonly_fields = ('created_at',)


@admin.register(HealthCheckupLead)
class HealthCheckupLeadAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'contact_name', 'email', 'industry', 'created_at')
    list_filter = ('has_website', 'created_at')
    search_fields = ('business_name', 'contact_name', 'email')
    readonly_fields = ('created_at',)


@admin.register(LeadMagnetLead)
class LeadMagnetLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'email', 'created_at')
    search_fields = ('name', 'email', 'company')
    readonly_fields = ('created_at',)