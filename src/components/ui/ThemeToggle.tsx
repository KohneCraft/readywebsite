'use client';

// ============================================
// Vav Yapı - Theme Toggle Component
// Dark/Light mode switcher
// ============================================

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'icon' | 'dropdown';
}

export function ThemeToggle({ className, variant = 'icon' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          'p-2 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800', className)}>
        <button
          onClick={() => setTheme('light')}
          className={cn(
            'p-2 rounded-md transition-colors',
            theme === 'light'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
          aria-label="Light mode"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            'p-2 rounded-md transition-colors',
            theme === 'dark'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
          aria-label="Dark mode"
        >
          <Moon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTheme('system')}
          className={cn(
            'p-2 rounded-md transition-colors',
            theme === 'system'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
          aria-label="System theme"
        >
          <Monitor className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'p-2 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
        className
      )}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
