'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditMachineryDialog from './AddEditMachineryDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface MachineryType {
  id: number;
  name: string;
  account?: string;
  description?: string;
  company: { id: number; name: string } | null;
  driver: { id: number; fullName: string } | null;
}

export default function AdminMachineriesTable({ items, onEdit, onDelete }: {
  items: MachineryType[];
  onEdit: (item: MachineryType) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className='text-center'>No machineries found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell className='font-medium'>{x.name}</TableCell>
              <TableCell>{x.company?.name ?? '-'}</TableCell>
              <TableCell>{x.driver?.fullName ?? '-'}</TableCell>
              <TableCell>{x.account ?? '-'}</TableCell>
              <TableCell>{x.description ?? '-'}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditMachineryDialog
                  mode='edit'
                  initialData={{
                    name: x.name,
                    account: x.account || '',
                    description: x.description || '',
                    companyId: x.company?.id,
                    driverId: x.driver?.id,
                  }}
                  onSave={async (updated) => onEdit({ ...x, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditMachineryDialog>
                <DeleteConfirmDialog onConfirm={() => onDelete(x.id)} title="Delete Machinery" description="Are you sure you want to delete this machinery?">
                  <Button
                    size='sm'
                    variant='outline'
                    className='flex justify-center items-center p-0 size-8 text-red-600 hover:text-red-700'
                  >
                    <Trash2 className='size-4' />
                  </Button>
                </DeleteConfirmDialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

