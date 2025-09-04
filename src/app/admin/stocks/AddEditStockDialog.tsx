'use client'

import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AddEditStockDialog({
  mode,
  initialData,
  onSave,
  children,
}: {
  mode: 'add' | 'edit';
  initialData?: { quantity: number; warehouseId?: number; stoneTypeId?: number };
  onSave: (data: { quantity: number; warehouseId: number; stoneTypeId: number }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ quantity: initialData?.quantity ?? 0, warehouseId: initialData?.warehouseId, stoneTypeId: initialData?.stoneTypeId });
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [stoneTypes, setStoneTypes] = useState<any[]>([]);

  const loadOptions = async () => {
    try {
      const [wRes, sRes] = await Promise.all([
        fetch(`${API_URL}/warehouses?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/stone_types?limit=1000`, { credentials: 'include' }),
      ]);
      const wData = await wRes.json();
      const sData = await sRes.json();
      setWarehouses((wData.data || wData) ?? []);
      setStoneTypes((sData.data || sData) ?? []);
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
        if (isOpen) setForm({ quantity: initialData?.quantity ?? 0, warehouseId: initialData?.warehouseId, stoneTypeId: initialData?.stoneTypeId });
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Stock' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Stock' : 'Edit Stock'}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className='gap-3 grid grid-cols-1 md:grid-cols-2 mt-4'>
          <Input placeholder='Quantity' type='number' value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
          <Select value={form.warehouseId ? String(form.warehouseId) : undefined} onValueChange={(v) => setForm({ ...form, warehouseId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select warehouse' /></SelectTrigger>
            <SelectContent>
              {warehouses.map((w: any) => (
                <SelectItem key={w.id} value={String(w.id)}>{w.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={form.stoneTypeId ? String(form.stoneTypeId) : undefined} onValueChange={(v) => setForm({ ...form, stoneTypeId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select stone type' /></SelectTrigger>
            <SelectContent>
              {stoneTypes.map((s: any) => (
                <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
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
