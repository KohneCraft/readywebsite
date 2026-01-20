// ============================================
// Minimal Tema - Portfolyo Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const portfolioPage: ThemePageData = {
    slug: 'portfolio',
    title: 'Portfolyo',
    sections: [
        {
            name: 'Portfolio Hero',
            settings: {
                backgroundColor: '#0a0a0a',
                padding: { top: 120, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                content: 'Seçilmiş İşler',
                                level: 'h1',
                                fontSize: '56px',
                                fontWeight: '300',
                                color: '#fafafa',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Minimalist yaklaşımla tasarlanmış projeler',
                                fontSize: '20px',
                                color: '#737373',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Portfolio Grid',
            settings: {
                backgroundColor: '#fafafa',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
                                alt: 'Proje 1',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Marka Kimliği - Lumina',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Teknoloji startup için minimal marka kimliği ve görsel dil tasarımı.',
                                fontSize: '16px',
                                color: '#525252',
                            },
                        },
                    ],
                },
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
                                alt: 'Proje 2',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Web Tasarımı - Atelier',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Butik mimarlık ofisi için responsive web sitesi tasarımı.',
                                fontSize: '16px',
                                color: '#525252',
                            },
                        },
                    ],
                },
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80',
                                alt: 'Proje 3',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Ürün Tasarımı - Forma',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Mobilya markası için minimalist ürün serisi konsepti.',
                                fontSize: '16px',
                                color: '#525252',
                            },
                        },
                    ],
                },
                {
                    width: 50,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
                                alt: 'Proje 4',
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: 'Ambalaj - Pure',
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Organik kozmetik markası için sürdürülebilir ambalaj tasarımı.',
                                fontSize: '16px',
                                color: '#525252',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
