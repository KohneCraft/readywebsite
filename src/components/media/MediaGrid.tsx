'use client';

// ============================================
// Page Builder - Media Grid Component
// Grid ve list görünümü
// ============================================

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Download, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logger } from '@/lib/logger';
import type { Media, MediaViewMode } from '@/types/media';

interface MediaGridTranslations {
  selectAll: string;
  noMedia: string;
  copyUrl: string;
  download: string;
  delete: string;
  copied: string;
  preview: string;
  details: {
    name: string;
    size: string;
    dimensions: string;
    uploadedAt: string;
  };
}

interface MediaGridProps {
  items: Media[];
  selectedItems: string[];
  onSelectItem: (itemId: string) => void;
  onSelectAll: () => void;
  viewMode: MediaViewMode;
  onDelete: (itemId: string) => void;
  onPreview?: (item: Media) => void;
  translations?: MediaGridTranslations;
}

export function MediaGrid({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  viewMode,
  onDelete,
  onPreview,
  translations,
}: MediaGridProps) {
  // Default translations
  const t = translations || {
    selectAll: 'Tümünü Seç',
    noMedia: 'Henüz medya yüklenmemiş',
    copyUrl: 'URL Kopyala',
    download: 'İndir',
    delete: 'Sil',
    copied: 'Kopyalandı!',
    preview: 'Önizleme',
    details: {
      name: 'İsim',
      size: 'Boyut',
      dimensions: 'Boyutlar',
      uploadedAt: 'Tarih',
    },
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  async function copyToClipboard(url: string, itemId: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(itemId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      logger.ui.error('Copy error', error);
    }
  }

  if (viewMode === 'grid') {
    return (
      <div className="media-grid">
        {/* Select All */}
        {items.length > 0 && (
          <div className="grid-header mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedItems.length === items.length && items.length > 0}
                onChange={onSelectAll}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.selectAll} ({items.length})
              </span>
            </label>
          </div>
        )}

        {/* Media Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="media-item group relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onSelectItem(item.id)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>

              {/* Preview */}
              <div
                className="item-preview aspect-square bg-gray-100 dark:bg-gray-800 cursor-pointer relative overflow-hidden"
                onClick={() => onPreview?.(item)}
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.thumbnail || item.url}
                    alt={item.alt || item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Info */}
              <div className="item-info p-3 bg-white dark:bg-gray-800">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(item.size)}
                </p>
                {item.dimensions && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.dimensions.width} × {item.dimensions.height}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="item-actions absolute bottom-0 left-0 right-0 p-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(item.url, item.id)}
                  className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  title={t.copyUrl}
                >
                  <Copy className={cn('w-4 h-4', copiedId === item.id && 'text-green-500')} />
                </button>
                <a
                  href={item.url}
                  download
                  className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  title={t.download}
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                  title={t.delete}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t.noMedia}
          </div>
        )}
      </div>
    );
  }

  // List View
  return (
    <div className="media-list">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="p-3 text-left">
              <input
                type="checkbox"
                checked={selectedItems.length === items.length && items.length > 0}
                onChange={onSelectAll}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.preview}
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.details.name}
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.details.size}
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.details.dimensions}
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.details.uploadedAt}
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onSelectItem(item.id)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </td>
              <td className="p-3">
              <div className="list-preview w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                  {item.type === 'image' ? (
                    <Image
                      src={item.thumbnail || item.url}
                      alt={item.alt || item.name}
                      fill
                      className="object-cover cursor-pointer"
                      onClick={() => onPreview?.(item)}
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => onPreview?.(item)}
                      muted
                    />
                  )}
                </div>
              </td>
              <td className="p-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.originalName}
                </div>
              </td>
              <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                {formatFileSize(item.size)}
              </td>
              <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                {item.dimensions
                  ? `${item.dimensions.width} × ${item.dimensions.height}`
                  : 'N/A'}
              </td>
              <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                {formatDate(item.uploadedAt)}
              </td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(item.url, item.id)}
                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    title={t.copyUrl}
                  >
                    <Copy className={cn('w-4 h-4', copiedId === item.id && 'text-green-500')} />
                  </button>
                  <a
                    href={item.url}
                    download
                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    title={t.download}
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    title={t.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {t.noMedia}
        </div>
      )}
    </div>
  );
}

