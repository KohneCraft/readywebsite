'use client';

// ============================================
// Vav Yapı - Image Block Settings
// Görsel bloğu ayarları
// ============================================

import { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { SpacingControl } from '../../controls/SpacingControl';
import { MediaSelector } from '../../media/MediaSelector';
import type { Block } from '@/types/pageBuilder';
import type { Media } from '@/types/media';

interface ImageBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function ImageBlockSettings({ block, activeTab, onUpdate }: ImageBlockSettingsProps) {
  const props = block.props || {};
  const [showMediaSelector, setShowMediaSelector] = useState(false);

  // Medya seçildiğinde
  const handleMediaSelect = (media: Media) => {
    onUpdate({
      src: media.url,
      alt: media.alt || media.name,
    });
    setShowMediaSelector(false);
  };

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        {/* Görsel Yükleme/Seçme Alanı */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Görsel
          </label>
          
          {props.src ? (
            <div className="relative group">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-2">
                <Image
                  src={props.src}
                  alt={props.alt || 'Görsel önizleme'}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={() => onUpdate({ src: '', alt: '' })}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="Görseli kaldır"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowMediaSelector(true)}
                className="w-full px-4 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Görsel Değiştir
              </button>
            </div>
          ) : (
            <div
              onClick={() => setShowMediaSelector(true)}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Görsel Seç veya Yükle
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Medya kütüphanesinden seç veya yeni dosya yükle
              </p>
            </div>
          )}
        </div>

        {/* Manuel URL Girişi (Alternatif) */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Veya Görsel URL (Manuel)
          </label>
          <input
            type="url"
            value={props.src || ''}
            onChange={(e) => onUpdate({ src: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Harici bir URL'den görsel eklemek için
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Alt Metin
          </label>
          <input
            type="text"
            value={props.alt || ''}
            onChange={(e) => onUpdate({ alt: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Görsel açıklaması"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Genişlik
          </label>
          <input
            type="text"
            value={props.imageWidth || '100%'}
            onChange={(e) => onUpdate({ imageWidth: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="100%, 500px, auto"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Border Radius (px)
          </label>
          <input
            type="number"
            value={props.borderRadius || 0}
            onChange={(e) => onUpdate({ borderRadius: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Margin
          </label>
          <SpacingControl
            value={props.margin || { top: 0, right: 0, bottom: 0, left: 0 }}
            onChange={(margin) => onUpdate({ margin })}
          />
        </div>

        {/* Alt Metin */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Alt Metin
          </label>
          <input
            type="text"
            value={props.alt || ''}
            onChange={(e) => onUpdate({ alt: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Görsel açıklaması"
          />
        </div>

        {/* Genişlik */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Genişlik
          </label>
          <input
            type="text"
            value={props.imageWidth || '100%'}
            onChange={(e) => onUpdate({ imageWidth: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="100%, 500px, auto"
          />
        </div>

        {/* Border Radius */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Border Radius (px)
          </label>
          <input
            type="number"
            value={props.borderRadius || 0}
            onChange={(e) => onUpdate({ borderRadius: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        {/* Margin */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Margin
          </label>
          <SpacingControl
            value={props.margin || { top: 0, right: 0, bottom: 0, left: 0 }}
            onChange={(margin) => onUpdate({ margin })}
          />
        </div>

        {/* Media Selector Modal */}
        <MediaSelector
          isOpen={showMediaSelector}
          onClose={() => setShowMediaSelector(false)}
          onSelect={handleMediaSelect}
          type="image"
          currentMediaUrl={props.src}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Image block ayarları
      </p>
    </div>
  );
}

