// ============================================
// Page Builder - Media Types
// Medya yönetimi için tip tanımlamaları
// ============================================

/**
 * Medya türü
 */
export type MediaType = 'image' | 'video';

/**
 * Medya boyutları (sadece görsel için)
 */
export interface MediaDimensions {
  width: number;
  height: number;
}

/**
 * Medya metadata
 * Firestore: media/{mediaId}
 */
export interface Media {
  id: string;
  userId: string;
  type: MediaType;
  name: string;
  originalName: string;
  url: string;
  storagePath: string;
  size: number; // bytes
  dimensions: MediaDimensions | null;
  mimeType: string;
  uploadedAt: Date;
  tags?: string[];
  alt?: string;
  thumbnail?: string; // optional thumbnail URL
}

/**
 * Medya oluşturma input
 */
export interface MediaCreateInput {
  userId: string;
  type: MediaType;
  name: string;
  originalName: string;
  url: string;
  storagePath: string;
  size: number;
  dimensions?: MediaDimensions | null;
  mimeType: string;
  tags?: string[];
  alt?: string;
  thumbnail?: string;
}

/**
 * Medya güncelleme input
 */
export interface MediaUpdateInput {
  name?: string;
  alt?: string;
  tags?: string[];
}

/**
 * Sıralama seçenekleri
 */
export type MediaSortBy = 'uploadedAt' | 'size' | 'name';
export type MediaSortOrder = 'asc' | 'desc';

/**
 * Görünüm modu
 */
export type MediaViewMode = 'grid' | 'list';

