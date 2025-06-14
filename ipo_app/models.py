from django.db import models

# Create your models here.
class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=255, null=False)
    company_logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)

    def __str__(self):
        return self.company_name

class IPO(models.Model):
    STATUS_CHOICES = [
        ('Upcoming', 'Upcoming'),
        ('Open', 'Open'),
        ('Closed', 'Closed'),
        ('Listed', 'Listed'),
    ]
    ipo_id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    price_band = models.CharField(max_length=50, blank=True, null=True)
    open_date = models.DateField(blank=True, null=True)
    close_date = models.DateField(blank=True, null=True)
    issue_size = models.CharField(max_length=100, blank=True, null=True)
    issue_type = models.CharField(max_length=50, blank=True, null=True)
    listing_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Upcoming')
    ipo_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    listing_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    current_market_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    @property
    def listing_gain(self):
        if self.ipo_price and self.listing_price:
            return round(((self.listing_price - self.ipo_price) / self.ipo_price) * 100, 2)
        return None
    @property
    def current_return(self):
        if self.ipo_price and self.current_market_price:
            return round(((self.current_market_price - self.ipo_price) / self.ipo_price) * 100, 2)
        return None
    def __str__(self):
        return f"{self.company.company_name} IPO"

class Document(models.Model):
    document_id = models.AutoField(primary_key=True)
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE)
    rhp_pdf = models.FileField(upload_to='documents/rhp/', blank=True, null=True)
    drhp_pdf = models.FileField(upload_to='documents/drhp/', blank=True, null=True)

    def __str__(self):
        return f"Document for {self.ipo}"
