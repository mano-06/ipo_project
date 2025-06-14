from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IPOViewSet, home, detail

router = DefaultRouter()
router.register(r'ipo', IPOViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', home, name='home'),
    path('ipo/<int:ipo_id>/', detail, name='detail'),
] 