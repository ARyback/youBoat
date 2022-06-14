from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import LentBoat
from .serializers import LentBoatSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_lentboats(request):
    lentboats = LentBoat.objects.all()
    serializer = LentBoatSerializer(lentboats, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def owner_boats(request):
    boats = LentBoat.objects.filter(owner_id=request.user.id)
    serializer = LentBoatSerializer(boats, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def renter_boats(request):
    boats = LentBoat.objects.filter(renter_id=request.user.id)
    serializer = LentBoatSerializer(boats, many=True)
    return Response(serializer.data)