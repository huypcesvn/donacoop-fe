'use client'

import React, { useEffect, useState } from 'react';
import PaginationWrapper from '@/components/PaginationWrapper';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import AddEditCompanyDialog from './AddEditCompanyDialog';
import AdminCompaniesTable from './AdminCompaniesTable';

export default function AdminCompaniesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [companies, setCompanies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchCompanies = async (page: number = 1, limitParam: number = 10, keywordParam?: string) => {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limitParam.toString(),
        ...(keywordParam && { keyword: keywordParam }),
      }).toString();

      const res = await fetch(`${API_URL}/companies?${query}`, { credentials: 'include' });
      const { data, total, page: resPage, limit: resLimit, totalPages: resTotalPages } = await res.json();
      setCompanies(
        (data || []).map((c: any) => ({
          id: c.id,
          name: c.name,
          email: c.email ?? '-',
          phone: c.phone ?? '-',
          address: c.address ?? '-',
          city: c.city ?? '-',
          postalCode: c.postalCode ?? '-',
          type: c.type ?? '-',
        }))
      );
      setTotalItems(total || 0);
      setCurrentPage(resPage || page);
      setLimit(resLimit || limitParam);
      setTotalPages(resTotalPages || 1);
    } catch (err) {
      console.error(err);
      toast('Failed to fetch companies.');
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage, limit, keyword);
  }, [currentPage, limit, keyword]);

  const handleSearch = () => {
    setKeyword(searchKeyword);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleAdd = async (company: any) => {
    try {
      const res = await fetch(`${API_URL}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(company),
      });
      if (!res.ok) throw new Error('Failed to create company');
      toast('Created successfully.');
      await fetchCompanies(currentPage, limit, keyword);
      return true;
    } catch (err) {
      console.error(err);
      toast('Unexpected error occurred.');
      return false;
    }
  };

  const handleEdit = async (company: any) => {
    try {
      const { id, ...updateData } = company;
      const res = await fetch(`${API_URL}/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Failed to update company');
      toast('Updated successfully.');
      await fetchCompanies(currentPage, limit, keyword);
      return true;
    } catch (err) {
      console.error(err);
      toast('Unexpected error occurred.');
      return false;
    }
  };

  const handleDelete = async (companyId: number) => {
    try {
      const res = await fetch(`${API_URL}/companies/${companyId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete company');
      toast('Deleted successfully.');
      if (companies.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchCompanies(currentPage, limit, keyword);
      }
    } catch (err) {
      console.error(err);
      toast('Failed to delete company.');
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold text-3xl'>Company Management</h1>
        <AddEditCompanyDialog mode='add' onSave={handleAdd} />
      </div>
      <div className='flex gap-4 mb-4'>
        <Input
          placeholder='Search by name, email, city...'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className='max-w-xs'
        />
      </div>
      <AdminCompaniesTable companies={companies} onEdit={handleEdit} onDelete={handleDelete} />
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
