"use client";

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { componentsData } from '@/lib/pc-builder-data';
import Layout from '@/components/layout/Layout';

const PAGE_SIZE = 8;

// Flatten all components into a single product list
const allProducts = Object.entries(componentsData).flatMap(([category, items]) =>
  (items as any[]).map(item => ({
    ...item,
    category,
    inStock: item.stock > 0,
    rating: item.rating || 4.5,
    oldPrice: item.discount ? item.price + item.discount : undefined,
  }))
);

const categories = [
  'All',
  ...Array.from(new Set(allProducts.map(p => p.category.charAt(0).toUpperCase() + p.category.slice(1))))
];

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'low-to-high', label: 'Price: Low to High' },
  { value: 'high-to-low', label: 'Price: High to Low' },
];

const getMinMaxPrice = (products: any[]) => {
  if (!products.length) return [0, 0];
  const prices = products.map(p => p.price);
  return [Math.min(...prices), Math.max(...prices)];
};

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState(() => getMinMaxPrice(allProducts));

  // Filtered and searched products
  const filteredProducts = useMemo(() => {
    let products = allProducts;
    if (category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search.trim()) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()))
      );
    }
    // Price filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    // Sort
    if (sort === 'low-to-high') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sort === 'high-to-low') {
      products = [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  }, [search, category, priceRange, sort]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
    // Reset price range when category changes
    if (cat === 'All') {
      setPriceRange(getMinMaxPrice(allProducts));
    } else {
      const catProducts = allProducts.filter(p => p.category.toLowerCase() === cat.toLowerCase());
      setPriceRange(getMinMaxPrice(catProducts));
    }
  };
  const handlePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = Number(e.target.value);
    setPriceRange(prev => idx === 0 ? [val, prev[1]] : [prev[0], val]);
    setPage(1);
  };

  // For price slider min/max
  const [minPrice, maxPrice] = useMemo(() => {
    if (category === 'All') return getMinMaxPrice(allProducts);
    const catProducts = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return getMinMaxPrice(catProducts);
  }, [category]);

  return (
    <Layout>
      <section className="py-16 bg-background min-h-screen">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-6 text-foreground">All Products</h1>
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              className="w-full md:w-1/3 px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => handleCategory(e.target.value)}
                  className="px-3 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {/* Sort Dropdown */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Sort By</label>
                <select
                  value={sort}
                  onChange={handleSort}
                  className="px-3 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {/* Price Range */}
              <div className="flex flex-col">
                <label className="block text-xs text-gray-400 mb-1">Price Range (₹)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={minPrice}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={e => handlePriceChange(e, 0)}
                    className="w-25 px-2 py-1 rounded-md border border-border bg-card text-foreground focus:outline-none"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={e => handlePriceChange(e, 1)}
                    className="w-25 px-2 py-1 rounded-md border border-border bg-card text-foreground focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">No products found.</div>
            ) : (
              paginatedProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => handlePage(page - 1)}
              >
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handlePage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => handlePage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage; 