// ============================================
// Vav Yapı - Page Content Types
// Sayfa içerik yönetimi için tip tanımlamaları
// ============================================

import type { PageType, ElementType } from './pageLayout';
import type { Locale } from '@/i18n';

/**
 * Metin stil ayarları
 */
export interface TextStyles {
  color?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  letterSpacing?: string;
  textDecoration?: 'none' | 'underline' | 'line-through';
  fontStyle?: 'normal' | 'italic';
}

/**
 * Görsel ayarları
 */
export interface ImageSettings {
  url?: string;
  alt?: string;
  blur?: number;
  overlay?: number;
  objectFit?: 'cover' | 'contain' | 'fill';
}

/**
 * Buton ayarları
 */
export interface ButtonSettings {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  styles?: TextStyles;
}

/**
 * İçerik bölümü - her element tipi için farklı içerikler
 */
export interface ContentSection {
  // Başlık ve alt başlık
  title?: string;
  titleStyles?: TextStyles;
  subtitle?: string;
  subtitleStyles?: TextStyles;
  
  // Açıklama metni
  description?: string;
  descriptionStyles?: TextStyles;
  
  // Butonlar
  primaryButton?: ButtonSettings;
  secondaryButton?: ButtonSettings;
  
  // Arka plan görseli
  backgroundImage?: ImageSettings;
  
  // Özel içerik (element tipine göre)
  customContent?: Record<string, unknown>;
}

/**
 * Sayfa içeriği - Firebase'de saklanacak
 */
export interface PageContent {
  id: string;
  pageId: PageType;
  elementId: string;
  elementType: ElementType;
  locale: Locale;
  content: ContentSection;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

/**
 * Sayfa içeriği oluşturma girişi
 */
export interface PageContentCreateInput {
  pageId: PageType;
  elementId: string;
  elementType: ElementType;
  locale: Locale;
  content: ContentSection;
  createdBy: string;
}

/**
 * Sayfa içeriği güncelleme girişi
 */
export interface PageContentUpdateInput {
  content?: Partial<ContentSection>;
}

/**
 * Varsayılan metin stilleri
 */
export const DEFAULT_TEXT_STYLES: TextStyles = {
  color: undefined,
  fontSize: undefined,
  fontWeight: 'normal',
  fontFamily: undefined,
  textAlign: 'left',
  lineHeight: undefined,
  letterSpacing: undefined,
  textDecoration: 'none',
  fontStyle: 'normal',
};

/**
 * Varsayılan içerik bölümü
 */
export const DEFAULT_CONTENT_SECTION: ContentSection = {
  title: '',
  titleStyles: { ...DEFAULT_TEXT_STYLES },
  subtitle: '',
  subtitleStyles: { ...DEFAULT_TEXT_STYLES },
  description: '',
  descriptionStyles: { ...DEFAULT_TEXT_STYLES },
};

/**
 * Font seçenekleri
 */
export const FONT_OPTIONS = [
  { value: 'inherit', label: 'Varsayılan' },
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Merriweather, serif', label: 'Merriweather' },
];

/**
 * Font boyutu seçenekleri
 */
export const FONT_SIZE_OPTIONS = [
  { value: '12px', label: '12px - Küçük' },
  { value: '14px', label: '14px - Normal' },
  { value: '16px', label: '16px - Orta' },
  { value: '18px', label: '18px - Büyük' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px - Başlık' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '36px', label: '36px - Büyük Başlık' },
  { value: '40px', label: '40px' },
  { value: '48px', label: '48px - Hero' },
  { value: '56px', label: '56px' },
  { value: '64px', label: '64px - Çok Büyük' },
];

/**
 * Font ağırlığı seçenekleri
 */
export const FONT_WEIGHT_OPTIONS = [
  { value: 'normal', label: 'Normal' },
  { value: 'medium', label: 'Orta' },
  { value: 'semibold', label: 'Yarı Kalın' },
  { value: 'bold', label: 'Kalın' },
];

/**
 * Metin hizalama seçenekleri
 */
export const TEXT_ALIGN_OPTIONS = [
  { value: 'left', label: 'Sola' },
  { value: 'center', label: 'Ortala' },
  { value: 'right', label: 'Sağa' },
  { value: 'justify', label: 'İki Yana' },
];


