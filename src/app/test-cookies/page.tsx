'use client'

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function TestCookiesPage() {
  const { user, isAdmin } = useAuth();
  const [allCookies, setAllCookies] = useState<string>('');
  const [accessTokenCookie, setAccessTokenCookie] = useState<string>('');

  useEffect(() => {
    // Get all cookies
    const cookies = document.cookie;
    setAllCookies(cookies);

    // Get specific cookies
    const accessToken = Cookies.get('accessToken');
    setAccessTokenCookie(accessToken || 'NOT FOUND');
  }, []);

  const clearAllCookies = () => {
    // Clear all possible cookie variations
    Cookies.remove('userInfo');
    Cookies.remove('accessToken');
    Cookies.remove('userInfo', { path: '/' });
    Cookies.remove('accessToken', { path: '/' });
    
    // Force clear cookies by setting them to expire in the past
    Cookies.set('userInfo', '', { expires: new Date(0), path: '/' });
    Cookies.set('accessToken', '', { expires: new Date(0), path: '/' });
    
    // Reload page to see changes
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Debug Page</h1>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
          <div className="space-y-2">
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'Not logged in'}</p>
            <p><strong>Is Admin:</strong> {isAdmin() ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookie Information</h2>
          <div className="space-y-4">
            <div>
              <p><strong>AccessToken Cookie:</strong></p>
              <p className="text-sm text-gray-600 break-all">{accessTokenCookie}</p>
            </div>
            <div>
              <p><strong>All Cookies:</strong></p>
              <p className="text-sm text-gray-600 break-all">{allCookies || 'No cookies found'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
          <div className="space-y-4">
            <button
              onClick={clearAllCookies}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Clear All Cookies
            </button>
            <button
              onClick={() => window.location.reload()}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Links</h2>
          <div className="space-y-2">
            <Link href="/" className="block text-blue-600 hover:underline">Go to Home</Link>
            <Link href="/admin" className="block text-blue-600 hover:underline">Go to Admin</Link>
            <Link href="/admin/login" className="block text-blue-600 hover:underline">Go to Admin Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
