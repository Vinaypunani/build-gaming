"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const CartButton = ({
  item,
  quantity = 1,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: CartButtonProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item, quantity);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      onClick={handleAddToCart}
      disabled={disabled}
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </Button>
  );
}; 