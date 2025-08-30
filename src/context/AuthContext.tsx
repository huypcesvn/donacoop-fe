'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  name: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    // Set both cookies since backend httpOnly cookie might not work in development
    Cookies.set('accessToken', token, { expires: 30, sameSite: 'strict' });
    Cookies.set('userInfo', JSON.stringify(userData), { expires: 1, sameSite: 'strict' });
  };

  const logout = async () => {
    try {
      // Call backend logout to clear httpOnly cookie
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Backend logout failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear frontend state
      setUser(null);
      
      // Clear all possible cookie variations with different paths and domains
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

      // Remove cookies with all possible combinations
      ['userInfo', 'accessToken'].forEach(cookieName => {
        // Remove without options first
        Cookies.remove(cookieName);

        // Then remove with all possible options
        cookieOptions.forEach(options => {
          try {
            Cookies.remove(cookieName, options);
          } catch {
            // Ignore errors for invalid domain combinations
          }
        });
      });

      // Force clear cookies by setting them to expire in the past
      const pastDate = new Date(0);
      ['userInfo', 'accessToken'].forEach(cookieName => {
        try {
          // Set with different combinations to ensure they're cleared
          Cookies.set(cookieName, '', { expires: pastDate, path: '/' });
          Cookies.set(cookieName, '', { expires: pastDate, path: '/', domain: window.location.hostname });
          Cookies.set(cookieName, '', { expires: pastDate, path: '/', sameSite: 'strict' as const });
          Cookies.set(cookieName, '', { expires: pastDate, path: '/', sameSite: 'lax' as const });
        } catch {
          // Ignore domain errors
        }
      });

      // Also clear any cookies that might be set with different names
      const allCookies = document.cookie.split(';');
      allCookies.forEach(cookie => {
        const [name] = cookie.split('=');
        const trimmedName = name.trim();
        if (trimmedName.includes('token') || trimmedName.includes('user') || trimmedName.includes('auth')) {
          Cookies.remove(trimmedName);
          Cookies.set(trimmedName, '', { expires: pastDate, path: '/' });
        }
      });

      // Force page reload to clear any cached state and ensure middleware picks up the changes
      // Use a longer timeout to ensure backend cookie clearing is processed
      setTimeout(() => {
        // Force reload to clear any cached state
        window.location.href = '/';
      }, 500);
    }
  };

  const isAdmin = () => {
    return user?.roles?.includes('Admin') || false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
