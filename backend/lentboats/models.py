from django.db import models
from sys import maxsize
from unittest.util import _MAX_LENGTH
from django.db import models
from authentication.models import User
from boats.models import Boat

# Create your models here.
class LentBoat(models.Model):
    day = models.CharField(max_length=255)
    start_time = models.CharField(max_length=255)
    end_time = models.CharField(max_length=255)
    # owner = models.ForeignKey(User, on_delete=models.PROTECT,
    #     limit_choices_to={"is_owner":True},
    #     related_name="boat_owner",
    #     null=True,
    #     )
    renter = models.ForeignKey(User, on_delete=models.PROTECT,
        limit_choices_to={"is_renter":True},
        related_name="boat_renter",
        null=True,
        )
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE,
    )
    is_active = models.BooleanField('active status', default=False)
    