'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditDeliveryPointDialog from './AddEditDeliveryPointDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface DeliveryPointType { id: number; name: string; distance?: number | string; company: { id: number; name: string } | null }

export default function AdminDeliveryPointsTable({ items, onEdit, onDelete }: {
  items: DeliveryPointType[];
  onEdit: (item: DeliveryPointType) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Distance (km)</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className='text-center'>No delivery points found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell>{x.name}</TableCell>
              <TableCell>{x.distance ?? '-'}</TableCell>
              <TableCell>{x.company?.name ?? '-'}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditDeliveryPointDialog
                  mode='edit'
                  initialData={{ name: x.name, distance: typeof x.distance === 'number' ? x.distance : undefined, companyId: x.company?.id }}
                  onSave={async (updated) => onEdit({ ...x, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditDeliveryPointDialog>
                <DeleteConfirmDialog onConfirm={() => onDelete(x.id)} title="Delete Delivery Point" description="Are you sure you want to delete this delivery point?">
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
