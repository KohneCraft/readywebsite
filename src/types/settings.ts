// ============================================
// Vav Yapı - Site Settings Types
// Firestore Collection: settings (single document: 'site')
// ============================================

import type { Locale } from './project';

/**
 * Logo yapılandırması
 */
export interface Logo {
  light: {
    url: string;
    path: string; // Storage path
    width: number;
    height: number;
  };
  dark: {
    url: string;
    path: string;
    width: number;
    height: number;
  };
  favicon: {
    url: string;
    path: string;
  };
  mobile?: {
    url: string;
    path: string;
  };
}

/**
 * Sosyal medya linkleri
 */
export interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}

/**
 * İletişim bilgileri
 */
export interface ContactInfo {
  address: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  phones: string[]; // Birden fazla telefon
  email: string;
  workingHours: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

/**
 * SEO ayarları
 */
export interface SEOSettings {
  // Meta tag şablonları
  titleTemplate: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  defaultDescription: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  keywords: {
    tr: string[];
    en: string[];
    de: string[];
    fr: string[];
  };
  
  // Analytics & Tracking
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleSearchConsoleVerification?: string;
  facebookPixelId?: string;
  
  // Robots & Sitemap
  robotsTxt: string;
  sitemapEnabled: boolean;
  sitemapChangeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  sitemapPriority: number; // 0.0 - 1.0
}

/**
 * Bakım modu ayarları
 */
export interface MaintenanceMode {
  enabled: boolean;
  message: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  allowedIPs: string[];
  scheduledStart?: Date;
  scheduledEnd?: Date;
}

/**
 * Anasayfa ayarları
 */
export interface HomepageSettings {
  heroSlider: {
    autoplaySpeed: number; // ms, 3000-10000
    showDots: boolean;
    showArrows: boolean;
    kenBurnsEffect: boolean;
  };
  projectsSection: {
    enabled: boolean;
    count: number; // 3-12
    sortBy: 'newest' | 'alphabetical' | 'manual';
    showOnlyFeatured: boolean;
  };
  aboutSection: {
    enabled: boolean;
  };
  partnersSection: {
    enabled: boolean;
  };
  contactCTA: {
    enabled: boolean;
  };
}

/**
 * Form ayarları
 */
export interface FormSettings {
  // Otomatik yanıt e-postası
  autoReply: {
    enabled: boolean;
    template: {
      tr: string;
      en: string;
      de: string;
      fr: string;
    };
  };
  // Admin bildirim e-postaları
  notifications: {
    enabled: boolean;
    recipients: string[]; // E-posta adresleri
  };
  // reCAPTCHA
  recaptcha: {
    enabled: boolean;
    siteKey: string;
    secretKey: string;
    threshold: number; // 0.0 - 1.0
  };
}

/**
 * 301 Yönlendirmeler
 */
export interface Redirect {
  id: string;
  source: string; // /eski-url
  destination: string; // /yeni-url
  permanent: boolean;
  createdAt: Date;
}

/**
 * Ana Site Ayarları interface
 * Firestore: settings/site
 */
export interface SiteSettings {
  // Genel
  siteName: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  siteSlogan: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  footerText: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  defaultLocale: Locale;
  
  // Görsel
  logo: Logo;
  
  // İletişim
  contact: ContactInfo;
  socialLinks: SocialLinks;
  
  // SEO
  seo: SEOSettings;
  
  // Bakım modu
  maintenance: MaintenanceMode;
  
  // Sayfa ayarları
  homepage: HomepageSettings;
  
  // Form ayarları
  forms: FormSettings;
  
  // Yönlendirmeler
  redirects: Redirect[];
  
