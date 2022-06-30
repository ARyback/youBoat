from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Boat
from .serializers import BoatSerializer
from django.shortcuts import get_object_or_404
from authentication.models import User
from authentication.serializers import RegistrationSerializer

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_boats(request):
    boats = Boat.objects.all()
    serializer = BoatSerializer(boats, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_boats(request):
    if request.method == 'POST':
        serializer = BoatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        boats = Boat.objects.filter(owner_id=request.user.id)
        serializer = BoatSerializer(boats, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def boat_detail(request, pk):
    boat = get_object_or_404(Boat, pk=pk)
    if request.method == 'GET':
        serializer = BoatSerializer(boat)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BoatSerializer(boat, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(renter=request.user)
        return Response(serializer.data, status=status.HTTP_206_PARTIAL_CONTENT)
    elif request.method == 'DELETE':
        boat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def renter_boats(request):
    boats = Boat.objects.filter(renter_id=request.user.id)
    serializer = BoatSerializer(boats, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = get_object_or_404(User, pk=request.user.id)
    if request.method == 'GET':
        serializer = RegistrationSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RegistrationSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)