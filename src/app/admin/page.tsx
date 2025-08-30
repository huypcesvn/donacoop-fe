'use client'

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Users, Settings, Activity, Database } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">1,234</div>
          <p className="text-xs text-green-600 mt-1">+20.1% from last month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
            <Activity className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">89</div>
          <p className="text-xs text-green-600 mt-1">+5.2% from last hour</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">System Status</h3>
            <Shield className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">Healthy</div>
          <p className="text-xs text-gray-500 mt-1">All systems operational</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Database</h3>
            <Database className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">2.1GB</div>
          <p className="text-xs text-gray-500 mt-1">Used of 10GB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600">Latest system activities and user actions</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">System backup completed</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Database maintenance scheduled</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-600">Common administrative tasks</p>
          </div>
          <div className="space-y-3">
            <Button size="sm" className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button size="sm" className="w-full justify-start" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
            <Button size="sm" className="w-full justify-start" variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Database Backup
            </Button>
            <Button size="sm" className="w-full justify-start" variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              View Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
