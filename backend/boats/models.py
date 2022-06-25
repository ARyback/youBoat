from sys import maxsize
from unittest.util import _MAX_LENGTH
from django.db import models
from authentication.models import User

# Create your models here.
class Boat(models.Model):
    boat_name = models.CharField(max_length=255, null=True)
    owner = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={"is_owner":True},
        related_name="owner",
        null=True,
        )
    renter = models.ForeignKey(
        User, 
        on_delete=models.PROTECT,
        limit_choices_to={"is_renter":True},
        related_name="renter",
        null=True,
        )
    capacity = models.IntegerField()
    description = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    lake = models.CharField(max_length=100)
    picture = models.CharField(null=True, max_length=255)
    boat_rating = models.DecimalField(max_digits=3, decimal_places=2)
    boat_type = models.CharField(max_length=100)
    option_one = models.CharField(null=True, max_length=255)
    option_two = models.CharField(null=True, max_length=255)
    option_three = models.CharField(null=True, max_length=255)
    renter_selection = models.CharField(null=True, max_length=255)
    is_active = models.BooleanField('active status', null="", default=False)


    
    