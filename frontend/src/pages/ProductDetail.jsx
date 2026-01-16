import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        api.get(`products/${slug}/`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">

                {/* Image Section */}
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.product_name}
                        className="w-full h-96 object-cover"
                    />
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.product_name}</h2>

                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600 mr-4">₹{product.price}</span>
                        <div className="text-yellow-500 text-sm">★★★★☆ (Reviews)</div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mb-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
                            disabled={product.stock <= 0}
                            onClick={() => {
                                addToCart(product);
                                alert("Added to cart!");
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
