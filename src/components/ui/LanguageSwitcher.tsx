'use client';

// ============================================
// Vav Yapı - Language Switcher Component
// Multi-language selector dropdown
// ============================================

import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, localeNames, type Locale } from '@/i18n';

// Create navigation hooks for next-intl 4.x
const { Link, usePathname } = createNavigation();

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
}

export function LanguageSwitcher({ className, variant = 'dropdown' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // next-intl's usePathname already returns pathname without locale prefix
  const currentPath = useMemo(() => pathname || '/', [pathname]);

  if (variant === 'buttons') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {locales.map((l) => (
          <Link
            key={l}
            href={currentPath}
            locale={l}
            onClick={() => setIsOpen(false)}
            className={cn(
              'px-2 py-1 text-sm font-medium rounded-md transition-colors',
              locale === l
                ? 'bg-primary-600 text-white cursor-default pointer-events-none'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300'
            )}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
          'transition-colors text-sm font-medium'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{locale.toUpperCase()} {localeNames[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 py-2 w-44',
            'bg-white dark:bg-gray-900 rounded-lg shadow-lg',
            'border border-gray-200 dark:border-gray-700',
            'z-50 animate-in fade-in slide-in-from-top-2'
          )}
          role="listbox"
        >
          {locales.map((l) => (
            <Link
              key={l}
              href={currentPath}
              locale={l}
              onClick={() => setIsOpen(false)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-sm',
                'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                locale === l 
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              )}
              role="option"
              aria-selected={locale === l}
            >
              <span className="font-bold text-xs w-6">{l.toUpperCase()}</span>
              <span>{localeNames[l]}</span>
              {locale === l && <span className="ml-auto">✓</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
