'use client';

// ============================================
// Vav Yapı - Section Settings
// Section ayarları paneli
// ============================================

import { useState, useEffect } from 'react';
import { getSectionById, getColumnById } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import { SpacingControl } from '../controls/SpacingControl';
import { DualColorPicker } from '../controls/DualColorPicker';
import { Spinner } from '@/components/ui/Spinner';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { Section, Column } from '@/types/pageBuilder';

interface SectionSettingsProps {
  sectionId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Section>) => void;
  onColumnUpdate?: (columnId: string, updates: Partial<Column>) => void;
}

export function SectionSettings({ sectionId, activeTab, onUpdate, onColumnUpdate }: SectionSettingsProps) {
  const [section, setSection] = useState<Section | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [nestedColumnsMap, setNestedColumnsMap] = useState<Record<string, Column[]>>({});
  const [loading, setLoading] = useState(true);
  const [columnWidthUnit, setColumnWidthUnit] = useState<'percent' | 'pixels'>('percent');

  useEffect(() => {
    async function loadSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById(sectionId);
        setSection(sectionData);
      } catch (error) {
        logger.pageBuilder.error('Section yükleme hatası', error);
      } finally {
        setLoading(false);
      }
    }
    loadSection();
  }, [sectionId]);

  // Column'ları yükle - section.columns değiştiğinde yeniden yükle
  useEffect(() => {
    async function loadColumns() {
      if (!section?.columns || section.columns.length === 0) {
        setColumns([]);
        setNestedColumnsMap({});
        return;
      }

      try {
        const columnPromises = section.columns.map(columnId => getColumnById(columnId));
        const loadedColumns = await Promise.all(columnPromises);
        const validColumns = loadedColumns.filter(Boolean) as Column[];
        setColumns(validColumns);

        // Her kolonun iç kolonlarını yükle
        const nestedMap: Record<string, Column[]> = {};
        for (const col of validColumns) {
          if (col.columns && col.columns.length > 0) {
            const nestedPromises = col.columns.map(nestedId => getColumnById(nestedId));
            const nestedLoaded = await Promise.all(nestedPromises);
            nestedMap[col.id] = nestedLoaded.filter(Boolean) as Column[];
          }
        }
        setNestedColumnsMap(nestedMap);
      } catch (error) {
        logger.pageBuilder.error('Column yükleme hatası', error);
        setColumns([]);
        setNestedColumnsMap({});
      }
    }

    if (section) {
      loadColumns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section?.columns]);


  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!section) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        Section bulunamadı
      </div>
    );
  }

  const settings = section.settings || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Section Adı
          </label>
          <input
            type="text"
            value={section.name || ''}
            onChange={(e) => {
              const updated = { ...section, name: e.target.value };
              setSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arka Plan Rengi
          </label>
          <DualColorPicker
            lightColor={settings.backgroundColor || '#FFFFFF'}
            darkColor={settings.backgroundColorDark || 'auto'}
            onLightChange={(color) => {
              const updated = {
                ...section,
                settings: { ...settings, backgroundColor: color },
              };
              setSection(updated);
              onUpdate(updated);
            }}
            onDarkChange={(colorDark) => {
              const updated = {
                ...section,
                settings: { ...settings, backgroundColorDark: colorDark },
              };
              setSection(updated);
              onUpdate(updated);
            }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Padding
          </label>
          <SpacingControl
            value={settings.padding || { top: 0, right: 0, bottom: 0, left: 0 }}
            onChange={(padding) => {
              const updated = {
                ...section,
                settings: { ...settings, padding },
              };
              setSection(updated);
              onUpdate(updated);
            }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Margin
          </label>
          <SpacingControl
            value={settings.margin || { top: 0, right: 0, bottom: 0, left: 0 }}
            onChange={(margin) => {
              const updated = {
                ...section,
                settings: { ...settings, margin },
              };
              setSection(updated);
              onUpdate(updated);
            }}
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tam Genişlik
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.fullWidth || false}
              onChange={(e) => {
                const updated = {
                  ...section,
                  settings: { ...settings, fullWidth: e.target.checked },
                };
                setSection(updated);
                onUpdate(updated);
              }}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Container dışında tam genişlik
            </span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Genişlik (px)
          </label>
          <input
            type="number"
            value={settings.maxWidth || 1200}
            onChange={(e) => {
              const updated = {
                ...section,
                settings: { ...settings, maxWidth: parseInt(e.target.value) || 1200 },
              };
              setSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Yükseklik (px)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={settings.maxHeight || ''}
            placeholder="Sınırsız"
            onChange={(e) => {
              const maxHeightValue = e.target.value ? parseInt(e.target.value) : undefined;
              const updated = {
                ...section,
                settings: { ...settings, maxHeight: maxHeightValue },
              };
              setSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kolon Düzeni
          </label>
          <select
            value={settings.columnLayout || 'row'}
            onChange={(e) => {
              const updated = {
                ...section,
                settings: { ...settings, columnLayout: e.target.value as 'row' | 'column' },
              };
              setSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="row">Yan Yana</option>
            <option value="column">Alt Alta</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Kolon Arası Boşluk (px)
          </label>
          <input
            type="number"
            value={settings.columnGap || 30}
            onChange={(e) => {
              const updated = {
                ...section,
                settings: { ...settings, columnGap: parseInt(e.target.value) || 30 },
              };
              setSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kolonlar Arası Hizalama
          </label>
          <select
            value={settings.columnAlignment || 'start'}
            onChange={(e) => {
              const updated = {
                ...section,
                settings: { ...settings, columnAlignment: e.target.value as any },
              };
              setSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="start">Başlangıç (Sol)</option>
            <option value="center">Orta</option>
            <option value="end">Son (Sağ)</option>
            <option value="space-between">İki Yana Yaslı</option>
            <option value="space-around">Boşluklu (Around)</option>
            <option value="space-evenly">Eşit Boşluklu</option>
          </select>
        </div>

        {/* Grid Konumu */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-3">
            📐 Grid Konumu
          </label>

          <div className="grid grid-cols-3 gap-3">
            {/* Satır Numarası */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Satır No
              </label>
              <input
                type="number"
                min={0}
                value={section?.rowOrder ?? 0}
                onChange={(e) => {
                  const updated = {
                    ...section,
                    rowOrder: parseInt(e.target.value) || 0,
                  };
                  setSection(updated);
                  onUpdate(updated);
                }}
                className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            {/* Kolon Sırası */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kolon Sırası
              </label>
              <input
                type="number"
                min={0}
                value={section?.columnOrder ?? 0}
                onChange={(e) => {
                  const updated = {
                    ...section,
                    columnOrder: parseInt(e.target.value) || 0,
                  };
                  setSection(updated);
                  onUpdate(updated);
                }}
                className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            {/* Row Span */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Satır Kapla
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={section?.rowSpan ?? 1}
                onChange={(e) => {
                  const updated = {
                    ...section,
                    rowSpan: parseInt(e.target.value) || 1,
                  };
                  setSection(updated);
                  onUpdate(updated);
                }}
                className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Aynı satır numarasına sahip section'lar yan yana görünür. Satır Kapla değeri ile birden fazla satırı kaplayan bölümler oluşturabilirsiniz.
          </p>
        </div>

        {/* Kolon Genişlikleri */}
        {columns.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Kolon Genişlikleri
              </label>
              <select
                value={columnWidthUnit}
                onChange={(e) => {
                  const unit = e.target.value as 'percent' | 'pixels';
                  setColumnWidthUnit(unit);
                }}
                className="px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="percent">%</option>
                <option value="pixels">px</option>
              </select>
            </div>
            <div className="space-y-2">
              {columns.map((col, index) => {
                // Bu kolonun iç kolonlarını kontrol et
                const nestedColumns = nestedColumnsMap[col.id] || [];
                const hasNestedColumns = nestedColumns.length > 0;
                // Width birim kontrolü: 0-100 arası % olarak, değilse px olarak
                const isCurrentWidthPercent = col.width !== undefined && col.width <= 100 && col.width >= 0;
                const displayWidth = columnWidthUnit === 'percent' && !isCurrentWidthPercent
                  ? Math.round((col.width || 0) / 12 * 100) // px'den %'ye yaklaşık dönüşüm
                  : col.width || 0;
                return (
                  <div key={col.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400 w-16">
                        Kolon {index + 1}:
                      </span>
                      <Input
                        type="number"
                        min="0"
                        max={columnWidthUnit === 'percent' ? 100 : undefined}
                        step={columnWidthUnit === 'percent' ? 0.1 : 1}
                        value={displayWidth}
                        onChange={(e) => {
                          const newWidth = columnWidthUnit === 'percent'
                            ? parseFloat(e.target.value) || 0
                            : parseInt(e.target.value) || 0;
                          const updatedColumns = columns.map(c =>
                            c.id === col.id ? { ...c, width: newWidth } : c
                          );
                          setColumns(updatedColumns);
                          // Column güncellemesini pending updates'e ekle
                          if (onColumnUpdate) {
                            onColumnUpdate(col.id, { width: newWidth });
                          }
                        }}
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {columnWidthUnit === 'percent' ? '%' : 'px'}
                      </span>
                      {hasNestedColumns && (
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          ({nestedColumns.length} iç kolon)
                        </span>
                      )}
                    </div>
                    {/* İç kolon genişlikleri */}
                    {hasNestedColumns && (
                      <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-1">
                        {nestedColumns.map((nestedCol, nestedIndex) => (
                          <div key={nestedCol.id} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-500 w-12">
                              → {nestedIndex + 1}:
                            </span>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={nestedCol.width || 0}
                              onChange={(e) => {
                                const newWidth = parseFloat(e.target.value) || 0;

                                // UI'ı hemen güncelle (anlık görünüm için)
                                const updatedNestedColumns = nestedColumns.map(nc =>
                                  nc.id === nestedCol.id ? { ...nc, width: newWidth } : nc
                                );
                                setNestedColumnsMap(prev => ({
                                  ...prev,
                                  [col.id]: updatedNestedColumns,
                                }));
                                // Nested column güncellemesini pending updates'e ekle
                                if (onColumnUpdate) {
                                  onColumnUpdate(nestedCol.id, { width: newWidth });
                                }
                              }}
                              className="flex-1"
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-500">%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {columnWidthUnit === 'percent' && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Toplam:</span>
                    <span className={cn(
                      'font-medium',
                      columns.reduce((sum, col) => {
                        const width = col.width || 0;
                        // Sadece % olan kolonları topla
                        return (width <= 100 && width >= 0) ? sum + width : sum;
                      }, 0) === 100
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    )}>
                      {columns.reduce((sum, col) => {
                        const width = col.width || 0;
                        return (width <= 100 && width >= 0) ? sum + width : sum;
                      }, 0).toFixed(1)}%
                    </span>
                  </div>
                  {columns.reduce((sum, col) => {
                    const width = col.width || 0;
                    return (width <= 100 && width >= 0) ? sum + width : sum;
                  }, 0) !== 100 && (
                      <button
                        onClick={async () => {
                          // Eşit dağıt
                          const equalWidth = 100 / columns.length;
                          const updatedColumns = columns.map(c => ({ ...c, width: equalWidth }));
                          setColumns(updatedColumns);

                          try {
                            const { updateColumn } = await import('@/lib/firebase/firestore');
                            await Promise.all(
                              updatedColumns.map(col => updateColumn(col.id, { width: col.width }))
                            );
                            window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                          } catch (error) {
                            logger.pageBuilder.error('Kolon genişlikleri güncelleme hatası', error);
                          }
                        }}
                        className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Eşit Dağıt ({columns.length > 0 ? (100 / columns.length).toFixed(1) : 0}%)
                      </button>
                    )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Gelişmiş ayarlar yakında eklenecek
      </p>
    </div>
  );
}

