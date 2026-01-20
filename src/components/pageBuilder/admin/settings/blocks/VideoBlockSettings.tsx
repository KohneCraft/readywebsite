'use client';

// ============================================
// Vav Yapı - Video Block Settings
// Video bloğu ayarları
// ============================================

import { useState } from 'react';
import { Video as VideoIcon, Upload, X, Play } from 'lucide-react';
import { SpacingControl } from '../../controls/SpacingControl';
import { MediaSelector } from '../../media/MediaSelector';
import type { Block } from '@/types/pageBuilder';
import type { Media } from '@/types/media';

interface VideoBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function VideoBlockSettings({ block, activeTab, onUpdate }: VideoBlockSettingsProps) {
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
        {/* Video Yükleme/Seçme Alanı */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Video
          </label>

          {props.src ? (
            <div className="relative group">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                <video
                  src={props.src}
                  className="w-full h-full object-cover"
                  controls={false}
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <button
                  onClick={() => onUpdate({ src: '', alt: '' })}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="Videoyu kaldır"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowMediaSelector(true)}
                className="w-full px-4 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <VideoIcon className="w-4 h-4" />
                Video Değiştir
              </button>
            </div>
          ) : (
            <div
              onClick={() => setShowMediaSelector(true)}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Video Seç veya Yükle
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
            Veya Video URL (Manuel)
          </label>
          <input
            type="url"
            value={props.src || ''}
            onChange={(e) => onUpdate({ src: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="https://example.com/video.mp4"
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Harici bir URL'den video eklemek için
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
            placeholder="Video açıklaması"
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

        {/* Media Selector Modal */}
        <MediaSelector
          isOpen={showMediaSelector}
          onClose={() => setShowMediaSelector(false)}
          onSelect={handleMediaSelect}
          type="video"
          currentMediaUrl={props.src}
        />
      </div>
    );
  }

  if (activeTab === 'settings') {
    const { getGroupedCSSClasses, READY_CSS_CLASSES, READY_IDS } = require('@/lib/readyCSSClasses');
    const { cn } = require('@/lib/utils');
    const groupedClasses = getGroupedCSSClasses();
    const currentClassName = props.className || '';
    const isReadyClass = READY_CSS_CLASSES.some((c: { name: string }) => c.name === currentClassName);

    return (
      <div className="space-y-4">
        {/* Hizalama Ayarları */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Yatay Hizalama
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'left', label: 'Sol' },
              { value: 'center', label: 'Orta' },
              { value: 'right', label: 'Sağ' },
            ].map((align) => (
              <button
                key={align.value}
                onClick={() => onUpdate({ horizontalAlign: align.value as any })}
                className={cn(
                  'px-2 py-1.5 text-xs rounded-lg transition-colors',
                  props.horizontalAlign === align.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {align.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dikey Hizalama
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'top', label: 'Üst' },
              { value: 'center', label: 'Orta' },
              { value: 'bottom', label: 'Alt' },
            ].map((align) => (
              <button
                key={align.value}
                onClick={() => onUpdate({ verticalAlign: align.value as any })}
                className={cn(
                  'px-2 py-1.5 text-xs rounded-lg transition-colors',
                  props.verticalAlign === align.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {align.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            CSS Sınıfı
          </label>
          <select
            value={isReadyClass ? currentClassName : '__custom__'}
            onChange={(e) => {
              if (e.target.value === '__custom__') {
                onUpdate({ className: '' });
              } else if (e.target.value === '') {
                onUpdate({ className: '' });
              } else {
                onUpdate({ className: e.target.value });
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-2"
          >
            <option value="">Sınıf Seç...</option>
            {Object.entries(groupedClasses).map(([category, classes]) => (
              <optgroup key={category} label={category}>
                {(classes as Array<{ name: string; label: string }>).map((cssClass) => (
                  <option key={cssClass.name} value={cssClass.name}>
                    {cssClass.label}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="__custom__">✏️ Özel Sınıf</option>
          </select>

          {(!isReadyClass || currentClassName === '') && (
            <input
              type="text"
              value={currentClassName}
              onChange={(e) => onUpdate({ className: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Özel sınıf adı"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID
          </label>
          <select
            value={READY_IDS.some((r: { id: string }) => r.id === props.id) ? props.id : '__custom__'}
            onChange={(e) => {
              if (e.target.value === '__custom__') {
                onUpdate({ id: '' });
              } else if (e.target.value === '') {
                onUpdate({ id: '' });
              } else {
                onUpdate({ id: e.target.value });
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-2"
          >
            <option value="">ID Seç...</option>
            {READY_IDS.map((readyId: { id: string; label: string }) => (
              <option key={readyId.id} value={readyId.id}>
                {readyId.label}
              </option>
            ))}
            <option value="__custom__">✏️ Özel ID</option>
          </select>

          {(!READY_IDS.some((r: { id: string }) => r.id === props.id) || !props.id) && (
            <input
              type="text"
              value={props.id || ''}
              onChange={(e) => onUpdate({ id: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Özel ID (anchor link için)"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Autoplay
          </label>
          <select
            value={props.autoplay ? 'true' : 'false'}
            onChange={(e) => onUpdate({ autoplay: e.target.value === 'true' })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="false">Kapalı</option>
            <option value="true">Açık</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Loop
          </label>
          <select
            value={props.loop ? 'true' : 'false'}
            onChange={(e) => onUpdate({ loop: e.target.value === 'true' })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="false">Kapalı</option>
            <option value="true">Açık</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Controls
          </label>
          <select
            value={props.controls !== false ? 'true' : 'false'}
            onChange={(e) => onUpdate({ controls: e.target.value === 'true' })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="true">Göster</option>
            <option value="false">Gizle</option>
          </select>
        </div>
      </div>
    );
  }

  if (activeTab === 'advanced') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Özel CSS
          </label>
          <textarea
            value={props.customCSS || ''}
            onChange={(e) => onUpdate({ customCSS: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder="video { filter: grayscale(100%); }"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data Attributes
          </label>
          <textarea
            value={props.dataAttributes ? JSON.stringify(props.dataAttributes, null, 2) : ''}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onUpdate({ dataAttributes: parsed });
              } catch {
                // Geçersiz JSON
              }
            }}
            rows={4}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder='{"data-test": "value"}'
          />
        </div>
      </div>
    );
  }

  return null;
}

