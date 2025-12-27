'use client';

// ============================================
// Vav Yapı - Admin Page Builder List
// Düzenlenebilir sayfalar listesi
// ============================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  LayoutDashboard, 
  FileText, 
  Home, 
  Mail, 
  ChevronRight,
  Plus,
  Layers,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { getPageLayoutsByType } from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';
import type { PageType } from '@/types';

// Varsayılan 3 sayfa - her zaman gösterilecek
const DEFAULT_PAGES: { id: PageType; name: string; description: string; icon: typeof Home }[] = [
  { 
    id: 'home', 
    name: 'Anasayfa', 
    description: 'Ana sayfa bölümlerini düzenleyin',
    icon: Home 
  },
  { 
    id: 'contact', 
    name: 'İletişim', 
    description: 'İletişim sayfasını düzenleyin',
    icon: Mail 
  },
  { 
    id: 'project-detail', 
    name: 'Proje Detay', 
    description: 'Proje detay sayfasının düzenini özelleştirin',
    icon: FileText 
  },
];

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');

  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  useEffect(() => {
    const loadPages = async () => {
      // Varsayılan sayfaları hemen göster
      const pagesData: PageInfo[] = DEFAULT_PAGES.map(page => ({
        ...page,
        layoutCount: 0,
        hasActiveLayout: false,
      }));

      try {
        // Firebase'den layout bilgilerini çekmeye çalış
        for (let i = 0; i < pagesData.length; i++) {
          try {
            const layouts = await getPageLayoutsByType(pagesData[i].id);
            const activeLayout = layouts.find(l => l.isActive);
            pagesData[i].layoutCount = layouts.length;
            pagesData[i].hasActiveLayout = !!activeLayout;
          } catch {
            // Firebase hatası olursa varsayılan değerler kullan
            console.log(`Layout bilgisi alınamadı: ${pagesData[i].id}`);
          }
        }
      } catch (error) {
        console.error('Failed to load pages:', error);
      }

      setPages(pagesData);
      setIsLoading(false);
    };

    loadPages();
  }, []);

  const handleAddPage = () => {
    // TODO: Özel sayfa ekleme işlemi
    console.log('Yeni sayfa ekleniyor:', newPageName);
    setShowAddModal(false);
    setNewPageName('');
  };

  // Varsayılan sayfalar yüklenmeden önce bile göster
  const displayPages = isLoading ? DEFAULT_PAGES.map(p => ({ ...p, layoutCount: 0, hasActiveLayout: false })) : pages;

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
        {displayPages.map((page) => {
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
        <div onClick={() => setShowAddModal(true)}>
          <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer h-full">
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

      {/* Add New Page Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Yeni Sayfa Ekle
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sayfa Adı
                </label>
                <Input
                  type="text"
                  placeholder="Örn: Hakkımızda, Hizmetler..."
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                />
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  ⚠️ Bu özellik şu an geliştirme aşamasındadır. Varsayılan sayfaları (Anasayfa, İletişim, Proje Detay) düzenleyebilirsiniz.
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleAddPage}
                  className="flex-1"
                  disabled={!newPageName.trim()}
                >
                  Ekle
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

