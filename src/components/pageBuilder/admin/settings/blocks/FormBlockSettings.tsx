'use client';

import { Plus, Trash2 } from 'lucide-react';
import { SpacingControl } from '../../controls/SpacingControl';
import { DualColorPicker } from '../../controls/DualColorPicker';
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
              <div key={field.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Alan {index + 1}
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

                {/* Alan Tipi */}
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Tip</label>
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index] = { ...field, type: e.target.value as FormField['type'] };
                      onUpdate({ fields: newFields });
                    }}
                    className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="text">Metin</option>
                    <option value="email">E-posta</option>
                    <option value="tel">Telefon</option>
                    <option value="textarea">Metin Alanı</option>
                    <option value="select">Seçim</option>
                    <option value="checkbox">Onay Kutusu</option>
                    <option value="radio">Radio</option>
                  </select>
                </div>

                {/* Alan Adı */}
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Alan Adı</label>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index] = { ...field, name: e.target.value };
                      onUpdate({ fields: newFields });
                    }}
                    className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Etiket */}
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Etiket</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index] = { ...field, label: e.target.value };
                      onUpdate({ fields: newFields });
                    }}
                    className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Placeholder */}
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Placeholder</label>
                  <input
                    type="text"
                    value={field.placeholder || ''}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index] = { ...field, placeholder: e.target.value };
                      onUpdate({ fields: newFields });
                    }}
                    className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Zorunlu */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`required-${field.id}`}
                    checked={field.required}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index] = { ...field, required: e.target.checked };
                      onUpdate({ fields: newFields });
                    }}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor={`required-${field.id}`} className="text-xs text-gray-600 dark:text-gray-400">
                    Zorunlu alan
                  </label>
                </div>

                {/* Select ve Radio için Seçenekler */}
                {(field.type === 'select' || field.type === 'radio') && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      📋 Seçenekler
                    </label>
                    <div className="space-y-2">
                      {(field.options || []).map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option.value}
                            onChange={(e) => {
                              const newFields = [...fields];
                              const newOptions = [...(field.options || [])];
                              newOptions[optIndex] = { ...option, value: e.target.value };
                              newFields[index] = { ...field, options: newOptions };
                              onUpdate({ fields: newFields });
                            }}
                            placeholder="Değer"
                            className="flex-1 px-2 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            value={option.label}
                            onChange={(e) => {
                              const newFields = [...fields];
                              const newOptions = [...(field.options || [])];
                              newOptions[optIndex] = { ...option, label: e.target.value };
                              newFields[index] = { ...field, options: newOptions };
                              onUpdate({ fields: newFields });
                            }}
                            placeholder="Etiket"
                            className="flex-1 px-2 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                          <button
                            onClick={() => {
                              const newFields = [...fields];
                              const newOptions = (field.options || []).filter((_, i) => i !== optIndex);
                              newFields[index] = { ...field, options: newOptions };
                              onUpdate({ fields: newFields });
                            }}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            title="Seçeneği Sil"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newFields = [...fields];
                          const newOptions = [...(field.options || []), { value: '', label: '' }];
                          newFields[index] = { ...field, options: newOptions };
                          onUpdate({ fields: newFields });
                        }}
                        className="w-full px-2 py-1 text-xs border border-dashed border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400"
                      >
                        <Plus className="w-3 h-3" />
                        Seçenek Ekle
                      </button>
                    </div>
                    {(field.options || []).length === 0 && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                        ⚠️ En az bir seçenek eklemeniz gerekiyor
                      </p>
                    )}
                  </div>
                )}
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

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arkaplan Rengi
          </label>
          <DualColorPicker
            lightColor={props.formBackgroundColor || '#FFFFFF'}
            darkColor={props.formBackgroundColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ formBackgroundColor: color })}
            onDarkChange={(colorDark) => onUpdate({ formBackgroundColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Metin Rengi
          </label>
          <DualColorPicker
            lightColor={props.formTextColor || '#000000'}
            darkColor={props.formTextColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ formTextColor: color })}
            onDarkChange={(colorDark) => onUpdate({ formTextColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Label Metin Rengi
          </label>
          <DualColorPicker
            lightColor={props.formLabelColor || '#333333'}
            darkColor={props.formLabelColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ formLabelColor: color })}
            onDarkChange={(colorDark) => onUpdate({ formLabelColorDark: colorDark })}
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    const { cn } = require('@/lib/utils');
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
          {(() => {
            const { getGroupedCSSClasses, READY_CSS_CLASSES } = require('@/lib/readyCSSClasses');
            const groupedClasses = getGroupedCSSClasses();
            const currentClassName = props.className || '';
            const isReadyClass = READY_CSS_CLASSES.some((c: { name: string }) => c.name === currentClassName);
            return (
              <>
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
              </>
            );
          })()}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID
          </label>
          {(() => {
            const { READY_IDS } = require('@/lib/readyCSSClasses');
            return (
              <>
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
              </>
            );
          })()}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gönder Butonu Metni
          </label>
          <input
            type="text"
            value={props.buttonText || ''}
            onChange={(e) => onUpdate({ buttonText: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Gönder"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buton Rengi
          </label>
          <DualColorPicker
            lightColor={props.buttonColor || '#2563EB'}
            darkColor={props.buttonColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ buttonColor: color })}
            onDarkChange={(colorDark) => onUpdate({ buttonColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buton Metin Rengi
          </label>
          <DualColorPicker
            lightColor={props.buttonTextColor || '#FFFFFF'}
            darkColor={props.buttonTextColorDark || 'auto'}
            onLightChange={(color) => onUpdate({ buttonTextColor: color })}
            onDarkChange={(colorDark) => onUpdate({ buttonTextColorDark: colorDark })}
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

