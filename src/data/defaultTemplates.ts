'use client';

// ============================================
// Vav Yapı - Hazır Section Templates
// Gelişmiş statik template verileri
// ============================================

import type { SectionTemplate } from '@/types/pageBuilder';

/**
 * Modern Landing Page Template - Gelişmiş
 */
const modernLanding: SectionTemplate = {
    id: 'template_landing_modern',
    name: 'Modern Landing Page',
    category: 'landing',
    description: 'Hero, özellikler, istatistikler ve CTA içeren kapsamlı landing page',
    thumbnail: '/templates/landing-modern.jpg',
    tags: ['landing', 'hero', 'features', 'cta', 'stats'],
    sections: [
        {
            name: 'Hero Section',
            settings: {
                backgroundColor: '#0f172a',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
                minHeight: 600,
            },
            columns: [
                {
                    width: 55,
                    blocks: [
                        {
                            type: 'heading',
                            props: {
                                level: 'h1',
                                content: 'Modern Çözümler İçin Güçlü Platform',
                                fontSize: 56,
                            },
                        },
                        {
                            type: 'text',
                            props: {
                                content: 'İşinizi büyütmek için ihtiyacınız olan tüm araçlar tek bir platformda. Binlerce işletme tarafından güvenle kullanılıyor.',
                                fontSize: 20,
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
                        {
                            type: 'button',
                            props: {
                                text: 'Demo İzle',
                                link: '#demo',
                                variant: 'outline',
                                size: 'large',
                            },
                        },
                    ],
                },
                {
                    width: 45,
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
            name: 'İstatistikler',
            settings: {
                backgroundColor: '#1e293b',
                padding: { top: 40, right: 40, bottom: 40, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '10K+', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Aktif Kullanıcı', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '99.9%', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Uptime', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '50+', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Entegrasyon', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '24/7', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Destek', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Özellikler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Neden Bizi Tercih Etmelisiniz?', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Benzersiz özelliklerimizle fark yaratın', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Özellik Kartları',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 0, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '⚡ Yıldırım Hızı' } },
                        { type: 'text', props: { content: 'Milisaniye cinsinden yanıt süreleri. Kullanıcılarınız beklemez.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔒 Kurumsal Güvenlik' } },
                        { type: 'text', props: { content: 'End-to-end şifreleme ve KVKK uyumlu altyapı.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📈 Sınırsız Ölçek' } },
                        { type: 'text', props: { content: 'İşiniz büyüdükçe altyapınız otomatik ölçeklenir.' } },
                    ],
                },
            ],
        },
        {
            name: 'CTA Section',
            settings: {
                backgroundColor: '#3b82f6',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Başlamaya Hazır mısınız?', textAlign: 'center' } },
                        { type: 'text', props: { content: '14 gün ücretsiz deneyin, kredi kartı gerekmez.', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Ücretsiz Deneyin', link: '#signup', variant: 'secondary', size: 'large' } },
                    ],
                },
            ],
        },
    ],
};

/**
 * Creative Portfolio Template - Gelişmiş
 */
const creativePortfolio: SectionTemplate = {
    id: 'template_portfolio_creative',
    name: 'Creative Portfolio',
    category: 'portfolio',
    description: 'Kişisel marka ve projeler için yaratıcı portfolio şablonu',
    thumbnail: '/templates/portfolio-creative.jpg',
    tags: ['portfolio', 'projects', 'creative', 'personal'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#0f172a',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'text', props: { content: 'Merhaba, Ben', textAlign: 'center', fontSize: 18 } },
                        { type: 'heading', props: { level: 'h1', content: '[İsminiz]', textAlign: 'center' } },
                        { type: 'text', props: { content: 'UI/UX Tasarımcı & Full Stack Developer', textAlign: 'center', fontSize: 20 } },
                        { type: 'button', props: { text: 'Projelerimi Gör', link: '#projects', variant: 'primary' } },
                    ],
                },
            ],
        },
        {
            name: 'Hakkımda',
            settings: {
                backgroundColor: '#1e293b',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 40,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-avatar.jpg', alt: 'Profile Photo' } },
                    ],
                },
                {
                    width: 60,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Hakkımda' } },
                        { type: 'text', props: { content: '10 yılı aşkın deneyimle dijital ürünler tasarlıyor ve geliştiriyorum. Kullanıcı odaklı tasarım yaklaşımımla markaların digital dönüşümüne katkı sağlıyorum.' } },
                        { type: 'text', props: { content: '✓ 50+ başarılı proje\n✓ 30+ mutlu müşteri\n✓ 5+ ödül' } },
                    ],
                },
            ],
        },
        {
            name: 'Projeler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Seçili Projeler', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Proje Grid',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 0, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-project1.jpg', alt: 'Proje 1' } },
                        { type: 'heading', props: { level: 'h3', content: 'E-Ticaret Platformu' } },
                        { type: 'text', props: { content: 'React, Node.js, MongoDB' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-project2.jpg', alt: 'Proje 2' } },
                        { type: 'heading', props: { level: 'h3', content: 'Mobil Uygulama' } },
                        { type: 'text', props: { content: 'React Native, Firebase' } },
                    ],
                },
            ],
        },
        {
            name: 'İletişim',
            settings: {
                backgroundColor: '#0f172a',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Birlikte Çalışalım' } },
                        { type: 'text', props: { content: 'Yeni projeler için her zaman açığım. Fikirlerinizi gerçeğe dönüştürelim.' } },
                        { type: 'text', props: { content: '📧 email@example.com\n📱 +90 555 123 4567' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'form', props: {} },
                    ],
                },
            ],
        },
    ],
};

