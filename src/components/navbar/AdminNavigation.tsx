'use client'

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Shield } from 'lucide-react';

const AdminNavigation = () => {
  const { user, logout } = useAuth();

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

          {/* User section */}
          <div className='flex items-center gap-4'>
            <div className='text-right hidden md:block'>
              <p className='text-sm font-medium text-white'>{user?.name}</p>
              <p className='text-xs text-gray-400'>Administrator</p>
            </div>
            <Button 
              variant='ghost' 
              size='sm' 
              onClick={logout} 
              className='flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800'
            >
              <LogOut className='h-4 w-4' />
              <span className='hidden md:inline'>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
