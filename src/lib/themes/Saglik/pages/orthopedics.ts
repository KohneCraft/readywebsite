// ============================================
// Sağlık Teması - Ortopedi Bölümü
// ============================================

import type { ThemePageData } from '@/types/theme';

export const orthopedicsPage: ThemePageData = {
    slug: 'departments/orthopedics',
    title: 'Ortopedi',
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
                            props: { content: '🦴 Ortopedi ve Travmatoloji', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Hareket özgürlüğünüz için', fontSize: '20px', color: '#cffafe' },
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
                            props: { content: 'Tedavi Alanlarımız', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#0e7490' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '• Diz ve Kalça Protezi\n• Omurga Cerrahisi\n• Artroskopik Cerrahi\n• Spor Yaralanmaları\n• Kırık ve Çıkık Tedavisi\n• El Cerrahisi\n• Fizik Tedavi ve Rehabilitasyon',
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
                            props: { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80', alt: 'Ortopedi' },
                        },
                    ],
                },
            ],
        },
    ],
};
