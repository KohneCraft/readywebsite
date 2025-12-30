'use client';

// ============================================
// Vav Yapı - Section Settings
// Section ayarları paneli
// ============================================

import { useState, useEffect } from 'react';
import { getSectionById } from '@/lib/firebase/firestore';
import { SpacingControl } from '../controls/SpacingControl';
import { ColorPicker } from '../controls/ColorPicker';
import { Spinner } from '@/components/ui/Spinner';
import type { Section } from '@/types/pageBuilder';

interface SectionSettingsProps {
  sectionId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Section>) => void;
}

export function SectionSettings({ sectionId, activeTab, onUpdate }: SectionSettingsProps) {
  const [section, setSection] = useState<Section | null>(null);
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

