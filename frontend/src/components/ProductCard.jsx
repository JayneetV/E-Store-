import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
            <Link to={`/product/${product.slug}`}>
                {/* Image Wrapper - fixed height for consistency */}
                <div className="h-64 w-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.product_name}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <span className="text-gray-400">No Image</span>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Category Tag */}
                    <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                        {product.category?.category_name || "Category"}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 mt-1 truncate">
                        {product.product_name}
                    </h3>

                    {/* Price & Rating Placeholder */}
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xl font-bold text-blue-600">
                            ₹{product.price}
                        </span>
                        <div className="flex text-yellow-500 text-sm">
                            {'★'.repeat(4)}{'☆'.repeat(1)}
                            <span className="text-gray-400 ml-1 text-xs">(0)</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
                        View Details
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
