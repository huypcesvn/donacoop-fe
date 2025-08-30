'use client'

import { useAuth } from '@/context/AuthContext';
import { Shield } from 'lucide-react';
import LogoutHandler from '@/components/auth/LogoutHandler';

const AdminNavigation = () => {
  const { user } = useAuth();

  return (
    <nav className='top-0 z-50 sticky bg-gray-900 border-b border-gray-700'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center gap-3'>
            <Shield className='h-8 w-8 text-white' />
            <h1 className='font-bold text-white text-xl select-none'>
              Donacoop Admin
            </h1>
          </div>

          {/* User section - only show if user is logged in and is admin */}
          {user && user.roles && user.roles.includes('Admin') ? (
            <div className='flex items-center gap-4'>
              <div className='text-right hidden md:block'>
                <p className='text-sm font-medium text-white'>{user.name}</p>
                <p className='text-xs text-gray-400'>Administrator</p>
              </div>
              <LogoutHandler />
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <div className='text-right hidden md:block'>
                <p className='text-sm font-medium text-white'>Admin Panel</p>
                <p className='text-xs text-gray-400'>Please login</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
