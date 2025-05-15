"use client";

import { useState } from 'react';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'popular' | 'newest'>('trending');
  
  // Mock product data - in a real app, this would come from an API
  const products = {
    trending: [
      {
        id: 'gpu-rtx4080',
        name: 'NVIDIA GeForce RTX 4080 16GB',
        price: 109999,
        oldPrice: 129999,
        image: '/images/products/rtx4080.jpg',
        category: 'Graphics Card',
        rating: 4.8,
        inStock: true
      },
      {
        id: 'cpu-i9-13900k',
        name: 'Intel Core i9-13900K',
        price: 54999,
        oldPrice: 59999,
        image: '/images/products/i9-13900k.jpg',
        category: 'Processor',
        rating: 4.9,
        inStock: true
      },
      {
        id: 'ram-corsair-32gb',
        name: 'Corsair Vengeance RGB 32GB DDR5',
        price: 12999,
        image: '/images/products/corsair-ram.jpg',
        category: 'RAM',
        rating: 4.7,
        inStock: true
      },
      {
        id: 'case-nzxt-h7',
        name: 'NZXT H7 Flow Gaming Case',
        price: 14999,
        oldPrice: 16999,
        image: '/images/products/nzxt-h7.jpg',
        category: 'Case',
        rating: 4.6,
        inStock: true
      }
    ],
    popular: [
      {
        id: 'monitor-asus-27',
        name: 'ASUS ROG Swift 27" 240Hz Gaming Monitor',
        price: 49999,
        oldPrice: 54999,
        image: '/images/products/asus-monitor.jpg',
        category: 'Monitor',
        rating: 4.7,
        inStock: true
      },
      {
        id: 'cpu-ryzen-7950x',
        name: 'AMD Ryzen 9 7950X',
        price: 49999,
        image: '/images/products/ryzen-7950x.jpg',
        category: 'Processor',
        rating: 4.8,
        inStock: true
      },
      {
        id: 'keyboard-steelseries',
        name: 'SteelSeries Apex Pro TKL Mechanical Keyboard',
        price: 15999,
        oldPrice: 17999,
        image: '/images/products/steelseries-keyboard.jpg',
        category: 'Keyboard',
        rating: 4.6,
        inStock: false
      },
      {
        id: 'motherboard-asus-z790',
        name: 'ASUS ROG Maximus Z790 Hero',
        price: 49999,
        image: '/images/products/asus-motherboard.jpg',
        category: 'Motherboard',
        rating: 4.5,
        inStock: true
      }
    ],
    newest: [
      {
        id: 'gpu-rx7900xtx',
        name: 'AMD Radeon RX 7900 XTX 24GB',
        price: 99999,
        image: '/images/products/rx7900xtx.jpg',
        category: 'Graphics Card',
        rating: 4.7,
        inStock: true
      },
      {
        id: 'ssd-samsung-990-pro',
        name: 'Samsung 990 PRO 2TB NVMe SSD',
        price: 19999,
        oldPrice: 22999,
        image: '/images/products/samsung-ssd.jpg',
        category: 'Storage',
        rating: 4.9,
        inStock: true
      },
      {
        id: 'headset-hyperx',
        name: 'HyperX Cloud Alpha Wireless Headset',
        price: 14999,
        image: '/images/products/hyperx-headset.jpg',
        category: 'Headset',
        rating: 4.5,
        inStock: true
      },
      {
        id: 'cooler-nzxt-kraken',
        name: 'NZXT Kraken Elite 360mm AIO Cooler',
        price: 17999,
        oldPrice: 19999,
        image: '/images/products/nzxt-cooler.jpg',
        category: 'Cooling',
        rating: 4.6,
        inStock: false
      }
    ]
  };

  const tabData = [
    { id: 'trending', label: 'Trending Products' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'newest', label: 'New Arrivals' },
  ];

  const activeProducts = products[activeTab];

  return (
    <section className="py-20 bg-card">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of high-performance PC components and accessories
          </p>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mt-8 mb-10 gap-2">
            {tabData.map(tab => (
              <button
                key={tab.id}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white' 
                    : 'bg-background hover:bg-background/80 text-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id as 'trending' | 'popular' | 'newest')}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image}
              category={product.category}
              rating={product.rating}
              inStock={product.inStock}
            />
          ))}
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