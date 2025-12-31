import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8080/cart', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  // Fetch cart on initial load
  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (foodId, quantity) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.post('http://localhost:8080/cart/add', { foodId, quantity }, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      fetchCart(); // Refetch cart to update state
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart.');
    }
  };

  const updateCartItem = async (foodId, quantity) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.put('http://localhost:8080/cart/update', { foodId, quantity }, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      fetchCart();
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };

  const removeCartItem = async (foodId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:8080/cart/remove/${foodId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      fetchCart();
      toast.success('Item removed from cart.');
    } catch (error) {
      console.error('Failed to remove cart item:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateCartItem,
    removeCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
