'use client';

// ============================================
// Vav Yapı - Column Settings
// Column ayarları paneli
// ============================================

import { useState, useEffect } from 'react';
import { getColumnById } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import { SpacingControl } from '../controls/SpacingControl';
import { DualColorPicker } from '../controls/DualColorPicker';
import { Spinner } from '@/components/ui/Spinner';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { Column, ColumnSettings as ColumnSettingsType, Border } from '@/types/pageBuilder';

interface ColumnSettingsProps {
  columnId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Column>) => void;
}

export function ColumnSettings({ columnId, activeTab, onUpdate }: ColumnSettingsProps) {
  const [column, setColumn] = useState<Column | null>(null);
  const [nestedColumns, setNestedColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [widthUnit, setWidthUnit] = useState<'percent' | 'pixels'>('percent');
  const [widthValue, setWidthValue] = useState<number>(100);

  useEffect(() => {
    async function loadColumn() {
      try {
        setLoading(true);
        const columnData = await getColumnById(columnId);
        setColumn(columnData);
      } catch (error) {
        logger.pageBuilder.error('Column yükleme hatası', error);
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
        logger.pageBuilder.error('Nested column yükleme hatası', error);
        setNestedColumns([]);
      }
    }

    if (column) {
      loadNestedColumns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column?.columns]);

  // Width unit ve value'yu column'dan yükle
  useEffect(() => {
    if (column?.width !== undefined) {
      // Eğer width 0-100 arasındaysa %, değilse px
      if (column.width <= 100 && column.width >= 0) {
        setWidthUnit('percent');
        setWidthValue(column.width);
      } else {
        setWidthUnit('pixels');
        setWidthValue(column.width);
      }
    }
  }, [column?.width]);


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
            Genişlik
          </label>
          <div className="flex gap-2">
            <select
              value={widthUnit}
              onChange={(e) => {
                const unit = e.target.value as 'percent' | 'pixels';
                setWidthUnit(unit);
                // Birim değiştiğinde değeri sıfırla veya dönüştür
                if (unit === 'percent') {
                  setWidthValue(100);
                } else {
                  setWidthValue(500); // Varsayılan px değeri
                }
              }}
              className="w-24 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="percent">%</option>
              <option value="pixels">px</option>
            </select>
            <input
              type="number"
              min="0"
              max={widthUnit === 'percent' ? 100 : undefined}
              step={widthUnit === 'percent' ? 0.1 : 1}
              value={widthValue}
              onChange={(e) => {
                const newValue = widthUnit === 'percent'
                  ? parseFloat(e.target.value) || 0
                  : parseInt(e.target.value) || 0;
                setWidthValue(newValue);

                // UI'ı hemen güncelle (anlık görünüm için)
                const updated = { ...column, width: newValue };
                setColumn(updated);
                onUpdate(updated);
                // Gerçek kayıt "Kaydet" butonuna tıklandığında yapılacak
              }}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <span className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">
              {widthUnit === 'percent' ? '%' : 'px'}
            </span>
          </div>
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
                    logger.pageBuilder.error('Kolon yüksekliği güncelleme hatası', error);
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
                    logger.pageBuilder.error('Kolon yüksekliği güncelleme hatası', error);
                  }
                }}
                className="w-24 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arka Plan Rengi
          </label>
          <DualColorPicker
            lightColor={settings.backgroundColor || 'transparent'}
            darkColor={settings.backgroundColorDark || 'auto'}
            onLightChange={async (color) => {
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
                logger.pageBuilder.error('Kolon arka plan rengi güncelleme hatası', error);
              }
            }}
            onDarkChange={async (colorDark) => {
              const updated = {
                ...column,
                settings: { ...settings, backgroundColorDark: colorDark },
              };
              setColumn(updated);
              onUpdate(updated);

              // Firestore'da güncelle
              try {
                const { updateColumn } = await import('@/lib/firebase/firestore');
                await updateColumn(column.id, {
                  settings: { ...settings, backgroundColorDark: colorDark },
                });
                window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
              } catch (error) {
                logger.pageBuilder.error('Kolon koyu tema arka plan rengi güncelleme hatası', error);
              }
            }}
          />
        </div>

        {/* Arka Plan Resmi */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arka Plan Resmi
          </label>
          <input
            type="text"
            value={settings.backgroundImage || ''}
            onChange={async (e) => {
              const imageUrl = e.target.value || undefined;
              const updated = {
                ...column,
                settings: { ...settings, backgroundImage: imageUrl },
              };
              setColumn(updated);
              onUpdate(updated);

              try {
                const { updateColumn } = await import('@/lib/firebase/firestore');
                await updateColumn(column.id, {
                  settings: { ...settings, backgroundImage: imageUrl },
                });
                window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
              } catch (error) {
                logger.pageBuilder.error('Kolon arka plan resmi güncelleme hatası', error);
              }
            }}
            placeholder="https://... veya /images/..."
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        {/* Resim Boyutu */}
        {settings.backgroundImage && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resim Boyutu
              </label>
              <select
                value={settings.backgroundSize || 'cover'}
                onChange={async (e) => {
                  const bgSize = e.target.value;
                  const updated = {
                    ...column,
                    settings: { ...settings, backgroundSize: bgSize },
                  };
                  setColumn(updated);
                  onUpdate(updated);

                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, {
                      settings: { ...settings, backgroundSize: bgSize },
                    });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Kolon resim boyutu güncelleme hatası', error);
                  }
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="cover">Kapla (Cover)</option>
                <option value="contain">Sığdır (Contain)</option>
                <option value="auto">Gerçek Boyut (Auto)</option>
                <option value="100% 100%">Esnet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resim Pozisyonu
              </label>
              <select
                value={settings.backgroundPosition || 'center center'}
                onChange={async (e) => {
                  const bgPosition = e.target.value;
                  const updated = {
                    ...column,
                    settings: { ...settings, backgroundPosition: bgPosition },
                  };
                  setColumn(updated);
                  onUpdate(updated);

                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, {
                      settings: { ...settings, backgroundPosition: bgPosition },
                    });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Kolon resim pozisyonu güncelleme hatası', error);
                  }
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="center center">Orta</option>
                <option value="top center">Üst</option>
                <option value="bottom center">Alt</option>
                <option value="left center">Sol</option>
                <option value="right center">Sağ</option>
                <option value="top left">Üst Sol</option>
                <option value="top right">Üst Sağ</option>
                <option value="bottom left">Alt Sol</option>
                <option value="bottom right">Alt Sağ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resim Tekrarı
              </label>
              <select
                value={settings.backgroundRepeat || 'no-repeat'}
                onChange={async (e) => {
                  const bgRepeat = e.target.value;
                  const updated = {
                    ...column,
                    settings: { ...settings, backgroundRepeat: bgRepeat },
                  };
                  setColumn(updated);
                  onUpdate(updated);

                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, {
                      settings: { ...settings, backgroundRepeat: bgRepeat },
                    });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Kolon resim tekrarı güncelleme hatası', error);
                  }
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="no-repeat">Tekrar Etme</option>
                <option value="repeat">Tekrar Et</option>
                <option value="repeat-x">Yatay Tekrar</option>
                <option value="repeat-y">Dikey Tekrar</option>
              </select>
            </div>
          </>
        )}

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
                logger.pageBuilder.error('Kolon max genişlik güncelleme hatası', error);
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
                logger.pageBuilder.error('Kolon max yükseklik güncelleme hatası', error);
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
        {/* Hizalama Ayarları */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Yatay Hizalama
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[
              { value: 'left', label: 'Sol' },
              { value: 'center', label: 'Orta' },
              { value: 'right', label: 'Sağ' },
              { value: 'stretch', label: 'Esnet' },
            ].map((align) => (
              <button
                key={align.value}
                onClick={async () => {
                  const horizontalAlignValue = align.value as ColumnSettingsType['horizontalAlign'];
                  const updated = {
                    ...column,
                    settings: { ...settings, horizontalAlign: horizontalAlignValue },
                  };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, horizontalAlign: horizontalAlignValue } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Kolon yatay hizalama güncelleme hatası', error);
                  }
                }}
                className={cn(
                  'px-2 py-1.5 text-xs rounded-lg transition-colors',
                  settings.horizontalAlign === align.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {align.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dikey Hizalama
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'top', label: 'Üst' },
              { value: 'center', label: 'Orta' },
              { value: 'bottom', label: 'Alt' },
            ].map((align) => (
              <button
                key={align.value}
                onClick={async () => {
                  const verticalAlignValue = align.value as ColumnSettingsType['verticalAlign'];
                  const updated = {
                    ...column,
                    settings: { ...settings, verticalAlign: verticalAlignValue },
                  };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, verticalAlign: verticalAlignValue } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Kolon dikey hizalama güncelleme hatası', error);
                  }
                }}
                className={cn(
                  'px-2 py-1.5 text-xs rounded-lg transition-colors',
                  settings.verticalAlign === align.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {align.label}
              </button>
            ))}
          </div>
        </div>

        {/* Border Radius - Gelişmiş */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Köşe Yuvarlaklığı (px)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Sol Üst</label>
              <input
                type="number"
                min="0"
                max="100"
                value={(typeof settings.borderRadius === 'object' && settings.borderRadius !== null) ? (settings.borderRadius.topLeft ?? 0) : (settings.borderRadius ?? 0)}
                onChange={async (e) => {
                  const value = parseInt(e.target.value) || 0;
                  const currentRadius = typeof settings.borderRadius === 'object' && settings.borderRadius !== null ? settings.borderRadius : {};
                  const baseValue = typeof settings.borderRadius === 'number' ? settings.borderRadius : 0;
                  const newBorderRadius = {
                    topLeft: value,
                    topRight: currentRadius.topRight ?? baseValue,
                    bottomRight: currentRadius.bottomRight ?? baseValue,
                    bottomLeft: currentRadius.bottomLeft ?? baseValue,
                  };
                  const updated = { ...column, settings: { ...settings, borderRadius: newBorderRadius } };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, borderRadius: newBorderRadius } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Border radius güncelleme hatası', error);
                  }
                }}
                className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Sağ Üst</label>
              <input
                type="number"
                min="0"
                max="100"
                value={(typeof settings.borderRadius === 'object' && settings.borderRadius !== null) ? (settings.borderRadius.topRight ?? 0) : (settings.borderRadius ?? 0)}
                onChange={async (e) => {
                  const value = parseInt(e.target.value) || 0;
                  const currentRadius = typeof settings.borderRadius === 'object' && settings.borderRadius !== null ? settings.borderRadius : {};
                  const baseValue = typeof settings.borderRadius === 'number' ? settings.borderRadius : 0;
                  const newBorderRadius = {
                    topLeft: currentRadius.topLeft ?? baseValue,
                    topRight: value,
                    bottomRight: currentRadius.bottomRight ?? baseValue,
                    bottomLeft: currentRadius.bottomLeft ?? baseValue,
                  };
                  const updated = { ...column, settings: { ...settings, borderRadius: newBorderRadius } };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, borderRadius: newBorderRadius } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Border radius güncelleme hatası', error);
                  }
                }}
                className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Sol Alt</label>
              <input
                type="number"
                min="0"
                max="100"
                value={(typeof settings.borderRadius === 'object' && settings.borderRadius !== null) ? (settings.borderRadius.bottomLeft ?? 0) : (settings.borderRadius ?? 0)}
                onChange={async (e) => {
                  const value = parseInt(e.target.value) || 0;
                  const currentRadius = typeof settings.borderRadius === 'object' && settings.borderRadius !== null ? settings.borderRadius : {};
                  const baseValue = typeof settings.borderRadius === 'number' ? settings.borderRadius : 0;
                  const newBorderRadius = {
                    topLeft: currentRadius.topLeft ?? baseValue,
                    topRight: currentRadius.topRight ?? baseValue,
                    bottomRight: currentRadius.bottomRight ?? baseValue,
                    bottomLeft: value,
                  };
                  const updated = { ...column, settings: { ...settings, borderRadius: newBorderRadius } };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, borderRadius: newBorderRadius } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Border radius güncelleme hatası', error);
                  }
                }}
                className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Sağ Alt</label>
              <input
                type="number"
                min="0"
                max="100"
                value={(typeof settings.borderRadius === 'object' && settings.borderRadius !== null) ? (settings.borderRadius.bottomRight ?? 0) : (settings.borderRadius ?? 0)}
                onChange={async (e) => {
                  const value = parseInt(e.target.value) || 0;
                  const currentRadius = typeof settings.borderRadius === 'object' && settings.borderRadius !== null ? settings.borderRadius : {};
                  const baseValue = typeof settings.borderRadius === 'number' ? settings.borderRadius : 0;
                  const newBorderRadius = {
                    topLeft: currentRadius.topLeft ?? baseValue,
                    topRight: currentRadius.topRight ?? baseValue,
                    bottomRight: value,
                    bottomLeft: currentRadius.bottomLeft ?? baseValue,
                  };
                  const updated = { ...column, settings: { ...settings, borderRadius: newBorderRadius } };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, borderRadius: newBorderRadius } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Border radius güncelleme hatası', error);
                  }
                }}
                className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Border/Çizgi Ayarları */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kenarlık (Border)
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Kalınlık (px)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={settings.border?.width ?? 0}
                  onChange={async (e) => {
                    const width = parseInt(e.target.value) || 0;
                    const newBorder: Border = {
                      width,
                      style: settings.border?.style ?? 'solid',
                      color: settings.border?.color ?? '#000000',
                    };
                    const updated = { ...column, settings: { ...settings, border: newBorder } };
                    setColumn(updated);
                    onUpdate(updated);
                    try {
                      const { updateColumn } = await import('@/lib/firebase/firestore');
                      await updateColumn(column.id, { settings: { ...settings, border: newBorder } });
                      window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                    } catch (error) {
                      logger.pageBuilder.error('Border güncelleme hatası', error);
                    }
                  }}
                  className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Stil</label>
                <select
                  value={settings.border?.style ?? 'solid'}
                  onChange={async (e) => {
                    const style = e.target.value as Border['style'];
                    const newBorder: Border = {
                      width: settings.border?.width ?? 1,
                      style,
                      color: settings.border?.color ?? '#000000',
                    };
                    const updated = { ...column, settings: { ...settings, border: newBorder } };
                    setColumn(updated);
                    onUpdate(updated);
                    try {
                      const { updateColumn } = await import('@/lib/firebase/firestore');
                      await updateColumn(column.id, { settings: { ...settings, border: newBorder } });
                      window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                    } catch (error) {
                      logger.pageBuilder.error('Border stil güncelleme hatası', error);
                    }
                  }}
                  className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="solid">Düz</option>
                  <option value="dashed">Kesikli</option>
                  <option value="dotted">Noktalı</option>
                  <option value="none">Yok</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Renk</label>
              <input
                type="color"
                value={settings.border?.color ?? '#000000'}
                onChange={async (e) => {
                  const color = e.target.value;
                  const newBorder: Border = {
                    width: settings.border?.width ?? 1,
                    style: settings.border?.style ?? 'solid',
                    color,
                  };
                  const updated = { ...column, settings: { ...settings, border: newBorder } };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, border: newBorder } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Border renk güncelleme hatası', error);
                  }
                }}
                className="w-full h-8 rounded border border-gray-200 dark:border-gray-700 cursor-pointer"
              />
            </div>
            {(settings.border?.width ?? 0) > 0 && (
              <button
                onClick={async () => {
                  const newBorder: Border = { width: 0, style: 'solid', color: '#000000' };
                  const updated = { ...column, settings: { ...settings, border: newBorder } };
                  setColumn(updated);
                  onUpdate(updated);
                  try {
                    const { updateColumn } = await import('@/lib/firebase/firestore');
                    await updateColumn(column.id, { settings: { ...settings, border: newBorder } });
                    window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                  } catch (error) {
                    logger.pageBuilder.error('Border temizleme hatası', error);
                  }
                }}
                className="text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                Kenarlığı Kaldır
              </button>
            )}
          </div>
        </div>

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
                    onChange={(e) => {
                      const newWidth = parseFloat(e.target.value) || 0;

                      // UI'ı hemen güncelle (anlık görünüm için)
                      const updatedNestedColumns = nestedColumns.map(c =>
                        c.id === nestedCol.id ? { ...c, width: newWidth } : c
                      );
                      setNestedColumns(updatedNestedColumns);
                      // Gerçek kayıt "Kaydet" butonuna tıklandığında yapılacak
                      // Burada sadece state güncellemesi yapıyoruz
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
                        logger.pageBuilder.error('İç kolon genişlikleri güncelleme hatası', error);
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

