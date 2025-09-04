'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditStockDialog from './AddEditStockDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface StockType { id: number; quantity: number; warehouse: { id: number; name: string } | null; stoneType: { id: number; name: string } | null }

export default function AdminStocksTable({ items, onEdit, onDelete }: {
  items: StockType[];
  onEdit: (item: StockType) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Warehouse</TableHead>
          <TableHead>Stone Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className='text-center'>No stocks found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell>{x.warehouse?.name ?? '-'}</TableCell>
              <TableCell>{x.stoneType?.name ?? '-'}</TableCell>
              <TableCell>{x.quantity}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditStockDialog
                  mode='edit'
                  initialData={{ quantity: x.quantity, warehouseId: x.warehouse?.id, stoneTypeId: x.stoneType?.id }}
                  onSave={async (updated) => onEdit({ ...x, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditStockDialog>
                <DeleteConfirmDialog onConfirm={() => onDelete(x.id)} title="Delete Stock" description="Are you sure you want to delete this stock?">
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
