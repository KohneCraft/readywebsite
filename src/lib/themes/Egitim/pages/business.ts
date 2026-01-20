// ============================================
// Eğitim Teması - İşletme Programı
// ============================================

import type { ThemePageData } from '@/types/theme';

export const businessPage: ThemePageData = {
    slug: 'programs/business',
    title: 'İşletme',
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
                            props: { content: '📊 İşletme Eğitimleri', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Liderlik yolculuğunuz burada başlıyor', fontSize: '20px', color: '#ddd6fe' },
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
                            props: { content: 'Eğitim İçerikleri', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#7c3aed' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '• Yönetim ve Liderlik\n• Dijital Pazarlama\n• Finans ve Muhasebe\n• İnsan Kaynakları\n• E-Ticaret\n• Girişimcilik\n• MBA Hazırlık',
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
                            props: { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80', alt: 'İşletme' },
                        },
                    ],
                },
            ],
        },
    ],
};
