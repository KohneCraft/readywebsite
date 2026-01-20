// ============================================
// Kurumsal Tema - Gelişmiş Footer
// Multi-column, newsletter, stats
// ============================================

export const kurumsalFooter = {
  logo: '/themes/corporate/logo.svg',
  logoText: 'Kurumsal',
  description: 'İşletmenizi bir adım öteye taşıyacak profesyonel çözümler. Stratejik danışmanlık ve teknoloji hizmetleri.',

  quickLinks: [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/services', label: 'Hizmetler' },
    { href: '/portfolio', label: 'Referanslar' },
    { href: '/contact', label: 'İletişim' },
  ],

  serviceLinks: [
    { href: '/services#consulting', label: 'İş Danışmanlığı' },
    { href: '/services#strategy', label: 'Strateji Planlama' },
    { href: '/services#technology', label: 'Dijital Dönüşüm' },
    { href: '/services#training', label: 'Kurumsal Eğitim' },
  ],

  contactInfo: {
    address: 'Çankaya, Kızılay Cad. No: 45\nAnkara, Türkiye 06100',
    phone: '+90 312 456 7890',
    email: 'info@kurumsal.com',
    workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
  },

  socialLinks: [
    { platform: 'linkedin', url: 'https://linkedin.com/company/kurumsal', icon: 'Linkedin' },
    { platform: 'twitter', url: 'https://twitter.com/kurumsal', icon: 'Twitter' },
    { platform: 'facebook', url: 'https://facebook.com/kurumsal', icon: 'Facebook' },
  ],

  newsletter: {
    enabled: true,
    title: 'Sektör Haberleri',
    subtitle: 'Güncel iş dünyası ve strateji içeriklerinden haberdar olun.',
    placeholder: 'E-posta adresiniz',
    buttonText: 'Kayıt Ol',
  },

  stats: {
    enabled: true,
    items: [
      { value: '500+', label: 'Proje' },
      { value: '15+', label: 'Yıl' },
      { value: '200+', label: 'Müşteri' },
    ],
  },

  copyright: '© 2026 Kurumsal. Tüm hakları saklıdır.',
  legalLinks: [
    { href: '/privacy', label: 'Gizlilik Politikası' },
    { href: '/terms', label: 'Kullanım Şartları' },
  ],

  backgroundColor: '#0f172a',
  textColor: '#e2e8f0',
  accentColor: '#3b82f6',

  animation: {
    enabled: true,
    type: 'fadeIn',
    staggerDelay: 100,
  },

  scrollToTop: {
    enabled: true,
    className: 'bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
  },
};

// English footer
export const kurumsalFooterEN = {
  ...kurumsalFooter,
  logoText: 'Corporate',
  description: 'Professional solutions to take your business to the next level. Strategic consulting and technology services.',
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ],
  serviceLinks: [
    { href: '/services#consulting', label: 'Business Consulting' },
    { href: '/services#strategy', label: 'Strategy Planning' },
    { href: '/services#technology', label: 'Digital Transformation' },
    { href: '/services#training', label: 'Corporate Training' },
  ],
  contactInfo: {
    ...kurumsalFooter.contactInfo,
    workingHours: 'Monday - Friday: 09:00 - 18:00',
  },
  newsletter: {
    ...kurumsalFooter.newsletter,
    title: 'Industry News',
    subtitle: 'Stay updated with the latest business and strategy insights.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
  },
  stats: {
    enabled: true,
    items: [
      { value: '500+', label: 'Projects' },
      { value: '15+', label: 'Years' },
      { value: '200+', label: 'Clients' },
    ],
  },
  copyright: '© 2026 Corporate. All rights reserved.',
  legalLinks: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ],
};

// Geriye uyumluluk
export const footerConfig = kurumsalFooter;
