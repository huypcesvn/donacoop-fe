'use client'

import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AddEditActivityDialog({
  mode,
  initialData,
  onSave,
  children,
}: {
  mode: 'add' | 'edit';
  initialData?: {
    revenueType?: string;
    gateInTime?: string;
    gateOutTime?: string;
    truckId?: number;
    stoneTypeId?: number;
    pickupPositionId?: number;
    buyerCompanyId?: number;
    registrationId?: number;
  };
  onSave: (data: {
    revenueType?: string;
    gateInTime?: string;
    gateOutTime?: string;
    truckId: number;
    stoneTypeId?: number | null;
    pickupPositionId?: number | null;
    buyerCompanyId?: number | null;
    registrationId?: number | null;
  }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    revenueType: initialData?.revenueType || '',
    gateInTime: initialData?.gateInTime || '',
    gateOutTime: initialData?.gateOutTime || '',
    truckId: initialData?.truckId,
    stoneTypeId: initialData?.stoneTypeId,
    pickupPositionId: initialData?.pickupPositionId,
    buyerCompanyId: initialData?.buyerCompanyId,
    registrationId: initialData?.registrationId,
  });

  const [trucks, setTrucks] = useState<any[]>([]);
  const [stoneTypes, setStoneTypes] = useState<any[]>([]);
  const [machineries, setMachineries] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  const loadOptions = async () => {
    try {
      const [tRes, sRes, mRes, cRes, rRes] = await Promise.all([
        fetch(`${API_URL}/trucks?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/stone_types?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/machineries?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/companies?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/registrations?limit=1000`, { credentials: 'include' }),
      ]);
      const [tData, sData, mData, cData, rData] = await Promise.all([
        tRes.json(), sRes.json(), mRes.json(), cRes.json(), rRes.json()
      ]);
      setTrucks((tData.data || tData) ?? []);
      setStoneTypes((sData.data || sData) ?? []);
      setMachineries((mData.data || mData) ?? []);
      setCompanies((cData.data || cData) ?? []);
      setRegistrations((rData.data || rData) ?? []);
    } catch (err) {
      console.error(err);
      toast('Failed to load options');
    }
  };

  useEffect(() => { if (open) loadOptions(); }, [open]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          setForm({
            revenueType: initialData?.revenueType || '',
            gateInTime: initialData?.gateInTime || '',
            gateOutTime: initialData?.gateOutTime || '',
            truckId: initialData?.truckId,
            stoneTypeId: initialData?.stoneTypeId,
            pickupPositionId: initialData?.pickupPositionId,
            buyerCompanyId: initialData?.buyerCompanyId,
            registrationId: initialData?.registrationId,
          });
        }
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Activity' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Activity' : 'Edit Activity'}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className='gap-3 grid grid-cols-1 md:grid-cols-2 mt-4'>
          <Input placeholder='Revenue Type' value={form.revenueType} onChange={(e) => setForm({ ...form, revenueType: e.target.value })} />
          <Input type='datetime-local' placeholder='Gate In Time' value={form.gateInTime} onChange={(e) => setForm({ ...form, gateInTime: e.target.value })} />
          <Input type='datetime-local' placeholder='Gate Out Time' value={form.gateOutTime} onChange={(e) => setForm({ ...form, gateOutTime: e.target.value })} />

          <Select value={form.truckId ? String(form.truckId) : undefined} onValueChange={(v) => setForm({ ...form, truckId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select truck' /></SelectTrigger>
            <SelectContent>
              {trucks.map((t: any) => (
                <SelectItem key={t.id} value={String(t.id)}>{t.licensePlate}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={form.stoneTypeId ? String(form.stoneTypeId) : undefined} onValueChange={(v) => setForm({ ...form, stoneTypeId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select stone type (optional)' /></SelectTrigger>
            <SelectContent>
              {stoneTypes.map((s: any) => (
                <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={form.pickupPositionId ? String(form.pickupPositionId) : undefined} onValueChange={(v) => setForm({ ...form, pickupPositionId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select pickup position (optional)' /></SelectTrigger>
            <SelectContent>
              {machineries.map((m: any) => (
                <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={form.buyerCompanyId ? String(form.buyerCompanyId) : undefined} onValueChange={(v) => setForm({ ...form, buyerCompanyId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select buyer company (optional)' /></SelectTrigger>
            <SelectContent>
              {companies.map((c: any) => (
                <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={form.registrationId ? String(form.registrationId) : undefined} onValueChange={(v) => setForm({ ...form, registrationId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select registration (optional)' /></SelectTrigger>
            <SelectContent>
              {registrations.map((r: any) => (
                <SelectItem key={r.id} value={String(r.id)}>{`#${r.id}`}</SelectItem>
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
