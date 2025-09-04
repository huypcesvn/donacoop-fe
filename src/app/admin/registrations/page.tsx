'use client'

import React, { useEffect, useState } from 'react';
import PaginationWrapper from '@/components/PaginationWrapper';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import AdminRegistrationsTable from './AdminRegistrationsTable';
import AddEditRegistrationDialog from './AddEditRegistrationDialog';

export default function AdminRegistrationsPage() {
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

      const res = await fetch(`${API_URL}/registrations?${query}`, { credentials: 'include' });
      const { data, total, page: resPage, limit: resLimit, totalPages: resTotalPages } = await res.json();
      setItems((data || []).map((x: any) => ({
        id: x.id,
        tripNumber: x.tripNumber ?? '-',
        arrivalDate: x.arrivalDate ?? '-',
        arrivalTime: x.arrivalTime ?? '-',
        distance: x.distance ?? '-',
        revenueType: x.revenueType ?? '-',
        truck: x.truck ? { id: x.truck.id, licensePlate: x.truck.licensePlate } : null,
        stoneType: x.stoneType ? { id: x.stoneType.id, name: x.stoneType.name } : null,
        pickupPosition: x.pickupPosition ? { id: x.pickupPosition.id, name: x.pickupPosition.name } : null,
        buyerCompany: x.buyerCompany ? { id: x.buyerCompany.id, name: x.buyerCompany.name } : null,
        destination: x.destination ? { id: x.destination.id, name: x.destination.name } : null,
        destinationWarehouse: x.destinationWarehouse ? { id: x.destinationWarehouse.id, name: x.destinationWarehouse.name } : null,
      })));
      setTotalItems(total || 0);
      setCurrentPage(resPage || page);
      setLimit(resLimit || limitParam);
      setTotalPages(resTotalPages || 1);
    } catch (err) {
      console.error(err);
      toast('Failed to fetch registrations.');
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
      const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create registration');
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
      const res = await fetch(`${API_URL}/registrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Failed to update registration');
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
      const res = await fetch(`${API_URL}/registrations/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete registration');
      toast('Deleted successfully.');
      if (items.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchItems(currentPage, limit, keyword);
      }
    } catch (err) {
      console.error(err);
      toast('Failed to delete registration.');
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold text-3xl'>Registrations</h1>
        <AddEditRegistrationDialog mode='add' onSave={handleAdd} />
      </div>
      <div className='flex gap-4 mb-4'>
        <Input
          placeholder='Search by trip number or plate'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className='max-w-xs'
        />
      </div>
      <AdminRegistrationsTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
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