  // Metadata
  updatedAt: Date;
  updatedBy: string;
}

/**
 * Ayarlar güncelleme input tipi
 */
export type SiteSettingsUpdate = Partial<Omit<SiteSettings, 'updatedAt'>>;

/**
 * Varsayılan site ayarları
 */
export const DEFAULT_SITE_SETTINGS: Omit<SiteSettings, 'updatedAt' | 'updatedBy'> = {
  siteName: {
    tr: 'Vav Yapı',
    en: 'Vav Construction',
    de: 'Vav Bau',
    fr: 'Vav Construction',
  },
  siteSlogan: {
    tr: 'Güvenilir İnşaat Çözümleri',
    en: 'Reliable Construction Solutions',
    de: 'Zuverlässige Baulösungen',
    fr: 'Solutions de Construction Fiables',
  },
  footerText: {
    tr: '© 2025 Vav Yapı. Tüm hakları saklıdır.',
    en: '© 2025 Vav Construction. All rights reserved.',
    de: '© 2025 Vav Bau. Alle Rechte vorbehalten.',
    fr: '© 2025 Vav Construction. Tous droits réservés.',
  },
  defaultLocale: 'tr',
  logo: {
    light: { url: '', path: '', width: 200, height: 60 },
    dark: { url: '', path: '', width: 200, height: 60 },
    favicon: { url: '', path: '' },
  },
  contact: {
    address: {
      tr: '',
      en: '',
      de: '',
      fr: '',
    },
    phones: [],
    email: '',
    workingHours: {
      tr: 'Pazartesi - Cuma: 09:00 - 18:00',
      en: 'Monday - Friday: 09:00 - 18:00',
      de: 'Montag - Freitag: 09:00 - 18:00',
      fr: 'Lundi - Vendredi: 09:00 - 18:00',
    },
    coordinates: { lat: 0, lng: 0 },
  },
  socialLinks: {},
  seo: {
    titleTemplate: {
      tr: '%s | Vav Yapı',
      en: '%s | Vav Construction',
      de: '%s | Vav Bau',
      fr: '%s | Vav Construction',
    },
    defaultDescription: {
      tr: 'Vav Yapı - Güvenilir inşaat ve müteahhitlik hizmetleri.',
      en: 'Vav Construction - Reliable construction and contracting services.',
      de: 'Vav Bau - Zuverlässige Bau- und Vertragsdienstleistungen.',
      fr: 'Vav Construction - Services de construction et de sous-traitance fiables.',
    },
    keywords: {
      tr: ['inşaat', 'müteahhit', 'yapı', 'konut', 'ticari'],
      en: ['construction', 'contractor', 'building', 'residential', 'commercial'],
      de: ['bau', 'auftragnehmer', 'gebäude', 'wohnen', 'gewerbe'],
      fr: ['construction', 'entrepreneur', 'bâtiment', 'résidentiel', 'commercial'],
    },
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: /sitemap.xml',
    sitemapEnabled: true,
    sitemapChangeFrequency: 'weekly',
    sitemapPriority: 0.8,
  },
  maintenance: {
    enabled: false,
    message: {
      tr: 'Sitemiz bakım modundadır. Lütfen daha sonra tekrar deneyin.',
      en: 'Our site is under maintenance. Please try again later.',
      de: 'Unsere Website befindet sich im Wartungsmodus. Bitte versuchen Sie es später erneut.',
      fr: 'Notre site est en maintenance. Veuillez réessayer plus tard.',
    },
    allowedIPs: [],
  },
  homepage: {
    heroSlider: {
      autoplaySpeed: 5000,
      showDots: true,
      showArrows: true,
      kenBurnsEffect: true,
    },
    projectsSection: {
      enabled: true,
      count: 6,
      sortBy: 'newest',
      showOnlyFeatured: false,
    },
    aboutSection: { enabled: true },
    partnersSection: { enabled: false },
    contactCTA: { enabled: true },
  },
  forms: {
    autoReply: {
      enabled: false,
      template: {
        tr: 'Mesajınız alınmıştır. En kısa sürede size dönüş yapacağız.',
        en: 'Your message has been received. We will get back to you soon.',
        de: 'Ihre Nachricht wurde empfangen. Wir werden uns bald bei Ihnen melden.',
        fr: 'Votre message a été reçu. Nous vous répondrons bientôt.',
      },
    },
    notifications: {
      enabled: true,
      recipients: [],
    },
    recaptcha: {
      enabled: false,
      siteKey: '',
      secretKey: '',
      threshold: 0.5,
    },
  },
  redirects: [],
};
