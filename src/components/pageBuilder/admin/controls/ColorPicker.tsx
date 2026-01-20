'use client';

// ============================================
// Vav Yapı - Color Picker Control
// Renk seçici component
// ============================================

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hexColor, setHexColor] = useState(color || '#000000');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHexColor(color || '#000000');
  }, [color]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleColorChange = (newColor: string) => {
    // Hex renk kodlarını büyük harfe çevir
    const upperCaseColor = newColor.toUpperCase();
    setHexColor(upperCaseColor);
    onChange(upperCaseColor);
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      >
        <div
          className="w-8 h-8 rounded border border-gray-200 dark:border-gray-700"
          style={hexColor.toLowerCase() === 'transparent' ? {
            backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
          } : { backgroundColor: hexColor }}
        />
        <span className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300">
          {hexColor}
        </span>
        <svg
          className={cn(
            'w-4 h-4 text-gray-400 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-3">
            {/* Hex Input */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hex Kodu
              </label>
              <input
                type="text"
                value={hexColor}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                    handleColorChange(value);
                  }
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                placeholder="#000000"
              />
            </div>

            {/* Transparent Option */}
            <div>
              <button
                type="button"
                onClick={() => handleColorChange('transparent')}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all',
                  hexColor.toLowerCase() === 'transparent'
                    ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                )}
              >
                <div
                  className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                    backgroundSize: '8px 8px',
                    backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                  }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Şeffaf (Transparent)</span>
              </button>
            </div>

            {/* Preset Colors */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Önceden Tanımlı Renkler
              </label>
              <div className="grid grid-cols-8 gap-2">
                {[
                  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
                  '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#800000',
                  '#008000', '#000080', '#808000', '#800080', '#008080',
                  '#C0C0C0', '#FF8080', '#80FF80', '#8080FF', '#FFFF80',
                  '#FF80FF', '#80FFFF', '#FFA500', '#A52A2A', '#FFC0CB',
                ].map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    onClick={() => handleColorChange(presetColor)}
                    className={cn(
                      'w-8 h-8 rounded border-2 transition-all',
                      hexColor.toUpperCase() === presetColor.toUpperCase()
                        ? 'border-primary-600 dark:border-primary-400 scale-110'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                    )}
                    style={{ backgroundColor: presetColor }}
                    title={presetColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

