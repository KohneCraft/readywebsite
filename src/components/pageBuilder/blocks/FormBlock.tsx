'use client';

import { useState, memo } from 'react';
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
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (props.action) {
      // Form action URL'i varsa, formu gönder
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      
      try {
        const response = await fetch(props.action, {
          method: props.method || 'POST',
          body: formData,
        });
        
        if (response.ok) {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
          form.reset();
        } else {
          alert(props.errorMessage || 'Form gönderilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Form gönderim hatası:', error);
        alert(props.errorMessage || 'Form gönderilirken bir hata oluştu.');
      }
    } else {
      // Action URL yoksa, sadece başarı mesajı göster (test için)
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={field.rows || 4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                <span className="text-sm text-gray-700 dark:text-gray-300">{field.label}</span>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        
        {props.submitButton && (
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {props.submitButton.text || 'Gönder'}
          </button>
        )}
      </form>
      
      {submitted && props.successMessage && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {props.successMessage}
        </div>
      )}
      
      {props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: props.customCSS }} />
      )}
    </div>
  );
}

const FormBlock = memo(FormBlockComponent);
export { FormBlock };

