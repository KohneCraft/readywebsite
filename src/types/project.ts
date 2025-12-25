// ============================================
// Vav Yapı - Project Types
// Firestore Collection: projects
// ============================================

export type ProjectStatus = 'ongoing' | 'completed' | 'planning';
export type ProjectType = 'residential' | 'commercial' | 'mixed' | 'public';
export type Locale = 'tr' | 'en' | 'de' | 'fr';

/**
 * Çok dilli proje içeriği
 * Her dil için ayrı translation objesi
 */
export interface ProjectTranslation {
  name: string;
  shortDescription: string; // Max 150 karakter
  description: string; // Rich text (HTML)
  location: {
    city: string;
    district: string;
    fullAddress: string;
  };
  // SEO alanları
  metaTitle: string; // Max 60 karakter
  metaDescription: string; // Max 160 karakter
  keywords?: string[];
}

/**
 * Proje görseli
 * Firebase Storage'da saklanır
 */
export interface ProjectImage {
  id: string;
  url: string;
  path: string; // Storage path: projects/{projectId}/gallery/{imageId}
  alt: string;
  title?: string;
  description?: string;
  order: number;
  createdAt: Date;
}

/**
 * Proje koordinatları
 * Google Maps entegrasyonu için
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Ana Project interface
 * Firestore document yapısı
 */
export interface Project {
  id: string;
  slug: string; // URL-friendly unique identifier
  status: ProjectStatus;
  type: ProjectType;
  featured: boolean; // Ana sayfada göster
  published: boolean; // Yayın durumu
  order?: number; // Manuel sıralama için

  // Çok dilli içerik
  translations: {
    tr: ProjectTranslation;
    en: ProjectTranslation;
    de: ProjectTranslation;
    fr: ProjectTranslation;
  };

  // Teknik bilgiler
  totalArea: number; // m²
  floors: number;
  units: number; // Daire/Ofis sayısı
  parkingCapacity: number;

  // Tarihler
  startDate: Date;
  endDate?: Date;
  completionPercentage: number; // 0-100

  // Görseller
  coverImage: ProjectImage;
  gallery: ProjectImage[];

  // Özellikler
  architecturalFeatures: string[]; // ['modern', 'smart-home', 'earthquake-resistant']
  socialAreas: string[]; // ['pool', 'fitness', 'playground', 'garden', 'security']

  // Konum
  coordinates: Coordinates;

  // SEO
  canonicalUrl?: string;
  ogImage?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID
}

/**
 * Proje oluşturma için input tipi
 * id, createdAt, updatedAt otomatik oluşturulur
 */
export type ProjectCreateInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Proje güncelleme için input tipi
 * Tüm alanlar opsiyonel
 */
export type ProjectUpdateInput = Partial<Omit<Project, 'id' | 'createdAt'>>;

/**
 * Proje listesi için özet tip
 * Liste görünümlerinde kullanılır
 */
export interface ProjectSummary {
  id: string;
  slug: string;
  status: ProjectStatus;
  type: ProjectType;
  featured: boolean;
  published: boolean;
  coverImage: ProjectImage;
  completionPercentage: number;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
  // Aktif dile göre translation
  name: string;
  shortDescription: string;
  location: {
    city: string;
    district: string;
  };
}

/**
 * Proje filtreleme parametreleri
 */
export interface ProjectFilters {
  status?: ProjectStatus;
  type?: ProjectType;
  featured?: boolean;
  published?: boolean;
  city?: string;
  minCompletion?: number;
  maxCompletion?: number;
}

/**
 * Proje sıralama seçenekleri
 */
export type ProjectSortField = 'createdAt' | 'updatedAt' | 'startDate' | 'completionPercentage' | 'order';
export type SortDirection = 'asc' | 'desc';

export interface ProjectSort {
  field: ProjectSortField;
  direction: SortDirection;
}

/**
 * Sayfalama parametreleri
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Sayfalı proje listesi yanıtı
 */
export interface PaginatedProjects {
  projects: ProjectSummary[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
