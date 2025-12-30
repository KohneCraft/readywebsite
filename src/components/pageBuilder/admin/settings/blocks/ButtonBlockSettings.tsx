'use client';

// ============================================
// Vav Yapı - Button Block Settings
// Buton bloğu ayarları
// ============================================

import { ColorPicker } from '../../controls/ColorPicker';
import { SpacingControl } from '../../controls/SpacingControl';
import { cn } from '@/lib/utils';
import type { Block } from '@/types/pageBuilder';

interface ButtonBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function ButtonBlockSettings({ block, activeTab, onUpdate }: ButtonBlockSettingsProps) {
  const props = block.props || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buton Metni
          </label>
          <input
            type="text"
            value={props.text || ''}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Tıklayın"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Link URL
          </label>
          <input
            type="url"
            value={props.link || ''}
            onChange={(e) => onUpdate({ link: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buton Stili
          </label>
          <div className="flex gap-2">
            {['primary', 'secondary', 'outline'].map((style) => (
              <button
                key={style}
                onClick={() => onUpdate({ buttonStyle: style as any })}
                className={cn(
                  'flex-1 px-3 py-2 text-xs rounded-lg transition-colors',
                  props.buttonStyle === style
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {style === 'primary' ? 'Primary' : style === 'secondary' ? 'Secondary' : 'Outline'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arka Plan Rengi
          </label>
          <ColorPicker
            color={props.backgroundColor || '#007bff'}
            onChange={(color) => onUpdate({ backgroundColor: color })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Metin Rengi
          </label>
          <ColorPicker
            color={props.textColor || '#ffffff'}
            onChange={(color) => onUpdate({ textColor: color })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Padding
          </label>
          <SpacingControl
            value={props.padding || { top: 12, right: 24, bottom: 12, left: 24 }}
            onChange={(padding) => onUpdate({ padding })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Button block ayarları
      </p>
    </div>
  );
}

