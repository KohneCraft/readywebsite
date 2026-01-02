'use client';

// ============================================
// Vav Yapı - Text Block Settings
// Metin bloğu ayarları
// ============================================

import { ColorPicker } from '../../controls/ColorPicker';
import { SpacingControl } from '../../controls/SpacingControl';
import { cn } from '@/lib/utils';
import type { Block } from '@/types/pageBuilder';

interface TextBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function TextBlockSettings({ block, activeTab, onUpdate }: TextBlockSettingsProps) {
  const props = block.props || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            İçerik
          </label>
          <textarea
            value={props.content || ''}
            onChange={(e) => onUpdate({ content: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Metin içeriği..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Font Boyutu (px)
          </label>
          <input
            type="number"
            value={props.fontSize || 16}
            onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) || 16 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Renk
          </label>
          <ColorPicker
            color={props.color || '#333333'}
            onChange={(color) => onUpdate({ color })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hizalama
          </label>
          <div className="flex gap-2">
            {['left', 'center', 'right', 'justify'].map((align) => (
              <button
                key={align}
                onClick={() => onUpdate({ textAlign: align as any })}
                className={cn(
                  'flex-1 px-3 py-2 text-xs rounded-lg transition-colors',
                  props.textAlign === align
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {align === 'left' ? 'Sol' : align === 'center' ? 'Orta' : align === 'right' ? 'Sağ' : 'İki Yana'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Padding
          </label>
          <SpacingControl
            value={props.padding || { top: 0, right: 0, bottom: 0, left: 0 }}
            onChange={(padding) => onUpdate({ padding })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Text block ayarları
      </p>
    </div>
  );
}

