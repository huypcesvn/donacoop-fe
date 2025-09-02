'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import DeleteEmployeeAlertDialog from './DeleteEmployeeAlertDialog';
import AddEditEmployeeDialog from './AddEditEmployeeDialog';

interface UserType {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
  currentJob?: string;
  address?: string;
  city?: string;
}

interface AdminEmployeesTableProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (userId: number) => void;
}

export default function AdminEmployeesTable({ users, onEdit, onDelete }: AdminEmployeesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Current Job</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.currentJob}</TableCell>
            <TableCell>
              <div>{user.username}</div>
              <div>{user.email}</div>
            </TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell className='flex gap-2'>
              <AddEditEmployeeDialog
                mode='edit'
                initialData={{
                  fullName: user.fullName,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                  currentJob: user.currentJob,
                  address: user.address,
                  city: user.city,
                }}
                onSave={async (updated) => {
                  return await onEdit({
                    ...user,
                    fullName: updated.fullName,
                    username: updated.username,
                    email: updated.email,
                    role: updated.role,
                    currentJob: updated.currentJob,
                    address: updated.address,
                    city: updated.city,
                  });
                }}
              >
                <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8'>
                  <Edit className='size-4' />
                </Button>
              </AddEditEmployeeDialog>

              {user.role !== 'Admin' && (
                <DeleteEmployeeAlertDialog employeeName={user.fullName} onConfirm={() => onDelete(user.id)}>
                  <Button size='sm' variant='outline' className='flex justify-center items-center p-0 size-8 text-red-600 hover:text-red-700'>
                    <Trash2 className='size-4' />
                  </Button>
                </DeleteEmployeeAlertDialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>Showing {users.length} employees</TableCaption>
    </Table>
  );
}
