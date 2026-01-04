'use client';

import { Plus, Trash2 } from 'lucide-react';
import { SpacingControl } from '../../controls/SpacingControl';
import type { Block, FormField } from '@/types/pageBuilder';

interface FormBlockSettingsProps {
  block: Block;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block['props']>) => void;
}

export function FormBlockSettings({ block, activeTab, onUpdate }: FormBlockSettingsProps) {
  const props = block.props || {};
  const fields: FormField[] = props.fields || [];

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Form Başlığı
          </label>
          <input
            type="text"
            value={props.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="İletişim Formu"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Form Alanları
          </label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {field.label} ({field.type})
                  </span>
                  <button
                    onClick={() => {
                      const newFields = fields.filter((_, i) => i !== index);
                      onUpdate({ fields: newFields });
                    }}
                    className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newField: FormField = {
                  id: `field-${Date.now()}`,
                  type: 'text',
                  name: `field_${fields.length + 1}`,
                  label: `Alan ${fields.length + 1}`,
                  required: false,
                };
                onUpdate({ fields: [...fields, newField] });
              }}
              className="w-full px-3 py-2 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <Plus className="w-4 h-4" />
              Alan Ekle
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gönder Butonu Metni
          </label>
          <input
            type="text"
            value={props.submitButton?.text || 'Gönder'}
            onChange={(e) => onUpdate({ 
              submitButton: { 
                ...props.submitButton, 
                text: e.target.value,
                style: props.submitButton?.style || 'primary',
                size: props.submitButton?.size || 'medium'
              } 
            })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Başarı Mesajı
          </label>
          <input
            type="text"
            value={props.successMessage || ''}
            onChange={(e) => onUpdate({ successMessage: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Form başarıyla gönderildi"
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
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Form Action URL
          </label>
          <input
            type="url"
            value={props.action || ''}
            onChange={(e) => onUpdate({ action: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="https://example.com/submit"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Method
          </label>
          <select
            value={props.method || 'POST'}
            onChange={(e) => onUpdate({ method: e.target.value as 'GET' | 'POST' })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="POST">POST</option>
            <option value="GET">GET</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            CSS Sınıfı
          </label>
          <input
            type="text"
            value={props.className || ''}
            onChange={(e) => onUpdate({ className: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="custom-class"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID
          </label>
          <input
            type="text"
            value={props.id || ''}
            onChange={(e) => onUpdate({ id: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="custom-id"
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
            Özel CSS
          </label>
          <textarea
            value={props.customCSS || ''}
            onChange={(e) => onUpdate({ customCSS: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
            placeholder="form { background: red; }"
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