/**
 * Magazine Blog Template - Gelişmiş
 */
const magazineBlog: SectionTemplate = {
    id: 'template_blog_magazine',
    name: 'Magazine Blog',
    category: 'blog',
    description: 'Dergi tarzı modern blog şablonu',
    thumbnail: '/templates/blog-magazine.jpg',
    tags: ['blog', 'magazine', 'posts', 'news'],
    sections: [
        {
            name: 'Header',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 40, right: 40, bottom: 40, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: '📰 Blog Adı', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Teknoloji, Tasarım ve Yaratıcılık', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Featured Post',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 55,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-featured.jpg', alt: 'Featured Post' } },
                    ],
                },
                {
                    width: 45,
                    blocks: [
                        { type: 'text', props: { content: '🔥 ÖNE ÇIKAN', fontSize: 14 } },
                        { type: 'heading', props: { level: 'h2', content: 'Yapay Zeka ile Tasarımın Geleceği' } },
                        { type: 'text', props: { content: 'AI araçları tasarım süreçlerini nasıl dönüştürüyor? İşte bilmeniz gereken her şey...' } },
                        { type: 'text', props: { content: '👤 Ahmet Yılmaz · 5 dk okuma', fontSize: 14 } },
                        { type: 'button', props: { text: 'Devamını Oku →', link: '#', variant: 'outline' } },
                    ],
                },
            ],
        },
        {
            name: 'Recent Posts',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Son Yazılar' } },
                    ],
                },
            ],
        },
        {
            name: 'Post Grid',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 0, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-post1.jpg', alt: 'Post 1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Web 3.0 Nedir?' } },
                        { type: 'text', props: { content: '3 dk okuma', fontSize: 12 } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-post2.jpg', alt: 'Post 2' } },
                        { type: 'heading', props: { level: 'h4', content: 'React vs Vue 2025' } },
                        { type: 'text', props: { content: '7 dk okuma', fontSize: 12 } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-post3.jpg', alt: 'Post 3' } },
                        { type: 'heading', props: { level: 'h4', content: 'Minimal Tasarım İpuçları' } },
                        { type: 'text', props: { content: '4 dk okuma', fontSize: 12 } },
                    ],
                },
            ],
        },
        {
            name: 'Newsletter',
            settings: {
                backgroundColor: '#3b82f6',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📬 Bültenimize Abone Olun', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Haftalık en iyi içerikler doğrudan kutunuzda', textAlign: 'center' } },
                        { type: 'form', props: {} },
                    ],
                },
            ],
        },
    ],
};

/**
 * E-commerce Showcase Template - Gelişmiş
 */
