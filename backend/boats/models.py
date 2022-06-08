from django.db import models
from authentication.models import User

# Create your models here.
class Boat(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    renter = models.ForeignKey(User, on_usage=models.CASCADE)
    capacity = models.IntegerField()
    description = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    lake = models.CharField(max_length=100)
    picture = models.ImageField()
    LOW = 'LO'
    MEDIUM = 'ME'
    HIGH = 'HI'
    # boat_rating = models.DecimalField(max<=10)
    BOAT_RATINGS = [
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High'),
    ]
    boat_rating = models.CharField(
        max_length=2,
        choices=BOAT_RATINGS,
        default=MEDIUM,
        )
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


    
    