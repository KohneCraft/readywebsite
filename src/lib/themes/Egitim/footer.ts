// ============================================
// Eğitim Teması - Footer Ayarları
// ============================================

export const egitimFooter = {
    // Logo ve açıklama
    logo: '/themes/egitim/logo.svg',
    logoText: 'Bilgi Akademi',
    description: '2005\'ten beri kaliteli eğitim. Geleceğin liderlerini yetiştiriyoruz.',

    // Hızlı linkler
    quickLinks: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/programs', label: 'Programlar' },
        { href: '/enroll', label: 'Kayıt Ol' },
        { href: '/contact', label: 'İletişim' },
    ],

    // Program linkleri
    serviceLinks: [
        { href: '/programs/languages', label: 'Dil Eğitimleri' },
        { href: '/programs/technology', label: 'Teknoloji' },
        { href: '/programs/business', label: 'İşletme' },
        { href: '/programs/design', label: 'Tasarım' },
    ],

    // İletişim bilgileri
    contactInfo: {
        address: 'Kadıköy, Bağdat Caddesi No: 120\nİstanbul, Türkiye 34710',
        phone: '+90 212 567 8901',
        email: 'info@bilgiakademi.com',
        workingHours: 'Pazartesi - Cumartesi: 09:00 - 21:00',
    },

    // Sosyal medya linkleri
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/bilgiakademi', icon: 'Facebook' },
        { platform: 'instagram', url: 'https://instagram.com/bilgiakademi', icon: 'Instagram' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/bilgiakademi', icon: 'Linkedin' },
        { platform: 'youtube', url: 'https://youtube.com/@bilgiakademi', icon: 'Youtube' },
    ],

    // Newsletter
    newsletter: {
        enabled: true,
        title: 'Eğitim Bültenimize Abone Olun',
        subtitle: 'Yeni programlar ve kampanyalardan haberdar olun.',
        placeholder: 'E-posta adresiniz',
        buttonText: 'Abone Ol',
    },

    // Alt kısım
    copyright: '© 2026 Bilgi Akademi. Tüm hakları saklıdır.',
    legalLinks: [
        { href: '/privacy', label: 'Gizlilik Politikası' },
        { href: '/terms', label: 'Kullanım Şartları' },
    ],

    // Stil
    backgroundColor: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
    textColor: '#e2e8f0',
    accentColor: '#60a5fa',

    // Animasyonlar
    animation: {
        enabled: true,
        type: 'fadeIn',
        staggerDelay: 100,
    },

    // Scroll to top butonu
    scrollToTop: {
        enabled: true,
        className: 'bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
    },
};

// İngilizce footer
export const egitimFooterEN = {
    ...egitimFooter,
    logoText: 'Knowledge Academy',
    description: 'Quality education since 2005. We raise the leaders of the future.',
    quickLinks: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/programs', label: 'Programs' },
        { href: '/enroll', label: 'Enroll Now' },
        { href: '/contact', label: 'Contact' },
    ],
    serviceLinks: [
        { href: '/programs/languages', label: 'Language Courses' },
        { href: '/programs/technology', label: 'Technology' },
        { href: '/programs/business', label: 'Business' },
        { href: '/programs/design', label: 'Design' },
    ],
    contactInfo: {
        ...egitimFooter.contactInfo,
        workingHours: 'Monday - Saturday: 09:00 - 21:00',
    },
    newsletter: {
        ...egitimFooter.newsletter,
        title: 'Subscribe to Our Newsletter',
        subtitle: 'Stay updated with new programs and campaigns.',
        placeholder: 'Your email address',
        buttonText: 'Subscribe',
    },
    copyright: '© 2026 Knowledge Academy. All rights reserved.',
    legalLinks: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
    ],
};
