// ============================================
// Construction Theme - Home Page
// Gelişmiş inşaat firması ana sayfası
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionHomePage: ThemePageData = {
  slug: 'home',
  title: 'Ana Sayfa',
  sections: [
    // Hero Section - Büyük görsel ve CTA
    {
      name: 'Hero Section',
      settings: {
        backgroundColor: '#0a1929',
        backgroundImage: '/themes/construction/hero-bg.jpg',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: { top: 120, right: 40, bottom: 120, left: 40 },
        minHeight: 700,
        overlay: {
          enabled: true,
          color: 'rgba(10, 25, 41, 0.7)',
          blur: 0,
        },
      },
      columns: [
        {
          width: 100,
          settings: {
            padding: { top: 40, right: 40, bottom: 40, left: 40 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h1',
                content: 'Güvenilir İnşaat Çözümleri',
                fontSize: 64,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: '20 yılı aşkın tecrübemizle, hayalinizdeki projeleri gerçeğe dönüştürüyoruz. Modern teknoloji ve kaliteli malzeme ile güvenilir inşaat hizmetleri.',
                fontSize: 20,
                color: '#e0e0e0',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: 'Projelerimizi İnceleyin',
                link: '/projects',
                style: 'primary',
                size: 'large',
                backgroundColor: '#ff6b35',
                textColor: '#ffffff',
              },
            },
            {
              type: 'button',
              props: {
                text: 'İletişime Geçin',
                link: '/contact',
                style: 'outline',
                size: 'large',
                borderColor: '#ffffff',
                textColor: '#ffffff',
              },
            },
          ],
        },
      ],
    },
    // İstatistikler Section
    {
      name: 'Statistics Section',
      settings: {
        backgroundColor: '#ff6b35',
        padding: { top: 60, right: 40, bottom: 60, left: 40 },
      },
      columns: [
        {
          width: 25,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: '500+',
                fontSize: 48,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Tamamlanan Proje',
                fontSize: 16,
                color: '#ffffff',
              },
            },
          ],
        },
        {
          width: 25,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: '20+',
                fontSize: 48,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Yıllık Tecrübe',
                fontSize: 16,
                color: '#ffffff',
              },
            },
          ],
        },
        {
          width: 25,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: '150+',
                fontSize: 48,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Mutlu Müşteri',
                fontSize: 16,
                color: '#ffffff',
              },
            },
          ],
        },
        {
          width: 25,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: '50+',
                fontSize: 48,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Uzman Ekip',
                fontSize: 16,
                color: '#ffffff',
              },
            },
          ],
        },
      ],
    },
    // Hizmetler Section
    {
      name: 'Services Section',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 100,
          settings: {
            padding: { top: 0, right: 0, bottom: 40, left: 0 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: 'Hizmetlerimiz',
                fontSize: 42,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Geniş hizmet yelpazemiz ile inşaat ihtiyaçlarınızı karşılıyoruz',
                fontSize: 18,
                color: '#666666',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Services Grid',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 0, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            backgroundColor: '#f8f9fa',
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/services/residential.jpg',
                alt: 'Konut İnşaatı',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Konut İnşaatı',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Villa, apartman ve site projelerinde uzman ekibimizle hizmetinizdeyiz. Modern tasarım ve kaliteli malzeme kullanımı ile hayalinizdeki evi inşa ediyoruz.',
                fontSize: 16,
                color: '#666666',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: 'Detaylar',
                link: '/services',
                style: 'primary',
                size: 'medium',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            backgroundColor: '#f8f9fa',
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/services/commercial.jpg',
                alt: 'Ticari İnşaat',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Ticari İnşaat',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Ofis binaları, alışveriş merkezleri ve ticari kompleksler için profesyonel inşaat hizmetleri. İşletmenizin ihtiyaçlarına özel çözümler sunuyoruz.',
                fontSize: 16,
                color: '#666666',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: 'Detaylar',
                link: '/services',
                style: 'primary',
                size: 'medium',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            backgroundColor: '#f8f9fa',
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/services/renovation.jpg',
                alt: 'Renovasyon',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Renovasyon & Tadilat',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Mevcut yapılarınızın yenilenmesi ve modernizasyonu için kapsamlı renovasyon hizmetleri. Banyo, mutfak ve genel tadilat işlerinde uzmanız.',
                fontSize: 16,
                color: '#666666',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: 'Detaylar',
                link: '/services',
                style: 'primary',
                size: 'medium',
              },
            },
          ],
        },
      ],
    },
    // Hakkımızda Section
    {
      name: 'About Section',
      settings: {
        backgroundColor: '#f8f9fa',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 40, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: 'Hakkımızda',
                fontSize: 42,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Vav İnşaat olarak 2003 yılından bu yana inşaat sektöründe faaliyet gösteriyoruz. Müşteri memnuniyetini ön planda tutarak, kaliteli ve güvenilir inşaat hizmetleri sunuyoruz.',
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
            {
              type: 'text',
              props: {
                content: 'Modern teknoloji ve geleneksel işçilik birleşimi ile projelerimizi hayata geçiriyoruz. Uzman ekibimiz, kaliteli malzeme kullanımı ve zamanında teslimat prensiplerimiz ile sektörde öncü konumdayız.',
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
            {
              type: 'button',
              props: {
                text: 'Daha Fazla Bilgi',
                link: '/about',
                style: 'primary',
                size: 'large',
              },
            },
          ],
        },
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 40 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/about-team.jpg',
                alt: 'Vav İnşaat Ekibi',
                width: '100%',
                borderRadius: '12px',
              },
            },
          ],
        },
      ],
    },
    // Projeler Section
    {
      name: 'Projects Section',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 100,
          settings: {
            padding: { top: 0, right: 0, bottom: 40, left: 0 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: 'Son Projelerimiz',
                fontSize: 42,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Tamamladığımız başarılı projelerden örnekler',
                fontSize: 18,
                color: '#666666',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Projects Grid',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 0, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/projects/project-1.jpg',
                alt: 'Lüks Villa Projesi',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Lüks Villa Projesi',
                fontSize: 22,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Bodrum - 450m² villa inşaatı',
                fontSize: 16,
                color: '#666666',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/projects/project-2.jpg',
                alt: 'Modern Apartman Kompleksi',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Modern Apartman Kompleksi',
                fontSize: 22,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'İstanbul - 24 daireli rezidans',
                fontSize: 16,
                color: '#666666',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'image',
              props: {
                src: '/themes/construction/projects/project-3.jpg',
                alt: 'Ticari Kompleks',
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: 'Ticari Kompleks',
                fontSize: 22,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Ankara - Ofis ve mağaza kompleksi',
                fontSize: 16,
                color: '#666666',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Projects CTA',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 0, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 100,
          settings: {
            padding: { top: 20, right: 0, bottom: 20, left: 0 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'button',
              props: {
                text: 'Tüm Projeleri Görüntüle',
                link: '/projects',
                style: 'primary',
                size: 'large',
              },
            },
          ],
        },
      ],
    },
    // Referanslar Section
    {
      name: 'Testimonials Section',
      settings: {
        backgroundColor: '#0a1929',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 100,
          settings: {
            padding: { top: 0, right: 0, bottom: 40, left: 0 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: 'Müşteri Yorumları',
                fontSize: 42,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Müşterilerimizin bizimle çalışma deneyimleri',
                fontSize: 18,
                color: '#e0e0e0',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Testimonials Grid',
      settings: {
        backgroundColor: '#0a1929',
        padding: { top: 0, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            backgroundColor: '#1a2a3a',
            borderRadius: '12px',
          },
          blocks: [
            {
              type: 'text',
              props: {
                content: '"Vav İnşaat ile çalışmak harika bir deneyimdi. Profesyonel ekip, zamanında teslimat ve kaliteli işçilik. Evimiz hayal ettiğimizden daha güzel oldu."',
                fontSize: 16,
                color: '#e0e0e0',
                lineHeight: 1.8,
                fontStyle: 'italic',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h4',
                content: 'Ahmet Yılmaz',
                fontSize: 18,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Villa Sahibi',
                fontSize: 14,
                color: '#999999',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            backgroundColor: '#1a2a3a',
            borderRadius: '12px',
          },
          blocks: [
            {
              type: 'text',
              props: {
                content: '"Apartman yönetimi olarak Vav İnşaat\'ı seçtik ve hiç pişman olmadık. Tüm süreç boyunca şeffaf iletişim ve kaliteli hizmet aldık."',
                fontSize: 16,
                color: '#e0e0e0',
                lineHeight: 1.8,
                fontStyle: 'italic',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h4',
                content: 'Ayşe Demir',
                fontSize: 18,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Site Yöneticisi',
                fontSize: 14,
                color: '#999999',
              },
            },
          ],
        },
        {
          width: 33.33,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            backgroundColor: '#1a2a3a',
            borderRadius: '12px',
          },
          blocks: [
            {
              type: 'text',
              props: {
                content: '"Ticari kompleksimiz için Vav İnşaat ile çalıştık. Modern tasarım, kaliteli malzeme ve zamanında teslimat. Kesinlikle tavsiye ederim."',
                fontSize: 16,
                color: '#e0e0e0',
                lineHeight: 1.8,
                fontStyle: 'italic',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h4',
                content: 'Mehmet Kaya',
                fontSize: 18,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'İşletme Sahibi',
                fontSize: 14,
                color: '#999999',
              },
            },
          ],
        },
      ],
    },
    // CTA Section
    {
      name: 'CTA Section',
      settings: {
        backgroundColor: '#ff6b35',
        padding: { top: 80, right: 40, bottom: 80, left: 40 },
      },
      columns: [
        {
          width: 100,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            textAlign: 'center',
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: 'Projenizi Hayata Geçirmeye Hazır mısınız?',
                fontSize: 42,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin',
                fontSize: 20,
                color: '#ffffff',
              },
            },
            {
              type: 'button',
              props: {
                text: 'İletişime Geçin',
                link: '/contact',
                style: 'outline',
                size: 'large',
                borderColor: '#ffffff',
                textColor: '#ffffff',
                backgroundColor: 'transparent',
              },
            },
          ],
        },
      ],
    },
  ],
};

