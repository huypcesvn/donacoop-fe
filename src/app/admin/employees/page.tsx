/* eslint-disable */
'use client'

import React, { useEffect, useState } from 'react';
import AdminEmployeesTable from './AdminEmployeesTable';
import AddEditEmployeeDialog from './AddEditEmployeeDialog';
import PaginationWrapper from '@/components/PaginationWrapper';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminEmployeesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState(''); // State tạm thời cho input
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<any[]>([]);

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${API_URL}/roles`, { credentials: 'include' });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) setRoles(data);
    } catch (err) {
      console.error(err);
      toast('Failed to fetch roles.');
    }
  };

  const fetchUsers = async (page: number = 1, limit: number = 10, keyword: string = '', role: string = '') => {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(keyword && { keyword }),
        ...(role && role !== 'all' && { role }),
      }).toString();
      console.log(`Fetching: ${API_URL}/users?${query}`);
      const res = await fetch(`${API_URL}/users?${query}`, { credentials: 'include' });
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
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchUsers(currentPage, limit, keyword, role);
  }, [currentPage, limit, keyword, role]); // Giữ keyword trong dependencies để gọi lại khi nhấn Enter

  const handleSearch = () => {
    setKeyword(searchKeyword); // Cập nhật keyword khi nhấn Enter
    setCurrentPage(1); // Reset về trang 1
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchKeyword.trim()) handleSearch();
  };

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
      await fetchUsers(currentPage, limit, keyword, role);
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
      await fetchUsers(currentPage, limit, keyword, role);
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
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchUsers(currentPage, limit, keyword, role);
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
      <div className='flex gap-4 mb-4'>
        <Input
          placeholder='Search by name or email'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className='max-w-xs'
        />
        <Select value={role} onValueChange={(value) => {
          setRole(value);
          setCurrentPage(1);
        }}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Roles</SelectItem>
            {roles.map((r) => (
              <SelectItem key={r.id} value={r.name}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
