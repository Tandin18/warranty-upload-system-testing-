from django.db import models

# Create your models here.
from django.db import models
import uuid

class Warranty(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor_name = models.CharField(max_length=200, verbose_name="Vendor Name")
    email = models.EmailField(verbose_name="Email Address")
    company_name = models.CharField(max_length=200, verbose_name="Company Name")
    warranty_document = models.FileField(
        upload_to='warranties/',
        verbose_name="Warranty Document"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Warranty"
        verbose_name_plural = "Warranties"

    def __str__(self):
        return f"{self.vendor_name} - {self.company_name}"
