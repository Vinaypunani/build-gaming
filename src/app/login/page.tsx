"use client";

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const registered = searchParams.get('registered');
  
  useEffect(() => {
    if (registered === 'true') {
      // Check if we've already shown the message for this signup
      const signupMessageShown = sessionStorage.getItem('signupMessageShown');
      if (!signupMessageShown) {
        toast.success('Account created successfully! Please log in.');
        sessionStorage.setItem('signupMessageShown', 'true');
      }
    }
  }, [registered]);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);
  
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <AuthCard
          title="Welcome Back"
          description="Sign in to your account to continue"
          switchText="Don't have an account?"
          switchLink="/signup"
          switchLinkText="Sign up"
        >
          <LoginForm />
        </AuthCard>
      </div>
    </Layout>
  );
};

export default LoginPage; 