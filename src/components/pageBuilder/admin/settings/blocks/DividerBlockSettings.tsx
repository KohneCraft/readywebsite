'use client';

import { DualColorPicker } from '../../controls/DualColorPicker';
import { SpacingControl } from '../../controls/SpacingControl';
import { cn } from '@/lib/utils';
import type { Block } from '@/types/pageBuilder';

interface DividerBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function DividerBlockSettings({ block, activeTab, onUpdate }: DividerBlockSettingsProps) {
  const props = block.props || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Yükseklik (px)
          </label>
          <input
            type="number"
            value={props.dividerHeight || 1}
            onChange={(e) => onUpdate({ dividerHeight: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            min="1"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Çizgi Rengi
          </label>
          <DualColorPicker
            lightColor={props.dividerColor || '#e5e7eb'}
            darkColor={props.dividerColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ dividerColor: color })}
            onDarkChange={(colorDark) => onUpdate({ dividerColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stil
          </label>
          <div className="flex gap-2">
            {['solid', 'dashed', 'dotted'].map((style) => (
              <button
                key={style}
                onClick={() => onUpdate({ dividerStyle: style as any })}
                className={cn(
                  'flex-1 px-3 py-2 text-xs rounded-lg transition-colors',
                  props.dividerStyle === style
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {style === 'solid' ? 'Düz' : style === 'dashed' ? 'Kesikli' : 'Noktalı'}
              </button>
            ))}
          </div>
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
            Özel CSS
          </label>
          <textarea
            value={props.customCSS || ''}
            onChange={(e) => onUpdate({ customCSS: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder="hr { border-color: red; }"
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

