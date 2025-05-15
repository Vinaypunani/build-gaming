"use client";

import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, ShoppingCart, CreditCard, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  
  // Show welcome toast when admin first logs in
  useEffect(() => {
    // Check if admin welcome toast has already been shown this session
    const adminWelcomeShown = sessionStorage.getItem('adminWelcomeShown');
    
    if (user && !adminWelcomeShown && !hasWelcomed) {
      toast.success(`Welcome to admin dashboard, ${user.name}!`);
      sessionStorage.setItem('adminWelcomeShown', 'true');
      setHasWelcomed(true);
    }
  }, [user, hasWelcomed]);
  
  // Normally these would come from API calls to get stats
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,457', 
      change: '+12.5%', 
      icon: Users, 
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      title: 'Products', 
      value: '583', 
      change: '+8.2%', 
      icon: ShoppingBag, 
      color: 'from-green-500 to-emerald-600' 
    },
    { 
      title: 'Orders', 
      value: '1,245', 
      change: '+23.1%', 
      icon: ShoppingCart, 
      color: 'from-orange-500 to-amber-600' 
    },
    { 
      title: 'Revenue', 
      value: '$48,574', 
      change: '+4.3%', 
      icon: CreditCard, 
      color: 'from-purple-500 to-violet-600' 
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome to your admin control panel, {user?.name}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className="bg-card border border-border rounded-lg p-4 transition-transform hover:transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-1 text-green-500 text-xs">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change} <span className="text-gray-400 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center py-2 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Users size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">New user registered</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center py-2 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <ShoppingCart size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">Order #123{item} placed</p>
                  <p className="text-xs text-gray-400">3 hours ago</p>
                </div>
                <div className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full">
                  Completed
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 