"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { CartButton } from '@/components/cart/CartButton';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: { id: string; name: string };
  description?: string;
  stock: number;
}

const SingleProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setProduct(data);
        } else {
          setError(data.error || 'Product not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product');
        setLoading(false);
      });
  }, [id]);

  const handleDecrease = () => {
    setQuantity(q => Math.max(1, q - 1));
  };
  const handleIncrease = () => {
    if (product) setQuantity(q => Math.min(product.stock, q + 1));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh] text-gray-400">Loading product...</div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500">
          <div className="mb-4">{error || 'Product not found.'}</div>
          <Button onClick={() => router.push('/products')}>Back to Products</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="relative w-full h-96 bg-card rounded-lg overflow-hidden border border-border flex items-center justify-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary font-bold text-2xl">
                {product.name[0]}
              </div>
            )}
          </div>
          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">{product.name}</h1>
            <div className="mb-2 text-sm text-gray-400">Category: {product.category?.name || 'Uncategorized'}</div>
            <div className="mb-4 text-lg font-bold text-primary">₹{product.price.toLocaleString()}</div>
            <div className="mb-4 text-gray-400">{product.description}</div>
            <div className="mb-4 text-xs text-gray-400">Stock: {product.stock}</div>
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-gray-400">Quantity:</span>
              <button
                className="px-3 py-1 rounded bg-background border border-border text-lg font-bold text-primary disabled:opacity-50"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >-</button>
              <span className="px-4 text-lg font-medium">{quantity}</span>
              <button
                className="px-3 py-1 rounded bg-background border border-border text-lg font-bold text-primary disabled:opacity-50"
                onClick={handleIncrease}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >+</button>
            </div>
            <div className="flex gap-4">
              <CartButton
                item={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image || '',
                }}
                quantity={quantity}
                variant={product.stock > 0 ? 'primary' : 'outline'}
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
              />
              <Button variant="outline" size="lg" onClick={() => router.push('/products')}>Back</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingleProductPage; 