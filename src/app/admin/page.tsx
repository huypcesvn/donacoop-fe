'use client'

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Users, Settings, Activity, Database } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-600 text-sm">Total Users</h3>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-bold text-gray-900 text-2xl">1,234</div>
          <p className="mt-1 text-green-600 text-xs">+20.1% from last month</p>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-600 text-sm">Active Sessions</h3>
            <Activity className="w-4 h-4 text-green-600" />
          </div>
          <div className="font-bold text-gray-900 text-2xl">89</div>
          <p className="mt-1 text-green-600 text-xs">+5.2% from last hour</p>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-600 text-sm">System Status</h3>
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <div className="font-bold text-green-600 text-2xl">Healthy</div>
          <p className="mt-1 text-gray-500 text-xs">All systems operational</p>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-600 text-sm">Database</h3>
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-bold text-gray-900 text-2xl">2.1GB</div>
          <p className="mt-1 text-gray-500 text-xs">Used of 10GB</p>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">Recent Activity</h3>
            <p className="text-gray-600 text-sm">Latest system activities and user actions</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 rounded-full w-2 h-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">New user registered</p>
                <p className="text-gray-500 text-xs">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 rounded-full w-2 h-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">System backup completed</p>
                <p className="text-gray-500 text-xs">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Database maintenance scheduled</p>
                <p className="text-gray-500 text-xs">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">Quick Actions</h3>
            <p className="text-gray-600 text-sm">Common administrative tasks</p>
          </div>
          <div className="space-y-3">
            <Button size="sm" className="justify-start w-full" variant="outline">
              <Users className="mr-2 w-4 h-4" />
              Manage Users
            </Button>
            <Button size="sm" className="justify-start w-full" variant="outline">
              <Settings className="mr-2 w-4 h-4" />
              System Settings
            </Button>
            <Button size="sm" className="justify-start w-full" variant="outline">
              <Database className="mr-2 w-4 h-4" />
              Database Backup
            </Button>
            <Button size="sm" className="justify-start w-full" variant="outline">
              <Activity className="mr-2 w-4 h-4" />
              View Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
