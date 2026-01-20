// ============================================
// Modern İş Teması - Fiyatlandırma Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const pricingPage: ThemePageData = {
    slug: 'pricing',
    title: 'Fiyatlandırma',
    sections: [
        // Hero Section
        {
            name: 'Pricing Hero',
            settings: {
                backgroundColor: '#0f172a',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Fiyatlandırma',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '800',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İhtiyacınıza uygun planı seçin. Tüm planlarda 14 gün ücretsiz deneme.',
                                fontSize: '20px',
                                color: '#94a3b8',
                            },
                        },
                    ],
                },
            ],
        },
        // Pricing Cards
        {
            name: 'Pricing Cards',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                // Starter Plan
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Başlangıç',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: '₺999/ay',
                                level: 'h2',
                                fontSize: '48px',
                                fontWeight: '800',
                                color: '#6366f1',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '✓ 5 Kullanıcı\n✓ 10GB Depolama\n✓ Email Destek\n✓ Temel Raporlama\n✓ API Erişimi',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '2',
                            },
                        },
                        {
                            type: 'button',
                            props: {
                                text: 'Başla',
                                href: '/contact',
                                backgroundColor: '#e2e8f0',
                                textColor: '#475569',
                            },
                        },
                    ],
                },
                // Pro Plan (Highlighted)
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: '⭐ Profesyonel',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: '₺2.499/ay',
                                level: 'h2',
                                fontSize: '48px',
                                fontWeight: '800',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '✓ 25 Kullanıcı\n✓ 100GB Depolama\n✓ Öncelikli Destek\n✓ Gelişmiş Raporlama\n✓ API & Webhook\n✓ Özel Entegrasyonlar',
                                fontSize: '16px',
                                color: '#e0e7ff',
                                lineHeight: '2',
                            },
                        },
                        {
                            type: 'button',
                            props: {
                                text: 'En Popüler',
                                href: '/contact',
                                backgroundColor: '#ffffff',
                                textColor: '#6366f1',
                            },
                        },
                    ],
                },
                // Enterprise Plan
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Kurumsal',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Özel Fiyat',
                                level: 'h2',
                                fontSize: '48px',
                                fontWeight: '800',
                                color: '#6366f1',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: '✓ Sınırsız Kullanıcı\n✓ Sınırsız Depolama\n✓ 7/24 Destek\n✓ Özel SLA\n✓ Dedicated Server\n✓ On-premise Seçeneği',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '2',
                            },
                        },
                        {
                            type: 'button',
                            props: {
                                text: 'İletişime Geç',
                                href: '/contact',
                                backgroundColor: '#e2e8f0',
                                textColor: '#475569',
                            },
                        },
                    ],
                },
            ],
        },
        // FAQ Section
        {
            name: 'FAQ',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Sıkça Sorulan Sorular',
                                level: 'h2',
                                fontSize: '36px',
                                fontWeight: '700',
                                color: '#1e293b',
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
                                content: 'Plan değiştirmek mümkün mü?',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Fatura döngünüze göre otomatik ayarlama yapılır.',
                                fontSize: '15px',
                                color: '#64748b',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'İptal politikanız nedir?',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İstediğiniz zaman iptal edebilirsiniz. Kullanılmayan süre için iade yapılır.',
                                fontSize: '15px',
                                color: '#64748b',
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
                                content: 'Destek nasıl çalışıyor?',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Tüm planlar email destek içerir. Pro ve Enterprise planlarında telefon ve canlı sohbet desteği de mevcuttur.',
                                fontSize: '15px',
                                color: '#64748b',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Ödeme yöntemleri nelerdir?',
                                level: 'h4',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Kredi kartı, banka havalesi ve kurumsal fatura ile ödeme yapabilirsiniz.',
                                fontSize: '15px',
                                color: '#64748b',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
