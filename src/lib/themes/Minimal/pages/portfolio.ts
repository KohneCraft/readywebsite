// ============================================
// Minimal Tema - Portfolyo Sayfası
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const portfolioPage: ThemePageData = {
    slug: 'portfolio',
    title: 'Portfolyo',
    titles: { tr: 'Portfolyo', en: 'Portfolio', de: 'Portfolio', fr: 'Portfolio' },
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
                                content: {
                                    tr: 'Seçilmiş İşler',
                                    en: 'Selected Works',
                                    de: 'Ausgewählte Arbeiten',
                                    fr: 'Travaux Sélectionnés'
                                },
                                level: 'h1',
                                fontSize: '56px',
                                fontWeight: '300',
                                color: '#fafafa',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Minimalist yaklaşımla tasarlanmış projeler',
                                    en: 'Projects designed with a minimalist approach',
                                    de: 'Projekte mit minimalistischem Ansatz',
                                    fr: 'Projets conçus avec une approche minimaliste'
                                },
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
                                alt: { tr: 'Proje 1', en: 'Project 1', de: 'Projekt 1', fr: 'Projet 1' },
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: {
                                    tr: 'Marka Kimliği - Lumina',
                                    en: 'Brand Identity - Lumina',
                                    de: 'Markenidentität - Lumina',
                                    fr: 'Identité de Marque - Lumina'
                                },
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Teknoloji startup için minimal marka kimliği ve görsel dil tasarımı.',
                                    en: 'Minimal brand identity and visual language design for a technology startup.',
                                    de: 'Minimale Markenidentität und visuelle Sprachgestaltung für ein Technologie-Startup.',
                                    fr: 'Identité de marque minimale et design de langage visuel pour une startup technologique.'
                                },
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
                                alt: { tr: 'Proje 2', en: 'Project 2', de: 'Projekt 2', fr: 'Projet 2' },
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: {
                                    tr: 'Web Tasarımı - Atelier',
                                    en: 'Web Design - Atelier',
                                    de: 'Webdesign - Atelier',
                                    fr: 'Design Web - Atelier'
                                },
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Butik mimarlık ofisi için responsive web sitesi tasarımı.',
                                    en: 'Responsive website design for a boutique architecture office.',
                                    de: 'Responsive Website-Design für ein Boutique-Architekturbüro.',
                                    fr: 'Conception de site web responsive pour un cabinet d\'architecture boutique.'
                                },
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
                                alt: { tr: 'Proje 3', en: 'Project 3', de: 'Projekt 3', fr: 'Projet 3' },
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: {
                                    tr: 'Ürün Tasarımı - Forma',
                                    en: 'Product Design - Forma',
                                    de: 'Produktdesign - Forma',
                                    fr: 'Design Produit - Forma'
                                },
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Mobilya markası için minimalist ürün serisi konsepti.',
                                    en: 'Minimalist product series concept for a furniture brand.',
                                    de: 'Minimalistisches Produktserienkonzept für eine Möbelmarke.',
                                    fr: 'Concept de série de produits minimalistes pour une marque de meubles.'
                                },
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
                                alt: { tr: 'Proje 4', en: 'Project 4', de: 'Projekt 4', fr: 'Projet 4' },
                            },
                        },
                        {
                            type: 'heading',
                            props: {
                                content: {
                                    tr: 'Ambalaj - Pure',
                                    en: 'Packaging - Pure',
                                    de: 'Verpackung - Pure',
                                    fr: 'Emballage - Pure'
                                },
                                level: 'h3',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: '#0a0a0a',
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: {
                                    tr: 'Organik kozmetik markası için sürdürülebilir ambalaj tasarımı.',
                                    en: 'Sustainable packaging design for an organic cosmetics brand.',
                                    de: 'Nachhaltiges Verpackungsdesign für eine Bio-Kosmetikmarke.',
                                    fr: 'Conception d\'emballage durable pour une marque de cosmétiques bio.'
                                },
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
