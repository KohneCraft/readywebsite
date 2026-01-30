// ============================================
// İnşaat Teması - Gelişmiş Footer
// Multi-column, newsletter, animasyonlu sosyal medya
// Çoklu dil desteği ile
// ============================================

export const insaatFooter = {
  // Logo ve açıklama - çoklu dil desteği
  logo: '/themes/construction/logo.svg',
  logoText: 'Vav İnşaat',
  logoTexts: {
    tr: 'Vav İnşaat',
    en: 'Vav Construction',
    de: 'Vav Bau',
    fr: 'Vav Construction'
  },
  description: 'Güvenilir, kaliteli ve modern inşaat çözümleri. 20 yılı aşkın tecrübemizle hayallerinizi gerçeğe dönüştürüyoruz.',
  descriptions: {
    tr: 'Güvenilir, kaliteli ve modern inşaat çözümleri. 20 yılı aşkın tecrübemizle hayallerinizi gerçeğe dönüştürüyoruz.',
    en: 'Reliable, quality, and modern construction solutions. With over 20 years of experience, we turn your dreams into reality.',
    de: 'Zuverlässige, qualitativ hochwertige und moderne Baulösungen. Mit über 20 Jahren Erfahrung verwandeln wir Ihre Träume in Realität.',
    fr: 'Solutions de construction fiables, de qualité et modernes. Avec plus de 20 ans d\'expérience, nous transformons vos rêves en réalité.'
  },

  // Hızlı linkler - çoklu dil desteği
  quickLinks: [
    { href: '/', label: 'Ana Sayfa', labels: { tr: 'Ana Sayfa', en: 'Home', de: 'Startseite', fr: 'Accueil' } },
    { href: '/about', label: 'Hakkımızda', labels: { tr: 'Hakkımızda', en: 'About Us', de: 'Über uns', fr: 'À propos' } },
    { href: '/services', label: 'Hizmetlerimiz', labels: { tr: 'Hizmetlerimiz', en: 'Services', de: 'Dienstleistungen', fr: 'Services' } },
    { href: '/projects', label: 'Projelerimiz', labels: { tr: 'Projelerimiz', en: 'Projects', de: 'Projekte', fr: 'Projets' } },
    { href: '/contact', label: 'İletişim', labels: { tr: 'İletişim', en: 'Contact', de: 'Kontakt', fr: 'Contact' } },
  ],

  // Hizmet linkleri - çoklu dil desteği
  serviceLinks: [
    { href: '/services#residential', label: 'Konut İnşaatı', labels: { tr: 'Konut İnşaatı', en: 'Residential Construction', de: 'Wohnungsbau', fr: 'Construction résidentielle' } },
    { href: '/services#commercial', label: 'Ticari İnşaat', labels: { tr: 'Ticari İnşaat', en: 'Commercial Construction', de: 'Gewerbebau', fr: 'Construction commerciale' } },
    { href: '/services#renovation', label: 'Renovasyon', labels: { tr: 'Renovasyon', en: 'Renovation', de: 'Renovierung', fr: 'Rénovation' } },
    { href: '/services#industrial', label: 'Endüstriyel Yapılar', labels: { tr: 'Endüstriyel Yapılar', en: 'Industrial Buildings', de: 'Industriebauten', fr: 'Bâtiments industriels' } },
    { href: '/services#consulting', label: 'Proje Danışmanlığı', labels: { tr: 'Proje Danışmanlığı', en: 'Project Consulting', de: 'Projektberatung', fr: 'Conseil en projet' } },
  ],

  // İletişim bilgileri
  contactInfo: {
    address: 'Levent, Büyükdere Cad. No: 123\nİstanbul, Türkiye 34394',
    phone: '+90 212 123 4567',
    fax: '+90 212 123 4568',
    email: 'info@vavinsaat.com',
    workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
    workingHoursText: {
      tr: 'Pazartesi - Cumartesi: 09:00 - 18:00',
      en: 'Monday - Saturday: 09:00 - 18:00',
      de: 'Montag - Samstag: 09:00 - 18:00',
      fr: 'Lundi - Samedi: 09:00 - 18:00'
    }
  },

  // Sosyal medya linkleri (animasyonlu)
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/vavinsaat', icon: 'Facebook' },
    { platform: 'instagram', url: 'https://instagram.com/vavinsaat', icon: 'Instagram' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/vavinsaat', icon: 'Linkedin' },
    { platform: 'youtube', url: 'https://youtube.com/@vavinsaat', icon: 'Youtube' },
    { platform: 'twitter', url: 'https://twitter.com/vavinsaat', icon: 'Twitter' },
  ],

  // Newsletter - çoklu dil desteği
  newsletter: {
    enabled: true,
    title: 'Bültenimize Abone Olun',
    titles: {
      tr: 'Bültenimize Abone Olun',
      en: 'Subscribe to Our Newsletter',
      de: 'Abonnieren Sie unseren Newsletter',
      fr: 'Abonnez-vous à notre newsletter'
    },
    subtitle: 'Projelerimiz ve haberlerimizden ilk siz haberdar olun.',
    subtitles: {
      tr: 'Projelerimiz ve haberlerimizden ilk siz haberdar olun.',
      en: 'Be the first to know about our projects and news.',
      de: 'Seien Sie der Erste, der über unsere Projekte und Neuigkeiten erfährt.',
      fr: 'Soyez le premier à connaître nos projets et nos actualités.'
    },
    placeholder: 'E-posta adresiniz',
    placeholders: {
      tr: 'E-posta adresiniz',
      en: 'Your email address',
      de: 'Ihre E-Mail-Adresse',
      fr: 'Votre adresse e-mail'
    },
    buttonText: 'Abone Ol',
    buttonTexts: {
      tr: 'Abone Ol',
      en: 'Subscribe',
      de: 'Abonnieren',
      fr: 'S\'abonner'
    },
  },

  // Alt kısım - çoklu dil desteği
  copyright: '© 2026 Vav İnşaat. Tüm hakları saklıdır.',
  copyrights: {
    tr: '© 2026 Vav İnşaat. Tüm hakları saklıdır.',
    en: '© 2026 Vav Construction. All rights reserved.',
    de: '© 2026 Vav Bau. Alle Rechte vorbehalten.',
    fr: '© 2026 Vav Construction. Tous droits réservés.'
  },
  legalLinks: [
    { href: '/privacy', label: 'Gizlilik Politikası', labels: { tr: 'Gizlilik Politikası', en: 'Privacy Policy', de: 'Datenschutzrichtlinie', fr: 'Politique de confidentialité' } },
    { href: '/terms', label: 'Kullanım Şartları', labels: { tr: 'Kullanım Şartları', en: 'Terms of Use', de: 'Nutzungsbedingungen', fr: 'Conditions d\'utilisation' } },
    { href: '/cookies', label: 'Çerez Politikası', labels: { tr: 'Çerez Politikası', en: 'Cookie Policy', de: 'Cookie-Richtlinie', fr: 'Politique de cookies' } },
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

// Eski export (geriye uyumluluk)
export const constructionFooter = insaatFooter;
