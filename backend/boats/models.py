from sys import maxsize
from unittest.util import _MAX_LENGTH
from django.db import models
from authentication.models import User

# Create your models here.
class Boat(models.Model):
    owner = models.ForeignKey(
        User, 
        on_delete=models.RESTRICT,
        limit_choices_to={"is_owner":True},
        related_name="owner",
        null=True,
        )
    renter = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={"is_renter":True},
        related_name="renter",
        null=True,
        )
    capacity = models.IntegerField()
    description = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    lake = models.CharField(max_length=100)
    picture = models.ImageField()
    boat_rating = models.DecimalField(max_digits=3, decimal_places=2)
    PONTOON = 'PO'
    FISHING = 'FI'
    CHARTERFISHING = 'CH'
    JETSKI = 'JE'
    SPEEDBOAT = 'SP'
    BOAT_CHOICES = [
        (PONTOON, 'Pontoon'),
        (FISHING, 'Fishing'),
        (CHARTERFISHING, 'Charterfishing'),
        (JETSKI,'Jetski'),
        (SPEEDBOAT, 'Speedboat'),
    ]
    boat_type = models.CharField(
        max_length=2,
        choices=BOAT_CHOICES,
        default=PONTOON,
        )


    
    