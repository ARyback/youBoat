from django.urls import path, include
from boats import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_boats),
    path('all/', views.get_all_boats),
]