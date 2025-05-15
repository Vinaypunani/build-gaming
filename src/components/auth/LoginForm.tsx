"use client";

import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import FormInput from './FormInput';
import Button from '../ui/Button';
import { useAuth } from '@/context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // AuthContext login will handle the redirect based on user role
      const result = await login(formData);
      
      if (!result.success) {
        setErrors({
          general: result.message || 'An error occurred during login.',
        });
      }
      // No need for router.push here as the AuthContext will handle redirects based on role
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-secondary/10 border border-secondary rounded-md text-secondary text-sm mb-4">
          {errors.general}
        </div>
      )}
      
      <FormInput
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
      />
      
      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        required
        error={errors.password}
      />
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
            Remember me
          </label>
        </div>
        <a href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot your password?
        </a>
      </div>
      
      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        className="flex justify-center items-center gap-2 mt-6"
      >
        {isLoading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
            Logging in...
          </>
        ) : (
          <>
            <LogIn size={18} />
            Sign In
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm; 