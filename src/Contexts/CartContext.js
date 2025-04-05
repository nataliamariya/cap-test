import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add an item or increase quantity if already in cart (with max 100)
  const addItem = (item) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((i) => i.id === item.id);
      if (exists) {
        // If quantity is already 100, don't increase it further
        if (exists.quantity >= 100) return prevItems;
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Update quantity (if newQuantity <= 0, remove the item; if > 100, cap at 100)
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((i) => i.id !== itemId);
      }
      if (newQuantity > 100) {
        newQuantity = 100;
      }
      return prevItems.map((i) =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
