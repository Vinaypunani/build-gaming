"use client";

import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BuildPcCta from '@/components/home/BuildPcCta';
import Testimonials from '@/components/home/Testimonials';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  
  // Show welcome toast when user logs in - only once per session
  useEffect(() => {
    // Check if toast has already been shown this session
    const welcomeShown = sessionStorage.getItem('welcomeShown');
    
    if (isAuthenticated && user && user.role === 'USER' && !welcomeShown && !hasWelcomed) {
      toast.success(`Welcome back, ${user.name}!`);
      sessionStorage.setItem('welcomeShown', 'true');
      setHasWelcomed(true);
    }
  }, [isAuthenticated, user, hasWelcomed]);
  
  return (
    <Layout>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <BuildPcCta />
      <Testimonials />
    </Layout>
  );
}
