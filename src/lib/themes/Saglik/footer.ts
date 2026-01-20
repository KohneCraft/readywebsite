// ============================================
// Sağlık Teması - Footer
// ============================================

export const saglikFooter = {
    logo: '/themes/healthcare/logo.svg',
    logoText: 'Medikal Sağlık',
    description: 'Modern tıp anlayışı ile sağlığınız güvende. Uzman kadromuz ve son teknoloji altyapımız ile hizmetinizdeyiz.',
    quickLinks: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/departments', label: 'Branşlar' },
        { href: '/doctors', label: 'Doktorlarımız' },
        { href: '/appointment', label: 'Randevu' },
        { href: '/contact', label: 'İletişim' },
    ],
    departmentLinks: [
        { href: '/departments#cardiology', label: 'Kardiyoloji' },
        { href: '/departments#orthopedics', label: 'Ortopedi' },
        { href: '/departments#neurology', label: 'Nöroloji' },
        { href: '/departments#pediatrics', label: 'Çocuk Sağlığı' },
    ],
    contactInfo: {
        address: 'Şişli, Büyükdere Cad. No: 100\nİstanbul 34394',
        phone: '444 0 123',
        emergency: '444 0 911',
        email: 'info@medikalsaglik.com',
        workingHours: 'Poliklinik: 08:00 - 20:00',
    },
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/medikalsaglik', icon: 'Facebook' },
        { platform: 'instagram', url: 'https://instagram.com/medikalsaglik', icon: 'Instagram' },
        { platform: 'youtube', url: 'https://youtube.com/@medikalsaglik', icon: 'Youtube' },
    ],
    insurancePartners: {
        enabled: true,
        title: 'Anlaşmalı Kurumlar',
        logos: ['/themes/healthcare/insurance1.png', '/themes/healthcare/insurance2.png'],
    },
    newsletter: { enabled: false },
    copyright: '© 2026 Medikal Sağlık. Tüm hakları saklıdır.',
    legalLinks: [
        { href: '/privacy', label: 'Gizlilik' },
        { href: '/terms', label: 'KVKK' },
    ],
    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
    accentColor: '#0ea5e9',
    animation: { enabled: true, type: 'fadeIn', staggerDelay: 100 },
    scrollToTop: { enabled: true, className: 'bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110' },
};

export const saglikFooterEN = {
    ...saglikFooter,
    logoText: 'Medical Health',
    description: 'Your health is safe with modern medical approach. We serve you with our expert staff and state-of-the-art infrastructure.',
    quickLinks: [
        { href: '/', label: 'Home' },
        { href: '/departments', label: 'Departments' },
        { href: '/doctors', label: 'Our Doctors' },
        { href: '/appointment', label: 'Appointment' },
        { href: '/contact', label: 'Contact' },
    ],
    departmentLinks: [
        { href: '/departments#cardiology', label: 'Cardiology' },
        { href: '/departments#orthopedics', label: 'Orthopedics' },
        { href: '/departments#neurology', label: 'Neurology' },
        { href: '/departments#pediatrics', label: 'Pediatrics' },
    ],
    contactInfo: { ...saglikFooter.contactInfo, workingHours: 'Outpatient: 08:00 - 20:00' },
    insurancePartners: { ...saglikFooter.insurancePartners, title: 'Insurance Partners' },
    copyright: '© 2026 Medical Health. All rights reserved.',
    legalLinks: [
        { href: '/privacy', label: 'Privacy' },
        { href: '/terms', label: 'GDPR' },
    ],
};
