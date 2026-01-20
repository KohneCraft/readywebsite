// ============================================
// Sade Tema - Footer
// Minimal footer tasarımı
// ============================================

export const sadeFooter = {
  logo: '/themes/minimal/logo.svg',
  logoText: 'Sade',
  description: 'Minimalist tasarım stüdyosu.',

  // Tek kolon - minimal
  quickLinks: [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/portfolio', label: 'Portfolyo' },
    { href: '/about', label: 'Hakkımda' },
    { href: '/contact', label: 'İletişim' },
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
  legalLinks: [
    { href: '/privacy', label: 'Gizlilik' },
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

export const sadeFooterEN = {
  ...sadeFooter,
  description: 'Minimalist design studio.',
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  copyright: '© 2026 Minimal. All rights reserved.',
  legalLinks: [
    { href: '/privacy', label: 'Privacy' },
  ],
};

// Geriye uyumluluk
export const footerConfig = sadeFooter;
