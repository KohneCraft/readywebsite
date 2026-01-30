'use client';

// ============================================
// Vav Yapı - Page Settings
// Sayfa genel ayarları
// ============================================

import { useTranslations, useLocale } from 'next-intl';
import type { Page } from '@/types/pageBuilder';
import { MultiLangInput } from '@/components/ui/MultiLangInput';
import type { LocalizedString } from '@/types/localization';
import type { Locale } from '@/i18n';

interface PageSettingsProps {
  page: Page;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Page>) => void;
}

export function PageSettings({ page, activeTab, onUpdate }: PageSettingsProps) {
  const t = useTranslations('admin.pageBuilder');
  const locale = useLocale() as Locale;

  // titles değişikliğini işle
  const handleTitlesChange = (newTitles: LocalizedString) => {
    // Ana title'ı da güncelle (mevcut locale'den veya TR'den)
    const primaryTitle = newTitles[locale] || newTitles.tr || page.title;
    onUpdate({ 
      titles: newTitles,
      title: primaryTitle,
    });
  };

  // Mevcut titles değerini oluştur
  const getCurrentTitles = (): LocalizedString => {
    if (page.titles) {
      return page.titles as LocalizedString;
    }
    // Yoksa title'dan oluştur
    return { tr: page.title || '', en: '', de: '', fr: '' };
  };

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <MultiLangInput
            label={t('pageTitle')}
            value={getCurrentTitles()}
            onChange={handleTitlesChange}
            type="input"
            placeholder={t('enterPageTitle')}
            showAutoTranslate={true}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('slug')}
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
            {t('status')}
          </label>
          <select
            value={page.status || 'draft'}
            onChange={(e) => onUpdate({ status: e.target.value as 'draft' | 'published' | 'archived' })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="draft">{t('statusDraft')}</option>
            <option value="published">{t('statusPublished')}</option>
            <option value="archived">{t('statusArchived')}</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('customCSS')}
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
          placeholder={t('customCSSPlaceholder')}
        />
      </div>
    </div>
  );
}

