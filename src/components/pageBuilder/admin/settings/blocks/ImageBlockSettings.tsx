'use client';

// ============================================
// Vav Yapı - Image Block Settings
// Görsel bloğu ayarları
// ============================================

import { SpacingControl } from '../../controls/SpacingControl';
import type { Block } from '@/types/pageBuilder';

interface ImageBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function ImageBlockSettings({ block, activeTab, onUpdate }: ImageBlockSettingsProps) {
  const props = block.props || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Görsel URL
          </label>
          <input
            type="url"
            value={props.src || ''}
            onChange={(e) => onUpdate({ src: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Alt Metin
          </label>
          <input
            type="text"
            value={props.alt || ''}
            onChange={(e) => onUpdate({ alt: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Görsel açıklaması"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Genişlik
          </label>
          <input
            type="text"
            value={props.imageWidth || '100%'}
            onChange={(e) => onUpdate({ imageWidth: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="100%, 500px, auto"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Border Radius (px)
          </label>
          <input
            type="number"
            value={props.borderRadius || 0}
            onChange={(e) => onUpdate({ borderRadius: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Margin
          </label>
          <SpacingControl
            value={props.margin || { top: 0, right: 0, bottom: 0, left: 0 }}
            onChange={(margin) => onUpdate({ margin })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Image block ayarları
      </p>
    </div>
  );
}

