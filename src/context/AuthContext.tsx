'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const storedUser = Cookies.get('userInfo');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    // lưu cookie 30 ngày, httpOnly không thể set từ JS nên dùng js-cookie -> client-side only
    Cookies.set('accessToken', token, { expires: 30, sameSite: 'strict' });
    Cookies.set('userInfo', JSON.stringify(userData), { expires: 1, sameSite: 'strict' });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('accessToken');
    Cookies.remove('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
