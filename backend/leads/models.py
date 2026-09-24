from django.db import models


class ContactEnquiry(models.Model):
    """From the /contact page form."""

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=150, blank=True)
    requirement = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('closed', 'Closed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact enquiries'

    def __str__(self):
        return f'{self.name} — {self.email}'


class ConsultationRequest(models.Model):
    """From 'Book a Free Consultation' CTAs across the site."""

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=150, blank=True)
    preferred_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.created_at:%Y-%m-%d}'


class HealthCheckupLead(models.Model):
    """From the multi-step /business-health-checkup form."""

    # Step 1: Business information
    business_name = models.CharField(max_length=150)
    contact_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    industry = models.CharField(max_length=150, blank=True)

    # Step 2: Website & digital presence
    has_website = models.BooleanField(default=False)
    website_url = models.URLField(blank=True)

    # Step 3: Marketing
    marketing_channels = models.CharField(max_length=255, blank=True)

    # Step 4: Technology
    current_tech_stack = models.CharField(max_length=255, blank=True)

    # Step 5: Business challenges
    challenges = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.business_name} — {self.contact_name}'


class LeadMagnetLead(models.Model):
    """From /software-project-planning-guide download form."""

    name = models.CharField(max_length=150)
    company = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.email}'