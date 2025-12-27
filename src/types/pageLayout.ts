// ============================================
// Vav Yapı - Page Layout Types
// Page Builder modülü için tip tanımlamaları
// ============================================

/**
 * Sayfa tipi - hangi sayfanın düzenleneceği
 */
export type PageType = 'project-detail' | 'home' | 'about' | 'contact' | 'services';

/**
 * Element tipi - sayfadaki bileşenler
 */
export type ElementType = 
  | 'hero'
  | 'description'
  | 'video'
  | 'map'
  | 'gallery'
  | 'sidebar'
  | 'cta'
  | 'info-cards'
  | 'features'
  | 'testimonials'
  | 'contact-form'
  | 'custom';

/**
 * Element genişlik seçenekleri
 */
export type ElementWidth = 'full' | 'half' | 'third' | 'quarter' | 'two-thirds' | 'three-quarters';

/**
 * Element pozisyon seçenekleri
 */
export type ElementPosition = 'left' | 'right' | 'center';

/**
 * Responsive breakpoint
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Spacing değerleri (margin/padding için)
 */
export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Responsive ayarları
 */
export interface ResponsiveSettings {
  visible: boolean;
  width: ElementWidth;
  order: number;
}

/**
 * Element ayarları
 */
export interface ElementSettings {
  width: ElementWidth;
  position: ElementPosition;
  margin: Spacing;
  padding: Spacing;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive: Record<Breakpoint, ResponsiveSettings>;
}

/**
 * Sayfa elementi
 */
export interface PageElement {
  id: string;
  type: ElementType;
  label: string;
  order: number;
  visible: boolean;
  settings: ElementSettings;
  customProps?: Record<string, unknown>;
}

/**
 * Sayfa düzeni
 */
