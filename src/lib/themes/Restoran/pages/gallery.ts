// ============================================
// Restoran Teması - Galeri Sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const galleryPage: ThemePageData = {
    slug: 'gallery',
    title: 'Galeri',
    sections: [
        {
            name: 'Gallery Hero',
            settings: {
                backgroundColor: '#1a1a1a',
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
                                content: 'Galeri',
                                level: 'h1',
                                fontSize: '48px',
                                fontWeight: '600',
                                color: '#ffffff',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'Restoranımızın atmosferi ve lezzetli yemeklerimizden kareler',
                                fontSize: '18px',
                                color: '#a3a3a3',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Gallery Grid',
            settings: {
                backgroundColor: '#0a0a0a',
                padding: { top: 60, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
                                alt: 'Restoran İç Mekan',
                            },
                        },
                        {
                            type: 'text',
                            props: { content: 'İç Mekan', fontSize: '14px', color: '#d4a574' },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
                                alt: 'Ana Yemekler',
                            },
                        },
                        {
                            type: 'text',
                            props: { content: 'Ana Yemekler', fontSize: '14px', color: '#d4a574' },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
                                alt: 'Pizza',
                            },
                        },
                        {
                            type: 'text',
                            props: { content: 'Pizzalar', fontSize: '14px', color: '#d4a574' },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
                                alt: 'İçecekler',
                            },
                        },
                        {
                            type: 'text',
                            props: { content: 'İçecekler', fontSize: '14px', color: '#d4a574' },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
                                alt: 'Tatlılar',
                            },
                        },
                        {
                            type: 'text',
                            props: { content: 'Tatlılar', fontSize: '14px', color: '#d4a574' },
                        },
                    ],
                },
                {
                    width: 33,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
                                alt: 'Dış Mekan',
                            },
                        },
                        {
                            type: 'text',
                            props: { content: 'Dış Mekan', fontSize: '14px', color: '#d4a574' },
                        },
                    ],
                },
            ],
        },
    ],
};
