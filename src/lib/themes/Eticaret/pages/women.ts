// ============================================
// E-Ticaret Teması - Kadın Giyim Kategorisi
// ============================================

import type { ThemePageData } from '@/types/theme';

export const womenPage: ThemePageData = {
    slug: 'shop/women',
    title: 'Kadın Giyim',
    sections: [
        {
            name: 'Category Hero',
            settings: {
                backgroundColor: '#ec4899',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '👗 Kadın Giyim', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Tarzınızı yansıtan şık parçalar', fontSize: '20px', color: '#fce7f3' },
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
                            props: { content: 'Yeni Sezon Koleksiyonu', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#ec4899' },
                        },
                        {
                            type: 'text',
                            props: { 
                                content: 'En yeni modeller ve trendler burada! Gardırobunuzu yeni sezon parçalarla tamamlayın.', 
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
            name: 'Product Grid - Dresses',
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
                            props: { content: 'Elbiseler', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/women/dress-1.jpg', alt: 'Çiçek Desenli Elbise', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Çiçek Desenli Elbise', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺899', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/dress-2.jpg', alt: 'Midi Elbise', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Şık Midi Elbise', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺1.299', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/dress-3.jpg', alt: 'Gece Elbisesi', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Gece Elbisesi', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺1.899', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/dress-4.jpg', alt: 'Günlük Elbise', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Günlük Elbise', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺749', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
            name: 'Product Grid - Tops',
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
                            props: { content: 'Üst Giyim', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/women/top-1.jpg', alt: 'Bluz', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Şifon Bluz', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺449', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/top-2.jpg', alt: 'Gömlek', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Klasik Gömlek', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺549', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/top-3.jpg', alt: 'Kazak', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Triko Kazak', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺649', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/top-4.jpg', alt: 'Tişört', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Basic Tişört', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺299', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
            name: 'Product Grid - Bottoms',
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
                            props: { content: 'Alt Giyim', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/women/bottom-1.jpg', alt: 'Jean', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Yüksek Bel Jean', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺699', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/bottom-2.jpg', alt: 'Etek', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Pileli Etek', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺549', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/bottom-3.jpg', alt: 'Pantolon', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Kumaş Pantolon', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺799', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/women/bottom-4.jpg', alt: 'Şort', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Denim Şort', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺449', fontSize: '20px', color: '#ec4899', fontWeight: '600' },
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
