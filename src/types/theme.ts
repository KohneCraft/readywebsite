// ============================================
// Page Builder - Theme Types
// Tema sistemi için tip tanımlamaları
// ============================================

import type { Spacing } from './pageBuilder';

/**
 * Tema kategorileri
 */
export type ThemeCategory = 'business' | 'portfolio' | 'blog' | 'ecommerce' | 'landing' | 'corporate' | 'food' | 'medical' | 'education' | 'construction';

/**
 * Desteklenen diller
 */
export type SupportedLanguage = 'tr' | 'en';

/**
 * Çeviri yapısı
 */
export interface ThemeTranslations {
  [lang: string]: {
    [key: string]: string | Record<string, string>;
  };
}

/**
 * Tema metadata
 */
export interface ThemeMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  thumbnail: string;
  author: string;
  category: ThemeCategory;
  pages: ThemePageConfig[];
  settings: ThemeSettings;
}

/**
 * Tema sayfa konfigürasyonu
 */
export interface ThemePageConfig {
  slug: string;
  title: string;
  file: string;
}

/**
 * Navigation item tipi (dropdown desteği ile)
 */
export interface NavItem {
  href: string;
  label: string;
  children?: NavItem[]; // Alt linkler (dropdown menü için)
}

/**
 * Tema ayarları
 */
export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  // Header/Footer özelleştirmeleri
  header?: {
    logo?: string;
    logoText?: string;
    navItems?: NavItem[];
    backgroundColor?: string;
    textColor?: string;
    sticky?: boolean;
    transparent?: boolean;
    hoverOpenMenu?: boolean; // Hover ile dropdown menü açılsın mı
  };
  footer?: {
    logo?: string;
    logoText?: string;
    description?: string;
    quickLinks?: Array<{ href: string; label: string }>;
    socialLinks?: Array<{ platform: string; url: string; icon?: string }>;
    copyright?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  // Company bilgileri (Admin Settings için)
  company?: {
    name?: string;
    slogan?: string;
    logo?: string;
  };
  // İletişim bilgileri
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    mapUrl?: string;
  };
  // Sosyal medya linkleri
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  // SEO bilgileri
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    googleAnalyticsId?: string;
  };
  // Çoklu dil desteği
  translations?: ThemeTranslations;
  // Varsayılan dil
  defaultLanguage?: SupportedLanguage;
  [key: string]: any;
}

/**
 * Tema sayfa verisi
 */
export interface ThemePageData {
  slug: string;
  title: string;
  sections: ThemeSectionData[];
}

/**
 * Tema section verisi
 */
export interface ThemeSectionData {
  name: string;
  settings: {
    backgroundColor?: string;
    padding?: Spacing;
    minHeight?: number;
    [key: string]: any;
  };
  columns: ThemeColumnData[];
}

/**
 * Tema column verisi
 */
export interface ThemeColumnData {
  width: number;
  settings: {
    padding?: Spacing;
    [key: string]: any;
  };
  blocks: ThemeBlockData[];
}

/**
 * Tema block verisi
 */
export interface ThemeBlockData {
  type: string;
  props: Record<string, any>;
}

/**
 * Tema verisi (metadata + pages)
 */
export interface ThemeData {
  metadata: ThemeMetadata;
  pages: Record<string, ThemePageData>;
}

/**
 * Tema önizleme bilgisi
 */
export interface ThemePreview {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: ThemeCategory;
  version: string;
}

