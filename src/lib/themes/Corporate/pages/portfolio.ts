// ============================================
// Kurumsal Tema - Referanslar/Portfolyo Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const portfolioPage: ThemePageData = {
    slug: 'portfolio',
    title: 'Referanslar',
    sections: [
        {
            name: 'Portfolio Hero',
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
                                content: 'Referanslarımız',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Birlikte çalıştığımız markalar ve başarı hikayeleri.',
                                fontSize: '20px',
                                color: '#dbeafe',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Clients Grid',
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
                            props: { content: 'Finans Sektörü', level: 'h3', fontSize: '24px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Türkiyenin önde gelen 5 bankasına dijital dönüşüm danışmanlığı verdik. Mobil bankacılık uygulamaları, müşteri deneyimi optimizasyonu ve veri analitiği projelerinde 40%+ verimlilik artışı sağladık.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
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
                            props: { content: 'Perakende', level: 'h3', fontSize: '24px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '150+ mağazalık perakende zinciri için omni-channel strateji geliştirdik. E-ticaret entegrasyonu, stok yönetimi ve müşteri sadakat programları ile satışlarda 35% artış.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
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
                            props: { content: 'Üretim', level: 'h3', fontSize: '24px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Otomotiv yan sanayi üreticisi için endüstri 4.0 dönüşümü. IoT sensörler, tahminsel bakım ve akıllı fabrika çözümleriyle üretim maliyetlerinde 25% düşüş.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
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
                            props: { content: 'Sağlık', level: 'h3', fontSize: '24px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Özel hastane grubu için dijital hasta deneyimi platformu. Online randevu, telemedicine ve hasta portalı ile hasta memnuniyetinde 50% artış.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
