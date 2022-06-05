from django.urls import path, include
from cars import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    # This is edited out to not throw off the boats code. I will re-implement if needed.
    # path('', views.user_cars),
    # path('all/', views.get_all_cars),
    path('usercars/', views.user_cars),
    path('allcars/', views.get_all_cars),
]
