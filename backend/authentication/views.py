from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
User = get_user_model()
# from .models import User
from django.shortcuts import get_object_or_404


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_view(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == 'GET':
        serializer = RegistrationSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RegistrationSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_view(request):
#     user = User.objects.filter(owner=request)
#     serializer = RegistrationSerializer(user, many=True)
#     return Response(serializer.data)