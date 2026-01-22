'use client';

// ============================================
// Vav Yapı - Page Builder Top Bar
// Üst toolbar: sayfa bilgisi, cihaz seçici, zoom, kaydet
// ============================================

import { Save, Eye, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, ArrowLeft, Undo2, Redo2, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
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
  // Undo/Redo props
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  // Canvas scroll reset props
  hasCanvasScrollOffset?: boolean;
  onResetCanvasScroll?: () => void;
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
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  hasCanvasScrollOffset = false,
  onResetCanvasScroll,
}: TopBarProps) {
  const router = useRouter();
  const locale = useLocale();

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  const handleBack = () => {
    router.push(getLocalizedHref('/admin/page-builder'));
  };

  return (
    <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      {/* Sol Taraf - Geri Dön ve Sayfa Bilgisi */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
          title="Geri Dön"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            {page.title || 'Yeni Sayfa'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {page.slug || 'slug-yok'}
          </p>
        </div>
        {hasChanges && (
          <span className="px-1.5 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full font-medium">
            Kaydedilmemiş değişiklikler
          </span>
        )}
        {page.status === 'published' && (
          <span className="px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full font-medium">
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
              'p-1.5 rounded transition-colors',
              device === 'desktop'
                ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            )}
            title="Masaüstü"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={cn(
              'p-1.5 rounded transition-colors',
              device === 'tablet'
                ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            )}
            title="Tablet"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={cn(
              'p-1.5 rounded transition-colors',
              device === 'mobile'
                ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            )}
            title="Mobil"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

        {/* Zoom Kontrolü */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onZoomChange(Math.max(25, zoom - 25))}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            title="Uzaklaştır"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[2.5rem] text-center">
            {zoom}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(200, zoom + 25))}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            title="Yakınlaştır"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Canvas Reset Butonu */}
          <button
            onClick={onResetCanvasScroll}
            disabled={!hasCanvasScrollOffset}
            className={cn(
              'p-1.5 rounded transition-colors ml-1',
              hasCanvasScrollOffset
                ? 'hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            )}
            title="Canvas'ı Ortala"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sağ Taraf - Aksiyonlar */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={cn(
              'p-1.5 rounded transition-colors',
              canUndo
                ? 'hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            )}
            title="Geri Al (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={cn(
              'p-1.5 rounded transition-colors',
              canRedo
                ? 'hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            )}
            title="İleri Al (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

        {/* Tema Değiştir */}
        <ThemeToggle className="text-gray-600 dark:text-gray-400" />

        {/* Önizleme */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Önizleme sayfasını yeni sekmede aç (locale ile)
            const locale = window.location.pathname.split('/')[1] || 'tr';
            window.open(`/${locale}/preview/${page.slug}`, '_blank');
          }}
          className="text-xs px-2 py-1 h-7"
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          Önizle
        </Button>

        {/* Kaydet */}
        <Button
          variant="primary"
          size="sm"
          onClick={onSave}
          disabled={!hasChanges || isSaving}
          className="text-xs px-2 py-1 h-7"
        >
          {isSaving ? (
            <>
              <Spinner size="sm" className="mr-1.5" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 mr-1.5" />
              Kaydet
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

