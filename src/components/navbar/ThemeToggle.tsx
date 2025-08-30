'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '../ui/switch';
import { useEffect, useState } from 'react';


import React from 'react'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex items-center space-x-2'>
        <Sun className='size-4' />
        <Switch disabled />
        <Moon className='size-4' />
      </div>
    );
  }

  return (
    <div className='flex items-center space-x-2'>
      <Sun
        className={`size-4 transition-colors ${
          theme === 'light' ? 'text-yellow-500' : 'text-muted-foreground'
        }`}
      />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
      <Moon
        className={`size-4 transition-colors ${
          theme === 'dark' ? 'text-yellow-500' : 'text-muted-foreground'
        }`}
      />
    </div>
  );
}

export default ThemeToggle;
