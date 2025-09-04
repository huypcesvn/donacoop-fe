'use client'

import React, { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddEditCompanyDialogProps {
  mode: 'add' | 'edit';
  initialData?: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    type?: string;
  };
  onSave: (data: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    type?: string;
  }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}

export default function AddEditCompanyDialog({ mode, initialData, onSave, children }: AddEditCompanyDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    postalCode: initialData?.postalCode || '',
    type: initialData?.type || '',
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          setForm({
            name: initialData?.name || '',
            email: initialData?.email || '',
            phone: initialData?.phone || '',
            address: initialData?.address || '',
            city: initialData?.city || '',
            postalCode: initialData?.postalCode || '',
            type: initialData?.type || '',
          });
        }
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Company' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Company' : 'Edit Company'}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className='gap-3 grid grid-cols-1 mt-4'>
          <Input placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder='Email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input placeholder='Phone' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input placeholder='Address' value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <Input placeholder='City' value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input placeholder='Postal Code' value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
          <Input placeholder='Type' value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              const ok = await onSave(form);
              if (ok !== false) setOpen(false);
            }}
          >
            Save
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
