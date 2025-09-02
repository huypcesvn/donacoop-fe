'use client'

import React, { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddEditEmployeeDialogProps {
  mode: 'add' | 'edit';
  initialData?: {
    fullName: string
    username: string
    email: string
    role: string
    currentJob?: string
    address?: string
    city?: string
  };
  onSave: (data: {
    fullName: string
    username: string
    email: string
    role: string
    currentJob?: string
    address?: string
    city?: string
  }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}

// Retrieve from api later
const roleDefs = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'Accountant' },
  { id: 4, name: 'Mine Director' },
  { id: 5, name: 'Mine Manager' },
  { id: 6, name: 'Driver' },
];

export default function AddEditEmployeeDialog({
  mode,
  initialData,
  onSave,
  children,
}: AddEditEmployeeDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: initialData?.fullName || '',
    username: initialData?.username || '',
    email: initialData?.email || '',
    role: initialData?.role ? roleDefs.find((r) => r.name === initialData.role)?.id.toString() || '' : '',
    currentJob: initialData?.currentJob || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          // reset form mỗi lần mở dialog
          setForm({
            fullName: initialData?.fullName || '',
            username: initialData?.username || '',
            email: initialData?.email || '',
            role: initialData?.role ? roleDefs.find((r) => r.name === initialData.role)?.id.toString() || '' : '',
            currentJob: initialData?.currentJob || '',
            address: initialData?.address || '',
            city: initialData?.city || '',
          });
        }
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Employee' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Employee' : 'Edit Employee'}</AlertDialogTitle>
        </AlertDialogHeader>

        <div className='flex flex-col gap-3'>
          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>Full Name</label>
            <Input
              placeholder='Full Name'
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>Username</label>
            <Input
              placeholder='Username'
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>Email</label>
            <Input
              placeholder='Email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>Role</label>
            <Select
              value={form.role}
              disabled={initialData?.role === 'Admin'}
              onValueChange={(value) => setForm({ ...form, role: value })}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                {roleDefs.map(role => (
                  <SelectItem value={role.id.toString()} key={role.id}>{role.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>Current Job</label>
            <Input
              placeholder='Current Job'
              value={form.currentJob}
              onChange={(e) => setForm({ ...form, currentJob: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>Address</label>
            <Input
              placeholder='Address'
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>City</label>
            <Input
              placeholder='City'
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
        </div>

        <div className='flex justify-end gap-2 mt-3'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              const success = await onSave(form); // success: boolean
              if (success) setOpen(false);
            }}
          >
            {mode === 'add' ? 'Add' : 'Save'}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
