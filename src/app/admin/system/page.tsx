'use client'

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Database, Shield, Bell, Globe } from 'lucide-react';

export default function AdminSystemPage() {
  const { isAdmin } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">System Settings</h1>
        <p className="text-gray-600">Configure system preferences and security settings</p>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        {/* General Settings */}
        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
              <Globe className="w-5 h-5 text-blue-600" />
              General Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Site Name
              </label>
              <input
                type="text"
                defaultValue="Donacoop"
                className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Site Description
              </label>
              <textarea
                rows={3}
                defaultValue="Donacoop - Cooperative Management System"
                className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Time Zone
              </label>
              <select className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:ring-2 focus:ring-blue-500 w-full">
                <option value="UTC+7">UTC+7 (Asia/Ho_Chi_Minh)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
                <option value="UTC-5">UTC-5 (Eastern Time)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
              <Shield className="w-5 h-5 text-red-600" />
              Security Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Two-Factor Authentication</h4>
                <p className="text-gray-500 text-sm">Require 2FA for all users</p>
              </div>
              <Button size="sm" variant="outline">Enable</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Session Timeout</h4>
                <p className="text-gray-500 text-sm">Auto-logout after inactivity</p>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Password Policy</h4>
                <p className="text-gray-500 text-sm">Minimum 8 characters</p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
              <Database className="w-5 h-5 text-green-600" />
              Database Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Auto Backup</h4>
                <p className="text-gray-500 text-sm">Daily database backup</p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Connection Pool</h4>
                <p className="text-gray-500 text-sm">Max 20 connections</p>
              </div>
              <Button size="sm" variant="outline">Optimize</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Query Logging</h4>
                <p className="text-gray-500 text-sm">Log slow queries</p>
              </div>
              <Button size="sm" variant="outline">Enable</Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
          <div className="mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
              Notification Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Email Notifications</h4>
                <p className="text-gray-500 text-sm">Send system alerts via email</p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">SMS Notifications</h4>
                <p className="text-gray-500 text-sm">Send critical alerts via SMS</p>
              </div>
              <Button size="sm" variant="outline">Setup</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Webhook Notifications</h4>
                <p className="text-gray-500 text-sm">Integrate with external services</p>
              </div>
              <Button size="sm" variant="outline">Add Webhook</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <Button className="px-6">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
