"use client";

import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/ui/Button';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Gaming Beast', category: 'Gaming PCs', price: 89999, stock: 5, image: '/about.webp' },
  { id: 2, name: 'RTX 4090 GPU', category: 'Components', price: 159999, stock: 2, image: '' },
  { id: 3, name: 'RGB Keyboard', category: 'Accessories', price: 2999, stock: 20, image: '' },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editing, setEditing] = useState<Product | null>(null);
  const [showDelete, setShowDelete] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditing(null);
    setForm({});
    setImageFile(null);
    setImagePreview(null);
    setShowForm(true);
  };
  const handleEdit = (prod: Product) => {
    setEditing(prod);
    setForm(prod);
    setImageFile(null);
    setImagePreview(prod.image || null);
    setShowForm(true);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (name === 'image' && type === 'file') {
      const file = files[0];
      setImageFile(file);
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm(f => ({ ...f, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let img = imagePreview || '';
    if (form.name && form.category && form.price && form.stock !== undefined) {
      if (editing) {
        setProducts(ps => ps.map(p => p.id === editing.id ? { ...editing, ...form, image: img } as Product : p));
      } else {
        setProducts(ps => [...ps, { ...form, id: Date.now(), image: img } as Product]);
      }
      setShowForm(false);
      setEditing(null);
      setForm({});
      setImageFile(null);
      setImagePreview(null);
    }
  };
  const handleDelete = () => {
    if (showDelete) {
      setDeletingId(showDelete.id);
      setTimeout(() => {
        setProducts(ps => ps.filter(p => p.id !== showDelete.id));
        setShowDelete(null);
        setDeletingId(null);
      }, 800);
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{prod.category}</td>
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
                    <input
                      type="text"
                      name="category"
                      value={form.category || ''}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
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
                        min={0}
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
                        min={0}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Product Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-md border" />
                    )}
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-full inline-flex justify-center px-4 py-2 bg-background text-gray-400 border border-border rounded-md hover:bg-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                    >Cancel</button>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center px-4 py-2 bg-primary text-white border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >{editing ? 'Save Changes' : 'Add Product'}</button>
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
                    className="w-full inline-flex justify-center px-4 py-2 bg-red-500 text-white border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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