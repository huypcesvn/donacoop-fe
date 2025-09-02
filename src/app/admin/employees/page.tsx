'use client'

import React, { useEffect, useState } from 'react';
import AdminEmployeesTable from './AdminEmployeesTable';
import AddEditEmployeeDialog from './AddEditEmployeeDialog';
import { toast } from 'sonner';

export default function AdminEmployeesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, { credentials: 'include' });
      const data = await res.json();
      setUsers(data.map((u: any) => ({
        id: u.id,
        fullName: u.fullName,
        username: u.username,
        email: u.personalEmail ?? '-',
        currentJob: u.currentJob ?? '-',
        address: u.address ?? '-',
        city: u.city ?? '-',
        role: u.roles?.[0]?.name ?? '-'
      })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (user: any) => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName: user.fullName,
          username: user.username,
          personalEmail: user.email,
          currentJob: user.currentJob,
          address: user.address,
          city: user.city,
          roles: [Number(user.role)],
        }),
      });

      if (!res.ok) {
        toast('Failed to create user');
        return false;
      }
      toast(`User [${user.username}] created successfully.`);
      await fetchUsers();
      return true;
    } catch (err) {
      console.error(err);
      toast('Unexpected error occurred.');
      return false;
    }
  };

  const handleEdit = async (user: any): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName: user.fullName,
          username: user.username,
          personalEmail: user.email,
          currentJob: user.currentJob,
          address: user.address,
          city: user.city,
          roles: [Number(user.role)],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message =
          errorData.message || errorData.error || 'Failed to update user.';
        toast(message);
        return false; // thất bại
      }

      toast(`User [${user.username}] updated successfully.`);
      await fetchUsers();
      return true; // thành công
    } catch (err) {
      console.error(err);
      toast('Unexpected error occurred.');
      return false; // thất bại
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        toast('Failed to delete user.');
        throw new Error('Failed to delete user.');
      }
      toast(`Deleted successfully.`);
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold text-3xl'>Employee Management</h1>
        <AddEditEmployeeDialog mode='add' onSave={handleAdd} />
      </div>
      <AdminEmployeesTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
