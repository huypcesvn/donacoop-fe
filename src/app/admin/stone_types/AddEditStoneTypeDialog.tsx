'use client'

import React, { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AddEditStoneTypeDialog({
  mode,
  initialData,
  onSave,
  children,
}: {
  mode: 'add' | 'edit';
  initialData?: { name: string };
  onSave: (data: { name: string }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: initialData?.name || '' });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) setForm({ name: initialData?.name || '' });
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Stone Type' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Stone Type' : 'Edit Stone Type'}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className='gap-3 grid grid-cols-1 mt-4'>
          <Input placeholder='Name' value={form.name} onChange={(e) => setForm({ name: e.target.value })} />
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
