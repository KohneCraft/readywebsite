'use client';

// ============================================
// Page Builder - Media Manager Page
// Medya yönetimi ana sayfası
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, Video, Trash2 } from 'lucide-react';
import { uploadMedia, getMediaList, deleteMedia, deleteMultipleMedia } from '@/lib/firebase/media';
import { getCurrentUser, onAuthStateChanged } from '@/lib/firebase/auth';
import { MediaUploader, MediaFilters, MediaGrid, MediaPreview } from '@/components/media';
import type { Media, MediaType, MediaSortBy, MediaViewMode } from '@/types/media';
import { cn } from '@/lib/utils';

export default function MediaManagerPage() {
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

  // Kullanıcı ID'sini al - Firebase Auth'dan
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setAuthError(null);
      } else {
        // Firebase Auth'da kullanıcı yok
        // Geçici session kontrolü
        const tempSession = localStorage.getItem('temp_admin_session');
        if (tempSession) {
          const session = JSON.parse(tempSession);
          setUserId(session.id || 'temp-admin-001');
          setAuthError('Firebase Auth girişi gerekli. Lütfen admin paneline giriş yapın.');
        } else {
          setUserId(null);
          setAuthError('Kullanıcı bulunamadı. Lütfen giriş yapın.');
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
      console.error('Medya yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, sortBy, sortOrder]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Dosya yükleme
  const handleUpload = async (files: File[]) => {
    // Firebase Auth kontrolü
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Firebase Auth girişi gerekli. Lütfen sayfayı yenileyin veya admin paneline giriş yapın.');
      return;
    }

    if (!userId) {
      alert('Kullanıcı bulunamadı. Lütfen giriş yapın.');
      return;
    }

    // Firebase Auth UID'yi kullan (temp session değil)
    const authUserId = currentUser.uid;

    setUploading(true);
    const errors: string[] = [];

    for (const file of files) {
      try {
        // Dosya tipi kontrolü
        const fileType = activeTab === 'image' ? 'image' : 'video';
        const isValidType = fileType === 'image'
          ? file.type.startsWith('image/')
          : file.type.startsWith('video/');

        if (!isValidType) {
          errors.push(`${file.name}: Geçersiz dosya tipi`);
          continue;
        }

        await uploadMedia(file, fileType, authUserId);
      } catch (error) {
        console.error('Yükleme hatası:', error);
        errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Yükleme başarısız'}`);
      }
    }

    setUploading(false);

    if (errors.length > 0) {
      alert(`Bazı dosyalar yüklenemedi:\n${errors.join('\n')}`);
    } else {
      alert(`${files.length} dosya başarıyla yüklendi`);
    }

    // Listeyi yenile
    await loadMedia();
  };

  // Medya silme
  const handleDelete = async (itemId: string) => {
    if (!confirm('Bu medyayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    try {
      await deleteMedia(itemId);
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
      await loadMedia();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Medya silinirken hata oluştu');
    }
  };

  // Çoklu silme
  const handleDeleteMultiple = async () => {
    if (selectedItems.length === 0) return;

    if (!confirm(`${selectedItems.length} öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteMultipleMedia(selectedItems);
      setSelectedItems([]);
      await loadMedia();
      alert(`${selectedItems.length} öğe başarıyla silindi`);
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Dosyalar silinirken hata oluştu');
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
          Medya Yönetimi
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fotoğraf ve video dosyalarınızı yönetin
        </p>
        {authError && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ {authError}
            </p>
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
          Fotoğraflar
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
          Videolar
        </button>
      </div>

      {/* Toolbar */}
      <div className="mb-6 space-y-4">
        {/* Upload Section */}
        <MediaUploader
          accept={activeTab === 'image' ? 'image/*' : 'video/*'}
          onUpload={handleUpload}
          disabled={uploading || !userId}
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
        />
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Yükleniyor...
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
        />
      )}

      {/* Footer Actions */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-40">
          <div className="container mx-auto flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Seçili: {selectedItems.length} öğe
            </span>
            <button
              onClick={handleDeleteMultiple}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Seçilenleri Sil
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

