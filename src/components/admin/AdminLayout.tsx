"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  ShoppingBag, 
  ShoppingCart, 
  Package,  
  BarChart3, 
  Menu, 
  X, 
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AdminProtected from './AdminProtected';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Package, label: 'Categories', href: '/admin/categories' },
    { icon: ShoppingBag, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  ];

  return (
    <AdminProtected>
      <div className="min-h-screen bg-background">
        {/* Admin header */}
        <header className="bg-card border-b border-border fixed top-0 left-0 right-0 z-40 h-16">
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center">
                <span className="font-bold text-xl mr-2">Build Gaming</span>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-400 hover:text-white flex items-center text-sm"
              >
                <Home size={16} className="mr-1" />
                <span className="hidden sm:inline">View Site</span>
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {user?.name?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex h-screen pt-16 bg-background overflow-hidden">
          {/* Mobile sidebar toggle */}
          <div 
            className="fixed top-20 left-4 z-50 lg:hidden"
            onClick={toggleSidebar}
          >
            <button 
              className="p-2 bg-card border border-border rounded-md text-white hover:bg-primary/10 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Sidebar overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <div 
            className={`fixed inset-y-0 left-0 z-45 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full pt-20 lg:pt-4">
              <div className="px-4 py-4 border-b border-border lg:hidden">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                    {user?.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                    ) : (
                      <span className="text-lg font-semibold">
                        {user?.name?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-400">Administrator</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-400 hover:text-white hover:bg-background'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon size={18} className="mr-3" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-400 rounded-md hover:text-white hover:bg-background transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto pb-10">
            <div className="container-custom py-8 px-4 lg:px-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminLayout; 