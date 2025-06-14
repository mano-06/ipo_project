from django.contrib import admin
from .models import IPO, Company, Document

# Register your models here.
admin.site.register(IPO)
admin.site.register(Company)
admin.site.register(Document)
