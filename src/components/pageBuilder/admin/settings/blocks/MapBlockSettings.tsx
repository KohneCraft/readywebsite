'use client';

import { SpacingControl } from '../../controls/SpacingControl';
import { cn } from '@/lib/utils';
import { getGroupedCSSClasses, READY_CSS_CLASSES, READY_IDS } from '@/lib/readyCSSClasses';
import type { Block } from '@/types/pageBuilder';

interface MapBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function MapBlockSettings({ block, activeTab, onUpdate }: MapBlockSettingsProps) {
  const props = block.props || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Harita Genişliği (px)
          </label>
          <input
            type="number"
            value={props.mapWidth || 1200}
            onChange={(e) => onUpdate({ mapWidth: parseInt(e.target.value) || 1200 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            min="100"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Desktop: Belirtilen px, Tablet: 90%, Mobil: 100%
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Harita Yüksekliği (px)
          </label>
          <input
            type="number"
            value={props.mapHeight || 400}
            onChange={(e) => onUpdate({ mapHeight: parseInt(e.target.value) || 400 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            min="100"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enlem (Latitude)
          </label>
          <input
            type="number"
            step="0.000001"
            value={props.latitude || ''}
            onChange={(e) => onUpdate({ latitude: parseFloat(e.target.value) || undefined })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="41.0082"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Boylam (Longitude)
          </label>
          <input
            type="number"
            step="0.000001"
            value={props.longitude || ''}
            onChange={(e) => onUpdate({ longitude: parseFloat(e.target.value) || undefined })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="28.9784"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zoom Seviyesi
          </label>
          <input
            type="number"
            value={props.zoom || 15}
            onChange={(e) => onUpdate({ zoom: parseInt(e.target.value) || 15 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            min="1"
            max="20"
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
            min="0"
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
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Harita Sağlayıcısı
          </label>
          <div className="flex gap-2">
            {['google', 'openstreetmap'].map((provider) => (
              <button
                key={provider}
                onClick={() => onUpdate({ mapProvider: provider as any })}
                className={cn(
                  'flex-1 px-3 py-2 text-xs rounded-lg transition-colors',
                  props.mapProvider === provider
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {provider === 'google' ? 'Google Maps' : 'OpenStreetMap'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Marker Göster
          </label>
          <select
            value={props.marker ? 'true' : 'false'}
            onChange={(e) => onUpdate({ marker: e.target.value === 'true' })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="true">Evet</option>
            <option value="false">Hayır</option>
          </select>
        </div>

        {props.marker && (
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Marker Başlığı
            </label>
            <input
              type="text"
              value={props.markerTitle || ''}
              onChange={(e) => onUpdate({ markerTitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Konum başlığı"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            CSS Sınıfı
          </label>
          <select
            value={READY_CSS_CLASSES.some(c => c.name === props.className) ? props.className : '__custom__'}
            onChange={(e) => {
              if (e.target.value === '__custom__') {
                // Özel sınıf için değeri boşalt, input görünsün
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
            {Object.entries(getGroupedCSSClasses()).map(([category, classes]) => (
              <optgroup key={category} label={category}>
                {classes.map((cssClass) => (
                  <option key={cssClass.name} value={cssClass.name}>
                    {cssClass.label}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="__custom__">✏️ Özel Sınıf</option>
          </select>

          {(!READY_CSS_CLASSES.some(c => c.name === props.className) || !props.className) && (
            <input
              type="text"
              value={props.className || ''}
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
            value={READY_IDS.some(r => r.id === props.id) ? props.id : '__custom__'}
            onChange={(e) => {
              if (e.target.value === '__custom__') {
                // Özel ID için değeri boşalt, input görünsün
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
            {READY_IDS.map((readyId) => (
              <option key={readyId.id} value={readyId.id}>
                {readyId.label}
              </option>
            ))}
            <option value="__custom__">✏️ Özel ID</option>
          </select>

          {(!READY_IDS.some(r => r.id === props.id) || !props.id) && (
            <input
              type="text"
              value={props.id || ''}
              onChange={(e) => onUpdate({ id: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Özel ID (anchor link için)"
            />
          )}
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
            placeholder=".map-block { filter: grayscale(100%); }"
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

