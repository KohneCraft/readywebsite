// ============================================
// Vav Yapı - Input Component
// Form input with variants
// ============================================

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg border bg-white px-4 py-2 text-base',
            'border-gray-300 dark:border-gray-600',
            'dark:bg-gray-800',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
