// ============================================
// Construction Theme - Home Page
// Gelişmiş inşaat firması ana sayfası
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionHomePage: ThemePageData = {
  slug: 'home',
  title: 'Ana Sayfa',
  titles: { tr: 'Ana Sayfa', en: 'Home', de: 'Startseite', fr: 'Accueil' },
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
                content: {
                  tr: 'Güvenilir İnşaat Çözümleri',
                  en: 'Reliable Construction Solutions',
                  de: 'Zuverlässige Baulösungen',
                  fr: 'Solutions de Construction Fiables'
                },
                fontSize: 64,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: '20 yılı aşkın tecrübemizle, hayalinizdeki projeleri gerçeğe dönüştürüyoruz. Modern teknoloji ve kaliteli malzeme ile güvenilir inşaat hizmetleri.',
                  en: 'With over 20 years of experience, we turn your dream projects into reality. Reliable construction services with modern technology and quality materials.',
                  de: 'Mit über 20 Jahren Erfahrung verwandeln wir Ihre Traumprojekte in Realität. Zuverlässige Bauleistungen mit moderner Technologie und hochwertigen Materialien.',
                  fr: 'Avec plus de 20 ans d\'expérience, nous transformons vos projets de rêve en réalité. Services de construction fiables avec technologie moderne et matériaux de qualité.'
                },
                fontSize: 20,
                color: '#e0e0e0',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: {
                  tr: 'Projelerimizi İnceleyin',
                  en: 'View Our Projects',
                  de: 'Unsere Projekte ansehen',
                  fr: 'Voir Nos Projets'
                },
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
                text: {
                  tr: 'İletişime Geçin',
                  en: 'Contact Us',
                  de: 'Kontaktieren Sie uns',
                  fr: 'Contactez-nous'
                },
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
                content: {
                  tr: 'Tamamlanan Proje',
                  en: 'Completed Projects',
                  de: 'Abgeschlossene Projekte',
                  fr: 'Projets Réalisés'
                },
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
                content: {
                  tr: 'Yıllık Tecrübe',
                  en: 'Years of Experience',
                  de: 'Jahre Erfahrung',
                  fr: 'Années d\'Expérience'
                },
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
                content: {
                  tr: 'Mutlu Müşteri',
                  en: 'Happy Clients',
                  de: 'Zufriedene Kunden',
                  fr: 'Clients Satisfaits'
                },
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
                content: {
                  tr: 'Uzman Ekip',
                  en: 'Expert Team',
                  de: 'Expertenteam',
                  fr: 'Équipe d\'Experts'
                },
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
                content: {
                  tr: 'Hizmetlerimiz',
                  en: 'Our Services',
                  de: 'Unsere Dienstleistungen',
                  fr: 'Nos Services'
                },
                fontSize: 42,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Geniş hizmet yelpazemiz ile inşaat ihtiyaçlarınızı karşılıyoruz',
                  en: 'We meet your construction needs with our wide range of services',
                  de: 'Wir erfüllen Ihre Bauanforderungen mit unserem breiten Serviceangebot',
                  fr: 'Nous répondons à vos besoins de construction avec notre large gamme de services'
                },
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
                alt: { tr: 'Konut İnşaatı', en: 'Residential Construction', de: 'Wohnungsbau', fr: 'Construction Résidentielle' },
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: {
                  tr: 'Konut İnşaatı',
                  en: 'Residential Construction',
                  de: 'Wohnungsbau',
                  fr: 'Construction Résidentielle'
                },
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Villa, apartman ve site projelerinde uzman ekibimizle hizmetinizdeyiz. Modern tasarım ve kaliteli malzeme kullanımı ile hayalinizdeki evi inşa ediyoruz.',
                  en: 'We are at your service with our expert team in villa, apartment and housing projects. We build your dream home with modern design and quality materials.',
                  de: 'Wir stehen Ihnen mit unserem Expertenteam bei Villa-, Wohnungs- und Siedlungsprojekten zur Verfügung. Wir bauen Ihr Traumhaus mit modernem Design und hochwertigen Materialien.',
                  fr: 'Nous sommes à votre service avec notre équipe d\'experts pour les projets de villas, d\'appartements et de lotissements. Nous construisons la maison de vos rêves avec un design moderne et des matériaux de qualité.'
                },
                fontSize: 16,
                color: '#666666',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: { tr: 'Detaylar', en: 'Details', de: 'Details', fr: 'Détails' },
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
                alt: { tr: 'Ticari İnşaat', en: 'Commercial Construction', de: 'Gewerbebau', fr: 'Construction Commerciale' },
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: {
                  tr: 'Ticari İnşaat',
                  en: 'Commercial Construction',
                  de: 'Gewerbebau',
                  fr: 'Construction Commerciale'
                },
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Ofis binaları, alışveriş merkezleri ve ticari kompleksler için profesyonel inşaat hizmetleri. İşletmenizin ihtiyaçlarına özel çözümler sunuyoruz.',
                  en: 'Professional construction services for office buildings, shopping centers and commercial complexes. We offer customized solutions for your business needs.',
                  de: 'Professionelle Bauleistungen für Bürogebäude, Einkaufszentren und Gewerbekomplexe. Wir bieten maßgeschneiderte Lösungen für Ihre Geschäftsanforderungen.',
                  fr: 'Services de construction professionnels pour immeubles de bureaux, centres commerciaux et complexes commerciaux. Nous offrons des solutions personnalisées pour vos besoins commerciaux.'
                },
                fontSize: 16,
                color: '#666666',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: { tr: 'Detaylar', en: 'Details', de: 'Details', fr: 'Détails' },
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
                alt: { tr: 'Renovasyon', en: 'Renovation', de: 'Renovierung', fr: 'Rénovation' },
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: {
                  tr: 'Renovasyon & Tadilat',
                  en: 'Renovation & Remodeling',
                  de: 'Renovierung & Umbau',
                  fr: 'Rénovation & Remodelage'
                },
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Mevcut yapılarınızın yenilenmesi ve modernizasyonu için kapsamlı renovasyon hizmetleri. Banyo, mutfak ve genel tadilat işlerinde uzmanız.',
                  en: 'Comprehensive renovation services for renewing and modernizing your existing structures. We specialize in bathroom, kitchen and general remodeling.',
                  de: 'Umfassende Renovierungsleistungen für die Erneuerung und Modernisierung Ihrer bestehenden Strukturen. Wir sind spezialisiert auf Bad-, Küchen- und allgemeine Umbauarbeiten.',
                  fr: 'Services de rénovation complets pour le renouvellement et la modernisation de vos structures existantes. Nous sommes spécialisés dans la rénovation de salles de bains, de cuisines et de travaux généraux.'
                },
                fontSize: 16,
                color: '#666666',
                lineHeight: 1.6,
              },
            },
            {
              type: 'button',
              props: {
                text: { tr: 'Detaylar', en: 'Details', de: 'Details', fr: 'Détails' },
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
                content: {
                  tr: 'Hakkımızda',
                  en: 'About Us',
                  de: 'Über uns',
                  fr: 'À Propos'
                },
                fontSize: 42,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Vav İnşaat olarak 2003 yılından bu yana inşaat sektöründe faaliyet gösteriyoruz. Müşteri memnuniyetini ön planda tutarak, kaliteli ve güvenilir inşaat hizmetleri sunuyoruz.',
                  en: 'As Vav Construction, we have been operating in the construction sector since 2003. We provide quality and reliable construction services with customer satisfaction as our priority.',
                  de: 'Als Vav Bau sind wir seit 2003 in der Baubranche tätig. Wir bieten qualitativ hochwertige und zuverlässige Bauleistungen mit Kundenzufriedenheit als unsere Priorität.',
                  fr: 'En tant que Vav Construction, nous opérons dans le secteur de la construction depuis 2003. Nous fournissons des services de construction de qualité et fiables avec la satisfaction client comme priorité.'
                },
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Modern teknoloji ve geleneksel işçilik birleşimi ile projelerimizi hayata geçiriyoruz. Uzman ekibimiz, kaliteli malzeme kullanımı ve zamanında teslimat prensiplerimiz ile sektörde öncü konumdayız.',
                  en: 'We bring our projects to life with a combination of modern technology and traditional craftsmanship. We are a leader in the industry with our expert team, quality materials and on-time delivery principles.',
                  de: 'Wir setzen unsere Projekte mit einer Kombination aus moderner Technologie und traditioneller Handwerkskunst um. Mit unserem Expertenteam, hochwertigen Materialien und pünktlichen Lieferprinzipien sind wir führend in der Branche.',
                  fr: 'Nous donnons vie à nos projets avec une combinaison de technologie moderne et d\'artisanat traditionnel. Nous sommes un leader de l\'industrie avec notre équipe d\'experts, des matériaux de qualité et des principes de livraison à temps.'
                },
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
            {
              type: 'button',
              props: {
                text: {
                  tr: 'Daha Fazla Bilgi',
                  en: 'Learn More',
                  de: 'Mehr erfahren',
                  fr: 'En Savoir Plus'
                },
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
                alt: { tr: 'Vav İnşaat Ekibi', en: 'Vav Construction Team', de: 'Vav Bau Team', fr: 'Équipe Vav Construction' },
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
                content: {
                  tr: 'Son Projelerimiz',
                  en: 'Our Recent Projects',
                  de: 'Unsere neuesten Projekte',
                  fr: 'Nos Projets Récents'
                },
                fontSize: 42,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Tamamladığımız başarılı projelerden örnekler',
                  en: 'Examples of our successfully completed projects',
                  de: 'Beispiele unserer erfolgreich abgeschlossenen Projekte',
                  fr: 'Exemples de nos projets réalisés avec succès'
                },
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
                alt: { tr: 'Lüks Villa Projesi', en: 'Luxury Villa Project', de: 'Luxusvilla-Projekt', fr: 'Projet de Villa de Luxe' },
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: {
                  tr: 'Lüks Villa Projesi',
                  en: 'Luxury Villa Project',
                  de: 'Luxusvilla-Projekt',
                  fr: 'Projet de Villa de Luxe'
                },
                fontSize: 22,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Bodrum - 450m² villa inşaatı',
                  en: 'Bodrum - 450m² villa construction',
                  de: 'Bodrum - 450m² Villenbau',
                  fr: 'Bodrum - Construction de villa de 450m²'
                },
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
                alt: { tr: 'Modern Apartman Kompleksi', en: 'Modern Apartment Complex', de: 'Moderne Wohnanlage', fr: 'Complexe d\'Appartements Moderne' },
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: {
                  tr: 'Modern Apartman Kompleksi',
                  en: 'Modern Apartment Complex',
                  de: 'Moderne Wohnanlage',
                  fr: 'Complexe d\'Appartements Moderne'
                },
                fontSize: 22,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'İstanbul - 24 daireli rezidans',
                  en: 'Istanbul - 24-unit residence',
                  de: 'Istanbul - Residenz mit 24 Einheiten',
                  fr: 'Istanbul - Résidence de 24 unités'
                },
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
                alt: { tr: 'Ticari Kompleks', en: 'Commercial Complex', de: 'Gewerblicher Komplex', fr: 'Complexe Commercial' },
                width: '100%',
                borderRadius: '8px',
              },
            },
            {
              type: 'heading',
              props: {
                level: 'h3',
                content: {
                  tr: 'Ticari Kompleks',
                  en: 'Commercial Complex',
                  de: 'Gewerblicher Komplex',
                  fr: 'Complexe Commercial'
                },
                fontSize: 22,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Ankara - Ofis ve mağaza kompleksi',
                  en: 'Ankara - Office and retail complex',
                  de: 'Ankara - Büro- und Einzelhandelskomplex',
                  fr: 'Ankara - Complexe de bureaux et de commerces'
                },
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
                text: {
                  tr: 'Tüm Projeleri Görüntüle',
                  en: 'View All Projects',
                  de: 'Alle Projekte anzeigen',
                  fr: 'Voir Tous les Projets'
                },
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
                content: {
                  tr: 'Müşteri Yorumları',
                  en: 'Customer Reviews',
                  de: 'Kundenbewertungen',
                  fr: 'Avis Clients'
                },
                fontSize: 42,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Müşterilerimizin bizimle çalışma deneyimleri',
                  en: 'Our clients\' experiences working with us',
                  de: 'Die Erfahrungen unserer Kunden mit uns',
                  fr: 'Les expériences de nos clients avec nous'
                },
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
                content: {
                  tr: '"Vav İnşaat ile çalışmak harika bir deneyimdi. Profesyonel ekip, zamanında teslimat ve kaliteli işçilik. Evimiz hayal ettiğimizden daha güzel oldu."',
                  en: '"Working with Vav Construction was a great experience. Professional team, on-time delivery and quality workmanship. Our home turned out even better than we imagined."',
                  de: '"Die Zusammenarbeit mit Vav Bau war eine tolle Erfahrung. Professionelles Team, pünktliche Lieferung und hochwertige Arbeit. Unser Haus ist noch schöner geworden, als wir es uns vorgestellt haben."',
                  fr: '"Travailler avec Vav Construction a été une excellente expérience. Équipe professionnelle, livraison à temps et travail de qualité. Notre maison est encore mieux que ce que nous imaginions."'
                },
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
                content: {
                  tr: 'Villa Sahibi',
                  en: 'Villa Owner',
                  de: 'Villenbesitzer',
                  fr: 'Propriétaire de Villa'
                },
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
                content: {
                  tr: '"Apartman yönetimi olarak Vav İnşaat\'ı seçtik ve hiç pişman olmadık. Tüm süreç boyunca şeffaf iletişim ve kaliteli hizmet aldık."',
                  en: '"As building management, we chose Vav Construction and never regretted it. We received transparent communication and quality service throughout the process."',
                  de: '"Als Gebäudeverwaltung haben wir Vav Bau gewählt und es nie bereut. Wir haben während des gesamten Prozesses eine transparente Kommunikation und einen qualitativ hochwertigen Service erhalten."',
                  fr: '"En tant que gestion d\'immeuble, nous avons choisi Vav Construction et ne l\'avons jamais regretté. Nous avons reçu une communication transparente et un service de qualité tout au long du processus."'
                },
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
                content: {
                  tr: 'Site Yöneticisi',
                  en: 'Site Manager',
                  de: 'Standortleiterin',
                  fr: 'Gestionnaire de Site'
                },
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
                content: {
                  tr: '"Ticari kompleksimiz için Vav İnşaat ile çalıştık. Modern tasarım, kaliteli malzeme ve zamanında teslimat. Kesinlikle tavsiye ederim."',
                  en: '"We worked with Vav Construction for our commercial complex. Modern design, quality materials and on-time delivery. Highly recommended."',
                  de: '"Wir haben mit Vav Bau für unseren Gewerbekomplex zusammengearbeitet. Modernes Design, hochwertige Materialien und pünktliche Lieferung. Sehr empfehlenswert."',
                  fr: '"Nous avons travaillé avec Vav Construction pour notre complexe commercial. Design moderne, matériaux de qualité et livraison à temps. Fortement recommandé."'
                },
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
                content: {
                  tr: 'İşletme Sahibi',
                  en: 'Business Owner',
                  de: 'Geschäftsinhaber',
                  fr: 'Propriétaire d\'Entreprise'
                },
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
                content: {
                  tr: 'Projenizi Hayata Geçirmeye Hazır mısınız?',
                  en: 'Ready to Bring Your Project to Life?',
                  de: 'Bereit, Ihr Projekt zum Leben zu erwecken?',
                  fr: 'Prêt à Concrétiser Votre Projet?'
                },
                fontSize: 42,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin',
                  en: 'Contact us now for a free site visit and quote',
                  de: 'Kontaktieren Sie uns jetzt für eine kostenlose Besichtigung und ein Angebot',
                  fr: 'Contactez-nous maintenant pour une visite gratuite et un devis'
                },
                fontSize: 20,
                color: '#ffffff',
              },
            },
            {
              type: 'button',
              props: {
                text: {
                  tr: 'İletişime Geçin',
                  en: 'Contact Us',
                  de: 'Kontaktieren Sie uns',
                  fr: 'Contactez-nous'
                },
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

