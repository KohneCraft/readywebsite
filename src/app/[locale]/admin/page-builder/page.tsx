'use client';

// ============================================
// Page Builder - Admin Page List
// Düzenlenebilir sayfalar listesi
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { 
  LayoutDashboard, 
  ChevronRight,
  Plus,
  Layers,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { getAllPages, createPage } from '@/lib/firebase/firestore';
import { getCurrentUser } from '@/lib/firebase/auth';
import type { Locale } from '@/i18n';
import type { Page } from '@/types/pageBuilder';


export default function PageBuilderListPage() {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  useEffect(() => {
    const loadPages = async () => {
      try {
        setIsLoading(true);
        const pagesData = await getAllPages();
        setPages(pagesData);
      } catch (error) {
        console.error('Failed to load pages:', error);
        setPages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPages();
  }, []);

  const handleCreatePage = async () => {
    if (!newPageTitle.trim() || !newPageSlug.trim()) {
      alert('Lütfen sayfa başlığı ve slug girin');
      return;
    }

    try {
      // Auth'dan user ID al
      const user = await getCurrentUser();
      if (!user) {
        alert('Giriş yapmanız gerekiyor');
        return;
      }

      const pageId = await createPage({
        title: newPageTitle,
        slug: newPageSlug,
        author: user.uid,
      });

      // Sayfa düzenleyicisine yönlendir
      router.push(getLocalizedHref(`/admin/page-builder/${pageId}`));
      setShowAddModal(false);
      setNewPageTitle('');
      setNewPageSlug('');
    } catch (error) {
      console.error('Sayfa oluşturma hatası:', error);
      alert('Sayfa oluşturulurken bir hata oluştu');
    }
  };

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
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Yükleniyor...</p>
          </div>
        ) : pages.length > 0 ? (
          pages.map((page) => (
            <Card 
              key={page.id}
              hover 
              className="h-full group cursor-pointer"
              onClick={() => {
                router.push(getLocalizedHref(`/admin/page-builder/${page.id}`));
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                    'bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30'
                  )}>
                    <Layers className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {page.title || 'İsimsiz Sayfa'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  /{page.slug || 'slug-yok'}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Layers className="w-4 h-4" />
                    <span>{page.sections?.length || 0} section</span>
                  </div>
                  {page.status === 'published' ? (
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                      Yayında
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                      Taslak
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Henüz sayfa oluşturulmamış</p>
            <p className="text-sm mt-1">Yeni sayfa oluşturmak için yukarıdaki butonu kullanın</p>
          </div>
        )}

        {/* Add New Page Card */}
        <div onClick={() => setShowAddModal(true)}>
          <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px] text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Yeni Sayfa Oluştur
              </h3>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Sıfırdan yeni sayfa oluşturun
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
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Yeni Sayfa Oluştur
              </h3>
              <button
                onClick={() => { 
                  setShowAddModal(false); 
                  setNewPageTitle('');
                  setNewPageSlug('');
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sayfa Başlığı
                </label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="Örn: Hakkımızda"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                  placeholder="Örn: hakkimizda"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  URL: /{newPageSlug || 'slug'}
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => { 
                    setShowAddModal(false); 
                    setNewPageTitle('');
                    setNewPageSlug('');
                  }}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleCreatePage}
                  className="flex-1"
                  disabled={!newPageTitle.trim() || !newPageSlug.trim()}
                >
                  Oluştur
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

