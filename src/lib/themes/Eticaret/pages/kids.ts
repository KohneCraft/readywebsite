// ============================================
// E-Ticaret Teması - Çocuk Giyim Kategorisi
// ============================================

import type { ThemePageData } from '@/types/theme';

export const kidsPage: ThemePageData = {
    slug: 'shop/kids',
    title: 'Çocuk Giyim',
    sections: [
        {
            name: 'Category Hero',
            settings: {
                backgroundColor: '#f59e0b',
                padding: { top: 100, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'heading',
                            props: { content: '🧸 Çocuk Giyim', level: 'h1', fontSize: '48px', fontWeight: '700', color: '#ffffff' },
                        },
                        {
                            type: 'text',
                            props: { content: 'Minikler için renkli ve konforlu seçenekler', fontSize: '20px', color: '#fef3c7' },
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
                            props: { content: 'Çocuk Koleksiyonu', level: 'h2', fontSize: '32px', fontWeight: '600', color: '#f59e0b' },
                        },
                        {
                            type: 'text',
                            props: { 
                                content: 'Yüksek kaliteli kumaşlar ve sevimli tasarımlarla minikleriniz için konforlu giyim çözümleri.', 
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
            name: 'Product Grid - Baby',
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
                            props: { content: 'Bebek (0-2 Yaş)', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/kids/baby-1.jpg', alt: 'Bebek Tulumu', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Sevimli Bebek Tulumu', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺299', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/baby-2.jpg', alt: 'Bebek Seti', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: '3\'lü Bebek Seti', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺399', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/baby-3.jpg', alt: 'Bebek Elbisesi', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Prenses Bebek Elbisesi', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺349', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/baby-4.jpg', alt: 'Bebek Pijama', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Pamuklu Pijama Takımı', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺249', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
            name: 'Product Grid - Girls',
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
                            props: { content: 'Kız Çocuk (3-12 Yaş)', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/kids/girl-1.jpg', alt: 'Kız Elbise', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Renkli Çiçekli Elbise', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺449', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/girl-2.jpg', alt: 'Kız Tayt', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Desenli Tayt', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺199', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/girl-3.jpg', alt: 'Kız Tişört', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Baskılı Tişört', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺149', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/girl-4.jpg', alt: 'Kız Ceket', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Şık Ceket', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺649', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
            name: 'Product Grid - Boys',
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
                            props: { content: 'Erkek Çocuk (3-12 Yaş)', level: 'h3', fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '30px' },
                        },
                    ],
                },
                {
                    width: 25,
                    settings: { textAlign: 'center' },
                    blocks: [
                        {
                            type: 'image',
                            props: { src: '/themes/ecommerce/kids/boy-1.jpg', alt: 'Erkek Tişört', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Spor Tişört', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺149', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/boy-2.jpg', alt: 'Erkek Şort', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Kargo Şort', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺249', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/boy-3.jpg', alt: 'Erkek Gömlek', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Klasik Gömlek', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺349', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
                            props: { src: '/themes/ecommerce/kids/boy-4.jpg', alt: 'Erkek Eşofman', width: '100%', borderRadius: '12px' },
                        },
                        {
                            type: 'heading',
                            props: { content: 'Eşofman Takımı', level: 'h4', fontSize: '18px', fontWeight: '500', color: '#1f2937' },
                        },
                        {
                            type: 'text',
                            props: { content: '₺449', fontSize: '20px', color: '#f59e0b', fontWeight: '600' },
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
