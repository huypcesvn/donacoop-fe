'use client'

import { navItems } from '@/lib/constants';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import MobileNavigation from './MobileNavigation';
import UserSection from './UserSection';

const Navigation = () => {
  return (
    <nav className='top-0 z-50 sticky bg-background/80 backdrop-blur-md border-b border-border/50'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <h1 className='font-serif font-bold text-foreground text-xl select-none'>
              Donacoop
            </h1>
          </div>

          {/* Desktop navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
              >
                {item.name}
              </Link>
            ))}

            <ThemeToggle />

            <UserSection />
          </div>

          <MobileNavigation />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
