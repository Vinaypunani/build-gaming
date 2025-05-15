"use client";

import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Check, X, Search, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/ui/Button';

interface Category {
  id: number;
  name: string;
}

const initialCategories: Category[] = [
  { id: 1, name: 'Gaming PCs' },
  { id: 2, name: 'Components' },
  { id: 3, name: 'Accessories' },
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [editing, setEditing] = useState<Category | null>(null);
  const [showDelete, setShowDelete] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filtered = categories.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    setEditing(null);
    setFormValue('');
    setShowForm(true);
  };
  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setFormValue(cat.name);
    setShowForm(true);
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValue.trim()) {
      if (editing) {
        setCategories(cats => cats.map(c => c.id === editing.id ? { ...c, name: formValue.trim() } : c));
      } else {
        setCategories(cats => [...cats, { id: Date.now(), name: formValue.trim() }]);
      }
      setShowForm(false);
      setEditing(null);
      setFormValue('');
    }
  };
  const handleDelete = () => {
    if (showDelete) {
      setDeletingId(showDelete.id);
      setTimeout(() => { // Simulate async
        setCategories(cats => cats.filter(c => c.id !== showDelete.id));
        setShowDelete(null);
        setDeletingId(null);
      }, 800);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Category Management</h1>
          <Button onClick={handleAdd}>
            <PlusCircle size={18} className="mr-2" />
            Add Category
          </Button>
        </div>
        <p className="text-gray-400">Manage your product categories. You can create, edit, or delete categories from here.</p>
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
                placeholder="Search categories..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length > 0 ? filtered.map(cat => (
                  <tr key={cat.id} className="hover:bg-background/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold">{cat.name[0].toUpperCase()}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{cat.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleEdit(cat)} className="p-1 rounded-md text-gray-400 hover:text-primary hover:bg-background"><Edit size={18} /></button>
                        <button onClick={() => setShowDelete(cat)} className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-background"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={2} className="px-6 py-10 text-center text-gray-400">No categories found matching your search.</td>
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
                <h3 className="text-lg font-medium mb-4">{editing ? 'Edit Category' : 'Add Category'}</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category Name</label>
                    <input
                      type="text"
                      value={formValue}
                      onChange={e => setFormValue(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
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
                    >{editing ? 'Save Changes' : 'Add Category'}</button>
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
                <h3 className="text-lg font-medium mb-4">Delete Category</h3>
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

export default CategoriesPage; 