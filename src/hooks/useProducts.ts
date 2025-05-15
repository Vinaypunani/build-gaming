export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
  categoryId: string;
  category?: { id: string; name: string };
}

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const addProduct = async (product: any) => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      toast.success('Product added successfully!');
      await fetchProducts();
    } catch (err) {
      toast.error('Failed to add product.');
    }
  };

  const updateProduct = async (id: string, product: any) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      toast.success('Product updated successfully!');
      await fetchProducts();
    } catch (err) {
      toast.error('Failed to update product.');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete product');
      }
      
      toast.success(data.message || 'Product deleted successfully!');
      await fetchProducts();
    } catch (err) {
      console.error('Delete product error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete product');
      throw err;
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return { products, loading, addProduct, updateProduct, deleteProduct, fetchProducts };
} 