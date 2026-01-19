'use client';

// ============================================
// Vav Yapı - Hazır Section Templates
// Statik template verileri
// ============================================

import type { SectionTemplate } from '@/types/pageBuilder';

/**
 * Modern Landing Page Template
 */
const modernLanding: SectionTemplate = {
    id: 'template_landing_modern',
    name: 'Modern Landing Page',
    category: 'landing',
    description: 'Hero, özellikler ve CTA içeren modern landing page',
    thumbnail: '/templates/landing-modern.jpg',
    tags: ['landing', 'hero', 'features', 'cta'],
    sections: [
        {
            name: 'Hero Section',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
                minHeight: 500,
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                level: 'h1',
                                content: 'Modern Çözümler İçin Güçlü Platform',
                                fontSize: 48,
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İşinizi büyütmek için ihtiyacınız olan tüm araçlar tek bir platformda.',
                                fontSize: 18,
                            },
                        },
                        {
                            type: 'button',
                            props: {
                                text: 'Hemen Başlayın',
                                link: '#contact',
                                variant: 'primary',
                                size: 'large',
                            },
                        },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        {
                            type: 'image',
                            props: {
                                src: '/placeholder-hero.jpg',
                                alt: 'Hero Image',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Özellikler',
            settings: {
                backgroundColor: '#f9fafb',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '⚡ Hızlı' } },
                        { type: 'text', props: { content: 'Yıldırım hızında performans.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔒 Güvenli' } },
                        { type: 'text', props: { content: 'Kurumsal düzeyde güvenlik.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📈 Ölçeklenebilir' } },
                        { type: 'text', props: { content: 'İşinizle birlikte büyür.' } },
                    ],
                },
            ],
        },
        {
            name: 'CTA Section',
            settings: {
                backgroundColor: '#3b82f6',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        {
                            type: 'heading',
                            props: { level: 'h2', content: 'Başlamaya Hazır mısınız?', textAlign: 'center' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Ücretsiz Deneyin', link: '#signup', variant: 'secondary' },
                        },
                    ],
                },
            ],
        },
    ],
};

/**
 * Portfolio Template
 */
const creativePortfolio: SectionTemplate = {
    id: 'template_portfolio_creative',
    name: 'Creative Portfolio',
    category: 'portfolio',
    description: 'Projelerinizi sergilemek için yaratıcı portfolio şablonu',
    thumbnail: '/templates/portfolio-creative.jpg',
    tags: ['portfolio', 'projects', 'creative'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#0f172a',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Merhaba, Ben [İsminiz]', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Yaratıcı tasarımcı ve geliştirici.', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Projeler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-project1.jpg', alt: 'Proje 1' } },
                        { type: 'heading', props: { level: 'h3', content: 'Proje Adı 1' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-project2.jpg', alt: 'Proje 2' } },
                        { type: 'heading', props: { level: 'h3', content: 'Proje Adı 2' } },
                    ],
                },
            ],
        },
    ],
};

/**
 * Blog Template
 */
const magazineBlog: SectionTemplate = {
    id: 'template_blog_magazine',
    name: 'Magazine Blog',
    category: 'blog',
    description: 'Dergi tarzı modern blog şablonu',
    thumbnail: '/templates/blog-magazine.jpg',
    tags: ['blog', 'magazine', 'posts'],
    sections: [
        {
            name: 'Featured Post',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 40, right: 40, bottom: 40, left: 40 },
            },
            columns: [
                {
                    width: 60,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-featured.jpg', alt: 'Featured Post' } },
                    ],
                },
                {
                    width: 40,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Öne Çıkan Yazı Başlığı' } },
                        { type: 'text', props: { content: 'Yazı özeti burada yer alır.' } },
                        { type: 'button', props: { text: 'Devamını Oku', link: '#', variant: 'outline' } },
                    ],
                },
            ],
        },
        {
            name: 'Newsletter',
            settings: {
                backgroundColor: '#3b82f6',
                padding: { top: 40, right: 40, bottom: 40, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Bültenimize Abone Olun', textAlign: 'center' } },
                        { type: 'form', props: {} },
                    ],
                },
            ],
        },
    ],
};

