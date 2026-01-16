import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await api.get('orders/my-orders/');
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-10 text-gray-500">You have no orders yet.</div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border hover:border-blue-500 transition-colors">
                            <div className="flex flex-col md:flex-row justify-between mb-4 border-b pb-4">
                                <div>
                                    <p className="font-bold text-gray-700">Order #{order.id}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.created_at || Date.now()).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-2 md:mt-0 text-right">
                                    <p className="font-bold text-lg text-blue-600">₹{order.total_amount}</p>
                                    <span className={`inline-block px-3 py-1 text-xs rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="font-semibold text-sm text-gray-600">Items:</p>
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm pl-2 border-l-2 border-gray-200">
                                        {/* Ideally fetch product name via ID or store name in OrderItem to avoid N+1 queries or complex fetches, but for now we rely on what API gives or just product ID if simplicity needed. 
                                            Actually, our serializer nests items, but items just have product ID? 
                                            Wait, our OrderItemSerializer usually just gives product Key. 
                                            Let's check the serializer.
                                        */}
                                        <span>Product ID: {item.product} (x{item.quantity})</span>
                                        <span>₹{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                                <p>Shipping to: {order.address}, {order.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
