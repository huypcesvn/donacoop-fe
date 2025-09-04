'use client'

import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AddEditRegistrationDialog({
  mode,
  initialData,
  onSave,
  children,
}: {
  mode: 'add' | 'edit';
  initialData?: {
    tripNumber?: number;
    arrivalDate?: string;
    arrivalTime?: string;
    distance?: number;
    revenueType?: string;
    truckId?: number;
    stoneTypeId?: number;
    pickupPositionId?: number;
    buyerCompanyId?: number;
    destinationId?: number;
    destinationWarehouseId?: number;
  };
  onSave: (data: {
    tripNumber?: number;
    arrivalDate?: string;
    arrivalTime?: string;
    distance?: number;
    revenueType?: string;
    truckId: number;
    stoneTypeId?: number | null;
    pickupPositionId?: number | null;
    buyerCompanyId?: number | null;
    destinationId?: number | null;
    destinationWarehouseId?: number | null;
  }) => Promise<boolean> | Promise<void>;
  children?: React.ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    tripNumber: initialData?.tripNumber,
    arrivalDate: initialData?.arrivalDate || '',
    arrivalTime: initialData?.arrivalTime || '',
    distance: initialData?.distance,
    revenueType: initialData?.revenueType || '',
    truckId: initialData?.truckId,
    stoneTypeId: initialData?.stoneTypeId,
    pickupPositionId: initialData?.pickupPositionId,
    buyerCompanyId: initialData?.buyerCompanyId,
    destinationId: initialData?.destinationId,
    destinationWarehouseId: initialData?.destinationWarehouseId,
  });

  const [trucks, setTrucks] = useState<any[]>([]);
  const [stoneTypes, setStoneTypes] = useState<any[]>([]);
  const [machineries, setMachineries] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [deliveryPoints, setDeliveryPoints] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);

  const loadOptions = async () => {
    try {
      const [tRes, sRes, mRes, cRes, dRes, wRes] = await Promise.all([
        fetch(`${API_URL}/trucks?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/stone_types?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/machineries?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/companies?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/delivery_points?limit=1000`, { credentials: 'include' }),
        fetch(`${API_URL}/warehouses?limit=1000`, { credentials: 'include' }),
      ]);
      const [tData, sData, mData, cData, dData, wData] = await Promise.all([
        tRes.json(), sRes.json(), mRes.json(), cRes.json(), dRes.json(), wRes.json()
      ]);
      setTrucks((tData.data || tData) ?? []);
      setStoneTypes((sData.data || sData) ?? []);
      setMachineries((mData.data || mData) ?? []);
      setCompanies((cData.data || cData) ?? []);
      setDeliveryPoints((dData.data || dData) ?? []);
      setWarehouses((wData.data || wData) ?? []);
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
            tripNumber: initialData?.tripNumber,
            arrivalDate: initialData?.arrivalDate || '',
            arrivalTime: initialData?.arrivalTime || '',
            distance: initialData?.distance,
            revenueType: initialData?.revenueType || '',
            truckId: initialData?.truckId,
            stoneTypeId: initialData?.stoneTypeId,
            pickupPositionId: initialData?.pickupPositionId,
            buyerCompanyId: initialData?.buyerCompanyId,
            destinationId: initialData?.destinationId,
            destinationWarehouseId: initialData?.destinationWarehouseId,
          });
        }
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? <Button>{mode === 'add' ? 'Add Registration' : 'Edit'}</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === 'add' ? 'Add Registration' : 'Edit Registration'}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className='gap-3 grid grid-cols-1 md:grid-cols-2 mt-4'>
          <Input placeholder='Trip Number' type='number' value={form.tripNumber ?? ''} onChange={(e) => setForm({ ...form, tripNumber: e.target.value ? Number(e.target.value) : undefined })} />
          <Input type='date' placeholder='Arrival Date' value={form.arrivalDate} onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })} />
          <Input placeholder='Arrival Time (HH:mm-HH:mm)' value={form.arrivalTime} onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })} />
          <Input placeholder='Distance (km)' type='number' value={form.distance ?? ''} onChange={(e) => setForm({ ...form, distance: e.target.value ? Number(e.target.value) : undefined })} />
          <Input placeholder='Revenue Type' value={form.revenueType} onChange={(e) => setForm({ ...form, revenueType: e.target.value })} />

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

          <Select value={form.destinationId ? String(form.destinationId) : undefined} onValueChange={(v) => setForm({ ...form, destinationId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select delivery point (optional)' /></SelectTrigger>
            <SelectContent>
              {deliveryPoints.map((d: any) => (
                <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={form.destinationWarehouseId ? String(form.destinationWarehouseId) : undefined} onValueChange={(v) => setForm({ ...form, destinationWarehouseId: Number(v) })}>
            <SelectTrigger><SelectValue placeholder='Select destination warehouse (optional)' /></SelectTrigger>
            <SelectContent>
              {warehouses.map((w: any) => (
                <SelectItem key={w.id} value={String(w.id)}>{w.name}</SelectItem>
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
