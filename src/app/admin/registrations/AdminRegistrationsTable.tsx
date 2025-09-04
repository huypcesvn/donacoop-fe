'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import AddEditRegistrationDialog from './AddEditRegistrationDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface RegistrationType {
  id: number;
  tripNumber?: number | string;
  arrivalDate?: string;
  arrivalTime?: string;
  distance?: number | string;
  revenueType?: string;
  truck: { id: number; licensePlate: string } | null;
  stoneType: { id: number; name: string } | null;
  pickupPosition: { id: number; name: string } | null;
  buyerCompany: { id: number; name: string } | null;
  destination: { id: number; name: string } | null;
  destinationWarehouse: { id: number; name: string } | null;
}

export default function AdminRegistrationsTable({ items, onEdit, onDelete }: {
  items: RegistrationType[];
  onEdit: (item: RegistrationType) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trip</TableHead>
          <TableHead>Truck</TableHead>
          <TableHead>Stone Type</TableHead>
          <TableHead>Pickup</TableHead>
          <TableHead>Buyer</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className='text-center'>No registrations found</TableCell>
          </TableRow>
        ) : (
          items.map((x) => (
            <TableRow key={x.id}>
              <TableCell>
                <div>{x.tripNumber}</div>
                <div className='text-muted-foreground text-xs'>{x.arrivalDate} {x.arrivalTime}</div>
              </TableCell>
              <TableCell>{x.truck?.licensePlate ?? '-'}</TableCell>
              <TableCell>{x.stoneType?.name ?? '-'}</TableCell>
              <TableCell>{x.pickupPosition?.name ?? '-'}</TableCell>
              <TableCell>{x.buyerCompany?.name ?? '-'}</TableCell>
              <TableCell>{x.destination?.name ?? x.destinationWarehouse?.name ?? '-'}</TableCell>
              <TableCell>{x.revenueType ?? '-'}</TableCell>
              <TableCell className='flex gap-2'>
                <AddEditRegistrationDialog
                  mode='edit'
                  initialData={{
                    tripNumber: typeof x.tripNumber === 'number' ? x.tripNumber : undefined,
                    arrivalDate: x.arrivalDate || '',
                    arrivalTime: x.arrivalTime || '',
                    distance: typeof x.distance === 'number' ? x.distance : undefined,
                    revenueType: x.revenueType || '',
                    truckId: x.truck?.id,
                    stoneTypeId: x.stoneType?.id,
                    pickupPositionId: x.pickupPosition?.id,
                    buyerCompanyId: x.buyerCompany?.id,
                    destinationId: x.destination?.id,
                    destinationWarehouseId: x.destinationWarehouse?.id,
                  }}
                  onSave={async (updated) => onEdit({ ...x, ...updated })}
                >
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                    <Edit className='size-4' />
                  </Button>
                </AddEditRegistrationDialog>
                <DeleteConfirmDialog onConfirm={() => onDelete(x.id)} title="Delete Registration" description="Are you sure you want to delete this registration?">
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
