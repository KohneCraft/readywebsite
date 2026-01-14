'use client';

// ============================================
// Vav Yapı - Button Block Settings
// Buton bloğu ayarları
// ============================================

import { DualColorPicker } from '../../controls/DualColorPicker';
import { SpacingControl } from '../../controls/SpacingControl';
import { cn } from '@/lib/utils';
import type { Block } from '@/types/pageBuilder';

interface ButtonBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function ButtonBlockSettings({ block, activeTab, onUpdate }: ButtonBlockSettingsProps) {
  const props = (block.props || {}) as any;

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buton Metni
          </label>
          <input
            type="text"
            value={props.text || ''}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Tıklayın"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Link URL
          </label>
          <input
            type="url"
            value={props.link || ''}
            onChange={(e) => onUpdate({ link: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buton Stili
          </label>
          <div className="flex gap-2">
            {['primary', 'secondary', 'outline'].map((style) => (
              <button
                key={style}
                onClick={() => onUpdate({ buttonStyle: style as any })}
                className={cn(
                  'flex-1 px-3 py-2 text-xs rounded-lg transition-colors',
                  props.buttonStyle === style
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {style === 'primary' ? 'Primary' : style === 'secondary' ? 'Secondary' : 'Outline'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arka Plan Rengi
          </label>
          <DualColorPicker
            lightColor={props.backgroundColor || '#007bff'}
            darkColor={props.backgroundColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ backgroundColor: color })}
            onDarkChange={(colorDark) => onUpdate({ backgroundColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Metin Rengi
          </label>
          <DualColorPicker
            lightColor={props.textColor || '#ffffff'}
            darkColor={props.textColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ textColor: color })}
            onDarkChange={(colorDark) => onUpdate({ textColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Yatay Hizalama
          </label>
          <div className="flex gap-2">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => onUpdate({ textAlign: align as any })}
                className={cn(
                  'flex-1 px-3 py-2 text-xs rounded-lg transition-colors',
                  props.textAlign === align
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {align === 'left' ? 'Sol' : align === 'center' ? 'Orta' : 'Sağ'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dikey Hizalama
          </label>
          <div className="flex gap-2">
            {['top', 'center', 'bottom'].map((align) => (
              <button
                key={align}
                onClick={() => onUpdate({ verticalAlign: align as any })}
                className={cn(
                  'flex-1 px-3 py-2 text-xs rounded-lg transition-colors',
                  props.verticalAlign === align
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {align === 'top' ? 'Üst' : align === 'center' ? 'Orta' : 'Alt'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Genişlik (px)
            </label>
            <input
              type="number"
              value={props.width || ''}
              onChange={(e) => onUpdate({ width: e.target.value ? parseInt(e.target.value) : undefined } as any)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Otomatik"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Yükseklik (px)
            </label>
            <input
              type="number"
              value={props.height || ''}
              onChange={(e) => onUpdate({ height: e.target.value ? parseInt(e.target.value) : undefined } as any)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Otomatik"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Padding
          </label>
          <SpacingControl
            value={props.padding || { top: 12, right: 24, bottom: 12, left: 24 }}
            onChange={(padding) => onUpdate({ padding })}
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    const { getGroupedCSSClasses, READY_CSS_CLASSES, READY_IDS } = require('@/lib/readyCSSClasses');
    const groupedClasses = getGroupedCSSClasses();
    const currentClassName = props.className || '';
    const isReadyClass = READY_CSS_CLASSES.some((c: { name: string }) => c.name === currentClassName);

    return (
      <div className="space-y-4">
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
      </div>
    );
  }

  if (activeTab === 'advanced') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Köşe Yuvarlaklığı (px)
          </label>
          <input
            type="number"
            value={props.borderRadius || 0}
            onChange={(e) => onUpdate({ borderRadius: parseInt(e.target.value) || 0 })}
            min={0}
            max={100}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Özel CSS
          </label>
          <textarea
            value={props.customCSS || ''}
            onChange={(e) => onUpdate({ customCSS: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder="button { color: red; }"
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

