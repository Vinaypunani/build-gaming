"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

interface AdminProtectedProps {
  children: React.ReactNode;
}

const AdminProtected = ({ children }: AdminProtectedProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is logging out, set a flag
    const onLogout = () => {
      sessionStorage.setItem('justLoggedOut', 'true');
    };
    window.addEventListener('logout', onLogout);
    return () => window.removeEventListener('logout', onLogout);
  }, []);

  useEffect(() => {
    const justLoggedOut = sessionStorage.getItem('justLoggedOut');
    if (!isLoading && !isAuthenticated) {
      if (!justLoggedOut) {
        toast.error('You must be logged in to access this page');
      }
      sessionStorage.removeItem('justLoggedOut');
      router.push('/login');
    } else if (!isLoading && isAuthenticated && user?.role !== 'ADMIN') {
      toast.error('You do not have permission to access this page');
      router.push('/');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtected; 