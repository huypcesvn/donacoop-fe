'use client'

import React from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteCompanyAlertDialogProps {
  companyName: string;
  onConfirm: () => void;
  children?: React.ReactNode;
}

export default function DeleteCompanyAlertDialog({ companyName, onConfirm, children }: DeleteCompanyAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ?? <Button variant='outline'>Delete</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Company</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{companyName}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className='flex justify-end gap-2 mt-4'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
