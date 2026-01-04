'use client';

// ============================================
// Page Builder - Right Panel
// Ayarlar paneli - seçili elementin özelliklerini düzenler
// ============================================

import { useState, useCallback, useRef } from 'react';
import { X, Settings as SettingsIcon, Navigation, Layout, Image as ImageIcon } from 'lucide-react';
import { SectionSettings } from '../settings/SectionSettings';
import { ColumnSettings } from '../settings/ColumnSettings';
import { BlockSettings } from '../settings/BlockSettings';
import { PageSettings } from '../settings/PageSettings';
import { HeaderSettings } from '../settings/HeaderSettings';
import { FooterSettings } from '../settings/FooterSettings';
import { IconSettings } from '../settings/IconSettings';
import { updateSection, updateColumn, updateBlock } from '@/lib/firebase/firestore';
import { cn } from '@/lib/utils';
import type { Page, Section, Column, Block } from '@/types/pageBuilder';

interface RightPanelProps {
  selectedElement: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null;
  page?: Page;
  onUpdate?: (updates: Partial<Page>) => void;
}

export function RightPanel({ selectedElement, page, onUpdate }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<'style' | 'settings' | 'advanced'>('style');
  const [viewMode, setViewMode] = useState<'element' | 'header' | 'footer' | 'page' | 'icon'>('element');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounced update fonksiyonları
  const handleSectionUpdate = useCallback(async (updates: Partial<Section>) => {
    if (!selectedElement) return;
    
    // Debounce: 500ms bekle
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(async () => {
      try {
        await updateSection(selectedElement.id, {
          name: updates.name,
          settings: updates.settings,
          order: updates.order,
          visibility: updates.visibility,
        });
        // Section güncelleme event'i gönder
        window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: selectedElement.id } }));
      } catch (error) {
        console.error('Section güncelleme hatası:', error);
      }
    }, 500);
  }, [selectedElement]);

  const handleColumnUpdate = useCallback(async (updates: Partial<Column>) => {
    if (!selectedElement) return;
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(async () => {
      try {
        await updateColumn(selectedElement.id, {
          width: updates.width,
          settings: updates.settings,
          order: updates.order,
        });
        window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
      } catch (error) {
        console.error('Column güncelleme hatası:', error);
      }
    }, 500);
  }, [selectedElement]);

  const handleBlockUpdate = useCallback(async (updates: Partial<Block>) => {
    if (!selectedElement) return;
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(async () => {
      try {
        const updateData: any = {};
        if (updates.props !== undefined) {
          updateData.props = updates.props;
        }
        if (updates.order !== undefined) {
          updateData.order = updates.order;
        }
        await updateBlock(selectedElement.id, updateData);
        window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
      } catch (error) {
        console.error('Block güncelleme hatası:', error);
      }
    }, 500);
  }, [selectedElement]);

  // View mode seçimi (Header, Footer, Page Settings veya Element)
  if (!selectedElement) {
    return (
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        {/* View Mode Selector */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setViewMode('header')}
              className={cn(
                'p-3 rounded-lg border transition-colors text-sm font-medium',
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
                'p-3 rounded-lg border transition-colors text-sm font-medium',
                viewMode === 'footer'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <Layout className="w-4 h-4 mx-auto mb-1" />
              Footer
            </button>
            <button
              onClick={() => setViewMode('icon')}
              className={cn(
                'p-3 rounded-lg border transition-colors text-sm font-medium',
                viewMode === 'icon'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <ImageIcon className="w-4 h-4 mx-auto mb-1" />
              Icon
            </button>
            <button
              onClick={() => setViewMode('page')}
              className={cn(
                'p-3 rounded-lg border transition-colors text-sm font-medium',
                viewMode === 'page'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <SettingsIcon className="w-4 h-4 mx-auto mb-1" />
              Sayfa Ayarları
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

          {viewMode === 'icon' && (
            <div className="p-4">
              <IconSettings onUpdate={() => {}} />
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
              <PageSettings page={page} activeTab={activeTab} onUpdate={onUpdate || (() => {})} />
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
        {selectedElement.type === 'section' && (
          <SectionSettings
            sectionId={selectedElement.id}
            activeTab={activeTab}
            onUpdate={handleSectionUpdate}
          />
        )}
        {selectedElement.type === 'column' && (
          <ColumnSettings
            columnId={selectedElement.id}
            activeTab={activeTab}
            onUpdate={handleColumnUpdate}
          />
        )}
        {selectedElement.type === 'block' && (
          <BlockSettings
            blockId={selectedElement.id}
            activeTab={activeTab}
            onUpdate={handleBlockUpdate}
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
