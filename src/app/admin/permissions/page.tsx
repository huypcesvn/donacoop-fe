'use client'

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Key, Users, Shield, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminPermissionsPage() {
  const { isAdmin } = useAuth();
  const [selectedRole, setSelectedRole] = useState('Admin');

  // Based on seed data
  const roles = [
    'Admin',
    'Manager', 
    'Accountant',
    'Mine Director',
    'Mine Manager',
    'Driver'
  ];

  const permissions = [
    { name: 'create_user', label: 'Create User', category: 'User Management' },
    { name: 'add_company', label: 'Add Company', category: 'Company Management' },
    { name: 'add_employee', label: 'Add Employee', category: 'Employee Management' },
    { name: 'add_truck', label: 'Add Truck', category: 'Vehicle Management' },
    { name: 'add_machine', label: 'Add Machine', category: 'Equipment Management' },
    { name: 'warehouse_view', label: 'View Warehouse', category: 'Warehouse' },
    { name: 'warehouse_edit', label: 'Edit Warehouse', category: 'Warehouse' },
    { name: 'dispatch_machine_view', label: 'View Dispatch Machine', category: 'Dispatch' },
    { name: 'dispatch_machine_edit', label: 'Edit Dispatch Machine', category: 'Dispatch' },
    { name: 'truck_registration_view', label: 'View Truck Registration', category: 'Registration' },
    { name: 'truck_registration_edit', label: 'Edit Truck Registration', category: 'Registration' },
    { name: 'activity_tracking_view', label: 'View Activity Tracking', category: 'Tracking' },
    { name: 'activity_tracking_edit', label: 'Edit Activity Tracking', category: 'Tracking' },
  ];

  // Mock permission assignments (in real app, this would come from database)
  const getRolePermissions = (roleName: string) => {
    if (roleName === 'Admin') {
      return permissions.map(p => p.name); // Admin has all permissions
    }
    if (roleName === 'Manager') {
      return permissions.filter(p => !p.name.includes('create_user')).map(p => p.name);
    }
    if (roleName === 'Accountant') {
      return permissions.filter(p => p.category === 'Warehouse' || p.name.includes('view')).map(p => p.name);
    }
    if (roleName === 'Mine Director') {
      return permissions.filter(p => p.category === 'Dispatch' || p.category === 'Tracking').map(p => p.name);
    }
    if (roleName === 'Mine Manager') {
      return permissions.filter(p => p.name.includes('view') || p.category === 'Equipment Management').map(p => p.name);
    }
    if (roleName === 'Driver') {
      return permissions.filter(p => p.name.includes('view') && p.category === 'Tracking').map(p => p.name);
    }
    return [];
  };

  const rolePermissions = getRolePermissions(selectedRole);

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">Permissions Management</h1>
        <p className="text-gray-600">Manage role-based permissions and access control</p>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-4">
        {/* Role Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-900 text-lg">
              <Users className="w-5 h-5 text-blue-600" />
              Roles
            </h3>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedRole === role
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {role}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
                <Key className="w-5 h-5 text-green-600" />
                Permissions for {selectedRole}
              </h3>
              <p className="mt-1 text-gray-600 text-sm">
                {rolePermissions.length} of {permissions.length} permissions assigned
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, perms]) => (
                <div key={category}>
                  <h4 className="mb-3 pb-2 border-gray-200 border-b font-medium text-gray-800 text-md">
                    {category}
                  </h4>
                  <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                    {perms.map((permission) => {
                      const hasPermission = rolePermissions.includes(permission.name);
                      return (
                        <div
                          key={permission.name}
                          className={`flex items-center justify-between p-3 rounded-md border ${
                            hasPermission
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {hasPermission ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400" />
                            )}
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {permission.label}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {permission.name}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              hasPermission
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {hasPermission ? 'Granted' : 'Denied'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-gray-200 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">
                    Total permissions: <span className="font-medium">{permissions.length}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Granted to {selectedRole}: <span className="font-medium text-green-600">{rolePermissions.length}</span>
                  </p>
                </div>
                <Button className="px-6">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
