'use client';

// ============================================
// Vav Yapı - Text Block Settings
// Metin bloğu ayarları
// ============================================

import { DualColorPicker } from '../../controls/DualColorPicker';
import { SpacingControl } from '../../controls/SpacingControl';
import { cn } from '@/lib/utils';
import { getGroupedCSSClasses, READY_CSS_CLASSES, READY_IDS } from '@/lib/readyCSSClasses';
import type { Block } from '@/types/pageBuilder';

interface TextBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function TextBlockSettings({ block, activeTab, onUpdate }: TextBlockSettingsProps) {
  const props = block.props || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            İçerik
          </label>
          <textarea
            value={props.content || ''}
            onChange={(e) => onUpdate({ content: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Metin içeriği..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Font Ailesi
          </label>
          <select
            value={props.fontFamily || 'inherit'}
            onChange={(e) => onUpdate({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="inherit">Varsayılan</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="'Poppins', sans-serif">Poppins</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Georgia', serif">Georgia</option>
            <option value="'Arial', sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Font Boyutu (px)
          </label>
          <input
            type="number"
            value={props.fontSize || 16}
            onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) || 16 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Metin Biçimlendirme
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdate({ fontWeight: props.fontWeight === 'bold' ? 'normal' : 'bold' })}
              className={cn(
                'flex-1 px-3 py-2 text-xs rounded-lg transition-colors font-bold',
                props.fontWeight === 'bold'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              B
            </button>
            <button
              onClick={() => onUpdate({ fontStyle: props.fontStyle === 'italic' ? 'normal' : 'italic' })}
              className={cn(
                'flex-1 px-3 py-2 text-xs rounded-lg transition-colors italic',
                props.fontStyle === 'italic'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              I
            </button>
            <button
              onClick={() => onUpdate({ textDecoration: props.textDecoration === 'underline' ? 'none' : 'underline' })}
              className={cn(
                'flex-1 px-3 py-2 text-xs rounded-lg transition-colors underline',
                props.textDecoration === 'underline'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              U
            </button>
            <button
              onClick={() => onUpdate({ textDecoration: props.textDecoration === 'line-through' ? 'none' : 'line-through' })}
              className={cn(
                'flex-1 px-3 py-2 text-xs rounded-lg transition-colors line-through',
                props.textDecoration === 'line-through'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              S
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Metin Rengi
          </label>
          <DualColorPicker
            lightColor={props.color || '#333333'}
            darkColor={props.colorDark || 'auto'}
            onLightChange={(color) => onUpdate({ color })}
            onDarkChange={(colorDark) => onUpdate({ colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arka Plan Rengi
          </label>
          <DualColorPicker
            lightColor={props.backgroundColor || 'transparent'}
            darkColor={props.backgroundColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ backgroundColor: color })}
            onDarkChange={(colorDark) => onUpdate({ backgroundColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arka Plan Blur (px)
          </label>
          <input
            type="number"
            value={props.backgroundBlur || 0}
            onChange={(e) => onUpdate({ backgroundBlur: parseInt(e.target.value) || 0 })}
            min={0}
            max={50}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Cam efekti için blur değeri (0 = kapalı)
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arka Plan İç Dolgu (px)
          </label>
          <input
            type="number"
            value={props.backgroundPadding || 0}
            onChange={(e) => onUpdate({ backgroundPadding: parseInt(e.target.value) || 0 })}
            min={0}
            max={100}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hizalama
          </label>
          <div className="flex gap-2">
            {['left', 'center', 'right', 'justify'].map((align) => (
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
                {align === 'left' ? 'Sol' : align === 'center' ? 'Orta' : align === 'right' ? 'Sağ' : 'İki Yana'}
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
            Padding
          </label>
          <SpacingControl
            value={props.padding || { top: 0, right: 0, bottom: 0, left: 0 }}
            onChange={(padding) => onUpdate({ padding })}
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    const groupedClasses = getGroupedCSSClasses();
    const currentClassName = props.className || '';
    const isReadyClass = READY_CSS_CLASSES.some(c => c.name === currentClassName);

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
            {Object.entries(groupedClasses).map(([category, classes]) => (
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

          {/* Özel sınıf veya mevcut sınıf listede yoksa input göster */}
          {(!isReadyClass || currentClassName === '') && (
            <input
              type="text"
              value={currentClassName}
              onChange={(e) => onUpdate({ className: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Özel sınıf adı (örn: metin veya cam-efekti)"
            />
          )}

          {isReadyClass && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              ✓ Hazır stil: {READY_CSS_CLASSES.find(c => c.name === currentClassName)?.description}
            </p>
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

          {READY_IDS.some(r => r.id === props.id) && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              ✓ {READY_IDS.find(r => r.id === props.id)?.description}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Satır Yüksekliği
          </label>
          <input
            type="number"
            value={props.lineHeight || 1.5}
            onChange={(e) => onUpdate({ lineHeight: parseFloat(e.target.value) || 1.5 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            step="0.1"
          />
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
            placeholder=".custom-class { color: red; }"
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