const productShowcase: SectionTemplate = {
    id: 'template_ecommerce_showcase',
    name: 'Product Showcase',
    category: 'ecommerce',
    description: 'Ürün tanıtımı ve satış odaklı e-ticaret şablonu',
    thumbnail: '/templates/ecommerce-showcase.jpg',
    tags: ['ecommerce', 'products', 'shop', 'sale'],
    sections: [
        {
            name: 'Promo Banner',
            settings: {
                backgroundColor: '#dc2626',
                padding: { top: 15, right: 40, bottom: 15, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'text', props: { content: '🔥 BÜYÜK İNDİRİM! %50\'ye varan fırsatlar - Sınırlı süre!', textAlign: 'center', fontSize: 16 } },
                    ],
                },
            ],
        },
        {
            name: 'Hero Banner',
            settings: {
                backgroundColor: '#fbbf24',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'text', props: { content: 'YENİ SEZON', fontSize: 14 } },
                        { type: 'heading', props: { level: 'h1', content: 'Premium Koleksiyon' } },
                        { type: 'text', props: { content: 'Özel tasarım ürünlerle tarzınızı yansıtın.' } },
                        { type: 'button', props: { text: 'Alışverişe Başla', link: '#products', variant: 'primary', size: 'large' } },
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
            name: 'Kategoriler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-cat1.jpg', alt: 'Kategori 1' } },
                        { type: 'heading', props: { level: 'h4', content: '👕 Giyim', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-cat2.jpg', alt: 'Kategori 2' } },
                        { type: 'heading', props: { level: 'h4', content: '👟 Ayakkabı', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-cat3.jpg', alt: 'Kategori 3' } },
                        { type: 'heading', props: { level: 'h4', content: '👜 Çanta', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-cat4.jpg', alt: 'Kategori 4' } },
                        { type: 'heading', props: { level: 'h4', content: '⌚ Aksesuar', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Öne Çıkan Ürünler Başlık',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 60, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '⭐ Öne Çıkan Ürünler', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Ürün Grid',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 20, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product1.jpg', alt: 'Ürün 1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Premium T-Shirt' } },
                        { type: 'text', props: { content: '₺299.00', fontSize: 18 } },
                        { type: 'button', props: { text: 'Sepete Ekle', link: '#', variant: 'primary' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product2.jpg', alt: 'Ürün 2' } },
                        { type: 'heading', props: { level: 'h4', content: 'Deri Cüzdan' } },
                        { type: 'text', props: { content: '₺449.00', fontSize: 18 } },
                        { type: 'button', props: { text: 'Sepete Ekle', link: '#', variant: 'primary' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product3.jpg', alt: 'Ürün 3' } },
                        { type: 'heading', props: { level: 'h4', content: 'Sneaker' } },
                        { type: 'text', props: { content: '₺899.00', fontSize: 18 } },
                        { type: 'button', props: { text: 'Sepete Ekle', link: '#', variant: 'primary' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-product4.jpg', alt: 'Ürün 4' } },
                        { type: 'heading', props: { level: 'h4', content: 'Akıllı Saat' } },
                        { type: 'text', props: { content: '₺1.299.00', fontSize: 18 } },
                        { type: 'button', props: { text: 'Sepete Ekle', link: '#', variant: 'primary' } },
                    ],
                },
            ],
        },
    ],
};

/**
 * Corporate Business Template - Gelişmiş
 */
const corporateBusiness: SectionTemplate = {
    id: 'template_business_corporate',
    name: 'Corporate Business',
    category: 'business',
    description: 'Kurumsal şirketler için profesyonel şablon',
    thumbnail: '/templates/business-corporate.jpg',
    tags: ['business', 'corporate', 'services', 'b2b'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#1e3a5f',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 55,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Profesyonel İş Çözümleri' } },
                        { type: 'text', props: { content: '20 yılı aşkın deneyimimizle işinizi global ölçekte büyütüyoruz. Fortune 500 şirketlerinin güvendiği partner.' } },
                        { type: 'button', props: { text: 'Randevu Al', link: '#contact', variant: 'primary', size: 'large' } },
                        { type: 'button', props: { text: 'Hizmetlerimiz', link: '#services', variant: 'outline', size: 'large' } },
                    ],
                },
                {
                    width: 45,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-corporate.jpg', alt: 'Corporate' } },
                    ],
                },
            ],
        },
        {
            name: 'Güven Logoları',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 40, right: 40, bottom: 40, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'text', props: { content: 'Bize güvenen markalar:', textAlign: 'center', fontSize: 14 } },
                        { type: 'text', props: { content: '🏢 Microsoft  •  🏢 Google  •  🏢 Amazon  •  🏢 Meta  •  🏢 Apple', textAlign: 'center', fontSize: 16 } },
                    ],
                },
            ],
        },
        {
            name: 'Hizmetler Başlık',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Hizmetlerimiz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'End-to-end iş çözümleri sunuyoruz', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Hizmetler Grid',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 40, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💼 Stratejik Danışmanlık' } },
                        { type: 'text', props: { content: 'İş süreçlerinizi analiz eder, verimliliği artırır ve rekabet avantajı sağlarız.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📊 Veri Analitiği' } },
                        { type: 'text', props: { content: 'Büyük veri analizi ile stratejik kararlarınızı veriye dayalı hale getirin.' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚀 Dijital Dönüşüm' } },
                        { type: 'text', props: { content: 'İşletmenizi geleceğe taşıyacak teknoloji çözümleri sunuyoruz.' } },
                    ],
                },
            ],
        },
        {
            name: 'Rakamlarla Biz',
            settings: {
                backgroundColor: '#1e3a5f',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '20+', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Yıllık Deneyim', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '500+', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Tamamlanan Proje', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '150+', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Uzman Kadro', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '30+', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Ülke', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'İletişim',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Bizimle İletişime Geçin' } },
                        { type: 'text', props: { content: 'Uzman ekibimiz sorularınızı yanıtlamak için hazır.' } },
                        { type: 'text', props: { content: '📍 İstanbul, Türkiye\n📞 +90 212 123 4567\n📧 info@company.com' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'form', props: {} },
                    ],
                },
            ],
        },
    ],
};

