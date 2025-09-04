'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditWarehouseDialog from './AddEditWarehouseDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface WarehouseType { id: number; name: string; company: { id: number; name: string } | null }

export default function AdminWarehousesTable({ items, onEdit, onDelete }: {
  items: WarehouseType[];
  onEdit: (item: WarehouseType) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className='text-center'>No warehouses found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell>{x.name}</TableCell>
              <TableCell>{x.company?.name ?? '-'}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditWarehouseDialog
                  mode='edit'
                  initialData={{ name: x.name, companyId: x.company?.id }}
                  onSave={async (updated) => onEdit({ ...x, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditWarehouseDialog>
                <DeleteConfirmDialog onConfirm={() => onDelete(x.id)} title="Delete Warehouse" description="Are you sure you want to delete this warehouse?">
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
