import AdminNavigation from '@/components/navbar/AdminNavigation';
import { Shield, LayoutDashboard, Building2, Diamond, Truck, Wrench, Warehouse, MapPin, Boxes, ClipboardList, Activity, UserCog, Key, Settings } from 'lucide-react';
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
              <Shield className='size-5 text-blue-600' />
              Bashboard
            </h2>
          </div>
          <nav>
            <ul className='space-y-2'>
              <li>
                <Link 
                  href='/admin' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <LayoutDashboard className='size-4' />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/companies' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Building2 className='size-4' />
                  Companies
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/stone_types' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Diamond className='size-4' />
                  Stone Types
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/trucks' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Truck className='size-4' />
                  Trucks
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/machineries' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Wrench className='size-4' />
                  Machineries
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/warehouses' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Warehouse className='size-4' />
                  Warehouses
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/delivery_points' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <MapPin className='size-4' />
                  Delivery Points
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/stocks' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Boxes className='size-4' />
                  Stocks
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/registrations' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <ClipboardList className='size-4' />
                  Registrations
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/activities' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Activity className='size-4' />
                  Activities
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/employees' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <UserCog className='size-4' />
                  Employees
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/permissions' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Key className='size-4' />
                  Permissions
                </Link>
              </li>
              <li>
                <Link 
                  href='/admin/system' 
                  className='flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 text-sm transition-colors'
                >
                  <Settings className='size-4' />
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
