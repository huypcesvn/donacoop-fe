'use client'

import { useAuth } from '@/context/AuthContext';
import { Shield } from 'lucide-react';
import LogoutHandler from '@/components/auth/LogoutHandler';

const AdminNavigation = () => {
  const { user } = useAuth();

  return (
    <nav className='top-0 z-50 sticky bg-gray-900 border-gray-700 border-b'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex flex-shrink-0 items-center gap-3'>
            <Shield className='w-8 h-8 text-white' />
            <h1 className='font-bold text-white text-xl select-none'>
              Donacoop Dashboard
            </h1>
          </div>

          {user && (
            <div className='flex items-center gap-4'>
              <div className='hidden md:block text-right'>
                <p className='font-medium text-white text-sm'>{user.name}</p>
                <p className='text-gray-400 text-xs'>{user.roles}</p>
              </div>
              <LogoutHandler />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