/**
 * Restaurant Template - YENİ
 */
const restaurantMenu: SectionTemplate = {
    id: 'template_restaurant_menu',
    name: 'Restaurant & Cafe',
    category: 'restaurant',
    description: 'Restoran ve kafe için menü ve rezervasyon şablonu',
    thumbnail: '/templates/restaurant-menu.jpg',
    tags: ['restaurant', 'cafe', 'menu', 'food'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#1a1a1a',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: '🍽️ [Restoran Adı]', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Geleneksel lezzetler, modern sunum', textAlign: 'center', fontSize: 20 } },
                        { type: 'button', props: { text: 'Rezervasyon Yap', link: '#reservation', variant: 'primary', size: 'large' } },
                    ],
                },
            ],
        },
        {
            name: 'Hakkımızda',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-restaurant.jpg', alt: 'Restaurant' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Hikayemiz' } },
                        { type: 'text', props: { content: '2005\'ten beri aile sıcaklığıyla misafirlerimizi ağırlıyoruz. Taze ve yerel malzemelerle hazırlanan yemeklerimiz, geleneksel tariflerin modern yorumlarıdır.' } },
                        { type: 'text', props: { content: '⏰ Açılış Saatleri:\nPazartesi - Cuma: 11:00 - 23:00\nCumartesi - Pazar: 10:00 - 00:00' } },
                    ],
                },
            ],
        },
        {
            name: 'Menü Başlık',
            settings: {
                backgroundColor: '#f8f8f8',
                padding: { top: 60, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📜 Menümüz', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Menü',
            settings: {
                backgroundColor: '#f8f8f8',
                padding: { top: 20, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🥗 Başlangıçlar' } },
                        { type: 'text', props: { content: 'Mercimek Çorbası - ₺45\nHumus Tabağı - ₺65\nSigara Böreği - ₺55' } },
                        { type: 'heading', props: { level: 'h3', content: '🍖 Ana Yemekler' } },
                        { type: 'text', props: { content: 'Kuzu Tandır - ₺185\nLevrek Izgara - ₺165\nMantarlı Risotto - ₺125' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🍰 Tatlılar' } },
                        { type: 'text', props: { content: 'Künefe - ₺75\nSütlaç - ₺45\nÇikolatalı Sufle - ₺85' } },
                        { type: 'heading', props: { level: 'h3', content: '🍷 İçecekler' } },
                        { type: 'text', props: { content: 'Türk Kahvesi - ₺35\nTaze Sıkım Meyve Suyu - ₺45\nEv Yapımı Limonata - ₺40' } },
                    ],
                },
            ],
        },
        {
            name: 'Rezervasyon',
            settings: {
                backgroundColor: '#1a1a1a',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📅 Rezervasyon', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Özel günleriniz için yerinizi ayırtın', textAlign: 'center' } },
                        { type: 'form', props: {} },
                    ],
                },
            ],
        },
    ],
};

