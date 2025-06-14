from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .models import IPO
from .serializers import IPOSerializer

# Create your views here.

class IPOViewSet(viewsets.ModelViewSet):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

def home(request):
    ipos = IPO.objects.all()
    return render(request, 'home.html', {'ipos': ipos})

def detail(request, ipo_id):
    ipo = get_object_or_404(IPO, pk=ipo_id)
    return render(request, 'detail.html', {'ipo': ipo})
