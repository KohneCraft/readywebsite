'use client';

import { SpacingControl } from '../../controls/SpacingControl';
import { getGroupedCSSClasses, READY_CSS_CLASSES, READY_IDS } from '@/lib/readyCSSClasses';
import type { Block } from '@/types/pageBuilder';

interface HTMLBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function HTMLBlockSettings({ block, activeTab, onUpdate }: HTMLBlockSettingsProps) {
  const props = block.props || {};

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            HTML İçeriği
          </label>
          <textarea
            value={props.html || ''}
            onChange={(e) => onUpdate({ html: e.target.value })}
            rows={12}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder="<div class='my-class'>\n  <h2>Başlık</h2>\n  <p>Paragraf içeriği...</p>\n</div>"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Doğrudan HTML kodu yazabilirsiniz. Scriptler güvenlik nedeniyle çalışmaz.
          </p>
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

          {(!isReadyClass || currentClassName === '') && (
            <input
              type="text"
              value={currentClassName}
              onChange={(e) => onUpdate({ className: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Özel sınıf adı"
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
            value={props.css || ''}
            onChange={(e) => onUpdate({ css: e.target.value })}
            rows={8}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder=".custom-class { color: red; }"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Özel JavaScript
          </label>
          <textarea
            value={props.javascript || ''}
            onChange={(e) => onUpdate({ javascript: e.target.value })}
            rows={8}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder="console.log('Hello World');"
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            ⚠️ Dikkat: JavaScript kodu doğrudan çalıştırılır. Güvenli kod yazın.
          </p>
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

