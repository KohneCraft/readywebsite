'use client';

// ============================================
// Vav Yapı - Admin Page Builder List
// Düzenlenebilir sayfalar listesi
// ============================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  LayoutDashboard, 
  FileText, 
  Home, 
  Info, 
  Mail, 
  Briefcase,
  ChevronRight,
  Plus,
  Layers,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { getPageLayoutsByType } from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';
import type { PageType } from '@/types';
import { PAGE_TYPE_LABELS } from '@/types';

const PAGE_ICONS: Record<PageType, typeof Home> = {
  'project-detail': FileText,
  'home': Home,
  'about': Info,
  'contact': Mail,
  'services': Briefcase,
};

interface PageInfo {
  id: PageType;
  name: string;
  description: string;
  icon: typeof Home;
  layoutCount: number;
  hasActiveLayout: boolean;
}

export default function PageBuilderListPage() {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  useEffect(() => {
    const loadPages = async () => {
      try {
        const pageTypes: PageType[] = ['project-detail', 'home', 'about', 'contact', 'services'];
        const pagesData: PageInfo[] = [];

        for (const pageType of pageTypes) {
          const layouts = await getPageLayoutsByType(pageType);
          const activeLayout = layouts.find(l => l.isActive);
          
          pagesData.push({
            id: pageType,
            name: PAGE_TYPE_LABELS[pageType],
            description: getPageDescription(pageType),
            icon: PAGE_ICONS[pageType],
            layoutCount: layouts.length,
            hasActiveLayout: !!activeLayout,
          });
        }

        setPages(pagesData);
      } catch (error) {
        console.error('Failed to load pages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPages();
  }, []);

  function getPageDescription(pageType: PageType): string {
    switch (pageType) {
      case 'project-detail': return 'Proje detay sayfasının düzenini özelleştirin';
      case 'home': return 'Ana sayfa bölümlerini düzenleyin';
      case 'about': return 'Hakkımızda sayfasını düzenleyin';
      case 'contact': return 'İletişim sayfasını düzenleyin';
      case 'services': return 'Hizmetler sayfasını düzenleyin';
      default: return '';
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('pageBuilder.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t('pageBuilder.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.id}
              href={getLocalizedHref(`/admin/page-builder/${page.id}`)}
            >
              <Card hover className="h-full group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                      'bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30'
                    )}>
                      <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {page.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {page.description}
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Layers className="w-4 h-4" />
                      <span>{page.layoutCount} düzen</span>
                    </div>
                    {page.hasActiveLayout ? (
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                        Aktif
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                        Varsayılan
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}

        {/* Add New Layout Card */}
        <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Yeni Sayfa Ekle
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Özel sayfa düzeni oluşturun
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Sayfa Düzeni Nasıl Çalışır?
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
          <li>• Bir sayfa seçin ve elementleri sürükle-bırak ile yeniden düzenleyin</li>
          <li>• Her element için genişlik, kenar boşlukları ve responsive ayarları yapın</li>
          <li>• Değişikliklerinizi canlı önizleme ile kontrol edin</li>
          <li>• Kaydet butonu ile değişiklikleri uygulayın</li>
        </ul>
      </div>
    </div>
  );
}

