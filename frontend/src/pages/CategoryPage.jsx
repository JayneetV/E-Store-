import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get(`products/?category=${slug}`);
                setProducts(response.data);
                // Ideally, we'd also get the category name from a separate API call or it's just the slug formatted.
                setCategoryName(slug.replace(/-/g, ' '));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 capitalize text-gray-800">{categoryName} Products</h1>
            {products.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No products found in this category.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
