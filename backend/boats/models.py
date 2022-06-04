from django.db import models
from authentication.models import User

# Create your models here.
class Boat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    boat_type = models.CharField(max_length=30)
    capacity = models.IntegerField()
    picture = models.IntegerField()
    boat_rating = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    lake = models.CharField(max_length=100)
    