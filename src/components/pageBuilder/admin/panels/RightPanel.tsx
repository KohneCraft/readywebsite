'use client';

// ============================================
// Page Builder - Right Panel
// Ayarlar paneli - seçili elementin özelliklerini düzenler
// ============================================

import { useState, useCallback } from 'react';
import { X, Settings as SettingsIcon, Navigation, Layout, LayoutTemplate } from 'lucide-react';
import { SectionSettings } from '../settings/SectionSettings';
import { ColumnSettings } from '../settings/ColumnSettings';
import { BlockSettings } from '../settings/BlockSettings';
import { PageSettings } from '../settings/PageSettings';
import { HeaderSettings } from '../settings/HeaderSettings';
import { FooterSettings } from '../settings/FooterSettings';
import { SectionTemplatePanel } from './SectionTemplatePanel';
import { cn } from '@/lib/utils';
import type { Page, Section, Column, Block, SectionTemplate } from '@/types/pageBuilder';

interface RightPanelProps {
  selectedElement: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null;
  page?: Page;
  onUpdate?: (updates: Partial<Page>) => void;
  onSelectElement?: (element: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null) => void;
  onSectionUpdate?: (sectionId: string, updates: Partial<Section>) => void;
  onColumnUpdate?: (columnId: string, updates: Partial<Column>) => void;
  onBlockUpdate?: (blockId: string, updates: Partial<Block>) => void;
  // Live preview için pending block updates
  pendingBlockUpdates?: Record<string, Partial<Block>>;
  // Template ekleme
  onTemplateInsert?: (template: SectionTemplate, mode: 'append' | 'replace') => Promise<void>;
}

export function RightPanel({ selectedElement, page, onUpdate, onSelectElement, onSectionUpdate, onColumnUpdate, onBlockUpdate, pendingBlockUpdates, onTemplateInsert }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<'style' | 'settings' | 'advanced'>('style');
  const [viewMode, setViewMode] = useState<'element' | 'header' | 'footer' | 'page' | 'template'>('element');

  // State güncelleme fonksiyonları - debounce yok, sadece pending updates'e ekle
  const handleSectionUpdate = useCallback((updates: Partial<Section>) => {
    if (!selectedElement || !onSectionUpdate) return;
    // Pending updates'e ekle - gerçek kayıt TopBar'daki Kaydet butonuna tıklandığında yapılacak
    onSectionUpdate(selectedElement.id, updates);
  }, [selectedElement, onSectionUpdate]);

  const handleColumnUpdate = useCallback((updates: Partial<Column>) => {
    if (!selectedElement || !onColumnUpdate) return;
    // Pending updates'e ekle - gerçek kayıt TopBar'daki Kaydet butonuna tıklandığında yapılacak
    onColumnUpdate(selectedElement.id, updates);
  }, [selectedElement, onColumnUpdate]);

  const handleBlockUpdate = useCallback((updates: Partial<Block>) => {
    if (!selectedElement || !onBlockUpdate) return;
    // Pending updates'e ekle - gerçek kayıt TopBar'daki Kaydet butonuna tıklandığında yapılacak
    onBlockUpdate(selectedElement.id, updates);
  }, [selectedElement, onBlockUpdate]);

  // View mode seçimi (Header, Footer, Page Settings veya Element)
  if (!selectedElement) {
    return (
      <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
        {/* View Mode Selector */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setViewMode('header')}
              className={cn(
                'p-2.5 rounded-lg border transition-colors text-xs font-medium',
                viewMode === 'header'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <Navigation className="w-4 h-4 mx-auto mb-1" />
              Navbar
            </button>
            <button
              onClick={() => setViewMode('footer')}
              className={cn(
                'p-2.5 rounded-lg border transition-colors text-xs font-medium',
                viewMode === 'footer'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <Layout className="w-4 h-4 mx-auto mb-1" />
              Footer
            </button>
            <button
              onClick={() => setViewMode('page')}
              className={cn(
                'p-2.5 rounded-lg border transition-colors text-xs font-medium',
                viewMode === 'page'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <SettingsIcon className="w-4 h-4 mx-auto mb-1" />
              Sayfa
            </button>
            <button
              onClick={() => setViewMode('template')}
              className={cn(
                'p-2.5 rounded-lg border transition-colors text-xs font-medium',
                viewMode === 'template'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <LayoutTemplate className="w-4 h-4 mx-auto mb-1" />
              Template
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === 'header' && (
            <div className="p-4">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
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
              <HeaderSettings activeTab={activeTab} onUpdate={onUpdate} />
            </div>
          )}

          {viewMode === 'footer' && (
            <div className="p-4">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
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
              <FooterSettings activeTab={activeTab} onUpdate={onUpdate} />
            </div>
          )}

          {viewMode === 'page' && page && (
            <div className="p-4">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
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
              <PageSettings page={page} activeTab={activeTab} onUpdate={onUpdate || (() => { })} />
            </div>
          )}

          {viewMode === 'template' && page && onTemplateInsert && (
            <div className="p-4">
              <SectionTemplatePanel
                currentSections={page.sections?.map(id => ({ id, name: '', columns: [], order: 0, visibility: { desktop: true, tablet: true, mobile: true } })) || []}
                onTemplateInsert={onTemplateInsert}
              />
            </div>
          )}

          {viewMode === 'element' && (
            <div className="text-center p-8">
              <SettingsIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Düzenlemek için bir element seçin
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {getElementTitle(selectedElement)}
          </h3>
          <button
            onClick={() => {
              // Seçimi temizle
              if (onSelectElement) {
                onSelectElement(null);
              }
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Kapat"
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
      <div className="flex-1 overflow-y-auto p-4 overflow-x-hidden">
        {selectedElement.type === 'section' && (
          <SectionSettings
            sectionId={selectedElement.id}
            activeTab={activeTab}
            onUpdate={handleSectionUpdate}
            onColumnUpdate={onColumnUpdate}
            onSelectBlock={(blockId) => onSelectElement?.({ type: 'block', id: blockId })}
            onSelectColumn={(columnId) => onSelectElement?.({ type: 'column', id: columnId })}
          />
        )}
        {selectedElement.type === 'column' && (
          <ColumnSettings
            columnId={selectedElement.id}
            activeTab={activeTab}
            onUpdate={handleColumnUpdate}
            onSelectBlock={(blockId) => onSelectElement?.({ type: 'block', id: blockId })}
            onSelectColumn={(columnId) => onSelectElement?.({ type: 'column', id: columnId })}
          />
        )}
        {selectedElement.type === 'block' && (
          <BlockSettings
            blockId={selectedElement.id}
            activeTab={activeTab}
            onUpdate={handleBlockUpdate}
            pendingBlock={pendingBlockUpdates?.[selectedElement.id]}
          />
        )}
      </div>
    </div>
  );
}

function getElementTitle(element: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string }): string {
  switch (element.type) {
    case 'section':
      return 'Section Ayarları';
    case 'column':
      return 'Kolon Ayarları';
    case 'block':
      return 'Blok Ayarları';
    case 'page':
      return 'Sayfa Ayarları';
    case 'header':
      return 'Navbar Ayarları';
    case 'footer':
      return 'Footer Ayarları';
    default:
      return 'Ayarlar';
  }
}
