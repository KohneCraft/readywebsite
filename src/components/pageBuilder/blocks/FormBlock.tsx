'use client';

import { useState, memo, useEffect, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { sanitizeCSS } from '@/lib/sanitize';
import { logger } from '@/lib/logger';
import { useThemeColors } from '@/hooks/useThemeColor';
import { getLocalizedValue } from '@/types/localization';
import type { BlockProps, FormField } from '@/types/pageBuilder';
import type { Locale } from '@/i18n';

interface FormBlockProps {
  props: BlockProps;
}

function FormBlockComponent({ props }: FormBlockProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('common.toast');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Locale'e göre form başlığını al
  const formTitle = useMemo(() =>
    getLocalizedValue(props.title, locale),
    [props.title, locale]
  );

  // Tema renkleri
  const colors = useThemeColors({
    formBg: { light: props.formBackgroundColor || 'transparent', dark: props.formBackgroundColorDark || 'auto' },
    formText: { light: props.formTextColor || '#111827', dark: props.formTextColorDark || 'auto' },
    formLabel: { light: props.formLabelColor || '#4B5563', dark: props.formLabelColorDark || 'auto' },
    buttonBg: { light: props.buttonColor || '#2563EB', dark: props.buttonColorDark || 'auto' },
    buttonText: { light: props.buttonTextColor || '#FFFFFF', dark: props.buttonTextColorDark || 'auto' },
  });

  const containerStyle = {
    width: '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '20px',
    backgroundColor: colors.formBg || 'transparent',
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
  };

  // Custom CSS cleanup
  useEffect(() => {
    if (!props.customCSS) return;

    const styleId = `form-block-css-${props.id || 'default'}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = sanitizeCSS(props.customCSS);

    return () => {
      const el = document.getElementById(styleId);
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [props.customCSS, props.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const submitData = new FormData(form);

    // Action URL belirle - yoksa varsayılan /api/contact kullan
    const actionUrl = props.action || '/api/contact';

    try {
      const response = await fetch(actionUrl, {
        method: props.method || 'POST',
        body: submitData,
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitted(true);
        toast.success(props.successMessage || result.message || t('formSuccess'));
        setTimeout(() => setSubmitted(false), 3000);
        form.reset();
        setFormData({});
      } else {
        toast.error(props.errorMessage || result.error || t('formError'));
      }
    } catch (error) {
      logger.ui.error('Form gönderim hatası', error);
      toast.error(props.errorMessage || t('formError'));
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const fields: FormField[] = props.fields || [];

  return (
    <div
      className={`form-block ${props.className || ''}`}
      style={containerStyle}
      id={props.id}
      {...(props.dataAttributes || {})}
    >
      {formTitle && (
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {formTitle}
        </h3>
      )}

      <form
        onSubmit={handleSubmit}
        action={props.action}
        method={props.method || 'POST'}
        className="space-y-4"
      >
        {fields.map((field) => (
          <div key={field.id} style={{ width: field.width || '100%' }}>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colors.formLabel || '#4B5563' }}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'text' || field.type === 'email' || field.type === 'tel' ? (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                style={{
                  color: colors.formText || '#111827',
                  backgroundColor: '#FFFFFF'
                }}
              />
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={field.rows || 4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                style={{
                  color: colors.formText || '#111827',
                  backgroundColor: '#FFFFFF'
                }}
              />
            ) : field.type === 'select' ? (
              field.options && field.options.length > 0 ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  style={{
                    color: colors.formText || '#111827',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="">Seçiniz</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-400 italic py-2">Seçenek tanımlanmamış</p>
              )
            ) : field.type === 'checkbox' ? (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name] === 'true'}
                  onChange={(e) => handleChange(field.name, e.target.checked ? 'true' : 'false')}
                  required={field.required}
                  className="mr-2"
                />
                <span style={{ color: colors.formLabel || '#4B5563' }}>{field.label}</span>
              </label>
            ) : field.type === 'radio' ? (
              field.options && field.options.length > 0 ? (
                <div className="space-y-2">
                  {field.options.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={formData[field.name] === option.value}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={field.required}
                        className="mr-2"
                      />
                      <span style={{ color: colors.formLabel || '#4B5563' }}>{option.label}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic py-2">Radio seçenekleri tanımlanmamış</p>
              )
            ) : null}
          </div>
        ))}

        <button
          type="submit"
          className="px-6 py-2 rounded-lg transition-colors hover:opacity-90"
          style={{
            backgroundColor: colors.buttonBg || '#2563EB',
            color: colors.buttonText || '#FFFFFF'
          }}
        >
          {props.buttonText || 'Gönder'}
        </button>
      </form>

      {submitted && props.successMessage && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {props.successMessage}
        </div>
      )}

      {props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: sanitizeCSS(props.customCSS) }} />
      )}
    </div>
  );
}

const FormBlock = memo(FormBlockComponent);
export { FormBlock };

