'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthDialog from '../auth/AuthDialog';
import LogoutHandler from '../auth/LogoutHandler';

interface Props { variant?: 'desktop' | 'mobile' }

const UserSection = ({ variant = 'desktop' }: Props) => {
  const { user } = useAuth();
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
      <LogoutHandler />
    </div>
  );

  // mobile variant
  return (
    <div className='flex items-center gap-2'>
      <span className='font-semibold text-sm'>{user.name}</span>
      <LogoutHandler />
    </div>
  );
}

export default UserSection;
