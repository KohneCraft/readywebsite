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
import type { Column } from '@/types/pageBuilder';

interface ColumnSettingsProps {
  columnId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Column>) => void;
}

export function ColumnSettings({ columnId, activeTab, onUpdate }: ColumnSettingsProps) {
  const [column, setColumn] = useState<Column | null>(null);
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
            value={column.width || 100}
            onChange={(e) => {
              const updated = { ...column, width: parseFloat(e.target.value) || 100 };
              setColumn(updated);
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
                ...column,
                settings: { ...settings, backgroundColor: color },
              };
              setColumn(updated);
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

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Column ayarları
      </p>
    </div>
  );
}

