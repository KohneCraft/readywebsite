// ============================================
// Eğitim Teması - Teknoloji Programı
// ============================================

import type { ThemePageData } from '@/types/theme';

export const technologyPage: ThemePageData = {
    slug: 'programs/technology',
    title: 'Teknoloji',
    sections: [
        {
            name: 'Program Hero',
            settings: {
                backgroundColor: '#7c3aed',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '💻 Teknoloji Eğitimleri', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Geleceğin mesleklerini öğrenin', fontSize: '20px', color: '#ddd6fe' },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Program Content',
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
                            props: { content: 'Eğitim Programlarımız', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#7c3aed' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '• Web Geliştirme (React, Node.js)\n• Mobil Uygulama (React Native, Flutter)\n• Veri Bilimi & AI\n• Siber Güvenlik\n• DevOps & Cloud\n• Oyun Geliştirme\n• Proje Yönetimi (Agile/Scrum)',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '2',
                            },
                        },
                        {
                            type: 'button',
                            props: { text: 'Kayıt Ol', href: '/enroll', backgroundColor: '#7c3aed', textColor: '#ffffff' },
                        },
                    ],
                },
                {
                    width: 40,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80', alt: 'Teknoloji' },
                        },
                    ],
                },
            ],
        },
    ],
};
