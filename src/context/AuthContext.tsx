'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear frontend state and cookies
      setUser(null);
      Cookies.remove('userInfo');
      Cookies.remove('accessToken');
      
      // Redirect based on current location
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin')) {
        router.push('/admin/login');
      } else {
        router.push('/');
      }
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
