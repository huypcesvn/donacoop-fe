import AdminNavigation from '@/components/navbar/AdminNavigation';
import { Shield, Users, Settings, Home, Key } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <AdminNavigation />
      <div className='flex'>
        {/* Sidebar */}
        <aside className='bg-white shadow-sm p-4 border-gray-200 border-r w-64 min-h-screen'>
          <div className='mb-6'>
            <h2 className='flex items-center gap-2 font-semibold text-gray-900 text-lg'>
              <Shield className='w-5 h-5 text-blue-600' />
              Admin Panel
            </h2>
          </div>
          <nav>
            <ul className='space-y-2'>
              <li>
                <Link 
                  href='/admin' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Home className='w-4 h-4' />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/employees' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Users className='w-4 h-4' />
                  Employee Management
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/permissions' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Key className='w-4 h-4' />
                  Permissions
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/system' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Settings className='w-4 h-4' />
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
