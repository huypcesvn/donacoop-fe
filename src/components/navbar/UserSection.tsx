'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import AuthDialog from '../auth/AuthDialog';

interface Props { variant?: 'desktop' | 'mobile' }

const UserSection = ({ variant = 'desktop' }: Props) => {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div
      className={
        variant === 'desktop' ? 'w-20 h-6 bg-muted rounded animate-pulse' : 'w-12 h-4 bg-muted rounded animate-pulse'
      }
    />
  );

  if (!user) return <AuthDialog />

  if (variant === 'desktop') return (
    <div className='flex items-center gap-4'>
      <span className='font-bold'>{user.name}</span>
      <Button variant='ghost' size='sm' onClick={logout} className='flex items-center space-x-1 cursor-pointer'>
        <LogOut className='size-4' /> Logout
      </Button>
    </div>
  );

  // mobile variant
  return (
    <div className='flex items-center gap-2'>
      <span className='font-semibold text-sm'>{user.name}</span>
      <Button variant='ghost' size='icon' onClick={logout} className='cursor-pointer'>
        <LogOut className='size-4' />
      </Button>
    </div>
  );
}

export default UserSection;
