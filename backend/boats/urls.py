from django.urls import path, include
from boats import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_boats),
    path('renterboats/', views.renter_boats),
    path('<int:pk>/', views.boat_detail),
    path('all/', views.get_all_boats),
    path('userview/', views.user_view),
]