from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Product.objects.all().filter(is_available=True)
        
        # Category Filter
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
            
        # Search Filter (Q objects)
        search_query = self.request.query_params.get('search', None)
        if search_query:
             from django.db.models import Q # Q objects allow complex logic like OR (|) and NOT (~).
             queryset = queryset.filter(Q(product_name__icontains=search_query) | Q(description__icontains=search_query))
             
        return queryset