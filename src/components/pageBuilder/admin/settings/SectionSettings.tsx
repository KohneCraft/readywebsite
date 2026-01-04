'use client';

// ============================================
// Vav Yapı - Section Settings
// Section ayarları paneli
// ============================================

import { useState, useEffect } from 'react';
import { getSectionById, getColumnById } from '@/lib/firebase/firestore';
import { SpacingControl } from '../controls/SpacingControl';
import { ColorPicker } from '../controls/ColorPicker';
import { Spinner } from '@/components/ui/Spinner';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { Section, Column } from '@/types/pageBuilder';

interface SectionSettingsProps {
  sectionId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Section>) => void;
}

export function SectionSettings({ sectionId, activeTab, onUpdate }: SectionSettingsProps) {
  const [section, setSection] = useState<Section | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById(sectionId);
        setSection(sectionData);
      } catch (error) {
        console.error('Section yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSection();
  }, [sectionId]);

  // Column'ları yükle
  useEffect(() => {
    async function loadColumns() {
      if (!section?.columns || section.columns.length === 0) {
        setColumns([]);
        return;
      }

      try {
        const columnPromises = section.columns.map(columnId => getColumnById(columnId));
        const loadedColumns = await Promise.all(columnPromises);
        setColumns(loadedColumns.filter(Boolean) as Column[]);
      } catch (error) {
        console.error('Column yükleme hatası:', error);
        setColumns([]);
      }
    }

    if (section) {
      loadColumns();
    }
  }, [section]);

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
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arka Plan Rengi
          </label>
          <ColorPicker
            color={settings.backgroundColor || '#ffffff'}
            onChange={(color) => {
              const updated = {
                ...section,
                settings: { ...settings, backgroundColor: color },
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

        {/* Kolon Genişlikleri */}
        {columns.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kolon Genişlikleri (%)
            </label>
            <div className="space-y-2">
              {columns.map((col, index) => (
                <div key={col.id} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-16">
                    Kolon {index + 1}:
                  </span>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={col.width || 0}
                    onChange={async (e) => {
                      const newWidth = parseFloat(e.target.value) || 0;
                      const updatedColumns = columns.map(c => 
                        c.id === col.id ? { ...c, width: newWidth } : c
                      );
                      setColumns(updatedColumns);
                      
                      // Firestore'da güncelle
                      try {
                        const { updateColumn } = await import('@/lib/firebase/firestore');
                        await updateColumn(col.id, { width: newWidth });
                        window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
                      } catch (error) {
                        console.error('Kolon genişliği güncelleme hatası:', error);
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
                    columns.reduce((sum, col) => sum + (col.width || 0), 0) === 100
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  )}>
                    {columns.reduce((sum, col) => sum + (col.width || 0), 0).toFixed(1)}%
                  </span>
                </div>
                {columns.reduce((sum, col) => sum + (col.width || 0), 0) !== 100 && (
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
                        console.error('Kolon genişlikleri güncelleme hatası:', error);
                      }
                    }}
                    className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Eşit Dağıt ({columns.length > 0 ? (100 / columns.length).toFixed(1) : 0}%)
                  </button>
                )}
              </div>
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

