'use client';

// ============================================
// Page Builder - Multi Language Input
// Çoklu dil destekli input/textarea komponenti
// ============================================

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { localeFlags, localeNames, type Locale } from '@/i18n';
import { 
  type LocalizedString, 
  type LocalizableString,
  toLocalizedString,
  getLocalizedValue,
  updateLocalizedString 
} from '@/types/localization';
import { Languages, Loader2, Check, AlertCircle } from 'lucide-react';

// Şimdilik sadece TR ve EN aktif (DE ve FR eklenebilir)
const activeLocales: Locale[] = ['tr', 'en', 'de', 'fr'];

interface MultiLangInputProps {
  /** Mevcut değer (string veya LocalizedString) */
  value: LocalizableString | undefined | null;
  /** Değer değiştiğinde çağrılır */
  onChange: (value: LocalizedString) => void;
  /** Input türü */
  type?: 'input' | 'textarea';
  /** Textarea satır sayısı */
  rows?: number;
  /** Placeholder metni */
  placeholder?: string;
  /** Label metni */
  label?: string;
  /** Ek CSS sınıfları */
  className?: string;
  /** Disabled durumu */
  disabled?: boolean;
  /** Otomatik çeviri butonu gösterilsin mi */
  showAutoTranslate?: boolean;
}

export function MultiLangInput({
  value,
  onChange,
  type = 'input',
  rows = 4,
  placeholder = '',
  label,
  className,
  disabled = false,
  showAutoTranslate = true,
}: MultiLangInputProps) {
  // Aktif dil tab'ı
  const [activeLocale, setActiveLocale] = useState<Locale>('tr');
  // Çeviri durumu
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);

  // LocalizedString'e dönüştür
  const localizedValue = toLocalizedString(value, 'tr');

  // Mevcut locale'in değeri
  const currentValue = getLocalizedValue(localizedValue, activeLocale);

  // Değer değişikliği
  const handleChange = useCallback((newValue: string) => {
    const updated = updateLocalizedString(localizedValue, activeLocale, newValue);
    onChange(updated);
  }, [localizedValue, activeLocale, onChange]);

  // Otomatik çeviri (Google Translate API)
  const handleAutoTranslate = useCallback(async () => {
    const sourceText = localizedValue.tr || '';
    if (!sourceText.trim()) {
      setTranslateError('Önce Türkçe içerik girin');
      setTimeout(() => setTranslateError(null), 3000);
      return;
    }

    setIsTranslating(true);
    setTranslateError(null);

    try {
      // Google Translate API'yi çağır
      const targetLanguages = activeLocales.filter(locale => locale !== 'tr');
      
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          targetLanguages,
          sourceLanguage: 'tr',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Çeviri hatası');
      }

      const data = await response.json();
      const translations = data.translations as Record<string, string>;

      // Tüm çevirileri uygula
      let updated = { ...localizedValue };
      for (const [locale, translation] of Object.entries(translations)) {
        if (locale !== 'tr' && activeLocales.includes(locale as Locale)) {
          updated = { ...updated, [locale]: translation };
        }
      }
      
      onChange(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Çeviri yapılamadı';
      setTranslateError(message);
      setTimeout(() => setTranslateError(null), 3000);
    } finally {
      setIsTranslating(false);
    }
  }, [localizedValue, onChange]);

  // Hangi dillerde içerik var?
  const filledLocales = activeLocales.filter(
    locale => localizedValue[locale]?.trim()
  );

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && (
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Dil Tab'ları + Otomatik Çevir Butonu */}
      <div className="flex items-center justify-between gap-2">
        {/* Dil Tab'ları */}
        <div className="flex gap-1">
          {activeLocales.map((locale) => {
            const isFilled = filledLocales.includes(locale);
            const isActive = activeLocale === locale;
            
            return (
              <button
                key={locale}
                type="button"
                onClick={() => setActiveLocale(locale)}
                disabled={disabled}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all',
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
                title={localeNames[locale]}
              >
                <span>{localeFlags[locale]}</span>
                <span className="uppercase">{locale}</span>
                {isFilled && !isActive && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Otomatik Çevir Butonu */}
        {showAutoTranslate && (
          <button
            type="button"
            onClick={handleAutoTranslate}
            disabled={disabled || isTranslating || !localizedValue.tr?.trim()}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all',
              'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              'hover:bg-blue-100 dark:hover:bg-blue-900/50',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            title="Türkçe'den diğer dillere otomatik çevir"
          >
            {isTranslating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Languages className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {isTranslating ? 'Çevriliyor...' : 'Otomatik Çevir'}
            </span>
          </button>
        )}
      </div>

      {/* Hata Mesajı */}
      {translateError && (
        <div className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="w-3.5 h-3.5" />
          {translateError}
        </div>
      )}

      {/* Input/Textarea */}
      {type === 'textarea' ? (
        <textarea
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 text-sm rounded-lg transition-colors',
            'border border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-900',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        />
      ) : (
        <input
          type="text"
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 text-sm rounded-lg transition-colors',
            'border border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-900',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        />
      )}

      {/* Dil Durumu Göstergesi */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>
          {filledLocales.length}/{activeLocales.length} dil tamamlandı
        </span>
        {filledLocales.length < activeLocales.length && (
          <span className="text-amber-500">
            • Eksik: {activeLocales.filter(l => !filledLocales.includes(l)).map(l => l.toUpperCase()).join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}

// Named export
export default MultiLangInput;
