// ============================================
// E-Ticaret Teması - Erkek Giyim Kategorisi
// ============================================

import type { ThemePageData } from '@/types/theme';

export const menPage: ThemePageData = {
    slug: 'shop/men',
    title: 'Erkek Giyim',
    sections: [
        {
            name: 'Category Hero',
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
                            props: { content: '👔 Erkek Giyim', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Modern ve şık erkek koleksiyonu', fontSize: '20px', color: '#cbd5e1' },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Category Content',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: 'Erkek Koleksiyonu', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#0f172a' },
                        },
                        {
                            type: 'text',
                            props: { 
                                content: 'İş hayatından günlük kullanıma, spor aktivitelerinden özel davetlere uygun erkek giyim ürünleri.', 
                                fontSize: '18px', 
                                color: '#4b5563',
                                marginBottom: '40px'
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Product Grid - Shirts',
            settings: {
                backgroundColor: '#f9fafb',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: 'Gömlekler', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/shirt-1.jpg', alt: 'Klasik Gömlek', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Klasik Beyaz Gömlek', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺599', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/shirt-2.jpg', alt: 'Desenli Gömlek', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Desenli Gömlek', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺649', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/shirt-3.jpg', alt: 'Oxford Gömlek', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Oxford Gömlek', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺699', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/shirt-4.jpg', alt: 'Keten Gömlek', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Keten Gömlek', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺749', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Product Grid - Pants',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: 'Pantolonlar', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/pants-1.jpg', alt: 'Chino Pantolon', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Chino Pantolon', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺799', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/pants-2.jpg', alt: 'Jean Pantolon', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Slim Fit Jean', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺699', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/pants-3.jpg', alt: 'Kumaş Pantolon', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Kumaş Pantolon', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺899', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/pants-4.jpg', alt: 'Kargo Pantolon', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Kargo Pantolon', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺749', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
            ],
        },
        {
            name: 'Product Grid - Outerwear',
            settings: {
                backgroundColor: '#f9fafb',
                padding: { top: 60, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'left' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: 'Dış Giyim', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/jacket-1.jpg', alt: 'Kot Ceket', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Denim Ceket', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺1.299', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/jacket-2.jpg', alt: 'Bomber Ceket', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Bomber Ceket', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺1.499', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/jacket-3.jpg', alt: 'Kaban', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Klasik Kaban', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺2.299', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/men/jacket-4.jpg', alt: 'Mont', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Spor Mont', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺1.699', fontSize: '20px', color: '#0f172a', fontWeight: '600' },
                        },
                        {
                            type: 'button',
                            props: { text: 'Sepete Ekle', variant: 'primary', size: 'sm' },
                        },
                    ],
                },
            ],
        },
    ],
};
