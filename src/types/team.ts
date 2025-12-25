// ============================================
// Vav Yapı - Team Member Types
// ============================================

export interface TeamMember {
  id: string;
  name: string;
  position: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  bio?: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  image: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  category: 'supplier' | 'partner' | 'client';
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
