"use client";

import React from 'react';
import { redirect } from 'next/navigation';
import { User, Mail, CalendarClock, ShieldCheck, PenSquare, Lock, CreditCard, History } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // Redirect if not authenticated and not loading
  if (!isAuthenticated && !isLoading) {
    redirect('/login');
  }
  
  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-400">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <div className="bg-card border border-border rounded-lg overflow-hidden sticky top-24">
              <div className="p-6 border-b border-border">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    {user?.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name} 
                        className="w-16 h-16 rounded-full object-cover" 
                      />
                    ) : (
                      <User size={32} />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{user?.name}</h3>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <a href="#profile" className="flex items-center p-3 rounded-md bg-background/50 text-primary">
                  <User size={18} className="mr-3" />
                  Profile Information
                </a>
                <a href="#security" className="flex items-center p-3 rounded-md hover:bg-background/50 transition-colors">
                  <Lock size={18} className="mr-3" />
                  Security
                </a>
                <a href="#orders" className="flex items-center p-3 rounded-md hover:bg-background/50 transition-colors">
                  <History size={18} className="mr-3" />
                  Order History
                </a>
                <a href="#payment" className="flex items-center p-3 rounded-md hover:bg-background/50 transition-colors">
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </a>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-1 lg:col-span-3">
            {/* Profile Information */}
            <section id="profile" className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <PenSquare size={16} />
                  Edit Profile
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <User className="w-5 h-5 mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Full Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email Address</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ShieldCheck className="w-5 h-5 mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Account Type</p>
                    <p className="font-medium capitalize">{user?.role.toLowerCase()}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarClock className="w-5 h-5 mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Member Since</p>
                    <p className="font-medium">
                      {user?.createdAt 
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : '-'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Security Section */}
            <section id="security" className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Security</h2>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Lock size={16} />
                  Change Password
                </Button>
              </div>
              
              <div className="bg-background/50 p-4 rounded-md border border-border mb-6">
                <p className="text-sm text-gray-400">For security reasons, we recommend changing your password regularly and enabling two-factor authentication.</p>
              </div>
              
              {/* Last Login */}
              <div className="flex items-center justify-between p-4 bg-background/30 rounded-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <CalendarClock size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-gray-400">Today, 15:32 PM</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </section>
            
            {/* Order History Placeholder */}
            <section id="orders" className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Order History</h2>
              <div className="text-center py-8 text-gray-400">
                <History size={48} className="mx-auto mb-4 opacity-50" />
                <p>You haven't placed any orders yet.</p>
                <Button href="/products" className="mt-4">Browse Products</Button>
              </div>
            </section>
            
            {/* Payment Methods Placeholder */}
            <section id="payment" className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
              <div className="text-center py-8 text-gray-400">
                <CreditCard size={48} className="mx-auto mb-4 opacity-50" />
                <p>You haven't added any payment methods yet.</p>
                <Button className="mt-4">Add Payment Method</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 