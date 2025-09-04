'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditTruckDialog from './AddEditTruckDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface TruckType {
  id: number;
  licensePlate: string;
  code?: string;
  type?: string;
  group?: string;
  weighingMethod?: string;
  weighingPosition?: string;
  allowedLoad?: number | string;
  description?: string;
  company: { id: number; name: string } | null;
  driver: { id: number; fullName: string } | null;
}

export default function AdminTrucksTable({ items, onEdit, onDelete }: {
  items: TruckType[];
  onEdit: (item: TruckType) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plate</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Weighing</TableHead>
          <TableHead>Allowed Load</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className='text-center'>No trucks found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell>
                <div className='font-medium'>{x.licensePlate}</div>
                <div className='text-muted-foreground text-xs'>Code: {x.code}</div>
              </TableCell>
              <TableCell>{x.company?.name ?? '-'}</TableCell>
              <TableCell>{x.driver?.fullName ?? '-'}</TableCell>
              <TableCell>{x.type ?? '-'}</TableCell>
              <TableCell>
                <div>{x.weighingMethod}</div>
                <div className='text-muted-foreground text-xs'>{x.weighingPosition}</div>
              </TableCell>
              <TableCell>{x.allowedLoad}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditTruckDialog
                  mode='edit'
                  initialData={{
                    licensePlate: x.licensePlate,
                    code: x.code || '',
                    type: x.type || '',
                    group: x.group || '',
                    weighingMethod: x.weighingMethod || '',
                    weighingPosition: x.weighingPosition || '',
                    allowedLoad: typeof x.allowedLoad === 'number' ? x.allowedLoad : undefined,
                    description: x.description || '',
                    companyId: x.company?.id,
                    driverId: x.driver?.id,
                  }}
                  onSave={async (updated) => onEdit({ ...x, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditTruckDialog>
                <DeleteConfirmDialog onConfirm={() => onDelete(x.id)} title="Delete Truck" description="Are you sure you want to delete this truck?">
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
