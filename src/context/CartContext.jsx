import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load initial cart and wishlist from backend on mount or auth change
  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setLoading(true);
        const [cartRes, wishlistRes] = await Promise.allSettled([
          cartService.getCart(),
          cartService.getWishlist()
        ]);

        if (cartRes.status === 'fulfilled') {
          const fetchedCart = cartRes.value?.items || cartRes.value?.data || cartRes.value || [];
          if (Array.isArray(fetchedCart)) setCartItems(fetchedCart);
        }

        if (wishlistRes.status === 'fulfilled') {
          const fetchedWishlist = wishlistRes.value?.items || wishlistRes.value?.data || wishlistRes.value || [];
          if (Array.isArray(fetchedWishlist)) setWishlistItems(fetchedWishlist);
        }
      } catch (err) {
        console.error("Failed to load user cart/wishlist from server:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  // Add item to cart (syncs with server)
  const addToCart = async (product, quantity = 1) => {
    const productId = product._id || product.id;
    
    // Optimistic UI update
    setCartItems(prevItems => {
      const existing = prevItems.find(item => (item.product?._id || item.product?.id || item.id) === productId);
      if (existing) {
        return prevItems.map(item =>
          (item.product?._id || item.product?.id || item.id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { id: productId, product, quantity }];
    });

    try {
      if (localStorage.getItem('token')) {
        await cartService.addToCart(productId, quantity);
      }
    } catch (err) {
      console.error("Failed to sync add to cart with server:", err);
    }
  };

  // Update cart item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(itemId);
    }

    // Optimistic update
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item._id || item.id) === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      if (localStorage.getItem('token')) {
        await cartService.updateQuantity(itemId, newQuantity);
      }
    } catch (err) {
      console.error("Failed to update cart quantity on server:", err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => (item._id || item.id) !== itemId));

    try {
      if (localStorage.getItem('token')) {
        await cartService.removeFromCart(itemId);
      }
    } catch (err) {
      console.error("Failed to remove cart item from server:", err);
    }
  };

  // Toggle Wishlist status
  const toggleWishlist = async (product) => {
    const productId = product._id || product.id;
    const isWishlisted = wishlistItems.some(item => (item._id || item.id) === productId);

    setWishlistItems(prev =>
      isWishlisted
        ? prev.filter(item => (item._id || item.id) !== productId)
        : [...prev, product]
    );

    try {
      if (localStorage.getItem('token')) {
        await cartService.toggleWishlist(productId);
      }
    } catch (err) {
      console.error("Failed to sync wishlist with server:", err);
    }
  };

  // Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        cartCount,
        cartSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
