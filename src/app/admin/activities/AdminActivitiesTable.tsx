'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditActivityDialog from './AddEditActivityDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface ActivityType {
  id: number;
  revenueType?: string;
  gateInTime?: string;
  gateOutTime?: string;
  truck: { id: number; licensePlate: string } | null;
  stoneType: { id: number; name: string } | null;
  pickupPosition: { id: number; name: string } | null;
  buyerCompany: { id: number; name: string } | null;
  registration: { id: number } | null;
}

export default function AdminActivitiesTable({ items, onEdit, onDelete }: {
  items: ActivityType[];
  onEdit: (payload: { id: number; revenueType?: string; gateInTime?: string; gateOutTime?: string; truckId?: number; stoneTypeId?: number | null; pickupPositionId?: number | null; buyerCompanyId?: number | null; registrationId?: number | null; }) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Truck</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Gate In</TableHead>
          <TableHead>Gate Out</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className='text-center'>No activities found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell>{x.truck?.licensePlate ?? '-'}</TableCell>
              <TableCell>{x.revenueType ?? '-'}</TableCell>
              <TableCell>{x.gateInTime ?? '-'}</TableCell>
              <TableCell>{x.gateOutTime ?? '-'}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditActivityDialog
                  mode='edit'
                  initialData={{
                    revenueType: x.revenueType || '',
                    gateInTime: x.gateInTime || '',
                    gateOutTime: x.gateOutTime || '',
                    truckId: x.truck?.id,
                    stoneTypeId: x.stoneType?.id,
                    pickupPositionId: x.pickupPosition?.id,
                    buyerCompanyId: x.buyerCompany?.id,
                    registrationId: x.registration?.id,
                  }}
                  onSave={async (updated) => onEdit({ id: x.id, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditActivityDialog>
                <DeleteConfirmDialog
                  onConfirm={() => onDelete(x.id)}
                  title="Delete Activity"
                  description="Are you sure you want to delete this activity? This action cannot be undone."
                >
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
