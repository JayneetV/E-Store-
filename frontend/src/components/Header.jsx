import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Header = () => {
    const { cartItems, clearCart } = useCart();
    const { user, logoutUser } = useAuth();
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('categories/');
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };
        fetchCategories();
    }, []);

    const onLogout = () => {
        logoutUser();
        clearCart();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${searchQuery}`);
        } else {
            navigate('/');
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600 cursor-pointer">
                    E-store
                </Link>

                {/* Categories & Search */}
                <div className="hidden md:flex flex-1 mx-10 items-center space-x-4">
                    <div className="relative group">
                        <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                            Categories
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Products</Link>
                            {categories.map(category => (
                                <Link key={category.id} to={`/products/category/${category.slug}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    {category.category_name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="flex flex-1">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search for items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition">
                            Search
                        </button>
                    </form>
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center space-x-6 text-gray-700">
                    {user ? (
                        <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 group relative">
                            <span className="text-xs">Welcome, {user.username || "User"}</span>
                            <span className="font-semibold text-sm">Account</span>

                            {/* User Dropdown */}
                            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-center">
                                <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center cursor-pointer hover:text-blue-600">
                            <span className="text-xs">Welcome</span>
                            <Link to="/login" className="font-semibold text-sm">Sign In / Join</Link>
                        </div>
                    )}

                    <Link to="/cart" className="relative flex flex-col items-center cursor-pointer hover:text-blue-600">
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.length}</span>
                        <span className="font-semibold text-sm">Cart</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
