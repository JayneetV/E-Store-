import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load initial cart from LocalStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add Item Function
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x.slug === product.slug);
            if (existItem) {
                // If item exists, increase quantity
                return prevItems.map((x) =>
                    x.slug === product.slug ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                // If item doesn't exist, add it with quantity 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove Item Function (Delete entirely)
    const removeFromCart = (slug) => {
        setCartItems((prevItems) => prevItems.filter((x) => x.slug !== slug));
    };

    // Decrease Quantity Function
    const decreaseQty = (product) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x.slug === product.slug);
            if (existItem.quantity === 1) {
                return prevItems.filter((x) => x.slug !== product.slug);
            } else {
                return prevItems.map((x) =>
                    x.slug === product.slug ? { ...x, quantity: x.quantity - 1 } : x
                );
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the context easily
export const useCart = () => useContext(CartContext);