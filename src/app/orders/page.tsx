"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image?: string;
  };
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  payment: string;
  items: OrderItem[];
}

const OrdersPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('You must be logged in to view your orders.', { id: 'login-required' });
      router.push('/login');
      return;
    }
    if (user) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          // Filter orders for the current user
          setOrders(data.filter((order: any) => order.userId === user.id));
          setLoading(false);
        })
        .catch(() => {
          toast.error('Failed to fetch orders.');
          setLoading(false);
        });
    }
  }, [user, isAuthenticated, isLoading, router]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400 py-12">You have no orders yet.</div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <div>
                    <div className="text-sm text-gray-400">Order ID: <span className="text-foreground font-mono">{order.id}</span></div>
                    <div className="text-xs text-gray-400">Placed on: {new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">Status: {order.status}</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-background">
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map(item => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 flex items-center gap-2">
                            {item.product?.image && (
                              <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded" />
                            )}
                            <span>{item.product?.name || 'Product'}</span>
                          </td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">₹{item.price.toLocaleString()}</td>
                          <td className="px-4 py-2">₹{(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-400">Payment: {order.payment}</div>
                  <div className="text-lg font-bold text-primary">Total: ₹{order.total.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage; 