// ============================================
// Sade Tema - Footer
// Minimal footer tasarımı - Çoklu dil desteği
// ============================================

export const sadeFooter = {
  logo: '/themes/minimal/logo.svg',
  logoText: 'Sade',
  logoTexts: {
    tr: 'Sade',
    en: 'Minimal',
    de: 'Minimal',
    fr: 'Minimal'
  },
  description: 'Minimalist tasarım stüdyosu.',
  descriptions: {
    tr: 'Minimalist tasarım stüdyosu.',
    en: 'Minimalist design studio.',
    de: 'Minimalistisches Designstudio.',
    fr: 'Studio de design minimaliste.'
  },

  // Tek kolon - minimal - çoklu dil desteği
  quickLinks: [
    { href: '/', label: 'Ana Sayfa', labels: { tr: 'Ana Sayfa', en: 'Home', de: 'Startseite', fr: 'Accueil' } },
    { href: '/portfolio', label: 'Portfolyo', labels: { tr: 'Portfolyo', en: 'Portfolio', de: 'Portfolio', fr: 'Portfolio' } },
    { href: '/about', label: 'Hakkımda', labels: { tr: 'Hakkımda', en: 'About', de: 'Über mich', fr: 'À propos' } },
    { href: '/contact', label: 'İletişim', labels: { tr: 'İletişim', en: 'Contact', de: 'Kontakt', fr: 'Contact' } },
  ],

  // İletişim
  contactInfo: {
    email: 'merhaba@sade.design',
    phone: '+90 212 123 4567',
    address: 'Beyoğlu, İstanbul',
  },

  // Minimal sosyal medya
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/sade.design', icon: 'Instagram' },
    { platform: 'dribbble', url: 'https://dribbble.com/sade', icon: 'Dribbble' },
    { platform: 'behance', url: 'https://behance.net/sade', icon: 'Behance' },
  ],

  // Newsletter kapalı - minimal tutuyoruz
  newsletter: {
    enabled: false,
  },

  copyright: '© 2026 Sade. Tüm hakları saklıdır.',
  copyrights: {
    tr: '© 2026 Sade. Tüm hakları saklıdır.',
    en: '© 2026 Minimal. All rights reserved.',
    de: '© 2026 Minimal. Alle Rechte vorbehalten.',
    fr: '© 2026 Minimal. Tous droits réservés.'
  },
  legalLinks: [
    { href: '/privacy', label: 'Gizlilik', labels: { tr: 'Gizlilik', en: 'Privacy', de: 'Datenschutz', fr: 'Confidentialité' } },
  ],

  // Minimal siyah-beyaz
  backgroundColor: '#0a0a0a',
  textColor: '#fafafa',
  accentColor: '#a1a1aa',

  animation: {
    enabled: true,
    type: 'fadeIn',
    staggerDelay: 150,
  },

  scrollToTop: {
    enabled: true,
    className: 'bg-white text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
  },

  // Minimal stil
  style: {
    paddingY: 60,
    borderTop: '1px solid #262626',
  },
};

// Geriye uyumluluk
export const footerConfig = sadeFooter;
