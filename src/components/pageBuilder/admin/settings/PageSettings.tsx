'use client';

// ============================================
// Vav Yapı - Page Settings
// Sayfa genel ayarları
// ============================================

import type { Page } from '@/types/pageBuilder';

interface PageSettingsProps {
  page: Page;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Page>) => void;
}

export function PageSettings({ page, activeTab, onUpdate }: PageSettingsProps) {
  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sayfa Başlığı
          </label>
          <input
            type="text"
            value={page.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Slug (URL)
          </label>
          <input
            type="text"
            value={page.slug || ''}
            onChange={(e) => onUpdate({ slug: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
            Durum
          </label>
          <select
            value={page.status || 'draft'}
            onChange={(e) => onUpdate({ status: e.target.value as 'draft' | 'published' | 'archived' })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
            <option value="archived">Arşivlendi</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Özel CSS
        </label>
        <textarea
          value={page.settings?.customCSS || ''}
          onChange={(e) => onUpdate({
            settings: {
              ...page.settings,
              customCSS: e.target.value,
            },
          })}
          rows={6}
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
          placeholder="/* Özel CSS kodları */"
        />
      </div>
    </div>
  );
}

