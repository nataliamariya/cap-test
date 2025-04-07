import React, { createContext, useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await fetchAuthSession();
        const id = session.userSub;
        setUserId(id);
        console.log("User ID loaded:", id);
        fetchCart(id);
      } catch (err) {
        console.error("Could not fetch user session", err);
      }
    };

    loadUser();
  }, []);

  const fetchCart = async (id) => {
    try {
      const res = await fetch(`https://ndruy9xx1a.execute-api.ca-central-1.amazonaws.com/devamp/cart?userId=${id}`);
      const data = await res.json();
      console.log("Fetched cart from DB:", data.cart);
      if (data.cart) {
        setCartItems(data.cart);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const saveCart = async (updatedCart) => {
    if (!userId) return;
    try {
      console.log("Saving cart for user:", userId);
      await fetch(`https://ndruy9xx1a.execute-api.ca-central-1.amazonaws.com/devamp/cart?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: updatedCart })
      });
      console.log("Cart saved successfully");
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  };

  const addItem = (item) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const exists = updated.find((i) => i.id === item.id);
      if (exists) {
        if (exists.quantity < 100) exists.quantity += 1;
      } else {
        updated.push({ ...item, quantity: 1 });
      }
      saveCart(updated);
      return updated;
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prev) => {
      let updated;
      if (newQuantity <= 0) {
        updated = prev.filter((i) => i.id !== itemId);
      } else {
        updated = prev.map((i) =>
          i.id === itemId ? { ...i, quantity: Math.min(newQuantity, 100) } : i
        );
      }
      saveCart(updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, updateQuantity, userId, setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};