export interface PageLayout {
  id: string;
  pageId: PageType;
  name: string;
  elements: PageElement[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isDefault: boolean;
  isActive: boolean;
}

/**
 * Sayfa düzeni oluşturma girişi
 */
export interface PageLayoutCreateInput {
  pageId: PageType;
  name: string;
  elements: Omit<PageElement, 'id'>[];
  createdBy: string;
  isDefault?: boolean;
  isActive?: boolean;
}

/**
 * Sayfa düzeni güncelleme girişi
 */
export interface PageLayoutUpdateInput {
  name?: string;
  elements?: PageElement[];
  isDefault?: boolean;
  isActive?: boolean;
}

/**
 * Varsayılan element ayarları
 */
export const DEFAULT_ELEMENT_SETTINGS: ElementSettings = {
  width: 'full',
  position: 'center',
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  borderRadius: 0,
  shadow: 'none',
  responsive: {
    mobile: { visible: true, width: 'full', order: 0 },
    tablet: { visible: true, width: 'full', order: 0 },
    desktop: { visible: true, width: 'full', order: 0 },
  },
};

/**
 * Proje detay sayfası için varsayılan elementler
 */
export const PROJECT_DETAIL_DEFAULT_ELEMENTS: Omit<PageElement, 'id'>[] = [
  {
    type: 'hero',
    label: 'Kapak Görseli ve Başlık',
    order: 0,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
  {
    type: 'description',
    label: 'Proje Açıklaması',
    order: 1,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'two-thirds' },
  },
  {
    type: 'sidebar',
    label: 'Proje Bilgileri Paneli',
    order: 2,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'third', position: 'right' },
  },
  {
    type: 'video',
    label: 'Proje Videosu',
    order: 3,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'half' },
  },
  {
    type: 'map',
    label: 'Konum Haritası',
    order: 4,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'half' },
  },
  {
    type: 'gallery',
    label: 'Proje Galerisi',
    order: 5,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
  {
    type: 'cta',
    label: 'İletişim Çağrısı',
    order: 6,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
];

/**
 * Ana sayfa için varsayılan elementler
 */
export const HOME_DEFAULT_ELEMENTS: Omit<PageElement, 'id'>[] = [
  {
    type: 'hero',
    label: 'Ana Slider / Hero',
    order: 0,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
  {
    type: 'features',
    label: 'Öne Çıkan Özellikler',
    order: 1,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
  {
    type: 'info-cards',
    label: 'Öne Çıkan Projeler',
    order: 2,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
  {
    type: 'description',
    label: 'Hakkımızda Kısa',
    order: 3,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'two-thirds' },
  },
  {
    type: 'sidebar',
    label: 'İstatistikler',
    order: 4,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'third', position: 'right' },
  },
  {
    type: 'testimonials',
    label: 'Müşteri Yorumları',
    order: 5,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
  {
    type: 'cta',
    label: 'İletişim Çağrısı',
    order: 6,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
];

/**
 * İletişim sayfası için varsayılan elementler
 */
export const CONTACT_DEFAULT_ELEMENTS: Omit<PageElement, 'id'>[] = [
  {
    type: 'hero',
    label: 'Sayfa Başlığı',
    order: 0,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
  {
    type: 'contact-form',
    label: 'İletişim Formu',
    order: 1,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'two-thirds' },
  },
  {
    type: 'sidebar',
    label: 'İletişim Bilgileri',
    order: 2,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS, width: 'third', position: 'right' },
  },
  {
    type: 'map',
    label: 'Konum Haritası',
    order: 3,
    visible: true,
    settings: { ...DEFAULT_ELEMENT_SETTINGS },
  },
];

/**
 * Sayfa tipine göre varsayılan elementleri getir
 */
export function getDefaultElementsForPage(pageType: PageType): Omit<PageElement, 'id'>[] {
  switch (pageType) {
    case 'home':
      return HOME_DEFAULT_ELEMENTS;
    case 'contact':
      return CONTACT_DEFAULT_ELEMENTS;
    case 'project-detail':
      return PROJECT_DETAIL_DEFAULT_ELEMENTS;
    case 'about':
      return [
        {
          type: 'hero',
          label: 'Sayfa Başlığı',
          order: 0,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
        {
          type: 'description',
          label: 'Şirket Hakkında',
          order: 1,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
        {
          type: 'features',
          label: 'Değerlerimiz',
          order: 2,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
        {
          type: 'info-cards',
          label: 'Ekibimiz',
          order: 3,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
        {
          type: 'cta',
          label: 'İletişim Çağrısı',
          order: 4,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
      ];
    case 'services':
      return [
        {
          type: 'hero',
          label: 'Sayfa Başlığı',
          order: 0,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
        {
          type: 'features',
          label: 'Hizmetlerimiz',
          order: 1,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
        {
          type: 'info-cards',
          label: 'Hizmet Detayları',
          order: 2,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
        {
          type: 'cta',
          label: 'Teklif Al',
          order: 3,
          visible: true,
          settings: { ...DEFAULT_ELEMENT_SETTINGS },
        },
      ];
    default:
      return PROJECT_DETAIL_DEFAULT_ELEMENTS;
  }
}

/**
 * Element tipleri için Türkçe etiketler
 */
export const ELEMENT_TYPE_LABELS: Record<ElementType, string> = {
  'hero': 'Kapak Görseli',
  'description': 'Açıklama',
  'video': 'Video',
  'map': 'Harita',
  'gallery': 'Galeri',
  'sidebar': 'Yan Panel',
  'cta': 'Aksiyon Butonu',
  'info-cards': 'Bilgi Kartları',
  'features': 'Özellikler',
  'testimonials': 'Referanslar',
  'contact-form': 'İletişim Formu',
  'custom': 'Özel',
};

/**
 * Sayfa tipleri için Türkçe etiketler
 */
export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  'project-detail': 'Proje Detay Sayfası',
  'home': 'Ana Sayfa',
  'about': 'Hakkımızda',
  'contact': 'İletişim',
  'services': 'Hizmetler',
};

