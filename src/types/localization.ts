// ============================================
// Page Builder - Localization Types
// Çoklu dil desteği için tip tanımlamaları
// ============================================

import type { Locale } from '@/i18n';

/**
 * Çoklu dil destekli metin tipi
 * Her locale için opsiyonel değer tutar
 */
export type LocalizedString = {
  [key in Locale]?: string;
};

/**
 * LocalizedString veya düz string olabilir (geriye uyumluluk için)
 */
export type LocalizableString = string | LocalizedString;

/**
 * Bir değerin LocalizedString olup olmadığını kontrol eder
 */
export function isLocalizedString(value: unknown): value is LocalizedString {
  if (typeof value !== 'object' || value === null) return false;
  const keys = Object.keys(value);
  // En az bir locale key'i varsa LocalizedString kabul et
  return keys.some(key => ['tr', 'en', 'de', 'fr'].includes(key));
}

/**
 * LocalizableString'den belirli bir locale'in değerini alır
 * Fallback: tr -> en -> ilk değer -> boş string
 */
export function getLocalizedValue(
  value: LocalizableString | undefined | null,
  locale: Locale,
  fallbackLocale: Locale = 'tr'
): string {
  if (!value) return '';
  
  // Düz string ise direkt döndür
  if (typeof value === 'string') return value;
  
  // LocalizedString ise locale'e göre değer al
  if (value[locale]) return value[locale]!;
  if (value[fallbackLocale]) return value[fallbackLocale]!;
  
  // Hiçbiri yoksa ilk mevcut değeri döndür
  const firstValue = Object.values(value).find(v => v);
  return firstValue || '';
}

/**
 * Düz string'i LocalizedString'e dönüştürür
 */
export function toLocalizedString(
  value: LocalizableString | undefined | null,
  locale: Locale = 'tr'
): LocalizedString {
  if (!value) return { [locale]: '' };
  if (typeof value === 'string') return { [locale]: value };
  return value;
}

/**
 * LocalizedString'i belirli bir locale ile günceller
 */
export function updateLocalizedString(
  current: LocalizableString | undefined | null,
  locale: Locale,
  newValue: string
): LocalizedString {
  const localized = toLocalizedString(current, 'tr');
  return { ...localized, [locale]: newValue };
}
