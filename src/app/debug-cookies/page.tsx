'use client'

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trash2, AlertCircle, Server } from 'lucide-react';
import Link from 'next/link';

interface TokenInfo {
  sub: number;
  username: string;
  roles: string[];
  iat: number;
  exp: number;
}

interface ServerCookieInfo {
  cookies: {
    accessToken: string;
    userInfo: string;
    allCookies: Record<string, string>;
  };
  token: {
    hasValidToken: boolean;
    isAdmin: boolean;
    tokenExpired: boolean;
    tokenInvalid: boolean;
    tokenInfo: TokenInfo | null;
  };
  timestamp: string;
}

export default function DebugCookiesPage() {
  const { user, isAdmin, logout } = useAuth();
  const [allCookies, setAllCookies] = useState<string>('');
  const [accessTokenCookie, setAccessTokenCookie] = useState<string>('');
  const [userInfoCookie, setUserInfoCookie] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [serverInfo, setServerInfo] = useState<ServerCookieInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const updateCookieInfo = () => {
    // Get all cookies
    const cookies = document.cookie;
    setAllCookies(cookies);

    // Get specific cookies
    const accessToken = Cookies.get('accessToken');
    const userInfo = Cookies.get('userInfo');
    
    setAccessTokenCookie(accessToken || 'NOT FOUND');
    setUserInfoCookie(userInfo || 'NOT FOUND');
    setLastUpdate(new Date());
  };

  const fetchServerInfo = async () => {
    try {
      const response = await fetch('/api/debug-cookies');
      if (response.ok) {
        const data = await response.json();
        setServerInfo(data);
      }
    } catch (error) {
      console.error('Failed to fetch server info:', error);
    }
  };

  useEffect(() => {
    updateCookieInfo();
    fetchServerInfo();
    
    // Update every 2 seconds
    const interval = setInterval(() => {
      updateCookieInfo();
      fetchServerInfo();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const clearAllCookies = () => {
    // Clear all possible cookie variations
    const cookieOptions = [
      { path: '/' },
      { path: '/', domain: window.location.hostname },
      { path: '/', domain: '.' + window.location.hostname },
      { path: '/', secure: true },
      { path: '/', secure: false },
      { path: '/', httpOnly: false },
      { path: '/', sameSite: 'strict' as const },
      { path: '/', sameSite: 'lax' as const }
    ];

    ['userInfo', 'accessToken'].forEach(cookieName => {
      Cookies.remove(cookieName);
      cookieOptions.forEach(options => {
        try {
          Cookies.remove(cookieName, options);
        } catch {
          // Ignore errors
        }
      });
    });

    // Force clear with past date
    const pastDate = new Date(0);
    ['userInfo', 'accessToken'].forEach(cookieName => {
      try {
        Cookies.set(cookieName, '', { expires: pastDate, path: '/' });
      } catch {
        // Ignore errors
      }
    });

    updateCookieInfo();
  };

  const testLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      setLoading(false);
    }
  };

  const hasToken = accessTokenCookie !== 'NOT FOUND';
  const hasUserInfo = userInfoCookie !== 'NOT FOUND';
  const serverHasToken = serverInfo?.cookies.accessToken === 'Present';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Real-time Cookie Debug</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
            <Button onClick={() => { updateCookieInfo(); fetchServerInfo(); }} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${hasToken ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2">
              {hasToken ? (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              ) : (
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              )}
              <span className="font-semibold">Client Token</span>
            </div>
            <p className="text-sm mt-1">{hasToken ? 'Present' : 'Missing'}</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${serverHasToken ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2">
              {serverHasToken ? (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              ) : (
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              )}
              <span className="font-semibold">Server Token</span>
            </div>
            <p className="text-sm mt-1">{serverHasToken ? 'Present' : 'Missing'}</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${hasUserInfo ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2">
              {hasUserInfo ? (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              ) : (
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              )}
              <span className="font-semibold">User Info</span>
            </div>
            <p className="text-sm mt-1">{hasUserInfo ? 'Present' : 'Missing'}</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${user ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2">
              {user ? (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              ) : (
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              )}
              <span className="font-semibold">Auth State</span>
            </div>
            <p className="text-sm mt-1">{user ? 'Logged In' : 'Not Logged In'}</p>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
          <div className="space-y-2">
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'Not logged in'}</p>
            <p><strong>Is Admin:</strong> {isAdmin() ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>

        {/* Server Information */}
        {serverInfo && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              Server Information
            </h2>
            <div className="space-y-4">
              <div>
                <p><strong>Server Token Status:</strong></p>
                <p className="text-sm text-gray-600">
                  Valid: {serverInfo.token.hasValidToken ? '✅ Yes' : '❌ No'} | 
                  Admin: {serverInfo.token.isAdmin ? '✅ Yes' : '❌ No'} | 
                  Expired: {serverInfo.token.tokenExpired ? '✅ Yes' : '❌ No'} | 
                  Invalid: {serverInfo.token.tokenInvalid ? '✅ Yes' : '❌ No'}
                </p>
              </div>
              <div>
                <p><strong>Server Cookies:</strong></p>
                <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded">
                  {JSON.stringify(serverInfo.cookies, null, 2)}
                </p>
              </div>
              {serverInfo.token.tokenInfo && (
                <div>
                  <p><strong>Token Info:</strong></p>
                  <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded">
                    {JSON.stringify(serverInfo.token.tokenInfo, null, 2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cookie Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Cookie Information</h2>
          <div className="space-y-4">
            <div>
              <p><strong>AccessToken Cookie:</strong></p>
              <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded">
                {accessTokenCookie}
              </p>
            </div>
            <div>
              <p><strong>UserInfo Cookie:</strong></p>
              <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded">
                {userInfoCookie}
              </p>
            </div>
            <div>
              <p><strong>All Cookies:</strong></p>
              <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded">
                {allCookies || 'No cookies found'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={clearAllCookies}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Trash2 className="h-4 w-4" />
              Clear All Cookies
            </Button>
            <Button
              onClick={testLogout}
              disabled={loading}
              className="flex items-center gap-2"
              variant="destructive"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {loading ? 'Logging out...' : 'Test Logout'}
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </Button>
          </div>
        </div>

        {/* Test Links */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Links</h2>
          <div className="space-y-2">
            <Link href="/" className="block text-blue-600 hover:underline">Go to Home</Link>
            <Link href="/admin" className="block text-blue-600 hover:underline">Go to Admin</Link>
            <Link href="/admin/login" className="block text-blue-600 hover:underline">Go to Admin Login</Link>
            <Link href="/test-cookies" className="block text-blue-600 hover:underline">Go to Test Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
