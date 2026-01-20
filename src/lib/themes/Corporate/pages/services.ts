// ============================================
// Kurumsal Tema - Hizmetler Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const servicesPage: ThemePageData = {
    slug: 'services',
    title: 'Hizmetler',
    sections: [
        {
            name: 'Services Hero',
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
                                content: 'Hizmetlerimiz',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '700',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İşletmenizin ihtiyaçlarına özel kapsamlı çözümler sunuyoruz.',
                                fontSize: '20px',
                                color: '#dbeafe',
                            },
                        },
                    ],
                },
            ],
        },
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
                            props: { content: '📊', level: 'h3', fontSize: '48px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Stratejik Danışmanlık', level: 'h3', fontSize: '22px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İş modelinizi analiz eder, rekabet avantajı sağlayacak stratejiler geliştiririz.',
                                fontSize: '16px',
                                color: '#64748b',
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
                            props: { content: '💻', level: 'h3', fontSize: '48px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Dijital Dönüşüm', level: 'h3', fontSize: '22px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İş süreçlerinizi dijitalleştir, verimliliği artır ve maliyetleri düşürürüz.',
                                fontSize: '16px',
                                color: '#64748b',
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
                            props: { content: '📈', level: 'h3', fontSize: '48px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Pazarlama Stratejisi', level: 'h3', fontSize: '22px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Markanızı güçlendirin, hedef kitlenize ulaşın ve satışlarınızı artırın.',
                                fontSize: '16px',
                                color: '#64748b',
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
                            props: { content: '👥', level: 'h3', fontSize: '48px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'İK Danışmanlığı', level: 'h3', fontSize: '22px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Doğru yetenekleri çekin, ekibinizi geliştirin ve çalışan memnuniyetini artırın.',
                                fontSize: '16px',
                                color: '#64748b',
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
                            props: { content: '💰', level: 'h3', fontSize: '48px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Finansal Danışmanlık', level: 'h3', fontSize: '22px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Bütçe yönetimi, yatırım planlaması ve finansal risk analizleri.',
                                fontSize: '16px',
                                color: '#64748b',
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
                            props: { content: '🎓', level: 'h3', fontSize: '48px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Kurumsal Eğitim', level: 'h3', fontSize: '22px', fontWeight: '600', color: '#1e293b' },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Liderlik, satış, iletişim ve teknik konularda özelleştirilmiş eğitimler.',
                                fontSize: '16px',
                                color: '#64748b',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
