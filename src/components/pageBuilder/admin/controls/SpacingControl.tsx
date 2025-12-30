'use client';

// ============================================
// Vav Yapı - Spacing Control
// Padding/Margin kontrolü (top, right, bottom, left)
// ============================================

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Spacing } from '@/types/pageBuilder';

interface SpacingControlProps {
  value: Spacing;
  onChange: (spacing: Spacing) => void;
  label?: string;
}

export function SpacingControl({ value, onChange, label }: SpacingControlProps) {
  const [linked, setLinked] = useState(false);

  const handleChange = (side: keyof Spacing, newValue: number) => {
    if (linked) {
      // Tüm tarafları aynı yap
      onChange({
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue,
      });
    } else {
      onChange({
        ...value,
        [side]: newValue,
      });
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setLinked(!linked)}
            className={cn(
              'text-xs px-2 py-1 rounded transition-colors',
              linked
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
            title={linked ? 'Bağlantıyı Kaldır' : 'Tüm Tarafları Bağla'}
          >
            🔗
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {/* Top */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
            Üst
          </label>
          <input
            type="number"
            value={value.top || 0}
            onChange={(e) => handleChange('top', parseInt(e.target.value) || 0)}
            className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center"
          />
        </div>

        {/* Right */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
            Sağ
          </label>
          <input
            type="number"
            value={value.right || 0}
            onChange={(e) => handleChange('right', parseInt(e.target.value) || 0)}
            className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center"
          />
        </div>

        {/* Bottom */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
            Alt
          </label>
          <input
            type="number"
            value={value.bottom || 0}
            onChange={(e) => handleChange('bottom', parseInt(e.target.value) || 0)}
            className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center"
          />
        </div>

        {/* Left */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
            Sol
          </label>
          <input
            type="number"
            value={value.left || 0}
            onChange={(e) => handleChange('left', parseInt(e.target.value) || 0)}
            className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center"
          />
        </div>
      </div>
    </div>
  );
}

