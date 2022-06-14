from rest_framework import serializers
from .models import LentBoat

class LentBoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = LentBoat
        fields = ['id', 'day', 'start_time', 'end_time', 'boat_id', 'renter_id']
        depth = 1