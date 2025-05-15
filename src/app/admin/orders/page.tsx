"use client";

import React, { useState } from 'react';
import { Search, Eye, Edit2, X, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/ui/Button';
import { useOrders } from '@/hooks/useOrders';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  user: { name: string };
  createdAt: string;
  total: number;
  status: string;
  items: { product: { name: string }, quantity: number, price: number }[];
}

const OrdersPage = () => {
  const { orders: rawOrders, loading, updateOrderStatus } = useOrders();
  const orders: Order[] = rawOrders as Order[];
  const [search, setSearch] = useState('');
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('Pending');

  const filtered: Order[] = orders.filter((o: Order) =>
    (o.user?.name?.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search))
  );

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, newStatus);
    setUpdatingId(null);
  };

  const handleEditClick = (order: Order) => {
    setEditingId(order.id);
    setEditStatus(order.status);
  };

  const handleSaveStatus = async (orderId: string) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, editStatus);
      toast.success('Order status updated!');
    } catch (err) {
      toast.error('Failed to update order status.');
    }
    setEditingId(null);
    setUpdatingId(null);
  };

  const handleCloseEdit = () => {
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <p className="text-gray-400">View and manage customer orders.</p>
        <div className="bg-card border border-border p-4 rounded-lg">
          {/* Search bar */}
          <div className="flex mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 py-2 pr-4 block w-full rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Search orders..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 size={24} className="animate-spin text-primary" />
              <span className="ml-2 text-gray-400">Loading orders...</span>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length > 0 ? filtered.map(order => (
                  <tr key={order.id} className="hover:bg-background/50">
                    <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.user?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {editingId === order.id ? (
                          updatingId === order.id ? (
                            <span className="flex items-center"><Loader2 className="animate-spin mr-2 h-4 w-4 text-primary" />Updating...</span>
                          ) : (
                            <>
                              <select
                                value={editStatus}
                                onChange={e => setEditStatus(e.target.value)}
                                className="px-2 py-1 text-xs rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                                disabled={updatingId !== null}
                              >
                                <option value="PENDING">Pending</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                              </select>
                              <button onClick={() => handleSaveStatus(order.id)} className="ml-2 px-2 py-1 text-xs rounded bg-primary text-white hover:bg-primary/90 disabled:opacity-70" disabled={updatingId !== null}>Save</button>
                              <button onClick={handleCloseEdit} className="ml-2 px-2 py-1 text-xs rounded bg-background text-gray-400 border border-border hover:bg-card">Close</button>
                            </>
                          )
                        ) : (
                          <span className={`px-2 py-1 text-xs rounded-full select-none ${
                            order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' :
                            order.status === 'PROCESSING' ? 'bg-blue-500/20 text-blue-500' :
                            order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-red-500/20 text-red-500'
                          }`}>
                            {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setViewOrder(order)} className="p-1 rounded-md text-gray-400 hover:text-primary hover:bg-background">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEditClick(order)} className="p-1 rounded-md text-gray-400 hover:text-primary hover:bg-background ml-2" disabled={editingId !== null && editingId !== order.id}>
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-400">No orders found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
      {/* View Order Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={() => setViewOrder(null)}></div>
            <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium mb-4">Order #{viewOrder.id}</h3>
                <div className="mb-2 text-sm text-gray-400">Customer: <span className="text-foreground font-medium">{viewOrder.user?.name}</span></div>
                <div className="mb-2 text-sm text-gray-400">Date: <span className="text-foreground font-medium">{new Date(viewOrder.createdAt).toLocaleString()}</span></div>
                <div className="mb-2 text-sm text-gray-400">Status: <span className="text-foreground font-medium">{viewOrder.status}</span></div>
                <div className="mb-2 text-sm text-gray-400">Total: <span className="text-foreground font-medium">₹{viewOrder.total.toLocaleString()}</span></div>
                <div className="mb-4">
                  <div className="font-semibold mb-1">Items:</div>
                  <ul className="list-disc pl-5">
                    {viewOrder.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-foreground">
                        {item.product?.name} x{item.quantity} <span className="text-gray-400">(₹{item.price.toLocaleString()})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setViewOrder(null)}
                  className="w-full inline-flex justify-center px-4 py-2 bg-background text-gray-400 border border-border rounded-md hover:bg-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                >Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default OrdersPage; 