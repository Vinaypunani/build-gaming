import React from 'react';
import AuthCard from '@/components/auth/AuthCard';
import SignupForm from '@/components/auth/SignupForm';
import Layout from '@/components/layout/Layout';

export const metadata = {
  title: 'Sign Up | Build Gaming',
  description: 'Create your Build Gaming account',
};

const SignupPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <AuthCard
          title="Create Your Account"
          description="Join Build Gaming for the best PC building experience"
          switchText="Already have an account?"
          switchLink="/login"
          switchLinkText="Sign in"
        >
          <SignupForm />
        </AuthCard>
      </div>
    </Layout>
  );
};

export default SignupPage; 