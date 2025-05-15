export interface Category {
  id: string;
  name: string;
}

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  const addCategory = async (name: string) => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      toast.success('Category added successfully!');
      await fetchCategories();
    } catch (err) {
      toast.error('Failed to add category.');
    }
  };

  const updateCategory = async (id: string, name: string) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      toast.success('Category updated successfully!');
      await fetchCategories();
    } catch (err) {
      toast.error('Failed to update category.');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      toast.success('Category deleted successfully!');
      await fetchCategories();
    } catch (err) {
      toast.error('Failed to delete category.');
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  return { categories, loading, addCategory, updateCategory, deleteCategory, fetchCategories };
} 