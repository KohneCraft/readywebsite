// ============================================
// Page Builder - Theme Types
// Tema sistemi için tip tanımlamaları
// ============================================

import type { Spacing } from './pageBuilder';

/**
 * Tema kategorileri
 */
export type ThemeCategory = 'business' | 'portfolio' | 'blog' | 'ecommerce' | 'landing' | 'corporate';

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
 * Tema ayarları
 */
export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
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

