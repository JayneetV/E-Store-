from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'price', 'quantity']

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'first_name', 'total_amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'id']
    inlines = [OrderItemInline]

admin.site.register(Order, OrderAdmin)
