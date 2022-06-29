from django.db import models
from django.contrib.auth.models import AbstractUser
# from backend.boats.models import Boat

class User(AbstractUser):
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    zipcode = models.IntegerField(null=True)
    county = models.CharField(max_length=255, null="", default=False)
    number = models.CharField(max_length=10, null=True)
    email = models.CharField(max_length=255, null=True)
    is_owner = models.BooleanField('owner status', default=False)
    is_renter = models.BooleanField('renter status', default=False)
    pass

    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    # Example (note import of models above that is commented out)
    # this will add a column to the user table
    # is_student = models.BooleanField('student status', default=False)
