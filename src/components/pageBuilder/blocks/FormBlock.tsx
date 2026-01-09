'use client';

import { useState, memo, useEffect } from 'react';
import { toast } from 'sonner';
import { sanitizeCSS } from '@/lib/sanitize';
import { logger } from '@/lib/logger';
import type { BlockProps, FormField } from '@/types/pageBuilder';

interface FormBlockProps {
  props: BlockProps;
}

function FormBlockComponent({ props }: FormBlockProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const containerStyle = {
    width: '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '20px',
    backgroundColor: props.formBackgroundColor || 'transparent',
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
        toast.success(props.successMessage || result.message || 'Mesajınız başarıyla gönderildi!');
        setTimeout(() => setSubmitted(false), 3000);
        form.reset();
        setFormData({});
      } else {
        toast.error(props.errorMessage || result.error || 'Form gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      logger.ui.error('Form gönderim hatası', error);
      toast.error(props.errorMessage || 'Form gönderilirken bir hata oluştu.');
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
      {props.title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {props.title}
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
              style={{ color: props.formLabelColor || '#4B5563' }}
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
                  color: props.formTextColor || '#111827',
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
                  color: props.formTextColor || '#111827',
                  backgroundColor: '#FFFFFF'
                }}
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                style={{ 
                  color: props.formTextColor || '#111827',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="">Seçiniz</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                <span style={{ color: props.formLabelColor || '#4B5563' }}>{field.label}</span>
              </label>
            ) : field.type === 'radio' && field.options ? (
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
                    <span style={{ color: props.formLabelColor || '#4B5563' }}>{option.label}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        
        <button
          type="submit"
          className="px-6 py-2 rounded-lg transition-colors hover:opacity-90"
          style={{
            backgroundColor: props.buttonColor || '#2563EB',
            color: props.buttonTextColor || '#FFFFFF'
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

