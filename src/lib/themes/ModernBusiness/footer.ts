// ============================================
// Modern İş Teması - Footer
// Gradient ve modern tasarım
// ============================================

export const modernIsFooter = {
  logo: '/themes/modern-business/logo.svg',
  logoText: 'Modern İş',
  description: 'Dijital dönüşümün öncüsü. Yenilikçi çözümlerle işinizi geleceğe taşıyoruz.',

  // Ürün linkleri
  productLinks: [
    { href: '/services#saas', label: 'SaaS Platform' },
    { href: '/services#cloud', label: 'Bulut Hizmetleri' },
    { href: '/services#automation', label: 'Otomasyon' },
    { href: '/services#analytics', label: 'Analitik' },
  ],

  // Şirket linkleri
  companyLinks: [
    { href: '/about', label: 'Hakkımızda' },
    { href: '/careers', label: 'Kariyer' },
    { href: '/blog', label: 'Blog' },
    { href: '/press', label: 'Basın' },
  ],

  // Destek linkleri
  supportLinks: [
    { href: '/help', label: 'Yardım Merkezi' },
    { href: '/docs', label: 'Dokümantasyon' },
    { href: '/api', label: 'API Referans' },
    { href: '/status', label: 'Sistem Durumu' },
  ],

  // İletişim
  contactInfo: {
    email: 'destek@modernis.com',
    phone: '+90 216 789 0123',
    address: 'Maslak, Sarıyer\nİstanbul 34398',
  },

  // Sosyal medya
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/modernis', icon: 'Twitter' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/modernis', icon: 'Linkedin' },
    { platform: 'github', url: 'https://github.com/modernis', icon: 'Github' },
    { platform: 'youtube', url: 'https://youtube.com/@modernis', icon: 'Youtube' },
  ],

  // Newsletter
  newsletter: {
    enabled: true,
    title: 'Güncellemelerden Haberdar Olun',
    subtitle: 'Yeni özellikler ve ipuçları için kayıt olun.',
    placeholder: 'E-posta adresiniz',
    buttonText: 'Abone Ol',
    buttonClassName: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700',
  },

  // App store badge'leri
  appBadges: {
    enabled: true,
    appStore: '/images/app-store-badge.png',
    playStore: '/images/google-play-badge.png',
  },

  copyright: '© 2026 Modern İş. Tüm hakları saklıdır.',
  legalLinks: [
    { href: '/privacy', label: 'Gizlilik Politikası' },
    { href: '/terms', label: 'Kullanım Şartları' },
    { href: '/cookies', label: 'Çerez Politikası' },
    { href: '/gdpr', label: 'KVKK' },
  ],

  // Gradient arka plan
  backgroundColor: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
  textColor: '#e0e7ff',
  accentColor: '#a5b4fc',

  animation: {
    enabled: true,
    type: 'slideUp',
    staggerDelay: 80,
  },

  scrollToTop: {
    enabled: true,
    className: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110',
  },
};

export const modernIsFooterEN = {
  ...modernIsFooter,
  logoText: 'Modern Business',
  description: 'The pioneer of digital transformation. We bring your business to the future with innovative solutions.',
  productLinks: [
    { href: '/services#saas', label: 'SaaS Platform' },
    { href: '/services#cloud', label: 'Cloud Services' },
    { href: '/services#automation', label: 'Automation' },
    { href: '/services#analytics', label: 'Analytics' },
  ],
  companyLinks: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
    { href: '/press', label: 'Press' },
  ],
  supportLinks: [
    { href: '/help', label: 'Help Center' },
    { href: '/docs', label: 'Documentation' },
    { href: '/api', label: 'API Reference' },
    { href: '/status', label: 'System Status' },
  ],
  newsletter: {
    ...modernIsFooter.newsletter,
    title: 'Stay Updated',
    subtitle: 'Sign up for new features and tips.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
  },
  copyright: '© 2026 Modern Business. All rights reserved.',
  legalLinks: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/gdpr', label: 'GDPR' },
  ],
};

// Geriye uyumluluk
export const footerConfig = modernIsFooter;
