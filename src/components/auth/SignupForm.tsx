"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Shield } from 'lucide-react';
import FormInput from './FormInput';
import Button from '../ui/Button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

// Admin registration secret key
const ADMIN_SECRET_KEY = "Build@Gaming2024";

const SignupForm = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
  });
  const [showSecretField, setShowSecretField] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    secretKey?: string;
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
    
    // Name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Secret key validation (only if shown and provided)
    if (showSecretField && formData.secretKey && formData.secretKey !== ADMIN_SECRET_KEY) {
      newErrors.secretKey = 'Invalid admin secret key';
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
      // Clear any existing signup message flag
      sessionStorage.removeItem('signupMessageShown');
      
      // Convert fullName to name for API
      const signupData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        secretKey: showSecretField ? formData.secretKey : undefined
      };
      
      const result = await signup(signupData);
      
      if (result.success) {
        // Just redirect to login page with registered parameter
        router.push('/login?registered=true');
      } else {
        setErrors({
          general: result.message || 'An error occurred during signup.',
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred during signup. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSecretField = () => {
    setShowSecretField(prev => !prev);
    if (!showSecretField) {
      // Reset the secret key when showing the field
      setFormData(prev => ({ ...prev, secretKey: '' }));
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
        id="fullName"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={formData.fullName}
        onChange={handleChange}
        required
        error={errors.fullName}
      />
      
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
      
      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        error={errors.confirmPassword}
      />
      
      <div className="flex items-center justify-between mt-3">
        <button 
          type="button" 
          onClick={toggleSecretField}
          className="text-sm text-primary flex items-center hover:underline focus:outline-none"
        >
          <Shield size={16} className="mr-1" />
          {showSecretField ? 'Hide Admin Options' : 'Register as Admin'}
        </button>
      </div>
      
      {showSecretField && (
        <div className="pt-2">
          <FormInput
            id="secretKey"
            label="Admin Secret Key"
            type="password"
            placeholder="Enter the admin secret key"
            value={formData.secretKey}
            onChange={handleChange}
            error={errors.secretKey}
          />
          <p className="text-xs text-gray-400 mt-1">
            Enter the secret key to register as an admin user
          </p>
        </div>
      )}
      
      <div className="flex items-center mt-4">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
          I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </label>
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
            Creating account...
          </>
        ) : (
          <>
            <UserPlus size={18} />
            Create Account
          </>
        )}
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-gray-400">Or sign up with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-background border border-border rounded-md hover:bg-card/70 transition-colors"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
        
        <button
          type="button"
          className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-background border border-border rounded-md hover:bg-card/70 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.22.66-.48v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z"
              clipRule="evenodd"
            />
          </svg>
          GitHub
        </button>
      </div>
    </form>
  );
};

export default SignupForm; 