/**
 * Event Template - YENİ
 */
const eventPage: SectionTemplate = {
    id: 'template_event_conference',
    name: 'Event & Conference',
    category: 'event',
    description: 'Konferans ve etkinlik tanıtım sayfası',
    thumbnail: '/templates/event-conference.jpg',
    tags: ['event', 'conference', 'summit', 'meetup'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: '#7c3aed',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'text', props: { content: '15-16 Mart 2026 • İstanbul', textAlign: 'center', fontSize: 16 } },
                        { type: 'heading', props: { level: 'h1', content: 'Tech Summit 2026', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Teknolojinin geleceğini şekillendiren liderler bir arada', textAlign: 'center', fontSize: 20 } },
                        { type: 'button', props: { text: 'Bilet Al', link: '#tickets', variant: 'secondary', size: 'large' } },
                    ],
                },
            ],
        },
        {
            name: 'Konuşmacılar Başlık',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🎤 Konuşmacılar', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Konuşmacılar',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 20, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker1.jpg', alt: 'Speaker 1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Dr. Ayşe Yılmaz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'AI Researcher, Google', textAlign: 'center', fontSize: 14 } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker2.jpg', alt: 'Speaker 2' } },
                        { type: 'heading', props: { level: 'h4', content: 'Mehmet Kaya', textAlign: 'center' } },
                        { type: 'text', props: { content: 'CTO, Startup X', textAlign: 'center', fontSize: 14 } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker3.jpg', alt: 'Speaker 3' } },
                        { type: 'heading', props: { level: 'h4', content: 'Zeynep Demir', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Product Lead, Meta', textAlign: 'center', fontSize: 14 } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker4.jpg', alt: 'Speaker 4' } },
                        { type: 'heading', props: { level: 'h4', content: 'Can Öztürk', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Founder, TechCo', textAlign: 'center', fontSize: 14 } },
                    ],
                },
            ],
        },
        {
            name: 'Program',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📋 Program', textAlign: 'center' } },
                        { type: 'text', props: { content: '09:00 - Kayıt & Kahvaltı\n10:00 - Açılış Konuşması\n11:00 - AI & Machine Learning Paneli\n13:00 - Öğle Yemeği & Networking\n14:30 - Workshop Oturumları\n17:00 - Kapanış & Kokteyl', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Biletler',
            settings: {
                backgroundColor: '#7c3aed',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Early Bird', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺799', textAlign: 'center' } },
                        { type: 'text', props: { content: '✓ Tüm oturumlar\n✓ Networking etkinlikleri\n✓ Yiyecek & İçecek', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Satın Al', link: '#', variant: 'secondary' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Regular', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺1.199', textAlign: 'center' } },
                        { type: 'text', props: { content: '✓ Tüm Early Bird özellikleri\n✓ Workshop erişimi\n✓ Konuşmacı meet & greet', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Satın Al', link: '#', variant: 'secondary' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'VIP', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺2.499', textAlign: 'center' } },
                        { type: 'text', props: { content: '✓ Tüm Regular özellikleri\n✓ Ön sıra koltuk\n✓ VIP lounge erişimi', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Satın Al', link: '#', variant: 'secondary' } },
                    ],
                },
            ],
        },
    ],
};

/**
 * SaaS Pricing Page - YENİ
 */
const saasPricing: SectionTemplate = {
    id: 'template_saas_pricing',
    name: 'SaaS Pricing Page',
    category: 'landing',
    description: 'SaaS ürünleri için fiyatlandırma sayfası',
    thumbnail: '/templates/saas-pricing.jpg',
    tags: ['saas', 'pricing', 'subscription', 'plans'],
    sections: [
        {
            name: 'Header',
            settings: {
                backgroundColor: '#0f172a',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: 'Basit ve Şeffaf Fiyatlandırma', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Her ölçekte işletme için uygun planlar. Gizli maliyet yok.', textAlign: 'center', fontSize: 18 } },
                    ],
                },
            ],
        },
        {
            name: 'Fiyat Planları',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Starter', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺99/ay', textAlign: 'center' } },
                        { type: 'text', props: { content: '✓ 5 Kullanıcı\n✓ 10GB Depolama\n✓ Temel özellikler\n✓ Email desteği', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Başla', link: '#', variant: 'outline' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'text', props: { content: '⭐ EN POPÜLER', textAlign: 'center', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h3', content: 'Professional', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺249/ay', textAlign: 'center' } },
                        { type: 'text', props: { content: '✓ 25 Kullanıcı\n✓ 100GB Depolama\n✓ Gelişmiş özellikler\n✓ Öncelikli destek\n✓ API erişimi', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Başla', link: '#', variant: 'primary' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: 'Enterprise', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: 'Özel', textAlign: 'center' } },
                        { type: 'text', props: { content: '✓ Sınırsız kullanıcı\n✓ Sınırsız depolama\n✓ Tüm özellikler\n✓ 7/24 destek\n✓ Özel entegrasyon', textAlign: 'center' } },
                        { type: 'button', props: { text: 'İletişim', link: '#', variant: 'outline' } },
                    ],
                },
            ],
        },
        {
            name: 'FAQ',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Sıkça Sorulan Sorular', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'FAQ Grid',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 0, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Ücretsiz deneme var mı?' } },
                        { type: 'text', props: { content: 'Evet, 14 gün ücretsiz deneme sunuyoruz. Kredi kartı gerekmez.' } },
                        { type: 'heading', props: { level: 'h4', content: 'Plan değişikliği yapabilir miyim?' } },
                        { type: 'text', props: { content: 'Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz.' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'İptal politikası nedir?' } },
                        { type: 'text', props: { content: 'Taahhüt yok, istediğiniz zaman iptal edebilirsiniz.' } },
                        { type: 'heading', props: { level: 'h4', content: 'Destek nasıl alırım?' } },
                        { type: 'text', props: { content: 'Email, canlı sohbet ve telefon desteği sunuyoruz.' } },
                    ],
                },
            ],
        },
    ],
};

