"use client";

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';

const LoginContent = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // Redirect if already authenticated
  React.useEffect(() => {
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

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage; 