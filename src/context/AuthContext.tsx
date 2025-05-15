"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { UserData, LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth';

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  signup: (credentials: SignupCredentials) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false, message: 'AuthContext not initialized' }),
  signup: async () => ({ success: false, message: 'AuthContext not initialized' }),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          // Token invalid or expired
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        const authData = data.data as AuthResponse;
        localStorage.setItem('token', authData.token);
        setUser(authData.user);
        
        // Removed toast notification here to avoid duplicates
        
        // Redirect based on user role
        if (authData.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/');
        }
        
        return { success: true, message: 'Login successful' };
      } else {
        toast.error(data.message || 'Login failed');
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return { success: false, message: 'An error occurred during login' };
    }
  };

  // Signup function
  const signup = async (credentials: SignupCredentials) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        return { success: true, message: 'Signup successful' };
      } else {
        return { success: false, message: data.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An error occurred during signup' };
    }
  };

  // Logout function
  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    
    // Clear welcome message flags to show them again on next login
    sessionStorage.removeItem('welcomeShown');
    sessionStorage.removeItem('adminWelcomeShown');
    
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 