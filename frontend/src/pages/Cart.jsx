import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, decreaseQty } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Cart Items */}
                <div className="md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {cartItems.map((item) => (
                            <div key={item.slug} className="flex items-center p-6 border-b border-gray-100 last:border-b-0">
                                {/* Image */}
                                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.product_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Img</div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="ml-6 flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.product_name}</h3>
                                    <p className="text-gray-500 text-sm">{item.category?.category_name}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center mx-4 border border-gray-300 rounded">
                                    <button
                                        onClick={() => decreaseQty(item)}
                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Price */}
                                <div className="text-lg font-bold text-gray-800 w-24 text-right">
                                    ₹{(item.price * item.quantity).toFixed(0)}
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.slug)}
                                    className="ml-6 text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Tax</span>
                            <span>₹0.00</span>
                        </div>
                        <div className="border-t border-gray-200 my-4"></div>
                        <div className="flex justify-between mb-6 text-xl font-bold text-gray-800">
                            <span>Total</span>
                            <span>₹{calculateTotal()}</span>
                        </div>

                        <Link to="/checkout" className="block w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-bold text-center">
                            Checkout
                        </Link>

                        <Link to="/" className="block text-center mt-4 text-sm text-blue-600 hover:underline">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
