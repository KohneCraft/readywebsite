// ============================================
// Modern İş Teması - Hizmetler Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const servicesPage: ThemePageData = {
    slug: 'services',
    title: 'Hizmetler',
    sections: [
        // Hero Section
        {
            name: 'Services Hero',
            settings: {
                backgroundColor: '#0f172a',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
                backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
                overlay: { enabled: true, color: 'rgba(15,23,42,0.85)' },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Hizmetlerimiz',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '800',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Dijital dönüşüm yolculuğunuzda yanınızdayız. İşletmenizi geleceğe taşıyacak kapsamlı çözümler sunuyoruz.',
                                fontSize: '20px',
                                color: '#94a3b8',
                                lineHeight: '1.8',
                            },
                        },
                    ],
                },
            ],
        },
        // Services Grid
        {
            name: 'Services Grid',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: '🚀',
                                level: 'h3',
                                fontSize: '48px',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Dijital Strateji',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İşletmenizin dijital vizyonunu belirliyor, yol haritası oluşturuyoruz. Rekabet analizi, pazar araştırması ve stratejik planlama.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
                            },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: '💻',
                                level: 'h3',
                                fontSize: '48px',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Web Geliştirme',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Modern, hızlı ve SEO uyumlu web siteleri. React, Next.js ve en güncel teknolojilerle kurumsal çözümler.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
                            },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: '📱',
                                level: 'h3',
                                fontSize: '48px',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Mobil Uygulama',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'iOS ve Android için native ve cross-platform mobil uygulamalar. Kullanıcı deneyimi odaklı tasarım.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
                            },
                        },
                    ],
                },
            ],
        },
        // More Services
        {
            name: 'More Services',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: '☁️',
                                level: 'h3',
                                fontSize: '48px',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Bulut Çözümleri',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'AWS, Azure ve Google Cloud ile ölçeklenebilir altyapı. Maliyet optimizasyonu ve yüksek erişilebilirlik.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
                            },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: '🔒',
                                level: 'h3',
                                fontSize: '48px',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Siber Güvenlik',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Kapsamlı güvenlik denetimleri, penetrasyon testleri ve 7/24 güvenlik izleme hizmetleri.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
                            },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: '📊',
                                level: 'h3',
                                fontSize: '48px',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Veri Analitiği',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1e293b',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Büyük veri analizi, iş zekası çözümleri ve öngörücü analitik ile veriye dayalı kararlar.',
                                fontSize: '16px',
                                color: '#64748b',
                                lineHeight: '1.7',
                            },
                        },
                    ],
                },
            ],
        },
        // CTA Section
        {
            name: 'CTA',
            settings: {
                backgroundColor: '#6366f1',
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
                                content: 'Projenizi Konuşalım',
                                level: 'h2',
                                fontSize: '36px',
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Ücretsiz danışmanlık için hemen iletişime geçin.',
                                fontSize: '18px',
                                color: '#e0e7ff',
                            },
                        },
                        {
                            type: 'button',
                            props: {
                                text: 'İletişime Geç',
                                href: '/contact',
                                backgroundColor: '#ffffff',
                                textColor: '#6366f1',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
