'use client';

// ============================================
// Vav Yapı - Page Builder Right Panel
// Ayarlar paneli - seçili elementin özelliklerini düzenler
// ============================================

import { useState } from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';
import { SectionSettings } from '../settings/SectionSettings';
import { ColumnSettings } from '../settings/ColumnSettings';
import { BlockSettings } from '../settings/BlockSettings';
import { PageSettings } from '../settings/PageSettings';
import { cn } from '@/lib/utils';
import type { Page } from '@/types/pageBuilder';

interface RightPanelProps {
  selectedElement: { type: 'section' | 'column' | 'block'; id: string } | null;
  page: Page;
  onUpdate: (updates: Partial<Page>) => void;
}

export function RightPanel({ selectedElement, page, onUpdate }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<'style' | 'settings' | 'advanced'>('style');

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center p-8">
          <SettingsIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Düzenlemek için bir element seçin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {getElementTitle(selectedElement)}
          </h3>
          <button
            onClick={() => {
              // Seçimi temizle
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {(['style', 'settings', 'advanced'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 px-4 py-2 text-xs font-medium transition-colors',
              activeTab === tab
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            {tab === 'style' ? 'Stil' : tab === 'settings' ? 'Ayarlar' : 'Gelişmiş'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderSettings(selectedElement, activeTab, page, onUpdate)}
      </div>
    </div>
  );
}

function getElementTitle(element: { type: 'section' | 'column' | 'block'; id: string }): string {
  switch (element.type) {
    case 'section':
      return 'Section Ayarları';
    case 'column':
      return 'Kolon Ayarları';
    case 'block':
      return 'Blok Ayarları';
    default:
      return 'Ayarlar';
  }
}

function renderSettings(
  selectedElement: { type: 'section' | 'column' | 'block'; id: string },
  activeTab: 'style' | 'settings' | 'advanced',
  page: Page,
  onUpdate: (updates: Partial<Page>) => void
) {
  if (selectedElement.type === 'section') {
    return (
      <SectionSettings
        sectionId={selectedElement.id}
        activeTab={activeTab}
        onUpdate={(updates) => {
          // Section güncelleme
          console.log('Section güncelle:', selectedElement.id, updates);
        }}
      />
    );
  }

  if (selectedElement.type === 'column') {
    return (
      <ColumnSettings
        columnId={selectedElement.id}
        activeTab={activeTab}
        onUpdate={(updates) => {
          // Column güncelleme
          console.log('Column güncelle:', selectedElement.id, updates);
        }}
      />
    );
  }

  if (selectedElement.type === 'block') {
    return (
      <BlockSettings
        blockId={selectedElement.id}
        activeTab={activeTab}
        onUpdate={(updates) => {
          // Block güncelleme
          console.log('Block güncelle:', selectedElement.id, updates);
        }}
      />
    );
  }

  // Page settings (eğer hiçbir element seçili değilse)
  return (
    <PageSettings
      page={page}
      activeTab={activeTab}
      onUpdate={onUpdate}
    />
  );
}

