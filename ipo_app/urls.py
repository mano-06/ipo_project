from django.urls import path
from .views import IPOListCreateView, IPODetailView, home, ipo_detail, UserRegistrationView, LoginView, ForgotPasswordView

urlpatterns = [
    path('', home, name='home'),
    path('ipo/<int:pk>/', ipo_detail, name='ipo_detail'),
    path('ipos/', IPOListCreateView.as_view(), name='ipo-list-create'),
    path('ipos/<int:pk>/', IPODetailView.as_view(), name='ipo-detail'),
    path('admin/signup/', UserRegistrationView.as_view(), name='admin-signup'),
    path('admin/login/', LoginView.as_view(), name='admin-login'),
    path('admin/forgot-password/', ForgotPasswordView.as_view(), name='admin-forgot-password'),
] 