/**
 * About Us Page - YENİ
 */
const aboutUs: SectionTemplate = {
    id: 'template_about_us',
    name: 'About Us Page',
    category: 'business',
    description: 'Şirket tanıtım ve hakkımızda sayfası',
    thumbnail: '/templates/about-us.jpg',
    tags: ['about', 'company', 'team', 'mission'],
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
                        { type: 'heading', props: { level: 'h1', content: 'Hakkımızda', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Teknoloji ile geleceği şekillendiriyoruz', textAlign: 'center', fontSize: 20 } },
                    ],
                },
            ],
        },
        {
            name: 'Mission',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Misyonumuz' } },
                        { type: 'text', props: { content: 'İnovatif teknoloji çözümleriyle işletmelerin dijital dönüşümüne öncülük etmek ve sürdürülebilir büyümelerine katkı sağlamak.' } },
                    ],
                },
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: 'Vizyonumuz' } },
                        { type: 'text', props: { content: 'Türkiye\'nin lider teknoloji şirketi olmak ve global pazarda söz sahibi bir marka haline gelmek.' } },
                    ],
                },
            ],
        },
        {
            name: 'Değerlerimiz',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💡', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'İnovasyon', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Sürekli öğrenme ve yenilikçi düşünce', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🤝', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'Güven', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Şeffaflık ve dürüstlük', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '⭐', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'Mükemmellik', textAlign: 'center' } },
                        { type: 'text', props: { content: 'En yüksek kalite standartları', textAlign: 'center' } },
                    ],
                },
                {
                    width: 25,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🌍', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'Sürdürülebilirlik', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Çevre dostu çözümler', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Ekibimiz Başlık',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '👥 Ekibimiz', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Ekip Grid',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 20, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-team1.jpg', alt: 'CEO' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ali Yılmaz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'CEO & Kurucu', textAlign: 'center' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-team2.jpg', alt: 'CTO' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ayşe Kaya', textAlign: 'center' } },
                        { type: 'text', props: { content: 'CTO', textAlign: 'center' } },
                    ],
                },
                {
                    width: 33.33,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-team3.jpg', alt: 'COO' } },
                        { type: 'heading', props: { level: 'h4', content: 'Mehmet Demir', textAlign: 'center' } },
                        { type: 'text', props: { content: 'COO', textAlign: 'center' } },
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
    restaurantMenu,
    eventPage,
    saasPricing,
    aboutUs,
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
