'use client';

// ============================================
// Vav Yapı - Column Settings
// Column ayarları paneli
// ============================================

import { useState, useEffect } from 'react';
import { getColumnById } from '@/lib/firebase/firestore';
import { SpacingControl } from '../controls/SpacingControl';
import { ColorPicker } from '../controls/ColorPicker';
import { Spinner } from '@/components/ui/Spinner';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { Column } from '@/types/pageBuilder';

interface ColumnSettingsProps {
  columnId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Column>) => void;
}

export function ColumnSettings({ columnId, activeTab, onUpdate }: ColumnSettingsProps) {
  const [column, setColumn] = useState<Column | null>(null);
  const [nestedColumns, setNestedColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadColumn() {
      try {
        setLoading(true);
        const columnData = await getColumnById(columnId);
        setColumn(columnData);
      } catch (error) {
        console.error('Column yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    }
    loadColumn();
  }, [columnId]);

  // Nested columns'ları yükle
  useEffect(() => {
    async function loadNestedColumns() {
      if (!column?.columns || column.columns.length === 0) {
        setNestedColumns([]);
        return;
      }

      try {
        const columnPromises = column.columns.map(columnId => getColumnById(columnId));
        const loadedColumns = await Promise.all(columnPromises);
        setNestedColumns(loadedColumns.filter(Boolean) as Column[]);
      } catch (error) {
        console.error('Nested column yükleme hatası:', error);
        setNestedColumns([]);
      }
    }

    if (column) {
      loadNestedColumns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column?.columns]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!column) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        Column bulunamadı
      </div>
    );
  }

  const settings = column.settings || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Genişlik (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={column.width || 100}
            onChange={async (e) => {
              const newWidth = parseFloat(e.target.value) || 100;
              const updated = { ...column, width: newWidth };
              setColumn(updated);
              onUpdate(updated);
              
              // Firestore'da güncelle
              try {
                const { updateColumn } = await import('@/lib/firebase/firestore');
                await updateColumn(column.id, { width: newWidth });
                window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
              } catch (error) {
                console.error('Kolon genişliği güncelleme hatası:', error);
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Yükseklik
          </label>
          <div className="flex gap-2">
            <select
              value={typeof settings.height === 'string' ? settings.height : 'custom'}
              onChange={(e) => {
                const heightValue = e.target.value === 'auto' ? 'auto' : e.target.value === '100%' ? '100%' : undefined;
                const updated = {
                  ...column,
                  settings: { ...settings, height: heightValue },
                };
                setColumn(updated);
                onUpdate(updated);
                
                // Firestore'da güncelle
                (async () => {
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { 
                      settings: { ...settings, height: heightValue },
                    });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    console.error('Kolon yüksekliği güncelleme hatası:', error);
                  }
                })();
              }}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="auto">Otomatik</option>
              <option value="100%">Tam Yükseklik</option>
              <option value="custom">Özel (px)</option>
            </select>
            {(!settings.height || (typeof settings.height === 'number')) && (
              <input
                type="number"
                min="0"
                step="1"
                value={typeof settings.height === 'number' ? settings.height : ''}
                placeholder="px"
                onChange={async (e) => {
                  const heightValue = e.target.value ? parseInt(e.target.value) : undefined;
                  const updated = {
                    ...column,
                    settings: { ...settings, height: heightValue },
                  };
                  setColumn(updated);
                  onUpdate(updated);
                  
                  // Firestore'da güncelle
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { 
                      settings: { ...settings, height: heightValue },
                    });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    console.error('Kolon yüksekliği güncelleme hatası:', error);
                  }
                }}
                className="w-24 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arka Plan Rengi
          </label>
          <ColorPicker
            color={settings.backgroundColor || '#ffffff'}
            onChange={async (color) => {
              const updated = {
                ...column,
                settings: { ...settings, backgroundColor: color },
              };
              setColumn(updated);
              onUpdate(updated);
              
              // Firestore'da güncelle
              try {
                const { updateColumn } = await import('@/lib/firebase/firestore');
                await updateColumn(column.id, { 
                  settings: { ...settings, backgroundColor: color },
                });
                window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
              } catch (error) {
                console.error('Kolon arka plan rengi güncelleme hatası:', error);
              }
            }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Genişlik (px)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={settings.maxWidth || ''}
            placeholder="Sınırsız"
            onChange={async (e) => {
              const maxWidthValue = e.target.value ? parseInt(e.target.value) : undefined;
              const updated = {
                ...column,
                settings: { ...settings, maxWidth: maxWidthValue },
              };
              setColumn(updated);
              onUpdate(updated);
              
              // Firestore'da güncelle
              try {
                const { updateColumn } = await import('@/lib/firebase/firestore');
                await updateColumn(column.id, { 
                  settings: { ...settings, maxWidth: maxWidthValue },
                });
                window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
              } catch (error) {
                console.error('Kolon max genişlik güncelleme hatası:', error);
              }
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
            onChange={async (e) => {
              const maxHeightValue = e.target.value ? parseInt(e.target.value) : undefined;
              const updated = {
                ...column,
                settings: { ...settings, maxHeight: maxHeightValue },
              };
              setColumn(updated);
              onUpdate(updated);
              
              // Firestore'da güncelle
              try {
                const { updateColumn } = await import('@/lib/firebase/firestore');
                await updateColumn(column.id, { 
                  settings: { ...settings, maxHeight: maxHeightValue },
                });
                window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
              } catch (error) {
                console.error('Kolon max yükseklik güncelleme hatası:', error);
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                ...column,
                settings: { ...settings, padding },
              };
              setColumn(updated);
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
        {/* Nested Columns Genişlikleri */}
        {nestedColumns.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              İç Kolon Genişlikleri (%)
            </label>
            <div className="space-y-2">
              {nestedColumns.map((nestedCol, index) => (
                <div key={nestedCol.id} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-16">
                    İç Kolon {index + 1}:
                  </span>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={nestedCol.width || 0}
                    onChange={async (e) => {
                      const newWidth = parseFloat(e.target.value) || 0;
                      const updatedNestedColumns = nestedColumns.map(c => 
                        c.id === nestedCol.id ? { ...c, width: newWidth } : c
                      );
                      setNestedColumns(updatedNestedColumns);
                      
                      // Firestore'da güncelle
                      try {
                        const { updateColumn } = await import('@/lib/firebase/firestore');
                        await updateColumn(nestedCol.id, { width: newWidth });
                        window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                      } catch (error) {
                        console.error('İç kolon genişliği güncelleme hatası:', error);
                      }
                    }}
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-500">%</span>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Toplam:</span>
                  <span className={cn(
                    'font-medium',
                    nestedColumns.reduce((sum, col) => sum + (col.width || 0), 0) === 100
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  )}>
                    {nestedColumns.reduce((sum, col) => sum + (col.width || 0), 0).toFixed(1)}%
                  </span>
                </div>
                {nestedColumns.reduce((sum, col) => sum + (col.width || 0), 0) !== 100 && (
                  <button
                    onClick={async () => {
                      // Eşit dağıt
                      const equalWidth = 100 / nestedColumns.length;
                      const updatedNestedColumns = nestedColumns.map(c => ({ ...c, width: equalWidth }));
                      setNestedColumns(updatedNestedColumns);
                      
                      try {
                        const { updateColumn } = await import('@/lib/firebase/firestore');
                        await Promise.all(
                          updatedNestedColumns.map(col => updateColumn(col.id, { width: col.width }))
                        );
                        window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                      } catch (error) {
                        console.error('İç kolon genişlikleri güncelleme hatası:', error);
                      }
                    }}
                    className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Eşit Dağıt ({nestedColumns.length > 0 ? (100 / nestedColumns.length).toFixed(1) : 0}%)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {nestedColumns.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bu kolonun içinde iç kolon yok.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Column ayarları
      </p>
    </div>
  );
}

