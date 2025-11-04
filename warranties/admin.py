from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Warranty

# Customize the admin site
admin.site.site_header = "DSD Warranty Management System"
admin.site.site_title = "DSD Admin Portal"
admin.site.index_title = "Welcome to DSD Warranty Management"

# Custom Warranty Admin
@admin.register(Warranty)
class WarrantyAdmin(admin.ModelAdmin):
    list_display = ['vendor_name', 'company_name', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['vendor_name', 'company_name']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    
    fieldsets = (
        ('Vendor Information', {
            'fields': ('vendor_name', 'company_name')
        }),
        ('Documents', {
            'fields': ('warranty_document',),
            'description': 'Upload warranty documents'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    class Media:
        css = {
            'all': ('admin/css/custom.css',)
        }

# Customize User Admin to apply custom CSS
class CustomUserAdmin(BaseUserAdmin):
    class Media:
        css = {
            'all': ('admin/css/custom.css',)
        }

# Unregister the default User admin and register custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)