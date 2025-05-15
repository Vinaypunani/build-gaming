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
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CartButton = ({
  item,
  variant = 'primary',
  size = 'md',
  className = '',
}: CartButtonProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </Button>
  );
}; 