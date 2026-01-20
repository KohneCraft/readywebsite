// ============================================
// Sağlık Teması - Göz Hastalıkları Bölümü
// ============================================

import type { ThemePageData } from '@/types/theme';

export const ophthalmologyPage: ThemePageData = {
    slug: 'departments/ophthalmology',
    title: 'Göz Hastalıkları',
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
                            props: { content: '👁️ Göz Hastalıkları', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Net görüş için uzman bakım', fontSize: '20px', color: '#cffafe' },
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
                            props: { content: 'Tedavilerimiz', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#0e7490' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '• Katarakt Ameliyatı\n• Lazer Göz Ameliyatı (LASIK)\n• Glokom Tedavisi\n• Retina Hastalıkları\n• Şaşılık Tedavisi\n• Göz Kapağı Cerrahisi\n• Kornea Nakli\n• Çocuk Göz Hastalıkları',
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
                            props: { src: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&q=80', alt: 'Göz Hastalıkları' },
                        },
                    ],
                },
            ],
        },
    ],
};
