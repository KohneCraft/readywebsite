// ============================================
// Kurumsal Tema - Hakkımızda Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const aboutPage: ThemePageData = {
    slug: 'about',
    title: 'Hakkımızda',
    sections: [
        {
            name: 'About Hero',
            settings: {
                backgroundColor: '#2563eb',
                padding: { top: 100, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Hakkımızda',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '15 yılı aşkın tecrübemizle işletmelerin dijital dönüşümüne öncülük ediyoruz.',
                                fontSize: '20px',
                                color: '#dbeafe',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'About Content',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Misyonumuz',
                                level: 'h2',
                                fontSize: '32px',
                                fontWeight: '600',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İşletmelerin potansiyellerini en üst düzeye çıkarmalarına yardımcı olmak. Stratejik danışmanlık, dijital çözümler ve yenilikçi yaklaşımlarla müşterilerimizin başarısına katkıda bulunuyoruz.',
                                fontSize: '18px',
                                color: '#64748b',
                                lineHeight: '1.8',
                            },
                        },
                    ],
                },
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Vizyonumuz',
                                level: 'h2',
                                fontSize: '32px',
                                fontWeight: '600',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Türkiyenin lider iş danışmanlığı firması olmak. Sürdürülebilir büyüme, müşteri memnuniyeti ve yenilikçilik ilkelerini benimseyerek sektörde öncü olmaya devam ediyoruz.',
                                fontSize: '18px',
                                color: '#64748b',
                                lineHeight: '1.8',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Stats',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '500+', level: 'h2', fontSize: '48px', fontWeight: '700', color: '#2563eb' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Tamamlanan Proje', fontSize: '16px', color: '#64748b' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '200+', level: 'h2', fontSize: '48px', fontWeight: '700', color: '#2563eb' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Mutlu Müşteri', fontSize: '16px', color: '#64748b' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '15+', level: 'h2', fontSize: '48px', fontWeight: '700', color: '#2563eb' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Yıllık Deneyim', fontSize: '16px', color: '#64748b' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '50+', level: 'h2', fontSize: '48px', fontWeight: '700', color: '#2563eb' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Uzman Ekip', fontSize: '16px', color: '#64748b' },
                        },
                    ],
                },
            ],
        },
    ],
};
