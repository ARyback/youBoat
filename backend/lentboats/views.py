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

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def renter_boats(request):
    if request.method == 'POST':
        serializer = LentBoatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(renter=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        lentboats = LentBoat.objects.filter(renter_id=request.user.id)
        serializer = LentBoatSerializer(lentboats, many=True)
        return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def owner_boats(request):
#     boats = LentBoat.objects.filter(owner_id=request.user.id)
#     serializer = LentBoatSerializer(boats, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def renter_boats(request):
#     boats = LentBoat.objects.filter(renter_id=request.user.id)
#     serializer = LentBoatSerializer(boats, many=True)
#     return Response(serializer.data)

# This is potentially needed later
# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def lent_boat_detail(request, pk):
#     lentboat = get_object_or_404(LentBoat, pk=pk)
#     if request.method == 'GET':
#         serializer = LentBoatSerializer(lentboat)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = LentBoatSerializer(lentboat, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
#     elif request.method == 'DELETE':
#         boat.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)