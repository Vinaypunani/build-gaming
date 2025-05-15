"use client";

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import UserTable from '@/components/admin/UserTable';
import CreateUserForm from '@/components/admin/CreateUserForm';
import Button from '@/components/ui/Button';

const UsersPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateUser = () => {
    setShowCreateForm(true);
  };

  const handleUserCreated = () => {
    setShowCreateForm(false);
    // Trigger a refresh of the user table by incrementing the refresh counter
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={handleCreateUser}>
            <PlusCircle size={18} className="mr-2" />
            Add User
          </Button>
        </div>
        
        <p className="text-gray-400">
          Manage your website users. You can create, edit, or delete users from here.
        </p>

        <div className="bg-card border border-border p-4 rounded-lg">
          <UserTable key={`user-table-${refreshTrigger}`} />
        </div>
      </div>

      {showCreateForm && (
        <CreateUserForm 
          onUserCreated={handleUserCreated}
          onCancel={() => setShowCreateForm(false)} 
        />
      )}
    </AdminLayout>
  );
};

export default UsersPage; 