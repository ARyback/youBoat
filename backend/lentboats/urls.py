from django.urls import path, include
from lentboats import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.get_all_lentboats),
    # path('ownerboats/', views.owner_boats),
    path('renterboats/', views.renter_boats),
]