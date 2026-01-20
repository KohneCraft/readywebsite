// ============================================
// Restoran Teması - İletişim Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const contactPage: ThemePageData = {
    slug: 'contact',
    title: 'İletişim',
    sections: [
        // Hero
        {
            name: 'Page Hero',
            settings: {
                backgroundColor: '#1a1a1a',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Bize Ulaşın', fontSize: 48, color: '#ffffff', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Rezervasyon ve sorularınız için iletişime geçin', fontSize: 20, color: '#e0e0e0' } },
                    ],
                },
            ],
        },
        // Contact Info & Form
        {
            name: 'Contact Section',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 40, bottom: 20, left: 20 } },
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'İletişim Bilgileri', fontSize: 32, color: '#1a1a1a', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '📍 Adres', fontSize: 14, color: '#d97706', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Beyoğlu, İstiklal Cad. No: 123\nİstanbul, Türkiye 34430', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                        { type: 'text', props: { content: '📞 Telefon', fontSize: 14, color: '#d97706', fontWeight: 'bold' } },
                        { type: 'text', props: { content: '+90 212 345 6789', fontSize: 16, color: '#666666' } },
                        { type: 'text', props: { content: '✉️ E-posta', fontSize: 14, color: '#d97706', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'info@lezzetmutfagi.com', fontSize: 16, color: '#666666' } },
                        { type: 'text', props: { content: '⏰ Çalışma Saatleri', fontSize: 14, color: '#d97706', fontWeight: 'bold' } },
                        { type: 'text', props: { content: 'Pazartesi - Perşembe: 11:00 - 22:00\nCuma - Cumartesi: 11:00 - 23:00\nPazar: 12:00 - 22:00', fontSize: 16, color: '#666666', lineHeight: 1.6 } },
                    ],
                },
                {
                    width: 50,
                    settings: { padding: { top: 20, right: 20, bottom: 20, left: 40 }, backgroundColor: '#f8f8f8', borderRadius: '12px' },
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Rezervasyon Formu', fontSize: 24, color: '#1a1a1a', fontWeight: 'bold' } },
                        {
                            type: 'form', props: {
                                fields: [
                                    { name: 'name', label: 'Adınız Soyadınız', type: 'text', required: true },
                                    { name: 'phone', label: 'Telefon', type: 'tel', required: true },
                                    { name: 'date', label: 'Tarih', type: 'date', required: true },
                                    { name: 'guests', label: 'Kişi Sayısı', type: 'number', required: true },
                                    { name: 'message', label: 'Notunuz', type: 'textarea' },
                                ],
                                submitText: 'Rezervasyon Yap',
                                buttonColor: '#d97706',
                            }
                        },
                    ],
                },
            ],
        },
        // Map
        {
            name: 'Map Section',
            settings: {
                backgroundColor: '#1a1a1a',
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
            },
            columns: [
                {
                    width: 100,
                    settings: {},
                    blocks: [
                        { type: 'map', props: { address: 'Beyoğlu, İstiklal Cad. No: 123, İstanbul', height: 400 } },
                    ],
                },
            ],
        },
    ],
};
