from django.db import models


class Job(models.Model):
    """A job listing, shown at /careers and /careers/<slug>."""

    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, help_text='Used in the URL: /careers/<slug>')
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=100, default='Remote')

    EXPERIENCE_CHOICES = [
        ('entry', 'Entry level'),
        ('mid', 'Mid level'),
        ('senior', 'Senior'),
    ]
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_CHOICES, default='mid')

    description = models.TextField()
    responsibilities = models.TextField(help_text='One responsibility per line')
    requirements = models.TextField(help_text='One requirement per line')

    is_active = models.BooleanField(default=True)
    posted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-posted_at']

    def __str__(self):
        return self.title


class Application(models.Model):
    """A candidate's application to a specific Job."""

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    resume = models.FileField(upload_to='resumes/%Y/%m/')
    message = models.TextField(blank=True)

    STATUS_CHOICES = [
        ('received', 'Received'),
        ('reviewing', 'Reviewing'),
        ('rejected', 'Rejected'),
        ('hired', 'Hired'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='received')

    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f'{self.name} → {self.job.title}'