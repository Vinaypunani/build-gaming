import { useState, useEffect } from 'react';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await fetchOrders();
  };

  useEffect(() => { fetchOrders(); }, []);

  return { orders, loading, updateOrderStatus, fetchOrders };
} 