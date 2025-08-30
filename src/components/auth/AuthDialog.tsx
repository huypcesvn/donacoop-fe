'use client'

import * as React from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PasswordInput } from './PasswordInput';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const AuthDialog = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [loginPhoneNumber, setLoginPhoneNumber] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [registerName, setRegisterName] = React.useState('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: needed to receive cookies
        body: JSON.stringify({ username: loginPhoneNumber, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      login(data.userInfo, data.access_token);
      toast(`Welcome ${data.userInfo.name}`);
      
      // Redirect admin users to admin page
      if (data.userInfo.roles && data.userInfo.roles.includes('Admin')) {
        router.push('/admin');
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: registerName, username: registerPhoneNumber, password: registerPassword }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Register failed');

      toast('Register success');
      return data;
    } catch (err) {
      console.error('Register error:', err);
      toast(err instanceof Error ? err.message : 'Register error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

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

          {/* Form Login */}
          <TabsContent value='login' className='space-y-4 mt-4'>
            <div className='gap-2 grid'>
              <Label htmlFor='login-phonenumber'>Phone number</Label>
              <Input id='login-phonenumber' type='text' placeholder='09xxxxxxxx' value={loginPhoneNumber} onChange={e => setLoginPhoneNumber(e.target.value)} />
            </div>
            <div className='gap-2 grid'>
              <Label htmlFor='login-password'>Password</Label>
              <PasswordInput id='login-password' placeholder='********' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            </div>
            <Button variant='primary' className='w-full cursor-pointer' onClick={handleLogin} disabled={loading}>
              {loading ? <Loader2 className='mr-2 size-4 animate-spin' /> : null}
              Login
            </Button>
          </TabsContent>

          {/* Form Register */}
          <TabsContent value='register' className='space-y-4 mt-4'>
            <div className='gap-2 grid'>
              <Label htmlFor='register-name'>Your name</Label>
              <Input id='register-name' placeholder='Enter your name' value={registerName} onChange={e => setRegisterName(e.target.value)} />
            </div>
            <div className='gap-2 grid'>
              <Label htmlFor='register-phonenumber'>Phone number</Label>
              <Input id='register-phonenumber' type='text' placeholder='09xxxxxxxx' value={registerPhoneNumber} onChange={e => setRegisterPhoneNumber(e.target.value)} />
            </div>
            <div className='gap-2 grid'>
              <Label htmlFor='register-password'>Password</Label>
              <PasswordInput id='register-password' placeholder='********' value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
            </div>
            <Button variant='primary' className='w-full cursor-pointer' onClick={handleRegister} disabled={loading}>
              {loading ? <Loader2 className='mr-2 size-4 animate-spin' /> : null}
              Sign Up
            </Button>
          </TabsContent>
        </Tabs>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AuthDialog;
