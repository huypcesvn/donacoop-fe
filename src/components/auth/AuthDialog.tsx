'use client'

import * as React from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PasswordInput } from './PasswordInput';
import { X } from 'lucide-react';

const AuthDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='cursor-pointer'>Login / Sign Up</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className='max-w-md'>
        <AlertDialogCancel className='top-4 right-4 absolute hover:bg-gray-100 shadow-none p-1 border-none focus:ring-0 cursor-pointer'>
          <X className='size-5' />
        </AlertDialogCancel>

        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to Donacoop</AlertDialogTitle>
          <AlertDialogDescription>Please log in or sign up to continue.</AlertDialogDescription>
        </AlertDialogHeader>

        <Tabs defaultValue='login' className='my-4 w-full'>
          <TabsList className='grid grid-cols-2 w-full'>
            <TabsTrigger value='login' className='cursor-pointer'>Login</TabsTrigger>
            <TabsTrigger value='register' className='cursor-pointer'>Sign Up</TabsTrigger>
          </TabsList>

          {/* Form Đăng nhập */}
          <TabsContent value='login' className='space-y-4 mt-4'>
            <div className='gap-2 grid'>
              <Label htmlFor='login-email'>Email</Label>
              <Input id='login-email' type='email' placeholder='you@example.com' />
            </div>
            <div className='gap-2 grid'>
              <Label htmlFor='login-password'>Password</Label>
              <PasswordInput id='login-password' placeholder='********' />
            </div>
            <Button variant={'primary'} className='w-full cursor-pointer'>Login</Button>
          </TabsContent>

          {/* Form Đăng ký */}
          <TabsContent value='register' className='space-y-4 mt-4'>
            <div className='gap-2 grid'>
              <Label htmlFor='register-name'>Your name</Label>
              <Input id='register-name' placeholder='Enter your name' />
            </div>
            <div className='gap-2 grid'>
              <Label htmlFor='register-email'>Email</Label>
              <Input id='register-email' type='email' placeholder='you@example.com' />
            </div>
            <div className='gap-2 grid'>
              <Label htmlFor='register-password'>Password</Label>
              <PasswordInput id='register-password' placeholder='********' />
            </div>
            <Button variant={'primary'} className='w-full cursor-pointer'>Sign Up</Button>
          </TabsContent>
        </Tabs>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AuthDialog;
