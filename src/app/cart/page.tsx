"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Add some items to your cart to see them here.</p>
            <Link href="/">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg shadow-sm p-0">
              {items.map((item, idx) => (
                <div key={item.id} className={`flex items-center gap-4 px-6 py-6 ${idx !== items.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="relative w-20 h-20 flex-shrink-0 bg-background rounded-md overflow-hidden border border-border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-base text-foreground truncate">{item.name}</div>
                    <div className="text-primary font-semibold mt-1">₹{item.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 bg-background border border-border rounded hover:bg-primary/10"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 bg-background border border-border rounded hover:bg-primary/10"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="w-20 text-right font-bold text-foreground">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center px-6 py-4">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 border-red-500"
                >
                  Clear Cart
                </Button>
                <div className="font-semibold text-lg text-foreground">
                  Total: ₹{totalPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                  onClick={() => {
                    // TODO: Implement checkout
                    alert('Checkout functionality coming soon!');
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage; 