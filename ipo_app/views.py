from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import IPO
from .serializers import IPOSerializer, UserSerializer, AuthTokenSerializer

# Create your views here.

def home(request):
    return render(request, 'home.html')

def ipo_detail(request, pk):
    ipo = get_object_or_404(IPO, pk=pk)
    return render(request, 'detail.html', {'ipo': ipo})

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully.'},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.pk, 'email': user.email})
        else:
            return Response({'detail': 'Invalid credentials.'},
                            status=status.HTTP_401_UNAUTHORIZED)

class IPOListCreateView(generics.ListCreateAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

class IPODetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        # In a real application, you would implement password reset logic here,
        # such as sending an email with a reset link.
        print(f"Password reset requested for: {email}")
        return Response({'message': 'If your email is registered, a password reset link has been sent.'},
                        status=status.HTTP_200_OK)
