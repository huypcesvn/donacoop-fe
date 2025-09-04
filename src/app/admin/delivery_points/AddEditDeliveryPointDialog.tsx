'use client'

import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AddEditDeliveryPointDialog({
  mode,
  initialData,
  onSave,
  children,
}: {
  mode: 'add' | 'edit';
  initialData?: { name: string; distance?: number; companyId?: number };
  onSave: (data: { name: string; distance?: number; companyId: number }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: initialData?.name || '', distance: initialData?.distance, companyId: initialData?.companyId });
  const [companies, setCompanies] = useState<any[]>([]);

  const loadOptions = async () => {
    try {
      const res = await fetch(`${API_URL}/companies?limit=1000`, { credentials: 'include' });
      const data = await res.json();
      setCompanies((data.data || data) ?? []);
    } catch (err) {
      console.error(err);
      toast('Failed to load companies');
    }
  };

  useEffect(() => {
    if (open) loadOptions();
  }, [open]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) setForm({ name: initialData?.name || '', distance: initialData?.distance, companyId: initialData?.companyId });
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Delivery Point' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Delivery Point' : 'Edit Delivery Point'}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className='gap-3 grid grid-cols-1 md:grid-cols-2 mt-4'>
          <Input placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder='Distance (km)' type='number' value={form.distance ?? ''} onChange={(e) => setForm({ ...form, distance: e.target.value ? Number(e.target.value) : undefined })} />
          <Select value={form.companyId ? String(form.companyId) : undefined} onValueChange={(v) => setForm({ ...form, companyId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select company' /></SelectTrigger>
            <SelectContent>
              {companies.map((c: any) => (
                <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              const ok = await onSave(form as any);
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
