'use client';

import Link from 'next/link';
// ============================================
// Page Builder - Media Manager Page
// Medya yönetimi ana sayfası
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, Video, Trash2, AlertTriangle, Info } from 'lucide-react';
import { uploadMedia, getMediaList, deleteMedia, deleteMultipleMedia } from '@/lib/firebase/media';
import { getCurrentUser, onAuthStateChanged } from '@/lib/firebase/auth';
import { validateFile, FILE_SIZE_LIMITS, formatFileSize } from '@/lib/firebase/storage';
import { MediaUploader, MediaFilters, MediaGrid, MediaPreview } from '@/components/media';
import { toast } from '@/components/providers';
import { logger } from '@/lib/logger';
import { useTranslations, useLocale } from 'next-intl';
import type { Media, MediaType, MediaSortBy, MediaViewMode } from '@/types/media';
import { cn } from '@/lib/utils';

export default function MediaManagerPage() {
  const t = useTranslations('admin.media');
  const [activeTab, setActiveTab] = useState<MediaType>('image');
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [sortBy, setSortBy] = useState<MediaSortBy>('uploadedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<MediaViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState<Media | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isFirebaseAuth, setIsFirebaseAuth] = useState(false);

  // Kullanıcı ID'sini al - Firebase Auth'dan
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setIsFirebaseAuth(true);
        setAuthError(null);
      } else {
        // Firebase Auth'da kullanıcı yok
        setIsFirebaseAuth(false);
        // Geçici session kontrolü
        const tempSession = localStorage.getItem('temp_admin_session');
        if (tempSession) {
          const session = JSON.parse(tempSession);
          setUserId(session.id || 'temp-admin-001');
          setAuthError('⚠️ Medya yüklemek için Firebase Auth ile giriş yapmanız gerekiyor. Geçici oturum medya yükleme için yeterli değil.');
        } else {
          setUserId(null);
          setAuthError('❌ Kullanıcı bulunamadı. Lütfen admin paneline giriş yapın.');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Medya listesini yükle
  const loadMedia = useCallback(async () => {
    // Firebase Auth kontrolü
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const authUserId = currentUser.uid;

    setLoading(true);
    try {
      const items = await getMediaList(authUserId, activeTab, sortBy, sortOrder);
      setMediaItems(items);
    } catch (error) {
      logger.ui.error('Medya yüklenirken hata', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, sortBy, sortOrder]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Locale al
  const locale = useLocale();

  // Dosya yükleme
  const handleUpload = async (files: File[]) => {
    // Firebase Auth kontrolü - ZORUNLU
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error('Medya yüklemek için Firebase Auth ile giriş yapmanız gerekiyor.');
      return;
    }

    if (!userId || !isFirebaseAuth) {
      toast.error('Kullanıcı doğrulaması başarısız. Lütfen sayfayı yenileyin.');
      return;
    }

    // Firebase Auth UID'yi kullan (temp session değil)
    const authUserId = currentUser.uid;

    setUploading(true);
    const errors: string[] = [];
    const warnings: string[] = [];
    let successCount = 0;

    for (const file of files) {
      try {
        // Dosya tipi belirleme
        const fileType = activeTab === 'image' ? 'image' : 'video';
        
        // Kapsamlı validasyon - boyut ve format kontrolü
        const validation = validateFile(file, fileType, locale === 'tr' ? 'tr' : 'en');
        
        if (!validation.valid) {
          errors.push(`${file.name}: ${validation.error}`);
          continue;
        }
        
        // Uyarı varsa kaydet ama yüklemeye devam et
        if (validation.warning) {
          warnings.push(`${file.name}: ${validation.warning}`);
        }

        await uploadMedia(file, fileType, authUserId);
        successCount++;
      } catch (error) {
        logger.ui.error('Yükleme hatası', error);
        errors.push(`${file.name}: ${error instanceof Error ? error.message : t('uploadError')}`);
      }
    }

    setUploading(false);

    // Sonuç bildirimleri
    if (errors.length > 0) {
      toast.error(`${t('uploadError')}: ${errors.join(', ')}`);
    }
    
    if (warnings.length > 0) {
      // Uyarıları sarı toast ile göster
      warnings.forEach(warning => {
        toast.warning ? toast.warning(warning) : toast.error(`⚠️ ${warning}`);
      });
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} dosya yüklendi`);
    }

    // Listeyi yenile
    await loadMedia();
  };

  // Medya silme
  const handleDelete = async (itemId: string) => {
    if (!confirm(t('deleteConfirm'))) {
      return;
    }

    try {
      await deleteMedia(itemId);
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
      await loadMedia();
      toast.success(t('deleteSuccess'));
    } catch (error) {
      logger.ui.error('Silme hatası', error);
      toast.error(t('deleteError') || 'Error deleting media');
    }
  };

  // Çoklu silme
  const handleDeleteMultiple = async () => {
    if (selectedItems.length === 0) return;

    if (!confirm(t('deleteMultipleConfirm') || t('deleteConfirm'))) {
      return;
    }

    setLoading(true);
    try {
      await deleteMultipleMedia(selectedItems);
      setSelectedItems([]);
      await loadMedia();
      toast.success(`${selectedItems.length} öğe başarıyla silindi`);
    } catch (error) {
      logger.ui.error('Silme hatası', error);
      toast.error('Dosyalar silinirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Seçim işlemleri
  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map((item) => item.id));
    }
  };

  // Filtrelenmiş medya
  const filteredMedia = mediaItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="media-manager">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('subtitle')}
        </p>
        {authError && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {authError}
            </p>
            {!isFirebaseAuth && (
              <Link
                href="/admin/login"
                className="mt-2 inline-block text-sm text-yellow-900 dark:text-yellow-100 underline hover:text-yellow-700 dark:hover:text-yellow-300"
              >
                → Firebase Auth ile giriş yapmak için tıklayın
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            setActiveTab('image');
            setSelectedItems([]);
          }}
          className={cn(
            'px-6 py-3 font-medium transition-colors border-b-2 -mb-px',
            activeTab === 'image'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
        >
          <ImageIcon className="w-5 h-5 inline-block mr-2" />
          {t('filters.images')}
        </button>
        <button
          onClick={() => {
            setActiveTab('video');
            setSelectedItems([]);
          }}
          className={cn(
            'px-6 py-3 font-medium transition-colors border-b-2 -mb-px',
            activeTab === 'video'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
        >
          <Video className="w-5 h-5 inline-block mr-2" />
          {t('filters.videos')}
        </button>
      </div>

      {/* Toolbar */}
      <div className="mb-6 space-y-4">
        {/* Upload Section */}
        <MediaUploader
          accept={activeTab === 'image' ? 'image/*' : 'video/*'}
          onUpload={handleUpload}
          disabled={uploading || !isFirebaseAuth}
          translations={{
            dragDropShort: t('dragDropShort'),
            supportedFormatsImage: t('supportedFormatsImage'),
            supportedFormatsVideo: t('supportedFormatsVideo'),
          }}
        />

        {/* Filters */}
        <MediaFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          translations={{
            search: t('search'),
            sortBy: t('sortBy'),
            sortAsc: t('sortAsc'),
            sortDesc: t('sortDesc'),
            gridView: t('gridView'),
            listView: t('listView'),
            sort: {
              uploadedAt: t('sort.uploadedAt'),
              size: t('sort.size'),
              name: t('sort.name'),
            },
          }}
        />
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {t('loading') || 'Loading...'}
        </div>
      ) : (
        <MediaGrid
          items={filteredMedia}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          viewMode={viewMode}
          onDelete={handleDelete}
          onPreview={setPreviewItem}
          translations={{
            selectAll: t('selectAll'),
            noMedia: t('noMedia'),
            copyUrl: t('copyUrl'),
            download: t('download'),
            delete: t('delete'),
            copied: t('copied'),
            preview: t('preview'),
            details: {
              name: t('details.name'),
              size: t('details.size'),
              dimensions: t('details.dimensions'),
              uploadedAt: t('details.uploadedAt'),
            },
          }}
        />
      )}

      {/* Footer Actions */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-40">
          <div className="container mx-auto flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('selected') || 'Selected'}: {selectedItems.length}
            </span>
            <button
              onClick={handleDeleteMultiple}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {t('deleteSelected') || 'Delete Selected'}
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <MediaPreview
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}

