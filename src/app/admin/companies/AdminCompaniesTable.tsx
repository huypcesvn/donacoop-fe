'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditCompanyDialog from './AddEditCompanyDialog';
import DeleteCompanyAlertDialog from './DeleteCompanyAlertDialog';

interface CompanyType {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  type?: string;
}

interface AdminCompaniesTableProps {
  companies: CompanyType[];
  onEdit: (company: CompanyType) => Promise<boolean>;
  onDelete: (companyId: number) => void;
}

export default function AdminCompaniesTable({ companies, onEdit, onDelete }: AdminCompaniesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Postal Code</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className='text-center'>
              No companies found
            </TableCell>
          </TableRow>
        ) : (
          companies.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>
                <div>{c.email}</div>
                <div>{c.phone}</div>
              </TableCell>
              <TableCell>{c.address}</TableCell>
              <TableCell>{c.city}</TableCell>
              <TableCell>{c.postalCode}</TableCell>
              <TableCell>{c.type}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditCompanyDialog
                  mode='edit'
                  initialData={{
                    name: c.name,
                    email: c.email || '',
                    phone: c.phone || '',
                    address: c.address || '',
                    city: c.city || '',
                    postalCode: c.postalCode || '',
                    type: c.type || '',
                  }}
                  onSave={async (updated: {
                    name: string;
                    email?: string;
                    phone?: string;
                    address?: string;
                    city?: string;
                    postalCode?: string;
                    type?: string;
                  }) => {
                    return await onEdit({ id: c.id, ...updated });
                  }}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditCompanyDialog>

                <DeleteCompanyAlertDialog companyName={c.name} onConfirm={() => onDelete(c.id)}>
                  <Button
                    size='sm'
                    variant='outline'
                    className='flex justify-center items-center p-0 size-8 text-red-600 hover:text-red-700'
                  >
                    <Trash2 className='size-4' />
                  </Button>
                </DeleteCompanyAlertDialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
