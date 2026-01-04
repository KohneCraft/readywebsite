'use client';

// ============================================
// Page Builder - Media Selector Modal
// Medya yönetiminden görsel/video seçimi
// ============================================

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Image as ImageIcon, Video, Upload, Check } from 'lucide-react';
import { getMediaList, uploadMedia } from '@/lib/firebase/media';
import { getCurrentUser } from '@/lib/firebase/auth';
import type { Media, MediaType } from '@/types/media';
import { cn } from '@/lib/utils';

interface MediaSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  type?: MediaType; // 'image' veya 'video'
  currentMediaUrl?: string; // Seçili medya URL'i
}

export function MediaSelector({
  isOpen,
  onClose,
  onSelect,
  type = 'image',
  currentMediaUrl,
}: MediaSelectorProps) {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Medya listesini yükle
  const loadMedia = useCallback(async () => {
    const user = getCurrentUser();
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const items = await getMediaList(user.uid, type, 'uploadedAt', 'desc');
      setMediaItems(items);
      
      // Mevcut seçili medyayı bul
      if (currentMediaUrl) {
        const current = items.find((m) => m.url === currentMediaUrl);
        if (current) {
          setSelectedMedia(current);
        }
      }
    } catch (error) {
      console.error('Medya yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [type, currentMediaUrl]);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen, loadMedia]);

  // Dosya yükleme
  const handleFileUpload = async (files: File[]) => {
    const user = getCurrentUser();
    if (!user) {
      alert('Firebase Auth girişi gerekli. Lütfen giriş yapın.');
      return;
    }

    setUploading(true);
    const errors: string[] = [];

    for (const file of files) {
      try {
        const fileType = type === 'image' ? 'image' : 'video';
        const isValidType = fileType === 'image'
          ? file.type.startsWith('image/')
          : file.type.startsWith('video/');

        if (!isValidType) {
          errors.push(`${file.name}: Geçersiz dosya tipi`);
          continue;
        }

        const uploadedMedia = await uploadMedia(file, fileType, user.uid);
        // Yüklenen medyayı seç
        setSelectedMedia(uploadedMedia);
        onSelect(uploadedMedia);
        // Listeyi yenile
        await loadMedia();
      } catch (error) {
        console.error('Yükleme hatası:', error);
        errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Yükleme başarısız'}`);
      }
    }

    setUploading(false);

    if (errors.length > 0) {
      alert(`Bazı dosyalar yüklenemedi:\n${errors.join('\n')}`);
    }
  };

  // Drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  // File input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {type === 'image' ? 'Görsel Seç' : 'Video Seç'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          className="p-4 border-b border-gray-200 dark:border-gray-700"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label
            htmlFor="media-upload"
            className={cn(
              'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
              uploading
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            )}
          >
            <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {uploading ? 'Yükleniyor...' : 'Dosya sürükleyin veya tıklayın'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {type === 'image'
                ? 'Desteklenen formatlar: JPG, PNG, WebP, GIF, SVG'
                : 'Desteklenen formatlar: MP4, WebM, MOV'}
            </p>
            <input
              id="media-upload"
              type="file"
              accept={type === 'image' ? 'image/*' : 'video/*'}
              multiple
              onChange={handleFileInput}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Media List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Yükleniyor...
            </div>
          ) : mediaItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>Henüz medya yüklenmemiş</p>
              <p className="text-sm mt-2">Yukarıdan dosya yükleyerek başlayın</p>
            </div>
          ) : (
            <div
              className={cn(
                'grid gap-4',
                viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'
              )}
            >
              {mediaItems.map((media) => {
                const isSelected = selectedMedia?.id === media.id;
                return (
                  <div
                    key={media.id}
                    onClick={() => {
                      setSelectedMedia(media);
                      onSelect(media);
                    }}
                    className={cn(
                      'relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all',
                      isSelected
                        ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                    )}
                  >
                    {media.type === 'image' ? (
                      <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={media.url}
                          alt={media.alt || media.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Video className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-2 bg-white dark:bg-gray-800">
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {media.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors',
                viewMode === 'grid'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors',
                viewMode === 'list'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              )}
            >
              List
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

