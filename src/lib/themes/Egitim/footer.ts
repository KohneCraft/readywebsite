// ============================================
// Eğitim Teması - Footer
// ============================================

export const egitimFooter = {
    logo: '/themes/education/logo.svg',
    logoText: 'Bilgi Akademi',
    description: 'Geleceğe hazırlık için kaliteli eğitim. 20 yılı aşkın tecrübe ile binlerce öğrenciye kariyer fırsatları sunuyoruz.',
    quickLinks: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/programs', label: 'Programlar' },
        { href: '/teachers', label: 'Eğitmenler' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/contact', label: 'İletişim' },
    ],
    programLinks: [
        { href: '/programs#language', label: 'Dil Eğitimi' },
        { href: '/programs#technology', label: 'Teknoloji' },
        { href: '/programs#business', label: 'İş Dünyası' },
        { href: '/programs#art', label: 'Sanat & Tasarım' },
    ],
    contactInfo: { address: 'Kadıköy, Bağdat Cad. No: 200\nİstanbul 34710', phone: '+90 212 567 8901', email: 'info@bilgiakademi.com' },
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/bilgiakademi', icon: 'Facebook' },
        { platform: 'instagram', url: 'https://instagram.com/bilgiakademi', icon: 'Instagram' },
        { platform: 'youtube', url: 'https://youtube.com/@bilgiakademi', icon: 'Youtube' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/bilgiakademi', icon: 'Linkedin' },
    ],
    newsletter: { enabled: true, title: 'Eğitim Bülteni', subtitle: 'Yeni programlardan haberdar olun', placeholder: 'E-posta', buttonText: 'Abone Ol' },
    copyright: '© 2026 Bilgi Akademi. Tüm hakları saklıdır.',
    legalLinks: [{ href: '/privacy', label: 'Gizlilik' }, { href: '/terms', label: 'Şartlar' }],
    backgroundColor: '#1e293b',
    textColor: '#e2e8f0',
    accentColor: '#f59e0b',
    animation: { enabled: true, type: 'fadeIn', staggerDelay: 100 },
    scrollToTop: { enabled: true, className: 'bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110' },
};

export const egitimFooterEN = {
    ...egitimFooter,
    logoText: 'Knowledge Academy',
    description: 'Quality education for the future. We offer career opportunities to thousands of students with over 20 years of experience.',
    quickLinks: [{ href: '/', label: 'Home' }, { href: '/programs', label: 'Programs' }, { href: '/teachers', label: 'Instructors' }, { href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }],
    programLinks: [{ href: '/programs#language', label: 'Language' }, { href: '/programs#technology', label: 'Technology' }, { href: '/programs#business', label: 'Business' }, { href: '/programs#art', label: 'Art & Design' }],
    newsletter: { ...egitimFooter.newsletter, title: 'Education Newsletter', subtitle: 'Stay updated with new programs', placeholder: 'Email', buttonText: 'Subscribe' },
    copyright: '© 2026 Knowledge Academy. All rights reserved.',
    legalLinks: [{ href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }],
};
