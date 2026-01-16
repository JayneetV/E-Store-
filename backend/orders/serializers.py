from rest_framework import serializers
from .models import Order, OrderItem
from store.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'zip_code', 'total_amount', 'status', 'items']
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Create Order
        order = Order.objects.create(**validated_data)

        # Create Order Items
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order
