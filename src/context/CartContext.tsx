"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Calculate totals
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    const price = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(total);
    setTotalPrice(price);
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        // Update quantity if item exists
        return currentItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        // Add new item
        return [...currentItems, { ...item, quantity }];
      }
    });
    toast.success('Added to cart!');
  };

  const removeFromCart = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 