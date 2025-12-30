'use client';

// ============================================
// Vav Yapı - Page Builder Top Bar
// Üst toolbar: sayfa bilgisi, cihaz seçici, zoom, kaydet
// ============================================

import { Save, Eye, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import type { Page } from '@/types/pageBuilder';

interface TopBarProps {
  page: Page;
  device: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export function TopBar({
  page,
  device,
  onDeviceChange,
  zoom,
  onZoomChange,
  hasChanges,
  isSaving,
  onSave,
}: TopBarProps) {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      {/* Sol Taraf - Sayfa Bilgisi */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {page.title || 'Yeni Sayfa'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {page.slug || 'slug-yok'}
          </p>
        </div>
        {hasChanges && (
          <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
            Kaydedilmemiş değişiklikler
          </span>
        )}
        {page.status === 'published' && (
          <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            Yayında
          </span>
        )}
      </div>

      {/* Orta - Cihaz Seçici ve Zoom */}
      <div className="flex items-center gap-2">
        {/* Cihaz Seçici */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={cn(
              'p-2 rounded transition-colors',
              device === 'desktop'
                ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            )}
            title="Masaüstü"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={cn(
              'p-2 rounded transition-colors',
              device === 'tablet'
                ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            )}
            title="Tablet"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={cn(
              'p-2 rounded transition-colors',
              device === 'mobile'
                ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            )}
            title="Mobil"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

        {/* Zoom Kontrolü */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onZoomChange(Math.max(25, zoom - 25))}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            title="Uzaklaştır"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-center">
            {zoom}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(200, zoom + 25))}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            title="Yakınlaştır"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sağ Taraf - Aksiyonlar */}
      <div className="flex items-center gap-2">
        {/* Önizleme */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Önizleme sayfasını yeni sekmede aç
            window.open(`/preview/${page.slug}`, '_blank');
          }}
        >
          <Eye className="w-4 h-4 mr-2" />
          Önizle
        </Button>

        {/* Kaydet */}
        <Button
          variant="primary"
          size="sm"
          onClick={onSave}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Kaydet
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

