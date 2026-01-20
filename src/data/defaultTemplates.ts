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
    name: 'Modern Tanıtım Sayfası',
    category: 'landing',
    description: 'Hero, özellikler, müşteri yorumları, SSS ve CTA içeren kapsamlı landing page',
    thumbnail: '/templates/landing-modern.jpg',
    tags: ['landing', 'hero', 'features', 'cta', 'stats', 'testimonials', 'faq'],
    sections: [
        {
            name: 'Hero Section',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 700,
            },
            columns: [
                {
                    width: 55,
                    blocks: [
                        { type: 'text', props: { content: '🚀 Yeni nesil platform', fontSize: 16 } },
                        { type: 'heading', props: { level: 'h1', content: 'İşinizi Dijital Dünyada Zirveye Taşıyın', fontSize: 56 } },
                        { type: 'text', props: { content: 'Yapay zeka destekli araçlarımızla işinizi otomatikleştirin, verimliliğinizi artırın ve rakiplerinizin önüne geçin. 10.000+ işletme bize güveniyor.', fontSize: 20 } },
                        { type: 'button', props: { text: '🎯 Ücretsiz Başlayın', link: '#signup', variant: 'primary', size: 'large' } },
                        { type: 'button', props: { text: '▶️ Demo İzle', link: '#demo', variant: 'outline', size: 'large' } },
                        { type: 'text', props: { content: '✓ Kredi kartı gerektirmez  ✓ 14 gün ücretsiz  ✓ İstediğiniz zaman iptal', fontSize: 14 } },
                    ],
                },
                {
                    width: 45,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-hero.jpg', alt: 'Platform Dashboard' } },
                    ],
                },
            ],
        },
        {
            name: 'Güven Logoları',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 30, right: 40, bottom: 30, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'text', props: { content: 'Dünya liderleri tarafından kullanılıyor', textAlign: 'center', fontSize: 14 } },
                        { type: 'text', props: { content: '🏢 Google  •  🏢 Microsoft  •  🏢 Amazon  •  🏢 Meta  •  🏢 Apple  •  🏢 Netflix', textAlign: 'center', fontSize: 18 } },
                    ],
                },
            ],
        },
        {
            name: 'İstatistikler',
            settings: {
                backgroundColor: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '10K+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Aktif Kullanıcı', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '99.9%', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Uptime Garantisi', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '50+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Entegrasyon', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '24/7', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Canlı Destek', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Özellikler Başlık',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 80, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🎯 Neden Bizi Tercih Etmelisiniz?', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Sektör lideri özelliklerimizle rakiplerinizin önüne geçin', textAlign: 'center', fontSize: 18 } },
                    ],
                },
            ],
        },
        {
            name: 'Özellik Kartları',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 40, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '⚡ Yıldırım Hızı' } },
                        { type: 'text', props: { content: 'Milisaniye cinsinden yanıt süreleri. Global CDN altyapısı ile kullanıcılarınız asla beklemez.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔒 Kurumsal Güvenlik' } },
                        { type: 'text', props: { content: 'End-to-end şifreleme, KVKK/GDPR uyumlu altyapı ve SOC 2 Type II sertifikası.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📈 Sınırsız Ölçek' } },
                        { type: 'text', props: { content: 'Auto-scaling teknolojisi ile işiniz büyüdükçe altyapınız otomatik ölçeklenir.' } },
                    ]
                },
            ],
        },
        {
            name: 'Özellik Kartları 2',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 0, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🤖 AI Destekli' } },
                        { type: 'text', props: { content: 'Yapay zeka asistanımız ile iş süreçlerinizi otomatikleştirin ve akıllı kararlar alın.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔗 50+ Entegrasyon' } },
                        { type: 'text', props: { content: 'Slack, Teams, Jira, Notion ve daha fazlası ile sorunsuz entegrasyon.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📊 Detaylı Analitik' } },
                        { type: 'text', props: { content: 'Gerçek zamanlı dashboard ve özelleştirilebilir raporlarla verilerinizi anlayın.' } },
                    ]
                },
            ],
        },
        {
            name: 'Müşteri Yorumları',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '💬 Müşterilerimiz Ne Diyor?', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Yorumlar Grid',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 0, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Bu platform işimizi tamamen değiştirdi. Verimliliğimiz %300 arttı!"', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Ahmet Y., CEO @ TechCorp', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Müşteri desteği mükemmel. 7/24 yanıt alıyoruz."', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Zeynep K., CTO @ StartupX', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Kurulumu sadece 5 dakika sürdü. Kullanımı çok kolay!"', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Mehmet D., Founder @ AppLab', textAlign: 'center', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'SSS Başlık',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 80, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '❓ Sık Sorulan Sorular', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'SSS İçerik',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 40, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Ücretsiz deneme süresi var mı?' } },
                        { type: 'text', props: { content: 'Evet! 14 gün ücretsiz deneme sunuyoruz. Kredi kartı bilgisi gerektirmez.' } },
                        { type: 'heading', props: { level: 'h4', content: 'İstediğim zaman iptal edebilir miyim?' } },
                        { type: 'text', props: { content: 'Kesinlikle. Bağlayıcı sözleşme yoktur, istediğiniz zaman iptal edebilirsiniz.' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?' } },
                        { type: 'text', props: { content: 'Kredi kartı, banka havalesi ve PayPal ile ödeme yapabilirsiniz.' } },
                        { type: 'heading', props: { level: 'h4', content: 'Kurumsal planlar mevcut mu?' } },
                        { type: 'text', props: { content: 'Evet, özel kurumsal planlarımız için satış ekibimizle iletişime geçin.' } },
                    ]
                },
            ],
        },
        {
            name: 'CTA Section',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🚀 Başlamaya Hazır mısınız?', textAlign: 'center', fontSize: 42 } },
                        { type: 'text', props: { content: 'Bugün ücretsiz deneyin ve farkı görün. Binlerce işletme zaten aramızda.', textAlign: 'center', fontSize: 20 } },
                        { type: 'button', props: { text: '🎯 Ücretsiz Başlayın', link: '#signup', variant: 'secondary', size: 'large' } },
                        { type: 'text', props: { content: '✓ 14 gün ücretsiz  ✓ Kredi kartı gerekmez  ✓ Anında kurulum', textAlign: 'center', fontSize: 14 } },
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
    name: 'Yaratıcı Portfolyo',
    category: 'portfolio',
    description: 'Kişisel marka, yetenekler, deneyim ve projeler için yaratıcı portfolio şablonu',
    thumbnail: '/templates/portfolio-creative.jpg',
    tags: ['portfolio', 'projects', 'creative', 'personal', 'skills', 'experience'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                padding: { top: 150, right: 40, bottom: 150, left: 40 },
                minHeight: 700,
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'text', props: { content: '👋 Merhaba, Ben', textAlign: 'center', fontSize: 20 } },
                        { type: 'heading', props: { level: 'h1', content: '[İsminiz Soyadınız]', textAlign: 'center', fontSize: 64 } },
                        { type: 'text', props: { content: '🎨 UI/UX Tasarımcı  •  💻 Full Stack Developer  •  🚀 Problem Çözücü', textAlign: 'center', fontSize: 20 } },
                        { type: 'button', props: { text: '📁 Projelerimi Gör', link: '#projects', variant: 'primary', size: 'large' } },
                        { type: 'button', props: { text: '📧 İletişime Geç', link: '#contact', variant: 'outline', size: 'large' } },
                    ],
                },
            ],
        },
        {
            name: 'Hakkımda',
            settings: {
                backgroundColor: '#1e293b',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 35,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-avatar.jpg', alt: 'Profile Photo' } },
                    ],
                },
                {
                    width: 65,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '👨‍💻 Hakkımda' } },
                        { type: 'text', props: { content: '10+ yıllık deneyimle dijital ürünler tasarlıyor ve geliştiriyorum. Kullanıcı odaklı tasarım yaklaşımımla markaların dijital dönüşümüne öncülük ediyorum. Startup\'lardan Fortune 500 şirketlerine kadar geniş bir yelpazede çalıştım.', fontSize: 18 } },
                        { type: 'text', props: { content: '🎯 50+ Başarılı Proje  •  🤝 30+ Mutlu Müşteri  •  🏆 5+ Ödül  •  🌍 10+ Ülke', fontSize: 16 } },
                        { type: 'button', props: { text: '📄 CV İndir', link: '#cv', variant: 'outline' } },
                    ],
                },
            ],
        },
        {
            name: 'Yetenekler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🛠️ Yeteneklerim', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Modern teknolojiler ve araçlarla çalışıyorum', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Yetenek Grid',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 0, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '💻 Frontend', textAlign: 'center' } },
                        { type: 'text', props: { content: 'React, Next.js, Vue\nTypeScript, Tailwind\nHTML5, CSS3', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '⚙️ Backend', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Node.js, Python\nPostgreSQL, MongoDB\nGraphQL, REST', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🎨 Tasarım', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Figma, Sketch\nAdobe XD\nUser Research', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🚀 DevOps', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Docker, AWS\nGitHub Actions\nVercel, Netlify', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Projeler Başlık',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 80, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🔥 Öne Çıkan Projeler', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Son dönemde tamamladığım bazı projeler', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Proje Grid 1',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 40, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'image', props: { src: '/placeholder-project1.jpg', alt: 'E-Ticaret' } },
                        { type: 'heading', props: { level: 'h3', content: '🛒 E-Ticaret Platformu' } },
                        { type: 'text', props: { content: 'Modern e-ticaret çözümü. Aylık 1M+ ziyaretçi. React, Node.js, PostgreSQL kullanıldı.' } },
                        { type: 'button', props: { text: 'Projeyi İncele →', link: '#', variant: 'outline' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'image', props: { src: '/placeholder-project2.jpg', alt: 'Mobil App' } },
                        { type: 'heading', props: { level: 'h3', content: '📱 Fintech Mobil App' } },
                        { type: 'text', props: { content: '500K+ indirme. App Store 4.8 puan. React Native, Firebase, Stripe entegrasyonu.' } },
                        { type: 'button', props: { text: 'Projeyi İncele →', link: '#', variant: 'outline' } },
                    ]
                },
            ],
        },
        {
            name: 'Proje Grid 2',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 20, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'image', props: { src: '/placeholder-project3.jpg', alt: 'Dashboard' } },
                        { type: 'heading', props: { level: 'h3', content: '📊 Analytics Dashboard' } },
                        { type: 'text', props: { content: 'Gerçek zamanlı veri görselleştirme. D3.js, Next.js, WebSocket kullanıldı.' } },
                        { type: 'button', props: { text: 'Projeyi İncele →', link: '#', variant: 'outline' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'image', props: { src: '/placeholder-project4.jpg', alt: 'AI' } },
                        { type: 'heading', props: { level: 'h3', content: '🤖 AI Chatbot' } },
                        { type: 'text', props: { content: 'Müşteri hizmetleri otomasyonu. GPT-4, Python, FastAPI ile geliştirildi.' } },
                        { type: 'button', props: { text: 'Projeyi İncele →', link: '#', variant: 'outline' } },
                    ]
                },
            ],
        },
        {
            name: 'Referanslar',
            settings: {
                backgroundColor: '#1e293b',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '💬 Müşteri Yorumları', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Referans Grid',
            settings: {
                backgroundColor: '#1e293b',
                padding: { top: 0, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐' } },
                        { type: 'text', props: { content: '"Harika bir iş çıkardı! Projemizi zamanında ve beklentilerin üzerinde teslim etti."' } },
                        { type: 'text', props: { content: '— Ahmet Y., CEO @ TechStartup', fontSize: 14 } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐' } },
                        { type: 'text', props: { content: '"Teknik bilgisi ve iletişimi mükemmel. Kesinlikle tekrar çalışırız."' } },
                        { type: 'text', props: { content: '— Zeynep K., Product Manager @ BigCorp', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'İletişim',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 50,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🚀 Birlikte Çalışalım' } },
                        { type: 'text', props: { content: 'Yeni projeler için her zaman açığım. Fikirlerinizi hayata geçirmek için sabırsızlanıyorum!', fontSize: 18 } },
                        { type: 'text', props: { content: '📧 email@example.com\n📱 +90 555 123 4567\n📍 İstanbul, Türkiye' } },
                        { type: 'text', props: { content: '🔗 LinkedIn  •  GitHub  •  Twitter  •  Dribbble', fontSize: 14 } },
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
    name: 'Dergi Tarzı Blog',
    category: 'blog',
    description: 'Kategoriler, popüler yazılar ve yazar bölümü içeren modern blog şablonu',
    thumbnail: '/templates/blog-magazine.jpg',
    tags: ['blog', 'magazine', 'posts', 'news', 'categories', 'author'],
    sections: [
        {
            name: 'Header',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h1', content: '📰 [Blog Adı]', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Teknoloji • Tasarım • Yaratıcılık • Girişimcilik', textAlign: 'center', fontSize: 18 } },
                    ],
                },
            ],
        },
        {
            name: 'Kategoriler',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 30, right: 40, bottom: 30, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'text', props: { content: '🏠 Ana Sayfa  •  💻 Teknoloji  •  🎨 Tasarım  •  📱 Mobil  •  🤖 AI  •  🚀 Startup  •  📚 Kaynaklar', textAlign: 'center', fontSize: 16 } },
                    ],
                },
            ],
        },
        {
            name: 'Featured Post',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
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
                        { type: 'text', props: { content: '🔥 ÖNE ÇIKAN YAZI', fontSize: 14 } },
                        { type: 'heading', props: { level: 'h2', content: 'Yapay Zeka ile Tasarımın Geleceği: 2026 Trendleri', fontSize: 32 } },
                        { type: 'text', props: { content: 'AI araçları tasarım süreçlerini nasıl dönüştürüyor? Figma AI, Midjourney ve ChatGPT ile tasarım iş akışları...', fontSize: 18 } },
                        { type: 'text', props: { content: '👤 Ahmet Yılmaz · 📅 15 Ocak 2026 · ⏱️ 8 dk okuma', fontSize: 14 } },
                        { type: 'button', props: { text: 'Yazıyı Oku →', link: '#', variant: 'primary', size: 'large' } },
                    ],
                },
            ],
        },
        {
            name: 'Son Yazılar Başlık',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 60, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📝 Son Yazılar', textAlign: 'center' } },
                        { type: 'text', props: { content: 'En güncel blog yazılarımız', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Post Grid 1',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 40, right: 40, bottom: 20, left: 40 },
            },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'image', props: { src: '/placeholder-post1.jpg', alt: 'Post 1' } },
                        { type: 'text', props: { content: '💻 Teknoloji', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Web 3.0 ve Blockchain: Geleceğin İnterneti' } },
                        { type: 'text', props: { content: 'Merkezi olmayan web teknolojileri nasıl çalışıyor?', fontSize: 14 } },
                        { type: 'text', props: { content: '⏱️ 5 dk okuma', fontSize: 12 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'image', props: { src: '/placeholder-post2.jpg', alt: 'Post 2' } },
                        { type: 'text', props: { content: '🎨 Tasarım', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'React vs Vue 2026: Hangisini Seçmeli?' } },
                        { type: 'text', props: { content: 'Frontend framework karşılaştırması ve öneriler', fontSize: 14 } },
                        { type: 'text', props: { content: '⏱️ 7 dk okuma', fontSize: 12 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'image', props: { src: '/placeholder-post3.jpg', alt: 'Post 3' } },
                        { type: 'text', props: { content: '🚀 Startup', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Minimal Tasarım: Az Çoktur Felsefesi' } },
                        { type: 'text', props: { content: 'Sade ve etkili tasarım için 10 ipucu', fontSize: 14 } },
                        { type: 'text', props: { content: '⏱️ 4 dk okuma', fontSize: 12 } },
                    ]
                },
            ],
        },
        {
            name: 'Post Grid 2',
            settings: {
                backgroundColor: '#ffffff',
                padding: { top: 20, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'image', props: { src: '/placeholder-post4.jpg', alt: 'Post 4' } },
                        { type: 'text', props: { content: '🤖 AI', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'ChatGPT ile Kod Yazma Rehberi' } },
                        { type: 'text', props: { content: 'AI destekli geliştirme teknikleri', fontSize: 14 } },
                        { type: 'text', props: { content: '⏱️ 6 dk okuma', fontSize: 12 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'image', props: { src: '/placeholder-post5.jpg', alt: 'Post 5' } },
                        { type: 'text', props: { content: '📱 Mobil', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Flutter vs React Native 2026' } },
                        { type: 'text', props: { content: 'Cross-platform geliştirme karşılaştırması', fontSize: 14 } },
                        { type: 'text', props: { content: '⏱️ 8 dk okuma', fontSize: 12 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'image', props: { src: '/placeholder-post6.jpg', alt: 'Post 6' } },
                        { type: 'text', props: { content: '💡 İpuçları', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Verimli Çalışma İçin 10 Araç' } },
                        { type: 'text', props: { content: 'Produktivite artıran uygulamalar', fontSize: 14 } },
                        { type: 'text', props: { content: '⏱️ 5 dk okuma', fontSize: 12 } },
                    ]
                },
            ],
        },
        {
            name: 'Popüler Yazılar',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🔥 En Popüler Yazılar', textAlign: 'center' } },
                    ],
                },
            ],
        },
        {
            name: 'Popüler Grid',
            settings: {
                backgroundColor: '#f8fafc',
                padding: { top: 0, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '1️⃣ JavaScript ES2026 Yenilikleri' } },
                        { type: 'text', props: { content: '15K görüntüleme', fontSize: 12 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '2️⃣ TypeScript Best Practices' } },
                        { type: 'text', props: { content: '12K görüntüleme', fontSize: 12 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '3️⃣ Next.js 16 Rehberi' } },
                        { type: 'text', props: { content: '10K görüntüleme', fontSize: 12 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '4️⃣ CSS Grid Mastery' } },
                        { type: 'text', props: { content: '8K görüntüleme', fontSize: 12 } },
                    ]
                },
            ],
        },
        {
            name: 'Yazar Hakkında',
            settings: {
                backgroundColor: '#1e293b',
                padding: { top: 60, right: 40, bottom: 60, left: 40 },
            },
            columns: [
                {
                    width: 30,
                    blocks: [
                        { type: 'image', props: { src: '/placeholder-author.jpg', alt: 'Yazar' } },
                    ],
                },
                {
                    width: 70,
                    blocks: [
                        { type: 'heading', props: { level: 'h3', content: '👨‍💻 Yazar Hakkında' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ahmet Yılmaz' } },
                        { type: 'text', props: { content: '10+ yıllık yazılım geliştirme deneyimi. Google Developer Expert. React, Node.js ve AI konularında uzman. Haftalık olarak teknoloji ve tasarım üzerine yazılar yayınlıyorum.' } },
                        { type: 'text', props: { content: '🐦 @ahmetyilmaz  •  💼 LinkedIn  •  🐙 GitHub', fontSize: 14 } },
                    ],
                },
            ],
        },
        {
            name: 'Newsletter',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: { top: 80, right: 40, bottom: 80, left: 40 },
            },
            columns: [
                {
                    width: 100,
                    blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📬 Bültenimize Abone Olun', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Haftalık en iyi içerikler, özel ipuçları ve kaynaklar doğrudan e-posta kutunuzda.', textAlign: 'center', fontSize: 18 } },
                        { type: 'text', props: { content: '✓ 10.000+ abone  ✓ Spam yok  ✓ İstediğiniz zaman çıkış', textAlign: 'center', fontSize: 14 } },
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
    name: 'Ürün Vitrini',
    category: 'ecommerce',
    description: 'İndirimli ürünler, müşteri yorumları ve güven rozetleri içeren e-ticaret şablonu',
    thumbnail: '/templates/ecommerce-showcase.jpg',
    tags: ['ecommerce', 'products', 'shop', 'sale', 'reviews', 'trust'],
    sections: [
        {
            name: 'Promo Banner',
            settings: {
                backgroundColor: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)',
                padding: { top: 15, right: 40, bottom: 15, left: 40 },
            },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'text', props: { content: '🔥 BÜYÜK KIŞ İNDİRİMİ! %50\'ye varan fırsatlar - Sadece 3 gün kaldı! 🔥', textAlign: 'center', fontSize: 16 } },
                    ]
                },
            ],
        },
        {
            name: 'Hero Banner',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'text', props: { content: '✨ YENİ SEZON 2026', fontSize: 16 } },
                        { type: 'heading', props: { level: 'h1', content: 'Premium Koleksiyon', fontSize: 56 } },
                        { type: 'text', props: { content: 'Özel tasarım ürünlerle tarzınızı yansıtın. Ücretsiz kargo, kolay iade.', fontSize: 18 } },
                        { type: 'button', props: { text: '🛒 Alışverişe Başla', link: '#products', variant: 'primary', size: 'large' } },
                        { type: 'text', props: { content: '✓ Ücretsiz Kargo  ✓ 30 Gün İade  ✓ Güvenli Ödeme', fontSize: 14 } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'image', props: { src: '/placeholder-product-hero.jpg', alt: 'Products' } },
                    ]
                },
            ],
        },
        {
            name: 'Kategoriler',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-cat1.jpg', alt: 'Giyim' } },
                        { type: 'heading', props: { level: 'h4', content: '👕 Giyim', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-cat2.jpg', alt: 'Ayakkabı' } },
                        { type: 'heading', props: { level: 'h4', content: '👟 Ayakkabı', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-cat3.jpg', alt: 'Çanta' } },
                        { type: 'heading', props: { level: 'h4', content: '👜 Çanta', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-cat4.jpg', alt: 'Aksesuar' } },
                        { type: 'heading', props: { level: 'h4', content: '⌚ Aksesuar', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Öne Çıkan Başlık',
            settings: { backgroundColor: '#f8fafc', padding: { top: 60, right: 40, bottom: 20, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '⭐ Öne Çıkan Ürünler', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Ürün Grid',
            settings: { backgroundColor: '#f8fafc', padding: { top: 20, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-product1.jpg', alt: 'Ürün 1' } },
                        { type: 'text', props: { content: '⭐ 4.9', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Premium T-Shirt' } },
                        { type: 'text', props: { content: '₺299.00', fontSize: 18 } },
                        { type: 'button', props: { text: '🛒 Sepete Ekle', link: '#', variant: 'primary' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-product2.jpg', alt: 'Ürün 2' } },
                        { type: 'text', props: { content: '⭐ 4.8', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Deri Cüzdan' } },
                        { type: 'text', props: { content: '₺449.00', fontSize: 18 } },
                        { type: 'button', props: { text: '🛒 Sepete Ekle', link: '#', variant: 'primary' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-product3.jpg', alt: 'Ürün 3' } },
                        { type: 'text', props: { content: '⭐ 4.9', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Sneaker' } },
                        { type: 'text', props: { content: '₺899.00', fontSize: 18 } },
                        { type: 'button', props: { text: '🛒 Sepete Ekle', link: '#', variant: 'primary' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-product4.jpg', alt: 'Ürün 4' } },
                        { type: 'text', props: { content: '⭐ 4.7', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h4', content: 'Akıllı Saat' } },
                        { type: 'text', props: { content: '₺1.299.00', fontSize: 18 } },
                        { type: 'button', props: { text: '🛒 Sepete Ekle', link: '#', variant: 'primary' } },
                    ]
                },
            ],
        },
        {
            name: 'İndirimli Ürünler',
            settings: { backgroundColor: '#dc2626', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🏷️ İNDİRİMLİ ÜRÜNLER - %50\'ye Varan Fırsatlar!', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Müşteri Yorumları',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Harika kalite, hızlı kargo!"', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Ayşe K.', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Ürünler fotoğraftaki gibi."', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Mehmet T.', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Fiyat/performans harika!"', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Zeynep A.', textAlign: 'center', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'Güven Rozetleri',
            settings: { backgroundColor: '#1e293b', padding: { top: 40, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🚚 Ücretsiz Kargo', textAlign: 'center' } },
                        { type: 'text', props: { content: '150₺ üzeri', textAlign: 'center', fontSize: 12 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '↩️ Kolay İade', textAlign: 'center' } },
                        { type: 'text', props: { content: '30 gün', textAlign: 'center', fontSize: 12 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🔒 Güvenli Ödeme', textAlign: 'center' } },
                        { type: 'text', props: { content: 'SSL şifreleme', textAlign: 'center', fontSize: 12 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '📞 7/24 Destek', textAlign: 'center' } },
                        { type: 'text', props: { content: 'WhatsApp', textAlign: 'center', fontSize: 12 } },
                    ]
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
    name: 'Kurumsal İşletme',
    category: 'business',
    description: 'Vaka çalışmaları, müşteri referansları ve detaylı hizmetler içeren kurumsal şablon',
    thumbnail: '/templates/business-corporate.jpg',
    tags: ['business', 'corporate', 'services', 'b2b', 'case-studies'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 600,
            },
            columns: [
                {
                    width: 55, blocks: [
                        { type: 'text', props: { content: '🏆 20+ Yıllık Deneyim', fontSize: 16 } },
                        { type: 'heading', props: { level: 'h1', content: 'Profesyonel İş Çözümleri', fontSize: 52 } },
                        { type: 'text', props: { content: 'Fortune 500 şirketlerinin güvendiği partner. İşinizi global ölçekte büyütmek için yanınızdayız.', fontSize: 18 } },
                        { type: 'button', props: { text: '📅 Randevu Al', link: '#contact', variant: 'primary', size: 'large' } },
                        { type: 'button', props: { text: '📋 Hizmetlerimiz', link: '#services', variant: 'outline', size: 'large' } },
                    ]
                },
                {
                    width: 45, blocks: [
                        { type: 'image', props: { src: '/placeholder-corporate.jpg', alt: 'Corporate' } },
                    ]
                },
            ],
        },
        {
            name: 'Güven Logoları',
            settings: { backgroundColor: '#ffffff', padding: { top: 40, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'text', props: { content: '🤝 Bize güvenen global markalar', textAlign: 'center', fontSize: 14 } },
                        { type: 'text', props: { content: '🏢 Microsoft  •  🏢 Google  •  🏢 Amazon  •  🏢 Meta  •  🏢 Apple  •  🏢 IBM', textAlign: 'center', fontSize: 16 } },
                    ]
                },
            ],
        },
        {
            name: 'Hizmetler Başlık',
            settings: { backgroundColor: '#f8fafc', padding: { top: 80, right: 40, bottom: 20, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🎯 Hizmetlerimiz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'End-to-end iş çözümleri ile işinizi büyütün', textAlign: 'center', fontSize: 18 } },
                    ]
                },
            ],
        },
        {
            name: 'Hizmetler Grid',
            settings: { backgroundColor: '#f8fafc', padding: { top: 40, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💼 Stratejik Danışmanlık' } },
                        { type: 'text', props: { content: 'İş süreçlerinizi analiz eder, verimliliği artırır ve rekabet avantajı sağlarız.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📊 Veri Analitiği' } },
                        { type: 'text', props: { content: 'Big data analizi ile stratejik kararlarınızı veriye dayalı hale getirin.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚀 Dijital Dönüşüm' } },
                        { type: 'text', props: { content: 'İşletmenizi geleceğe taşıyacak teknoloji çözümleri sunuyoruz.' } },
                    ]
                },
            ],
        },
        {
            name: 'Hizmetler Grid 2',
            settings: { backgroundColor: '#f8fafc', padding: { top: 0, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🔒 Siber Güvenlik' } },
                        { type: 'text', props: { content: 'Kurumsal verilerinizi koruyacak kapsamlı güvenlik çözümleri.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '☁️ Cloud Çözümleri' } },
                        { type: 'text', props: { content: 'AWS, Azure ve GCP ortaklarıyla ölçeklenebilir altyapı.' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🤖 AI & Otomasyon' } },
                        { type: 'text', props: { content: 'Yapay zeka ile iş süreçlerinizi otomatikleştirin.' } },
                    ]
                },
            ],
        },
        {
            name: 'Rakamlarla Biz',
            settings: { backgroundColor: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '20+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Yıllık Deneyim', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '500+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Tamamlanan Proje', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '150+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Uzman Kadro', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '30+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Ülke', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Müşteri Referansları',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '💬 Müşteri Referansları', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Referans Grid',
            settings: { backgroundColor: '#ffffff', padding: { top: 0, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐' } },
                        { type: 'text', props: { content: '"Dijital dönüşüm projemizde mükemmel bir iş ortağı oldular. ROI beklentilerimizi aştık."' } },
                        { type: 'text', props: { content: '— CEO, Fortune 500 Şirketi', fontSize: 14 } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐' } },
                        { type: 'text', props: { content: '"Veri analitiği çözümleri sayesinde karar alma süreçlerimiz %40 hızlandı."' } },
                        { type: 'text', props: { content: '— CTO, Global Fintech', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'İletişim',
            settings: { backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: { top: 100, right: 40, bottom: 100, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📞 Bizimle İletişime Geçin' } },
                        { type: 'text', props: { content: 'Uzman ekibimiz sorularınızı yanıtlamak ve ihtiyaçlarınızı dinlemek için hazır.', fontSize: 18 } },
                        { type: 'text', props: { content: '📍 İstanbul, Türkiye\n📞 +90 212 123 4567\n📧 info@company.com' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'form', props: {} },
                    ]
                },
            ],
        },
    ],
};

/**
 * Restaurant Template - Gelişmiş
 */
const restaurantMenu: SectionTemplate = {
    id: 'template_restaurant_menu',
    name: 'Restoran ve Kafe',
    category: 'restaurant',
    description: 'Galeri, müşteri yorumları ve detaylı menü içeren restoran şablonu',
    thumbnail: '/templates/restaurant-menu.jpg',
    tags: ['restaurant', 'cafe', 'menu', 'food', 'gallery', 'reviews'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 600,
            },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'text', props: { content: '✨ 2005\'ten beri', textAlign: 'center', fontSize: 16 } },
                        { type: 'heading', props: { level: 'h1', content: '🍽️ [Restoran Adı]', textAlign: 'center', fontSize: 56 } },
                        { type: 'text', props: { content: 'Geleneksel lezzetler, modern sunum | Aile sıcaklığı', textAlign: 'center', fontSize: 20 } },
                        { type: 'button', props: { text: '📅 Rezervasyon Yap', link: '#reservation', variant: 'primary', size: 'large' } },
                        { type: 'button', props: { text: '📜 Menüyü Gör', link: '#menu', variant: 'outline', size: 'large' } },
                    ]
                },
            ],
        },
        {
            name: 'Özellikler',
            settings: { backgroundColor: '#ffffff', padding: { top: 40, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🍃 Taze Malzeme', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Yerel çiftliklerden', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '👨‍🍳 Usta Şefler', textAlign: 'center' } },
                        { type: 'text', props: { content: '20+ yıl deneyim', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🌟 Michelin Kalitesi', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Ödüllü lezzetler', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🚗 Vale Parking', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Ücretsiz otopark', textAlign: 'center', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'Hakkımızda',
            settings: { backgroundColor: '#f8f8f8', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'image', props: { src: '/placeholder-restaurant.jpg', alt: 'Restaurant' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📖 Hikayemiz' } },
                        { type: 'text', props: { content: '2005\'ten beri aile sıcaklığıyla misafirlerimizi ağırlıyoruz. Taze ve yerel malzemelerle hazırlanan yemeklerimiz, geleneksel tariflerin modern yorumlarıdır.' } },
                        { type: 'text', props: { content: '⏰ Açılış Saatleri:\nPazartesi - Cuma: 11:00 - 23:00\nCumartesi - Pazar: 10:00 - 00:00' } },
                        { type: 'text', props: { content: '📍 Kadıköy, İstanbul\n📞 +90 216 123 4567', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'Menü Başlık',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 20, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📜 Menümüz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Özenle hazırlanmış lezzetler', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Menü',
            settings: { backgroundColor: '#ffffff', padding: { top: 40, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🥗 Başlangıçlar' } },
                        { type: 'text', props: { content: 'Mercimek Çorbası .......... ₺45\nHumus Tabağı .............. ₺65\nSigara Böreği ............... ₺55\nPatlıcan Salatası ........... ₺50' } },
                        { type: 'heading', props: { level: 'h3', content: '🍖 Ana Yemekler' } },
                        { type: 'text', props: { content: 'Kuzu Tandır ................ ₺185\nLevrek Izgara .............. ₺165\nMantarlı Risotto ........... ₺125\nBonfile Steak .............. ₺220' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🍰 Tatlılar' } },
                        { type: 'text', props: { content: 'Künefe ...................... ₺75\nSütlaç ....................... ₺45\nÇikolatalı Sufle ............ ₺85\nTiramisu .................... ₺70' } },
                        { type: 'heading', props: { level: 'h3', content: '🍷 İçecekler' } },
                        { type: 'text', props: { content: 'Türk Kahvesi .............. ₺35\nTaze Sıkım Meyve Suyu ... ₺45\nEv Yapımı Limonata ....... ₺40\nCappuccino ................. ₺50' } },
                    ]
                },
            ],
        },
        {
            name: 'Yorumlar',
            settings: { backgroundColor: '#f8f8f8', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Şehrin en iyi kuzu tandırı!"', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Google Reviews', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Atmosfer ve hizmet mükemmel."', textAlign: 'center' } },
                        { type: 'text', props: { content: '— TripAdvisor', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐⭐⭐⭐⭐', textAlign: 'center' } },
                        { type: 'text', props: { content: '"Aile yemekleri için ideal."', textAlign: 'center' } },
                        { type: 'text', props: { content: '— Foursquare', textAlign: 'center', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'Rezervasyon',
            settings: { backgroundColor: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📅 Rezervasyon Yaptırın', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Özel günleriniz için masanızı şimdiden ayırtın', textAlign: 'center', fontSize: 18 } },
                        { type: 'form', props: {} },
                    ]
                },
            ],
        },
    ],
};

/**
 * Event Template - Gelişmiş
 */
const eventPage: SectionTemplate = {
    id: 'template_event_conference',
    name: 'Etkinlik ve Konferans',
    category: 'event',
    description: 'Sponsorlar, konum ve detaylı program içeren etkinlik şablonu',
    thumbnail: '/templates/event-conference.jpg',
    tags: ['event', 'conference', 'summit', 'meetup', 'sponsors'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 600,
            },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'text', props: { content: '📅 15-16 Mart 2026 • İstanbul Kongre Merkezi', textAlign: 'center', fontSize: 18 } },
                        { type: 'heading', props: { level: 'h1', content: '🚀 Tech Summit 2026', textAlign: 'center', fontSize: 56 } },
                        { type: 'text', props: { content: 'Teknolojinin geleceğini şekillendiren 50+ lider konuşmacı bir arada', textAlign: 'center', fontSize: 20 } },
                        { type: 'button', props: { text: '🎫 Bilet Al', link: '#tickets', variant: 'secondary', size: 'large' } },
                        { type: 'button', props: { text: '📋 Programı Gör', link: '#program', variant: 'outline', size: 'large' } },
                    ]
                },
            ],
        },
        {
            name: 'Geri Sayım',
            settings: { backgroundColor: '#ffffff', padding: { top: 40, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '45', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Gün', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '12', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Saat', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '50+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Konuşmacı', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '2000+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Katılımcı', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Konuşmacılar Başlık',
            settings: { backgroundColor: '#f8fafc', padding: { top: 80, right: 40, bottom: 20, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🎤 Öne Çıkan Konuşmacılar', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Konuşmacılar',
            settings: { backgroundColor: '#f8fafc', padding: { top: 40, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker1.jpg', alt: 'Speaker 1' } },
                        { type: 'heading', props: { level: 'h4', content: 'Dr. Ayşe Yılmaz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'AI Researcher @ Google', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker2.jpg', alt: 'Speaker 2' } },
                        { type: 'heading', props: { level: 'h4', content: 'Mehmet Kaya', textAlign: 'center' } },
                        { type: 'text', props: { content: 'CTO @ Unicorn Startup', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker3.jpg', alt: 'Speaker 3' } },
                        { type: 'heading', props: { level: 'h4', content: 'Zeynep Demir', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Product Lead @ Meta', textAlign: 'center', fontSize: 14 } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-speaker4.jpg', alt: 'Speaker 4' } },
                        { type: 'heading', props: { level: 'h4', content: 'Can Öztürk', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Founder @ TechCo', textAlign: 'center', fontSize: 14 } },
                    ]
                },
            ],
        },
        {
            name: 'Program',
            settings: { backgroundColor: '#ffffff', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '� Gün 1 - 15 Mart' } },
                        { type: 'text', props: { content: '09:00 - Kayıt & Kahvaltı\n10:00 - Açılış Konuşması\n11:00 - AI & Machine Learning Paneli\n13:00 - Öğle Yemeği & Networking\n14:30 - Workshop: LLM\'ler ile Uygulama Geliştirme\n17:00 - Gün 1 Kapanış & Kokteyl' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📅 Gün 2 - 16 Mart' } },
                        { type: 'text', props: { content: '09:30 - Cloud & DevOps Oturumu\n11:00 - Startup Pitch Competition\n13:00 - Öğle Yemeği\n14:30 - Product Management Paneli\n16:00 - Kapanış & Ödül Töreni\n17:30 - Networking Party' } },
                    ]
                },
            ],
        },
        {
            name: 'Biletler',
            settings: { backgroundColor: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🎟️ Early Bird', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺799', textAlign: 'center', fontSize: 42 } },
                        { type: 'text', props: { content: '✓ Tüm oturumlar\n✓ Networking etkinlikleri\n✓ Yiyecek & İçecek\n✓ Sertifika', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Satın Al', link: '#', variant: 'outline' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐ EN POPÜLER', textAlign: 'center', fontSize: 12 } },
                        { type: 'heading', props: { level: 'h3', content: '🎫 Regular', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺1.199', textAlign: 'center', fontSize: 42 } },
                        { type: 'text', props: { content: '✓ Tüm Early Bird özellikleri\n✓ Workshop erişimi\n✓ Konuşmacı meet & greet\n✓ Kayıt videoları', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Satın Al', link: '#', variant: 'secondary' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💎 VIP', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺2.499', textAlign: 'center', fontSize: 42 } },
                        { type: 'text', props: { content: '✓ Tüm Regular özellikleri\n✓ Ön sıra koltuk\n✓ VIP lounge erişimi\n✓ 1:1 Mentoring', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Satın Al', link: '#', variant: 'outline' } },
                    ]
                },
            ],
        },
        {
            name: 'Sponsorlar',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🏢 Sponsorlarımız', textAlign: 'center' } },
                        { type: 'text', props: { content: '🥇 Gold: Microsoft • Google • AWS\n🥈 Silver: Meta • IBM • Oracle\n🥉 Bronze: Startup X • TechCo • DataFirm', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Konum',
            settings: { backgroundColor: '#1e293b', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📍 Konum', textAlign: 'center' } },
                        { type: 'text', props: { content: 'İstanbul Kongre Merkezi\nHarbiye, Taşkışla Cd. No:9, 34367 Şişli/İstanbul', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Google Maps\'te Aç', link: '#', variant: 'outline' } },
                    ]
                },
            ],
        },
    ],
};

/**
 * SaaS Pricing Page - Gelişmiş
 */
const saasPricing: SectionTemplate = {
    id: 'template_saas_pricing',
    name: 'SaaS Fiyatlandırma',
    category: 'landing',
    description: 'Özellik karşılaştırması, sosyal kanıt ve SSS içeren SaaS fiyatlandırma şablonu',
    thumbnail: '/templates/saas-pricing.jpg',
    tags: ['saas', 'pricing', 'subscription', 'plans', 'comparison'],
    sections: [
        {
            name: 'Header',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                padding: { top: 100, right: 40, bottom: 100, left: 40 },
            },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h1', content: '💰 Basit ve Şeffaf Fiyatlandırma', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Her ölçekte işletme için uygun planlar. Gizli maliyet yok, taahhüt yok.', textAlign: 'center', fontSize: 20 } },
                        { type: 'text', props: { content: '🎉 14 gün ücretsiz deneyin - Kredi kartı gerekmez', textAlign: 'center', fontSize: 16 } },
                    ]
                },
            ],
        },
        {
            name: 'Sosyal Kanıt',
            settings: { backgroundColor: '#ffffff', padding: { top: 40, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'text', props: { content: '🏆 10.000+ müşteri  •  ⭐ 4.9/5 puan  •  🌍 50+ ülke  •  💼 Fortune 500 şirketleri', textAlign: 'center', fontSize: 16 } },
                    ]
                },
            ],
        },
        {
            name: 'Fiyat Planları',
            settings: { backgroundColor: '#f8fafc', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🚀 Starter', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺99/ay', textAlign: 'center', fontSize: 42 } },
                        { type: 'text', props: { content: '✓ 5 Kullanıcı\n✓ 10GB Depolama\n✓ Temel özellikler\n✓ Email desteği\n✓ 7 gün veri saklama', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Ücretsiz Dene', link: '#', variant: 'outline' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'text', props: { content: '⭐ EN POPÜLER', textAlign: 'center', fontSize: 14 } },
                        { type: 'heading', props: { level: 'h3', content: '💼 Professional', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: '₺249/ay', textAlign: 'center', fontSize: 42 } },
                        { type: 'text', props: { content: '✓ 25 Kullanıcı\n✓ 100GB Depolama\n✓ Gelişmiş özellikler\n✓ Öncelikli destek\n✓ API erişimi\n✓ 90 gün veri saklama', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Ücretsiz Dene', link: '#', variant: 'primary' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🏢 Enterprise', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h2', content: 'Özel Teklif', textAlign: 'center', fontSize: 42 } },
                        { type: 'text', props: { content: '✓ Sınırsız kullanıcı\n✓ Sınırsız depolama\n✓ Tüm özellikler\n✓ 7/24 destek\n✓ Özel entegrasyon\n✓ SLA garantisi', textAlign: 'center' } },
                        { type: 'button', props: { text: 'Satış ile Görüş', link: '#', variant: 'outline' } },
                    ]
                },
            ],
        },
        {
            name: 'Güven Rozetleri',
            settings: { backgroundColor: '#0f172a', padding: { top: 40, right: 40, bottom: 40, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🔒 SSL Şifreleme', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '📜 KVKK Uyumlu', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '🛡️ SOC 2 Type II', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h4', content: '☁️ %99.9 Uptime', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'FAQ Başlık',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 20, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '❓ Sıkça Sorulan Sorular', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'FAQ Grid',
            settings: { backgroundColor: '#ffffff', padding: { top: 20, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'Ücretsiz deneme var mı?' } },
                        { type: 'text', props: { content: 'Evet, 14 gün ücretsiz deneme sunuyoruz. Kredi kartı gerekmez, istediğiniz zaman iptal edin.' } },
                        { type: 'heading', props: { level: 'h4', content: 'Plan değişikliği yapabilir miyim?' } },
                        { type: 'text', props: { content: 'Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Fark otomatik hesaplanır.' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h4', content: 'İptal politikası nedir?' } },
                        { type: 'text', props: { content: 'Taahhüt yok! İstediğiniz zaman iptal edebilirsiniz. Kalan süre için iade yapılır.' } },
                        { type: 'heading', props: { level: 'h4', content: 'Destek nasıl alırım?' } },
                        { type: 'text', props: { content: 'Email, canlı sohbet ve telefon desteği sunuyoruz. Enterprise planlarda 7/24 destek.' } },
                    ]
                },
            ],
        },
        {
            name: 'CTA',
            settings: { backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🚀 Hemen Başlayın', textAlign: 'center' } },
                        { type: 'text', props: { content: '14 gün ücretsiz deneyin. Kredi kartı gerekmez.', textAlign: 'center', fontSize: 18 } },
                        { type: 'button', props: { text: 'Ücretsiz Hesap Oluştur', link: '#', variant: 'secondary', size: 'large' } },
                    ]
                },
            ],
        },
    ],
};

/**
 * About Us Page - Gelişmiş
 */
const aboutUs: SectionTemplate = {
    id: 'template_about_us',
    name: 'Hakkımızda Sayfası',
    category: 'business',
    description: 'Tarihçe, istatistikler, ekip ve ofis bilgileri içeren şirket tanıtım şablonu',
    thumbnail: '/templates/about-us.jpg',
    tags: ['about', 'company', 'team', 'mission', 'history'],
    sections: [
        {
            name: 'Hero',
            settings: {
                backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                padding: { top: 120, right: 40, bottom: 120, left: 40 },
                minHeight: 500,
            },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'text', props: { content: '🏢 2005\'ten beri', textAlign: 'center', fontSize: 16 } },
                        { type: 'heading', props: { level: 'h1', content: 'Hakkımızda', textAlign: 'center', fontSize: 52 } },
                        { type: 'text', props: { content: 'Teknoloji ile geleceği şekillendiriyoruz. İnovasyon ve mükemmellik bizim DNA\'mızda.', textAlign: 'center', fontSize: 20 } },
                    ]
                },
            ],
        },
        {
            name: 'Rakamlar',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '20+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Yıllık Tecrübe', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '500+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Mutlu Müşteri', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '150+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Uzman Kadro', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '30+', textAlign: 'center', fontSize: 48 } },
                        { type: 'text', props: { content: 'Ülke', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Hikayemiz',
            settings: { backgroundColor: '#f8fafc', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'image', props: { src: '/placeholder-office.jpg', alt: 'Office' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📖 Hikayemiz' } },
                        { type: 'text', props: { content: '2005 yılında İstanbul\'da küçük bir ofiste başladık. Bugün 150+ kişilik ekibimizle Türkiye\'nin en büyük teknoloji şirketlerinden biri haline geldik.', fontSize: 18 } },
                        { type: 'text', props: { content: 'Fortune 500 şirketlerinden startup\'lara kadar geniş bir müşteri portföyüne hizmet veriyoruz. Başarımızın sırrı: müşteri odaklılık, sürekli inovasyon ve mükemmellik arayışı.' } },
                    ]
                },
            ],
        },
        {
            name: 'Misyon Vizyon',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🎯 Misyonumuz' } },
                        { type: 'text', props: { content: 'İnovatif teknoloji çözümleriyle işletmelerin dijital dönüşümüne öncülük etmek ve sürdürülebilir büyümelerine katkı sağlamak.' } },
                    ]
                },
                {
                    width: 50, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '🚀 Vizyonumuz' } },
                        { type: 'text', props: { content: 'Türkiye\'nin lider teknoloji şirketi olmak ve global pazarda söz sahibi bir marka haline gelmek.' } },
                    ]
                },
            ],
        },
        {
            name: 'Değerlerimiz',
            settings: { backgroundColor: '#0f172a', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '💡', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'İnovasyon', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Sürekli öğrenme ve yenilikçi düşünce', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🤝', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'Güven', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Şeffaflık ve dürüstlük', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '⭐', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'Mükemmellik', textAlign: 'center' } },
                        { type: 'text', props: { content: 'En yüksek kalite standartları', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '🌍', textAlign: 'center' } },
                        { type: 'heading', props: { level: 'h4', content: 'Sürdürülebilirlik', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Çevre dostu çözümler', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Ekibimiz Başlık',
            settings: { backgroundColor: '#ffffff', padding: { top: 60, right: 40, bottom: 20, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '👥 Yönetim Ekibimiz', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Ekip Grid',
            settings: { backgroundColor: '#ffffff', padding: { top: 40, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-team1.jpg', alt: 'CEO' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ali Yılmaz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'CEO & Kurucu', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-team2.jpg', alt: 'CTO' } },
                        { type: 'heading', props: { level: 'h4', content: 'Ayşe Kaya', textAlign: 'center' } },
                        { type: 'text', props: { content: 'CTO', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-team3.jpg', alt: 'COO' } },
                        { type: 'heading', props: { level: 'h4', content: 'Mehmet Demir', textAlign: 'center' } },
                        { type: 'text', props: { content: 'COO', textAlign: 'center' } },
                    ]
                },
                {
                    width: 25, blocks: [
                        { type: 'image', props: { src: '/placeholder-team4.jpg', alt: 'CFO' } },
                        { type: 'heading', props: { level: 'h4', content: 'Zeynep Öz', textAlign: 'center' } },
                        { type: 'text', props: { content: 'CFO', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'Ofislerimiz',
            settings: { backgroundColor: '#f8fafc', padding: { top: 60, right: 40, bottom: 60, left: 40 } },
            columns: [
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📍 İstanbul (Merkez)', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Levent, Büyükdere Cad.\nNo:123, 34394 Şişli', textAlign: 'center' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📍 Ankara', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Çankaya, Atatürk Blv.\nNo:45, 06690 Çankaya', textAlign: 'center' } },
                    ]
                },
                {
                    width: 33.33, blocks: [
                        { type: 'heading', props: { level: 'h3', content: '📍 İzmir', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Bayraklı, Şehit Nevres Blv.\nNo:78, 35510 Bayraklı', textAlign: 'center' } },
                    ]
                },
            ],
        },
        {
            name: 'İletişim CTA',
            settings: { backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: { top: 80, right: 40, bottom: 80, left: 40 } },
            columns: [
                {
                    width: 100, blocks: [
                        { type: 'heading', props: { level: 'h2', content: '📞 Bizimle Çalışmak İster misiniz?', textAlign: 'center' } },
                        { type: 'text', props: { content: 'Projelerinizi birlikte hayata geçirelim. Hemen iletişime geçin!', textAlign: 'center', fontSize: 18 } },
                        { type: 'button', props: { text: 'İletişime Geç', link: '#contact', variant: 'secondary', size: 'large' } },
                    ]
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
