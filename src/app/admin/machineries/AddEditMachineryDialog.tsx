'use client'

import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AddEditMachineryDialog({
  mode,
  initialData,
  onSave,
  children,
}: {
  mode: 'add' | 'edit';
  initialData?: {
    name: string;
    account?: string;
    description?: string;
    companyId?: number;
    driverId?: number;
  };
  onSave: (data: {
    name: string;
    account?: string;
    description?: string;
    companyId?: number;
    driverId?: number;
  }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: initialData?.name || '',
    account: initialData?.account || '',
    description: initialData?.description || '',
    companyId: initialData?.companyId,
    driverId: initialData?.driverId,
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);

  const loadOptions = async () => {
    try {
      const [cRes, uRes] = await Promise.all([
        fetch(`${API_URL}/companies?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/users?limit=1000`, { credentials: 'include' }),
      ]);
      const cData = await cRes.json();
      const uData = await uRes.json();
      setCompanies((cData.data || cData) ?? []);
      setDrivers((uData.data || uData) ?? []);
    } catch (err) {
      console.error(err);
      toast('Failed to load options');
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
        if (isOpen) {
          setForm({
            name: initialData?.name || '',
            account: initialData?.account || '',
            description: initialData?.description || '',
            companyId: initialData?.companyId,
            driverId: initialData?.driverId,
          });
        }
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Machinery' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Machinery' : 'Edit Machinery'}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className='gap-3 grid grid-cols-1 md:grid-cols-2 mt-4'>
          <Input placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder='Account' value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} />
          <Input placeholder='Description' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <Select value={form.companyId ? String(form.companyId) : undefined} onValueChange={(v) => setForm({ ...form, companyId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select company' /></SelectTrigger>
            <SelectContent>
              {companies.map((c: any) => (
                <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={form.driverId ? String(form.driverId) : undefined} onValueChange={(v) => setForm({ ...form, driverId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select driver (optional)' /></SelectTrigger>
            <SelectContent>
              {drivers.map((u: any) => (
                <SelectItem key={u.id} value={String(u.id)}>{u.fullName || u.username}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
