// ============================================
// E-Ticaret Teması - Aksesuar Kategorisi
// ============================================

import type { ThemePageData } from '@/types/theme';

export const accessoriesPage: ThemePageData = {
    slug: 'shop/accessories',
    title: 'Aksesuarlar',
    sections: [
        {
            name: 'Category Hero',
            settings: {
                backgroundColor: '#8b5cf6',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '✨ Aksesuarlar', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Stilinizi tamamlayan detaylar', fontSize: '20px', color: '#ede9fe' },
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
                            props: { content: 'Aksesuar Koleksiyonu', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#8b5cf6' },
                        },
                        {
                            type: 'text',
                            props: { 
                                content: 'Çantalardan takılara, şapkalardan kemer çeşitlerine kadar tüm aksesuarlar burada.', 
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
            name: 'Product Grid - Bags',
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
                            props: { content: 'Çantalar', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/accessories/bag-1.jpg', alt: 'El Çantası', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Deri El Çantası', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺1.499', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/bag-2.jpg', alt: 'Sırt Çantası', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Şık Sırt Çantası', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺899', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/bag-3.jpg', alt: 'Omuz Çantası', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Omuz Çantası', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺1.199', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/bag-4.jpg', alt: 'Clutch', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Mini Clutch', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺649', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
            name: 'Product Grid - Jewelry',
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
                            props: { content: 'Takılar', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/accessories/jewelry-1.jpg', alt: 'Kolye', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Zarif Kolye', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺349', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/jewelry-2.jpg', alt: 'Küpe', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Sallantılı Küpe', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺249', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/jewelry-3.jpg', alt: 'Bileklik', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Charm Bileklik', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺299', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/jewelry-4.jpg', alt: 'Yüzük', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Taşlı Yüzük', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺399', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
            name: 'Product Grid - Others',
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
                            props: { content: 'Diğer Aksesuarlar', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/accessories/other-1.jpg', alt: 'Şapka', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Hasır Şapka', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺299', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/other-2.jpg', alt: 'Kemer', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Deri Kemer', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺349', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/other-3.jpg', alt: 'Atkı', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Yün Atkı', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺249', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/accessories/other-4.jpg', alt: 'Güneş Gözlüğü', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Güneş Gözlüğü', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺499', fontSize: '20px', color: '#8b5cf6', fontWeight: '600' },
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