/**
 * E-commerce Template
 */
const productShowcase: SectionTemplate = {
    id: 'template_ecommerce_showcase',
    name: 'Product Showcase',
    category: 'ecommerce',
    description: 'Ürünlerinizi sergilemek için e-ticaret şablonu',
    thumbnail: '/templates/ecommerce-showcase.jpg',
    tags: ['ecommerce', 'products', 'shop'],
    sections: [
        {
            name: 'Hero Banner',
            settings: {
                backgroundColor: '#f59e0b',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Yeni Sezon Ürünleri' } },
                        { type: 'text', props: { content: '%50\'ye varan indirimler!' } },
                        { type: 'button', props: { text: 'Alışverişe Başla', link: '#products', variant: 'secondary' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product-hero.jpg', alt: 'Products' } },
                    ],
                },
            ],
        },
        {
            name: 'Öne Çıkan Ürünler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product1.jpg', alt: 'Ürün 1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ürün Adı 1' } },
                        { type: 'text', props: { content: '₺299.00' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product2.jpg', alt: 'Ürün 2' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ürün Adı 2' } },
                        { type: 'text', props: { content: '₺449.00' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product3.jpg', alt: 'Ürün 3' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ürün Adı 3' } },
                        { type: 'text', props: { content: '₺599.00' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product4.jpg', alt: 'Ürün 4' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ürün Adı 4' } },
                        { type: 'text', props: { content: '₺799.00' } },
                    ],
                },
            ],
        },
    ],
};

/**
 * Corporate Business Template
 */
const corporateBusiness: SectionTemplate = {
    id: 'template_business_corporate',
    name: 'Corporate Business',
    category: 'business',
    description: 'Kurumsal şirketler için profesyonel şablon',
    thumbnail: '/templates/business-corporate.jpg',
    tags: ['business', 'corporate', 'services'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#1e3a5f',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 60,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Profesyonel İş Çözümleri' } },
                        { type: 'text', props: { content: '20 yılı aşkın deneyim.' } },
                        { type: 'button', props: { text: 'Hizmetlerimiz', link: '#services', variant: 'primary' } },
                    ],
                },
                {
                    width: 40,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-corporate.jpg', alt: 'Corporate' } },
                    ],
                },
            ],
        },
        {
            name: 'Hizmetler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💼 Danışmanlık' } },
                        { type: 'text', props: { content: 'Stratejik iş danışmanlığı.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📊 Analiz' } },
                        { type: 'text', props: { content: 'Detaylı pazar analizi.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚀 Büyüme' } },
                        { type: 'text', props: { content: 'Sürdürülebilir büyüme.' } },
                    ],
                },
            ],
        },
    ],
};

/**
 * Tüm template'ler
 */
export const defaultTemplates: SectionTemplate[] = [
    modernLanding,
    creativePortfolio,
    magazineBlog,
    productShowcase,
    corporateBusiness,
];

/**
 * Kategorilere göre template'leri getir
 */
export function getTemplatesByCategory(category: string): SectionTemplate[] {
    if (category === 'all') return defaultTemplates;
    return defaultTemplates.filter(t => t.category === category);
}

/**
 * Template kategorileri
 */
export const templateCategories = [
    { id: 'all', label: 'Tümü', icon: '🎨' },
    { id: 'landing', label: 'Landing', icon: '🚀' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'ecommerce', label: 'E-ticaret', icon: '🛒' },
    { id: 'business', label: 'İşletme', icon: '🏢' },
    { id: 'event', label: 'Etkinlik', icon: '🎫' },
    { id: 'restaurant', label: 'Restoran', icon: '🍽️' },
];
