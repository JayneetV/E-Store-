import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: user?.username || '', // Pre-fill if we have something
        phone: '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
    });

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            ...formData,
            total_amount: calculateTotal(),
            items: cartItems.map(item => ({
                product: item.id, // Ensure your Product model has 'id' exposed or used correctly. Usually DRF uses 'id' by default. We stored full product object in cart?
                price: item.price,
                quantity: item.quantity
            }))
        };

        try {
            const response = await api.post('orders/create/', orderData);
            if (response.status === 201) {
                alert("Order Placed Successfully!");
                clearCart();
                navigate('/');
            }
        } catch (error) {
            console.error("Order Failed", error);
            alert("Failed to place order. Please try again.");
        }
    };

    if (cartItems.length === 0) {
        return <div className="text-center py-20">Your cart is empty</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Form */}
                <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="first_name" placeholder="First Name" required onChange={handleChange} className="border p-2 rounded" />
                        <input type="text" name="last_name" placeholder="Last Name" required onChange={handleChange} className="border p-2 rounded" />

                        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded" />
                        <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} className="border p-2 rounded" />

                        <input type="text" name="address" placeholder="Address" required onChange={handleChange} className="border p-2 rounded md:col-span-2" />

                        <input type="text" name="city" placeholder="City" required onChange={handleChange} className="border p-2 rounded" />
                        <input type="text" name="state" placeholder="State" required onChange={handleChange} className="border p-2 rounded" />
                        <input type="text" name="zip_code" placeholder="Zip Code" required onChange={handleChange} className="border p-2 rounded" />

                        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition mt-4">
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Summary */}
                <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md h-fit">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.slug} className="flex justify-between text-sm">
                                <span>{item.product_name} x {item.quantity}</span>
                                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
