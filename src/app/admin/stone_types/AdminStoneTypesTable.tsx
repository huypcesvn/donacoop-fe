'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditStoneTypeDialog from './AddEditStoneTypeDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface ItemType { id: number; name: string }

export default function AdminStoneTypesTable({ items, onEdit, onDelete }: {
  items: ItemType[];
  onEdit: (item: ItemType) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className='text-center'>No stone types found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell>{x.name}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditStoneTypeDialog
                  mode='edit'
                  initialData={{ name: x.name }}
                  onSave={async (updated) => onEdit({ ...x, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditStoneTypeDialog>
                <DeleteConfirmDialog onConfirm={() => onDelete(x.id)} title="Delete Stone Type" description="Are you sure you want to delete this stone type?">
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
