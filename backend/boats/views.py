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
    # print(
    #     'User ', f"{request.user.id} {request.user.email} {request.user.username}")
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

# This code from 38-57 is for assistance with the image field. 
# https://dev.to/djangotricks/how-to-upload-a-file-using-django-rest-framework-1kgf
# class UserAvatarUpload(APIView):
#     parser_classes = [MultiPartParser, FormParser]
#     permission_classes = [IsAuthenticated]

#     def post(self, request, format=None):
#         serializer = UserAvatarSerializer(data=request.data, instance=request.user)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# urlpatterns = [
#     path("", TemplateView.as_view(template_name="index.html")),
#     path("api/auth-token/", obtain_auth_token, name="rest_auth_token"),
#     *****This one especially: path("api/user-avatar/", UserAvatarUpload.as_view(), name="rest_user_avatar_upload"),
#     path("admin/", admin.site.urls),
# ]
# Url patterns need to be appended to url patterns
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# Also adjust settings.py

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def renter_boats(request):
    # print(
    #     'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    # if request.method == 'POST':
    #     serializer = BoatSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(renter=request.user)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    boats = Boat.objects.filter(renter_id=request.user.id)
    serializer = BoatSerializer(boats, many=True)
    return Response(serializer.data)

# Develop a PUT view to handle who is renting so need to a get a single boat
    # 1) Need one endpoint to rent the boat (PUT) 2) Another to return (PUT) the boat
# Get a single boat with its ID
# Skip deletion
# Need to be able to edit the boat is the big one which will look like APIVIEW of GET PUT DELETE but no delete
# Need another @api_view to accept which is a POST request

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
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        boat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    # Figure out other connections which are needed

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