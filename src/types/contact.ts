// ============================================
// Vav Yapı - Contact Form Types
// Firestore Collection: contactForms
// ============================================

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';
export type ContactSubject = 'general' | 'project' | 'quote' | 'complaint' | 'other';

/**
 * İletişim formu gönderimi
 * Firestore document yapısı
 */
export interface ContactForm {
  id: string;
  
  // Form verileri
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
  projectSlug?: string; // Eğer belirli bir proje hakkındaysa
  
  // KVKK onayı
  kvkkConsent: boolean;
  
  // Durum yönetimi
  status: ContactStatus;
  
  // Admin notları
  adminNotes?: string;
  repliedAt?: Date;
  repliedBy?: string; // User ID
  
  // Metadata
  locale: string; // Form gönderildiği dil
  ipAddress?: string;
  userAgent?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * İletişim formu oluşturma input
 * Public form submission
 */
export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
  projectSlug?: string;
  kvkkConsent: boolean;
  locale: string;
  recaptchaToken?: string;
}

/**
 * Admin tarafından güncelleme
 */
export interface ContactFormUpdate {
  status?: ContactStatus;
  adminNotes?: string;
  repliedAt?: Date;
  repliedBy?: string;
}

/**
 * İletişim formu listesi için özet
 */
export interface ContactFormSummary {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  status: ContactStatus;
  createdAt: Date;
  locale: string;
}

/**
 * İletişim formu filtreleri
 */
export interface ContactFormFilters {
  status?: ContactStatus;
  subject?: ContactSubject;
  startDate?: Date;
  endDate?: Date;
  search?: string; // name veya email'de arama
}

/**
 * Sayfalı iletişim formu listesi
 */
export interface PaginatedContactForms {
  forms: ContactFormSummary[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  // İstatistikler
  stats: {
    new: number;
    read: number;
    replied: number;
    archived: number;
  };
}

/**
 * Konu seçenekleri (UI için)
 */
export const CONTACT_SUBJECTS: Record<ContactSubject, { tr: string; en: string; de: string; fr: string }> = {
  general: {
    tr: 'Genel Bilgi',
    en: 'General Information',
    de: 'Allgemeine Informationen',
    fr: 'Informations Générales',
  },
  project: {
    tr: 'Proje Hakkında',
    en: 'About Project',
    de: 'Über das Projekt',
    fr: 'À Propos du Projet',
  },
  quote: {
    tr: 'Teklif Talebi',
    en: 'Quote Request',
    de: 'Angebotsanfrage',
    fr: 'Demande de Devis',
  },
  complaint: {
    tr: 'Şikayet',
    en: 'Complaint',
    de: 'Beschwerde',
    fr: 'Réclamation',
  },
  other: {
    tr: 'Diğer',
    en: 'Other',
    de: 'Sonstiges',
    fr: 'Autre',
  },
};

/**
 * Durum seçenekleri (UI için)
 */
export const CONTACT_STATUSES: Record<ContactStatus, { tr: string; en: string; de: string; fr: string; color: string }> = {
  new: {
    tr: 'Yeni',
    en: 'New',
    de: 'Neu',
    fr: 'Nouveau',
    color: 'blue',
  },
  read: {
    tr: 'Okundu',
    en: 'Read',
    de: 'Gelesen',
    fr: 'Lu',
    color: 'yellow',
  },
  replied: {
    tr: 'Cevaplanmış',
    en: 'Replied',
    de: 'Beantwortet',
    fr: 'Répondu',
    color: 'green',
  },
  archived: {
    tr: 'Arşiv',
    en: 'Archived',
    de: 'Archiviert',
    fr: 'Archivé',
    color: 'gray',
  },
};
