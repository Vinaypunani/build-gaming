"use client";

import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/ui/Button';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { uploadImage } from '@/lib/cloudinary';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
  categoryId: string;
  category?: { id: string; name: string };
}

const ProductsPage = () => {
  const { products, loading: productsLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Add debug logging
  React.useEffect(() => {
    console.log('Categories:', categories);
    console.log('Categories Loading:', categoriesLoading);
  }, [categories, categoriesLoading]);

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editing, setEditing] = useState<Product | null>(null);
  const [showDelete, setShowDelete] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    setEditing(null);
    setForm({});
    setImageFile(null);
    setImagePreview(null);
    setShowForm(true);
  };

  const handleEdit = async (prod: Product) => {
    setEditing(prod);
    setForm({
      name: prod.name,
      price: prod.price,
      stock: prod.stock,
      description: prod.description,
      categoryId: prod.categoryId,
      image: prod.image
    });
    setImageFile(null);
    setImagePreview(prod.image || null);
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (name === 'image' && type === 'file') {
      const file = files[0];
      if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        // Clear the existing image URL when a new file is selected
        setForm(f => ({ ...f, image: '' }));
      }
    } else {
      setForm(f => ({ ...f, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.categoryId || !form.price || form.stock === undefined) return;

    setIsSubmitting(true);
    try {
      let imageUrl = form.image || '';
      
      // Only upload new image if a new file is selected
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (error) {
          console.error('Error uploading image:', error);
          // If image upload fails, keep the existing image URL
          if (editing) {
            imageUrl = editing.image || '';
          }
        }
      } else if (editing && !imagePreview) {
        // If editing and no new image selected, keep the existing image
        imageUrl = editing.image || '';
      }

      const productData = {
        name: form.name,
        price: form.price,
        stock: form.stock,
        description: form.description || '',
        categoryId: form.categoryId,
        image: imageUrl
      };

      if (editing) {
        await updateProduct(editing.id, productData);
      } else {
        await addProduct(productData);
      }
      setShowForm(false);
      setEditing(null);
      setForm({});
      setImageFile(null);
      setImagePreview(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (showDelete) {
      setDeletingId(showDelete.id);
      try {
        await deleteProduct(showDelete.id);
        setShowDelete(null);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <Button onClick={handleAdd}>
            <PlusCircle size={18} className="mr-2" />
            Add Product
          </Button>
        </div>
        <p className="text-gray-400">Manage your products. You can create, edit, or delete products from here.</p>
        <div className="bg-card border border-border p-4 rounded-lg">
          {/* Search bar */}
          <div className="flex mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 py-2 pr-4 block w-full rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            {productsLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 size={24} className="animate-spin text-primary" />
                <span className="ml-2 text-gray-400">Loading products...</span>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-background">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length > 0 ? filtered.map(prod => (
                    <tr key={prod.id} className="hover:bg-background/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary/20 text-primary rounded-full flex items-center justify-center overflow-hidden">
                            {prod.image ? (
                              <img src={prod.image} alt={prod.name} className="h-10 w-10 object-cover rounded-full" />
                            ) : (
                              <span className="text-lg font-semibold">{prod.name[0].toUpperCase()}</span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{prod.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{prod.category?.name || 'Uncategorized'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">₹{prod.price.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{prod.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleEdit(prod)} className="p-1 rounded-md text-gray-400 hover:text-primary hover:bg-background"><Edit size={18} /></button>
                          <button onClick={() => setShowDelete(prod)} className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-background"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-400">No products found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={() => setShowForm(false)}></div>
            <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium mb-4">{editing ? 'Edit Product' : 'Add Product'}</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name || ''}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    {categoriesLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 size={18} className="animate-spin text-primary" />
                        <span className="text-sm text-gray-400">Loading categories...</span>
                      </div>
                    ) : categories && categories.length > 0 ? (
                      <select
                        name="categoryId"
                        value={form.categoryId || ''}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-red-500">No categories available. Please add categories first.</div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Price (INR)</label>
                      <input
                        type="number"
                        name="price"
                        value={form.price || ''}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                        min="0"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={form.stock || ''}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                        min="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={form.description || ''}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Product Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      accept="image/*"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
                      </div>
                    )}
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-full inline-flex justify-center px-4 py-2 bg-background text-gray-400 border border-border rounded-md hover:bg-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                      disabled={isSubmitting}
                    >Cancel</button>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center px-4 py-2 bg-primary text-white border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin mr-2" />
                          {editing ? 'Saving...' : 'Adding...'}
                        </>
                      ) : (
                        editing ? 'Save Changes' : 'Add Product'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirm Modal */}
      {showDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={() => setShowDelete(null)}></div>
            <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium mb-4">Delete Product</h3>
                <p>Are you sure you want to delete <span className="font-semibold">{showDelete.name}</span>?</p>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setShowDelete(null)}
                    className="w-full inline-flex justify-center px-4 py-2 bg-background text-gray-400 border border-border rounded-md hover:bg-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                    disabled={deletingId === showDelete.id}
                  >Cancel</button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full inline-flex justify-center items-center px-4 py-2 bg-red-500 text-white border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    disabled={deletingId === showDelete.id}
                  >
                    {deletingId === showDelete.id ? <Loader2 size={18} className="animate-spin mr-2" /> : null}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProductsPage; 