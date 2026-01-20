// ============================================
// Sağlık Teması - Kardiyoloji Bölümü
// ============================================

import type { ThemePageData } from '@/types/theme';

export const cardiologyPage: ThemePageData = {
    slug: 'departments/cardiology',
    title: 'Kardiyoloji',
    sections: [
        {
            name: 'Department Hero',
            settings: {
                backgroundColor: '#0891b2',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '❤️ Kardiyoloji Bölümü', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Kalp sağlığınız güvende', fontSize: '20px', color: '#cffafe' },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Department Content',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 60,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: 'Hizmetlerimiz', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#0e7490' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '• EKG ve Efor Testi\n• Ekokardiyografi\n• Holter Monitörizasyonu\n• Kalp Kateterizasyonu\n• Anjiografi ve Stent İşlemleri\n• Kalp Pili Takımı\n• Kardiyak Rehabilitasyon',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '2',
                            },
                        },
                        {
                            type: 'button',
                            props: { text: 'Randevu Al', href: '/appointment', backgroundColor: '#0891b2', textColor: '#ffffff' },
                        },
                    ],
                },
                {
                    width: 40,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80', alt: 'Kardiyoloji' },
                        },
                    ],
                },
            ],
        },
    ],
};
