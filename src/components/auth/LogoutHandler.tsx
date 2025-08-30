'use client'

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw } from 'lucide-react';

export default function LogoutHandler() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 cursor-pointer"
      >
        {isLoggingOut ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
        <span className="hidden md:inline">
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </span>
      </Button>
    </div>
  );
}
