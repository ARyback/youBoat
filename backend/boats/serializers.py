import imp
from rest_framework import serializers
from .models import Boat

class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boat
        fields = ['id', 'capacity', 'description', 'city', 'state', 'lake', 'picture', 'boat_rating', 'boat_type', 'user_id']
