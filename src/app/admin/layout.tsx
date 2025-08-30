import AdminNavigation from '@/components/navbar/AdminNavigation';
import { Shield, Users, Settings, Home, Key } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminNavigation />
      <div className='flex'>
        {/* Sidebar */}
        <aside className='bg-white border-r border-gray-200 p-4 w-64 min-h-screen shadow-sm'>
          <div className='mb-6'>
            <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
              <Shield className='h-5 w-5 text-blue-600' />
              Admin Panel
            </h2>
          </div>
          <nav>
            <ul className='space-y-2'>
              <li>
                <Link 
                  href='/admin' 
                  className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                >
                  <Home className='h-4 w-4' />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/users' 
                  className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                >
                  <Users className='h-4 w-4' />
                  Users Management
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/permissions' 
                  className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                >
                  <Key className='h-4 w-4' />
                  Permissions
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/system' 
                  className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                >
                  <Settings className='h-4 w-4' />
                  System Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className='flex-1 bg-gray-50'>{children}</main>
      </div>
    </div>
  );
}
