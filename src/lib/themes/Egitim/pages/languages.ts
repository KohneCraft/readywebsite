// ============================================
// Eğitim Teması - Yabancı Diller Programı
// ============================================

import type { ThemePageData } from '@/types/theme';

export const languagesPage: ThemePageData = {
    slug: 'programs/languages',
    title: 'Yabancı Diller',
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
                            props: { content: '🌍 Yabancı Diller', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Dünyaya açılan kapınız', fontSize: '20px', color: '#ddd6fe' },
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
                            props: { content: 'Dil Eğitimlerimiz', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#7c3aed' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '• İngilizce (A1-C2 Seviye)\n• Almanca (A1-B2 Seviye)\n• Fransızca (A1-B1 Seviye)\n• İspanyolca (A1-B1 Seviye)\n• İş İngilizcesi\n• IELTS/TOEFL Hazırlık\n• Konuşma Kulüpleri',
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
                            props: { src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80', alt: 'Dil Eğitimi' },
                        },
                    ],
                },
            ],
        },
    ],
};
