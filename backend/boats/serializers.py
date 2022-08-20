from rest_framework import serializers
from .models import Boat

class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boat
        # fields = ['id', 'capacity', 'description', 'city', 'state', 'lake', 'picture', 'boat_rating', 'boat_type', 'user_id']
        fields = ['id', 'county', 'lake', 'picture', 'boat_rating', 'boat_type', 'option_one', 'option_two', 'option_three', 'renter_selection', 'is_active', 'owner_id', 'renter_id']
        depth = 1
