// ============================================
// Construction Theme - Services Page
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionServicesPage: ThemePageData = {
  slug: 'services',
  title: 'Hizmetlerimiz',
  titles: { tr: 'Hizmetlerimiz', en: 'Our Services', de: 'Unsere Dienstleistungen', fr: 'Nos Services' },
  sections: [
    {
      name: 'Services Hero',
      settings: {
        backgroundColor: '#0a1929',
        padding: { top: 100, right: 40, bottom: 80, left: 40 },
        textAlign: 'center',
      },
      columns: [
        {
          width: 100,
          settings: {},
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h1',
                content: {
                  tr: 'Hizmetlerimiz',
                  en: 'Our Services',
                  de: 'Unsere Dienstleistungen',
                  fr: 'Nos Services'
                },
                fontSize: 56,
                color: '#ffffff',
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
                fontSize: 20,
                color: '#e0e0e0',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Services List',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
      },
      columns: [
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: {
                  tr: 'Konut İnşaatı',
                  en: 'Residential Construction',
                  de: 'Wohnungsbau',
                  fr: 'Construction Résidentielle'
                },
                fontSize: 32,
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
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
          ],
        },
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: {
                  tr: 'Ticari İnşaat',
                  en: 'Commercial Construction',
                  de: 'Gewerbebau',
                  fr: 'Construction Commerciale'
                },
                fontSize: 32,
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
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
          ],
        },
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: {
                  tr: 'Renovasyon & Tadilat',
                  en: 'Renovation & Remodeling',
                  de: 'Renovierung & Umbau',
                  fr: 'Rénovation & Remodelage'
                },
                fontSize: 32,
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
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
          ],
        },
        {
          width: 50,
          settings: {
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
          },
          blocks: [
            {
              type: 'heading',
              props: {
                level: 'h2',
                content: {
                  tr: 'İç Mimari',
                  en: 'Interior Design',
                  de: 'Innenarchitektur',
                  fr: 'Architecture d\'Intérieur'
                },
                fontSize: 32,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Modern ve fonksiyonel iç mekan tasarımları. Yaşam alanlarınızı ihtiyaçlarınıza göre optimize ediyoruz.',
                  en: 'Modern and functional interior designs. We optimize your living spaces according to your needs.',
                  de: 'Moderne und funktionale Innendesigns. Wir optimieren Ihre Wohnräume nach Ihren Bedürfnissen.',
                  fr: 'Designs d\'intérieur modernes et fonctionnels. Nous optimisons vos espaces de vie selon vos besoins.'
                },
                fontSize: 18,
                color: '#666666',
                lineHeight: 1.8,
              },
            },
          ],
        },
      ],
    },
  ],
};

