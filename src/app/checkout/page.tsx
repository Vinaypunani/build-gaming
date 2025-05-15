"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [payment, setPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const shippingFee = totalPrice > 0 ? 99 : 0;
  const grandTotal = totalPrice + shippingFee;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    try {
      // Patch: Convert custom build to real product before placing order
      const updatedItems = await Promise.all(items.map(async (item) => {
        if (item.id.startsWith('build-')) {
          // Find a category for custom builds
          let categoryId = null;
          try {
            const catRes = await fetch('/api/categories');
            const categories = await catRes.json();
            const customCat = categories.find((c: any) => c.name.toLowerCase().includes('custom')) || categories[0];
            categoryId = customCat?.id;
          } catch {}
          // Create product for custom build
          const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: item.name,
              price: item.price,
              stock: 1,
              categoryId,
              image: item.image,
              description: 'Custom PC Build',
            }),
          });
          const newProduct = await res.json();
          return {
            ...item,
            productId: newProduct.id,
          };
        } else {
          return {
            ...item,
            productId: item.id,
          };
        }
      }));
      const orderPayload = {
        userId: user?.id,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        phone: address.phone,
        payment: payment.toUpperCase(),
        items: updatedItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      console.log('Order Payload:', orderPayload);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        setPlacing(false);
        setSuccess(true);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart');
        }
      } else {
        setPlacing(false);
        toast.error(`Order API error: ${data.error || 'Failed to place order.'}`);
        console.error('Order API error:', data);
      }
    } catch (err) {
      setPlacing(false);
      toast.error('Failed to place order.');
      console.error('Order API exception:', err);
    }
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('You must be logged in to access checkout.', { id: 'login-required' });
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (success) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold mb-4 text-primary">Order Placed!</h1>
          <p className="text-lg text-gray-400 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
          <Button href="/">Go to Home</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
              <ul className="divide-y divide-border">
                {items.length === 0 && <li className="py-4 text-gray-400">Your cart is empty.</li>}
                {items.map(item => (
                  <li key={item.id} className="flex items-center gap-4 py-4">
                    <div className="w-16 h-16 bg-background border border-border rounded-md flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold text-primary">{item.name[0]}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-gray-400">₹{item.price.toLocaleString()} x {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-right min-w-[80px]">₹{(item.price * item.quantity).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Address Form */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={address.address}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary & Payment */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-sm">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Shipping</span>
                <span>₹{shippingFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === 'cod'}
                    onChange={e => setPayment(e.target.value)}
                    className="accent-primary"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === 'card'}
                    onChange={e => setPayment(e.target.value)}
                    className="accent-primary"
                  />
                  Credit/Debit Card (Mock)
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === 'upi'}
                    onChange={e => setPayment(e.target.value)}
                    className="accent-primary"
                  />
                  UPI (Mock)
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={placing || items.length === 0}>
              {placing ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage; 