"use client";

import { useState } from 'react';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';
import { useProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  // For demo, show the first 8 products as featured
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-card">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of high-performance PC components and accessories
          </p>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-400 py-12">Loading products...</div>
          ) : featuredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">No featured products found.</div>
          ) : (
            featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                image={product.image || ''}
                category={product.category || { id: '', name: 'Uncategorized' }}
              />
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <Button href="/products" variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 