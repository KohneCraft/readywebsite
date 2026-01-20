// ============================================
// İnşaat Teması - Gelişmiş Footer
// Multi-column, newsletter, animasyonlu sosyal medya
// ============================================

export const insaatFooter = {
  // Logo ve açıklama
  logo: '/themes/construction/logo.svg',
  logoText: 'Vav İnşaat',
  description: 'Güvenilir, kaliteli ve modern inşaat çözümleri. 20 yılı aşkın tecrübemizle hayallerinizi gerçeğe dönüştürüyoruz.',

  // Hızlı linkler
  quickLinks: [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/services', label: 'Hizmetlerimiz' },
    { href: '/projects', label: 'Projelerimiz' },
    { href: '/contact', label: 'İletişim' },
  ],

  // Hizmet linkleri
  serviceLinks: [
    { href: '/services#residential', label: 'Konut İnşaatı' },
    { href: '/services#commercial', label: 'Ticari İnşaat' },
    { href: '/services#renovation', label: 'Renovasyon' },
    { href: '/services#industrial', label: 'Endüstriyel Yapılar' },
    { href: '/services#consulting', label: 'Proje Danışmanlığı' },
  ],

  // İletişim bilgileri
  contactInfo: {
    address: 'Levent, Büyükdere Cad. No: 123\nİstanbul, Türkiye 34394',
    phone: '+90 212 123 4567',
    fax: '+90 212 123 4568',
    email: 'info@vavinsaat.com',
    workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
  },

  // Sosyal medya linkleri (animasyonlu)
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/vavinsaat', icon: 'Facebook' },
    { platform: 'instagram', url: 'https://instagram.com/vavinsaat', icon: 'Instagram' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/vavinsaat', icon: 'Linkedin' },
    { platform: 'youtube', url: 'https://youtube.com/@vavinsaat', icon: 'Youtube' },
    { platform: 'twitter', url: 'https://twitter.com/vavinsaat', icon: 'Twitter' },
  ],

  // Newsletter
  newsletter: {
    enabled: true,
    title: 'Bültenimize Abone Olun',
    subtitle: 'Projelerimiz ve haberlerimizden ilk siz haberdar olun.',
    placeholder: 'E-posta adresiniz',
    buttonText: 'Abone Ol',
  },

  // Alt kısım
  copyright: '© 2026 Vav İnşaat. Tüm hakları saklıdır.',
  legalLinks: [
    { href: '/privacy', label: 'Gizlilik Politikası' },
    { href: '/terms', label: 'Kullanım Şartları' },
    { href: '/cookies', label: 'Çerez Politikası' },
  ],

  // Stil
  backgroundColor: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
  textColor: '#e2e8f0',
  accentColor: '#f97316',

  // Animasyonlar
  animation: {
    enabled: true,
    type: 'fadeIn',
    staggerDelay: 100,
  },

  // Scroll to top butonu
  scrollToTop: {
    enabled: true,
    className: 'bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
  },
};

// İngilizce footer
export const insaatFooterEN = {
  ...insaatFooter,
  description: 'Reliable, quality, and modern construction solutions. With over 20 years of experience, we turn your dreams into reality.',
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ],
  serviceLinks: [
    { href: '/services#residential', label: 'Residential Construction' },
    { href: '/services#commercial', label: 'Commercial Construction' },
    { href: '/services#renovation', label: 'Renovation' },
    { href: '/services#industrial', label: 'Industrial Buildings' },
    { href: '/services#consulting', label: 'Project Consulting' },
  ],
  contactInfo: {
    ...insaatFooter.contactInfo,
    workingHours: 'Monday - Saturday: 09:00 - 18:00',
  },
  newsletter: {
    ...insaatFooter.newsletter,
    title: 'Subscribe to Our Newsletter',
    subtitle: 'Be the first to know about our projects and news.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
  },
  copyright: '© 2026 Vav Construction. All rights reserved.',
  legalLinks: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
};

// Eski export (geriye uyumluluk)
export const constructionFooter = insaatFooter;
