'use client'

import React, { useEffect, useState } from 'react';
import AdminEmployeesTable from './AdminEmployeesTable';
import AddEditEmployeeDialog from './AddEditEmployeeDialog';
import { toast } from 'sonner';
import PaginationWrapper from '@/components/PaginationWrapper';

export default function AdminEmployeesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [users, setUsers] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUsers = async (page: number = 1, limit: number = 10) => {
    try {
      const res = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`, { credentials: 'include' });
      const { data, total, page: resPage, limit: resLimit, totalPages } = await res.json();
      setUsers(
        data.map((u: any) => ({
          id: u.id,
          fullName: u.fullName,
          username: u.username,
          email: u.personalEmail ?? '-',
          currentJob: u.currentJob ?? '-',
          address: u.address ?? '-',
          city: u.city ?? '-',
          role: u.roles?.[0]?.name ?? '-',
        }))
      );
      setTotalItems(total);
      setCurrentPage(resPage);
      setLimit(resLimit);
      setTotalPages(totalPages);
    } catch (err) {
      console.error(err);
      toast('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, limit);
  }, [currentPage, limit]);

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
      await fetchUsers(currentPage, limit);
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
        const message = errorData.message || errorData.error || 'Failed to update user.';
        toast(message);
        return false;
      }

      toast(`User [${user.username}] updated successfully.`);
      await fetchUsers(currentPage, limit);
      return true;
    } catch (err) {
      console.error(err);
      toast('Unexpected error occurred.');
      return false;
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
      // Nếu trang hiện tại không còn dữ liệu sau khi xóa, chuyển về trang trước
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchUsers(currentPage, limit);
      }
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
      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        limit={limit}
        onPageChange={setCurrentPage}
        itemName='employees'
      />
    </div>
  );
}
