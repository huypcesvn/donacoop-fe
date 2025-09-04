'use client'

import React, { useEffect, useState } from 'react';
import PaginationWrapper from '@/components/PaginationWrapper';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import AdminDeliveryPointsTable from './AdminDeliveryPointsTable';
import AddEditDeliveryPointDialog from './AddEditDeliveryPointDialog';

export default function AdminDeliveryPointsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchItems = async (page: number = 1, limitParam: number = 10, keywordParam?: string) => {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limitParam.toString(),
        ...(keywordParam && { keyword: keywordParam }),
      }).toString();

      const res = await fetch(`${API_URL}/delivery_points?${query}`, { credentials: 'include' });
      const { data, total, page: resPage, limit: resLimit, totalPages: resTotalPages } = await res.json();
      setItems((data || []).map((x: any) => ({ id: x.id, name: x.name, distance: x.distance ?? '-', company: x.company ? { id: x.company.id, name: x.company.name } : null })));
      setTotalItems(total || 0);
      setCurrentPage(resPage || page);
      setLimit(resLimit || limitParam);
      setTotalPages(resTotalPages || 1);
    } catch (err) {
      console.error(err);
      toast('Failed to fetch delivery points.');
    }
  };

  useEffect(() => {
    fetchItems(currentPage, limit, keyword);
  }, [currentPage, limit, keyword]);

  const handleSearch = () => {
    setKeyword(searchKeyword);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleAdd = async (payload: any) => {
    try {
      const res = await fetch(`${API_URL}/delivery_points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create delivery point');
      toast('Created successfully.');
      await fetchItems(currentPage, limit, keyword);
      return true;
    } catch (err) {
      console.error(err);
      toast('Unexpected error occurred.');
      return false;
    }
  };

  const handleEdit = async (payload: any) => {
    try {
      const { id, ...updateData } = payload;
      const res = await fetch(`${API_URL}/delivery_points/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Failed to update delivery point');
      toast('Updated successfully.');
      await fetchItems(currentPage, limit, keyword);
      return true;
    } catch (err) {
      console.error(err);
      toast('Unexpected error occurred.');
      return false;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/delivery_points/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete delivery point');
      toast('Deleted successfully.');
      if (items.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchItems(currentPage, limit, keyword);
      }
    } catch (err) {
      console.error(err);
      toast('Failed to delete delivery point.');
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold text-3xl'>Delivery Points</h1>
        <AddEditDeliveryPointDialog mode='add' onSave={handleAdd} />
      </div>
      <div className='flex gap-4 mb-4'>
        <Input
          placeholder='Search by name'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className='max-w-xs'
        />
      </div>
      <AdminDeliveryPointsTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        limit={limit}
        onPageChange={(page) => setCurrentPage(page)}
        onLimitChange={(l) => {
          setLimit(l);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
