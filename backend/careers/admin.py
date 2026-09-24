from django.contrib import admin
from .models import Job, Application


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'location', 'experience_level', 'is_active', 'posted_at')
    list_filter = ('department', 'experience_level', 'is_active')
    search_fields = ('title', 'department')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'job', 'email', 'status', 'submitted_at')
    list_filter = ('status', 'job')
    search_fields = ('name', 'email')
    readonly_fields = ('submitted_at',)