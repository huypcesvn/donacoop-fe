'use client'

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Database, Shield, Bell, Globe } from 'lucide-react';

export default function AdminSystemPage() {
  const { isAdmin } = useAuth();

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system preferences and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              General Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                defaultValue="Donacoop"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                rows={3}
                defaultValue="Donacoop - Cooperative Management System"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Zone
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="UTC+7">UTC+7 (Asia/Ho_Chi_Minh)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
                <option value="UTC-5">UTC-5 (Eastern Time)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Security Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Require 2FA for all users</p>
              </div>
              <Button size="sm" variant="outline">Enable</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Password Policy</h4>
                <p className="text-sm text-gray-500">Minimum 8 characters</p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              Database Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Auto Backup</h4>
                <p className="text-sm text-gray-500">Daily database backup</p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Connection Pool</h4>
                <p className="text-sm text-gray-500">Max 20 connections</p>
              </div>
              <Button size="sm" variant="outline">Optimize</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Query Logging</h4>
                <p className="text-sm text-gray-500">Log slow queries</p>
              </div>
              <Button size="sm" variant="outline">Enable</Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              Notification Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">Send system alerts via email</p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                <p className="text-sm text-gray-500">Send critical alerts via SMS</p>
              </div>
              <Button size="sm" variant="outline">Setup</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Webhook Notifications</h4>
                <p className="text-sm text-gray-500">Integrate with external services</p>
              </div>
              <Button size="sm" variant="outline">Add Webhook</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button className="px-6">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
