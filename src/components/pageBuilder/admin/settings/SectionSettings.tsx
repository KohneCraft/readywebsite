'use client';

// ============================================
// Vav Yapı - Section Settings
// Section ayarları paneli
// ============================================

import { useState, useEffect } from 'react';
import { getSectionById, getColumnById, getBlockById, deleteColumn, deleteBlock } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import { SpacingControl } from '../controls/SpacingControl';
import { DualColorPicker } from '../controls/DualColorPicker';
import { Spinner } from '@/components/ui/Spinner';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { Section, Column, Block } from '@/types/pageBuilder';
import { BLOCK_TYPE_LABELS } from '@/types/pageBuilder';
import { Pencil, Trash2 } from 'lucide-react';

interface SectionSettingsProps {
  sectionId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Section>) => void;
  onColumnUpdate?: (columnId: string, updates: Partial<Column>) => void;
  onSelectBlock?: (blockId: string) => void;
  onSelectColumn?: (columnId: string) => void;
}

export function SectionSettings({ sectionId, activeTab, onUpdate, onColumnUpdate, onSelectBlock, onSelectColumn }: SectionSettingsProps) {
  const [section, setSection] = useState<Section | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [nestedColumnsMap, setNestedColumnsMap] = useState<Record<string, Column[]>>({});
  const [blocksMap, setBlocksMap] = useState<Record<string, Block[]>>({});
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
        setBlocksMap({});
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

        // Her kolonun bloklarını yükle (ana kolonlar ve nested kolonlar için)
        const blocksMapTemp: Record<string, Block[]> = {};
        for (const col of validColumns) {
          if (col.blocks && col.blocks.length > 0) {
            const blockPromises = col.blocks.map(blockId => getBlockById(blockId));
            const loadedBlocks = await Promise.all(blockPromises);
            blocksMapTemp[col.id] = loadedBlocks.filter(Boolean) as Block[];
          }
          // Nested kolonların bloklarını da yükle
          if (nestedMap[col.id]) {
            for (const nestedCol of nestedMap[col.id]) {
              if (nestedCol.blocks && nestedCol.blocks.length > 0) {
                const nestedBlockPromises = nestedCol.blocks.map(blockId => getBlockById(blockId));
                const loadedNestedBlocks = await Promise.all(nestedBlockPromises);
                blocksMapTemp[nestedCol.id] = loadedNestedBlocks.filter(Boolean) as Block[];
              }
            }
          }
        }
        setBlocksMap(blocksMapTemp);
      } catch (error) {
        logger.pageBuilder.error('Column yükleme hatası', error);
        setColumns([]);
        setNestedColumnsMap({});
        setBlocksMap({});
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

            {/* Col Span */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kolon Kapla
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={section?.colSpan ?? 1}
                onChange={(e) => {
                  const updated = {
                    ...section,
                    colSpan: parseInt(e.target.value) || 1,
                  };
                  setSection(updated);
                  onUpdate(updated);
                }}
                className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Section Hizalama */}
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Section Hizalama
            </label>
            <select
              value={section?.gridAlignment || 'start'}
              onChange={(e) => {
                const updated = {
                  ...section,
                  gridAlignment: e.target.value as 'start' | 'center' | 'end',
                };
                setSection(updated);
                onUpdate(updated);
              }}
              className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="start">Başa Hizala (Sol)</option>
              <option value="center">Ortala</option>
              <option value="end">Sona Hizala (Sağ)</option>
            </select>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Aynı satır numarasına sahip section'lar yan yana görünür. Satır/Kolon Kapla ile birden fazla hücre kaplayan bölümler oluşturabilirsiniz.
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

  // ADVANCED TAB - Section içeriği listesi
  const handleDeleteColumn = async (colId: string) => {
    if (!confirm('Bu kolonu silmek istediğinizden emin misiniz?')) return;
    try {
      await deleteColumn(colId);
      // Kolonları state'den hemen kaldır (UI anında güncellensin)
      setColumns(prev => prev.filter(c => c.id !== colId));
      // İlgili blokları da kaldır
      setBlocksMap(prev => {
        const newMap = { ...prev };
        delete newMap[colId];
        return newMap;
      });
      // Nested kolonları da kaldır
      setNestedColumnsMap(prev => {
        const newMap = { ...prev };
        delete newMap[colId];
        return newMap;
      });
      window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: section.id } }));
    } catch (error) {
      logger.pageBuilder.error('Kolon silme hatası', error);
    }
  };

  const handleDeleteBlock = async (blockId: string) => {
    if (!confirm('Bu bloğu silmek istediğinizden emin misiniz?')) return;
    try {
      await deleteBlock(blockId);
      // Blokları state'den hemen kaldır (UI anında güncellensin)
      setBlocksMap(prev => {
        const newMap = { ...prev };
        for (const key in newMap) {
          newMap[key] = newMap[key].filter(b => b.id !== blockId);
        }
        return newMap;
      });
      window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: section.id } }));
    } catch (error) {
      logger.pageBuilder.error('Blok silme hatası', error);
    }
  };

  // Kolon ve blok sayısını hesapla
  const totalColumns = columns.length;
  const totalNestedColumns = Object.values(nestedColumnsMap).reduce((sum, arr) => sum + arr.length, 0);
  const totalBlocks = Object.values(blocksMap).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="space-y-4">
      {/* Özet bilgi */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">İçerik Özeti</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">{totalColumns}</div>
            <div className="text-gray-500 dark:text-gray-400">Kolon</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">{totalNestedColumns}</div>
            <div className="text-gray-500 dark:text-gray-400">İç Kolon</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">{totalBlocks}</div>
            <div className="text-gray-500 dark:text-gray-400">Blok</div>
          </div>
        </div>
      </div>

      {/* Kolonlar ve Bloklar Listesi */}
      <div>
        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">İçerik Listesi</h4>
        
        {columns.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            Bu section&apos;da içerik bulunmuyor.
          </p>
        ) : (
          <div className="space-y-2">
            {columns.map((col, colIndex) => (
              <div key={col.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {/* Ana Kolon */}
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {colIndex + 1}. Kolon
                    {col.columns && col.columns.length > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        ({col.columns.length} iç kolon)
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectColumn?.(col.id)}
                      className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-100 dark:hover:text-primary-400 dark:hover:bg-primary-900/30 rounded transition-all"
                      title="Düzenle"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteColumn(col.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-900/30 rounded transition-all"
                      title="Kaldır"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Ana Kolonun Blokları */}
                {blocksMap[col.id] && blocksMap[col.id].length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {blocksMap[col.id].map((block, blockIndex) => (
                      <div
                        key={block.id}
                        className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                      >
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {blockIndex + 1}. {BLOCK_TYPE_LABELS[block.type] || block.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onSelectBlock?.(block.id)}
                            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-100 dark:hover:text-primary-400 dark:hover:bg-primary-900/30 rounded transition-all"
                            title="Düzenle"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(block.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-900/30 rounded transition-all"
                            title="Kaldır"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nested Kolonlar */}
                {nestedColumnsMap[col.id] && nestedColumnsMap[col.id].length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pl-4">
                    {nestedColumnsMap[col.id].map((nestedCol, nestedIndex) => (
                      <div key={nestedCol.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-b-0">
                        {/* Nested Kolon Başlığı */}
                        <div className="flex items-center justify-between p-2 bg-gray-25 dark:bg-gray-800/25">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            ↳ {colIndex + 1}.{nestedIndex + 1} İç Kolon
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onSelectColumn?.(nestedCol.id)}
                              className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-100 dark:hover:text-primary-400 dark:hover:bg-primary-900/30 rounded transition-all"
                              title="Düzenle"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteColumn(nestedCol.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-900/30 rounded transition-all"
                              title="Kaldır"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Nested Kolonun Blokları */}
                        {blocksMap[nestedCol.id] && blocksMap[nestedCol.id].length > 0 && (
                          <div className="pl-3">
                            {blocksMap[nestedCol.id].map((block, blockIndex) => (
                              <div
                                key={block.id}
                                className="flex items-center justify-between px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800/20"
                              >
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {blockIndex + 1}. {BLOCK_TYPE_LABELS[block.type] || block.type}
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => onSelectBlock?.(block.id)}
                                    className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-100 dark:hover:text-primary-400 dark:hover:bg-primary-900/30 rounded transition-all"
                                    title="Düzenle"
                                  >
                                    <Pencil className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBlock(block.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-900/30 rounded transition-all"
                                    title="Kaldır"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

