'use client';

// ============================================
// Vav Yapı - Admin Page Builder Editor
// Sayfa düzenleme arayüzü
// ============================================

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { PageBuilder } from '@/components/admin/PageBuilder';
import { Spinner } from '@/components/ui/Spinner';
import { 
  getOrCreateDefaultLayout, 
  updatePageLayout 
} from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';
import type { PageLayout, PageElement, PageType } from '@/types';
import { PAGE_TYPE_LABELS } from '@/types';

export default function PageBuilderEditorPage() {
  useTranslations('admin'); // Çeviri namespace'i yükle
  const locale = useLocale() as Locale;
  const params = useParams();
  const pageId = params?.pageId as PageType;

  const [layout, setLayout] = useState<PageLayout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  useEffect(() => {
    const loadLayout = async () => {
      try {
        // Varsayılan kullanıcı ID'si (auth entegrasyonu yapılana kadar)
        const createdBy = 'admin';
        const layoutData = await getOrCreateDefaultLayout(pageId, createdBy);
        setLayout(layoutData);
      } catch (err) {
        console.error('Failed to load layout:', err);
        setError('Sayfa düzeni yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };

    if (pageId) {
      loadLayout();
    }
  }, [pageId]);

  const handleSave = async (elements: PageElement[]) => {
    if (!layout) return;

    try {
      await updatePageLayout(layout.id, { elements });
      setLayout({ ...layout, elements });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save layout:', err);
      throw err;
    }
  };

  const handleReset = () => {
    // Layout'u orijinal haline döndür
    if (layout) {
      setLayout({ ...layout });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !layout) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {error || 'Sayfa bulunamadı'}
        </h2>
        <Link
          href={getLocalizedHref('/admin/page-builder')}
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          Sayfa listesine dön
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col -m-6">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Link
          href={getLocalizedHref('/admin/page-builder')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {PAGE_TYPE_LABELS[pageId] || pageId}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sayfa düzenini sürükle-bırak ile özelleştirin
          </p>
        </div>

        {saveSuccess && (
          <div className="ml-auto px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium animate-fade-in">
            ✓ Değişiklikler kaydedildi
          </div>
        )}
      </div>

      {/* Page Builder */}
      <div className="flex-1 overflow-hidden">
        <PageBuilder
          layout={layout}
          onSave={handleSave}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

