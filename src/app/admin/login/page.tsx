'use client'

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && user.roles && user.roles.includes('Admin')) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      login(data.userInfo, data.access_token);
      toast.success(`Welcome ${data.userInfo.name}`);
      router.push('/admin');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <div className="flex justify-center items-center bg-blue-100 mx-auto rounded-full w-12 h-12">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="mt-6 font-extrabold text-gray-900 text-3xl text-center">
            Admin Access
          </h2>
          <p className="mt-2 text-gray-600 text-sm text-center">
            Sign in to access the Dashboard
          </p>
        </div>
        
        <form className="space-y-6 mt-8" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="block font-medium text-gray-700 text-sm">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="block font-medium text-gray-700 text-sm">
                Password
              </Label>
              <PasswordInput
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative flex justify-center bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium text-white text-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in to Dashboard'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
