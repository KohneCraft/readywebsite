// ============================================
// Sağlık Teması - Footer Ayarları
// ============================================

export const saglikFooter = {
    // Logo ve açıklama
    logo: '/themes/saglik/logo.svg',
    logoText: 'Medikal Sağlık',
    description: 'Modern tıp anlayışı ile hizmetinizdeyiz. Uzman kadromuz ve son teknoloji cihazlarımızla sağlığınız için yanınızdayız.',

    // Hızlı linkler
    quickLinks: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/departments', label: 'Branşlarımız' },
        { href: '/appointment', label: 'Randevu Al' },
        { href: '/contact', label: 'İletişim' },
    ],

    // Branş linkleri
    serviceLinks: [
        { href: '/departments/cardiology', label: 'Kardiyoloji' },
        { href: '/departments/orthopedics', label: 'Ortopedi' },
        { href: '/departments/neurology', label: 'Nöroloji' },
        { href: '/departments/ophthalmology', label: 'Göz Hastalıkları' },
    ],

    // İletişim bilgileri
    contactInfo: {
        address: 'Beşiktaş, Barbaros Bulvarı No: 45\nİstanbul, Türkiye 34353',
        phone: '+90 444 0 123',
        email: 'info@medikalsaglik.com',
        workingHours: 'Pazartesi - Cumartesi: 08:00 - 20:00',
    },

    // Sosyal medya linkleri
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/medikalsaglik', icon: 'Facebook' },
        { platform: 'instagram', url: 'https://instagram.com/medikalsaglik', icon: 'Instagram' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/medikalsaglik', icon: 'Linkedin' },
        { platform: 'youtube', url: 'https://youtube.com/@medikalsaglik', icon: 'Youtube' },
    ],

    // Newsletter
    newsletter: {
        enabled: true,
        title: 'Sağlık Bültenimize Abone Olun',
        subtitle: 'Sağlık ipuçları ve haberlerimizden ilk siz haberdar olun.',
        placeholder: 'E-posta adresiniz',
        buttonText: 'Abone Ol',
    },

    // Alt kısım
    copyright: '© 2026 Medikal Sağlık. Tüm hakları saklıdır.',
    legalLinks: [
        { href: '/privacy', label: 'Gizlilik Politikası' },
        { href: '/terms', label: 'Kullanım Şartları' },
    ],

    // Stil
    backgroundColor: 'linear-gradient(180deg, #0c4a6e 0%, #075985 100%)',
    textColor: '#e0f2fe',
    accentColor: '#38bdf8',

    // Animasyonlar
    animation: {
        enabled: true,
        type: 'fadeIn',
        staggerDelay: 100,
    },

    // Scroll to top butonu
    scrollToTop: {
        enabled: true,
        className: 'bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
    },
};

// İngilizce footer
export const saglikFooterEN = {
    ...saglikFooter,
    logoText: 'Medical Health',
    description: 'At your service with modern medical approach. We are by your side for your health with our expert team and state-of-the-art equipment.',
    quickLinks: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/departments', label: 'Departments' },
        { href: '/appointment', label: 'Book Appointment' },
        { href: '/contact', label: 'Contact' },
    ],
    serviceLinks: [
        { href: '/departments/cardiology', label: 'Cardiology' },
        { href: '/departments/orthopedics', label: 'Orthopedics' },
        { href: '/departments/neurology', label: 'Neurology' },
        { href: '/departments/ophthalmology', label: 'Ophthalmology' },
    ],
    contactInfo: {
        ...saglikFooter.contactInfo,
        workingHours: 'Monday - Saturday: 08:00 - 20:00',
    },
    newsletter: {
        ...saglikFooter.newsletter,
        title: 'Subscribe to Our Health Newsletter',
        subtitle: 'Be the first to know about health tips and news.',
        placeholder: 'Your email address',
        buttonText: 'Subscribe',
    },
    copyright: '© 2026 Medical Health. All rights reserved.',
    legalLinks: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
    ],
};
