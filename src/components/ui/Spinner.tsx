// ============================================
// Vav Yapı - Spinner Component
// Loading spinner with variants
// ============================================

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2
        className={cn(
          'animate-spin text-primary-600 dark:text-primary-400',
          sizeClasses[size],
          className
        )}
      />
      {label && (
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      )}
    </div>
  );
}

// Full page loading spinner
export function PageSpinner({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <Spinner size="xl" label={label} />
    </div>
  );
}

// Section loading spinner
export function SectionSpinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Spinner size="lg" label={label} />
    </div>
  );
}
