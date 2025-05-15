"use client";

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, ShoppingCart, Package, IndianRupee } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={<ShoppingCart className="h-6 w-6" />}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`}
            icon={<IndianRupee className="h-6 w-6" />}
          />
          <StatCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            icon={<Package className="h-6 w-6" />}
          />
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={<Users className="h-6 w-6" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Sales Chart */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.monthlySales || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Sales Chart */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.categorySales || []}
                    dataKey="revenue"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {(stats?.categorySales || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats?.recentOrders.map((order: any) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          order.status === 'DELIVERED' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
} 