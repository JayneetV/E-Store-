from django.urls import path
from .views import OrderCreateView, OrderListView

urlpatterns = [
    path('create/', OrderCreateView.as_view(), name='create-order'),
    path('my-orders/', OrderListView.as_view(), name='my-orders'),
]
