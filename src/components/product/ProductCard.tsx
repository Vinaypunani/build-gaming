"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import Button from '../ui/Button';
import { CartButton } from '../cart/CartButton';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  rating,
  inStock
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border transition-all hover:shadow-md hover:shadow-primary/20 hover:border-primary/50">
      {/* Product Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <Link href={`/products/${id}`}>
          <div className="relative w-full h-full transition-transform group-hover:scale-105 duration-500">
            {imageError ? (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-primary font-medium">{name.slice(0, 15)}{name.length > 15 ? '...' : ''}</span>
              </div>
            ) : (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-secondary/90 text-white text-xs py-1 px-2 rounded">
          {category}
        </div>
        
        {/* Wishlist Button */}
        <button 
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
            isWishlisted ? 'bg-secondary text-white' : 'bg-card/80 backdrop-blur-sm text-white hover:bg-secondary/70'
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
        </button>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${id}`} className="block mb-1">
          <h3 className="font-medium text-foreground truncate hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < rating ? 'text-yellow-500' : 'text-gray-500'}`}>★</span>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">({rating.toFixed(1)})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="text-lg font-bold text-foreground">{formatPrice(price)}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
        
        <CartButton
          item={{
            id,
            name,
            price,
            image
          }}
          variant={inStock ? 'primary' : 'outline'}
          size="sm"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProductCard; 