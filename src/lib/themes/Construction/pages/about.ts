// ============================================
// Construction Theme - About Page
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionAboutPage: ThemePageData = {
  slug: 'about',
  title: 'Hakkımızda',
  titles: { tr: 'Hakkımızda', en: 'About Us', de: 'Über uns', fr: 'À Propos' },
  sections: [
    {
      name: 'About Hero',
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
                  tr: 'Hakkımızda',
                  en: 'About Us',
                  de: 'Über uns',
                  fr: 'À Propos de Nous'
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
                  tr: '20 yılı aşkın tecrübemizle inşaat sektöründe öncüyüz',
                  en: 'We are pioneers in the construction sector with over 20 years of experience',
                  de: 'Mit über 20 Jahren Erfahrung sind wir Pioniere in der Baubranche',
                  fr: 'Nous sommes pionniers dans le secteur de la construction avec plus de 20 ans d\'expérience'
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
      name: 'About Content',
      settings: {
        backgroundColor: '#ffffff',
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
                  tr: 'Hikayemiz',
                  en: 'Our Story',
                  de: 'Unsere Geschichte',
                  fr: 'Notre Histoire'
                },
                fontSize: 36,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Vav İnşaat, 2003 yılında kurulmuş ve o günden bu yana inşaat sektöründe faaliyet gösteren güvenilir bir firmadır. Müşteri memnuniyetini ön planda tutarak, kaliteli ve güvenilir inşaat hizmetleri sunmaktayız.',
                  en: 'Vav Construction was founded in 2003 and has been a reliable company operating in the construction sector since then. We provide quality and reliable construction services with customer satisfaction as our priority.',
                  de: 'Vav Bau wurde 2003 gegründet und ist seitdem ein zuverlässiges Unternehmen in der Baubranche. Wir bieten qualitativ hochwertige und zuverlässige Bauleistungen mit Kundenzufriedenheit als Priorität.',
                  fr: 'Vav Construction a été fondée en 2003 et est depuis une entreprise fiable opérant dans le secteur de la construction. Nous fournissons des services de construction de qualité et fiables avec la satisfaction client comme priorité.'
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
                src: '/themes/construction/about-company.jpg',
                alt: { tr: 'Vav İnşaat', en: 'Vav Construction', de: 'Vav Bau', fr: 'Vav Construction' },
                width: '100%',
                borderRadius: '12px',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Values Section',
      settings: {
        backgroundColor: '#f8f9fa',
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
                  tr: 'Değerlerimiz',
                  en: 'Our Values',
                  de: 'Unsere Werte',
                  fr: 'Nos Valeurs'
                },
                fontSize: 42,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Values Grid',
      settings: {
        backgroundColor: '#f8f9fa',
        padding: { top: 0, right: 40, bottom: 100, left: 40 },
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
                level: 'h3',
                content: {
                  tr: 'Kalite',
                  en: 'Quality',
                  de: 'Qualität',
                  fr: 'Qualité'
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
                  tr: 'En yüksek kalite standartlarında işçilik ve malzeme kullanımı',
                  en: 'Workmanship and material use at the highest quality standards',
                  de: 'Handwerkskunst und Materialverwendung auf höchstem Qualitätsniveau',
                  fr: 'Main-d\'œuvre et utilisation de matériaux aux normes de qualité les plus élevées'
                },
                fontSize: 16,
                color: '#666666',
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
                level: 'h3',
                content: {
                  tr: 'Güvenilirlik',
                  en: 'Reliability',
                  de: 'Zuverlässigkeit',
                  fr: 'Fiabilité'
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
                  tr: 'Söz verdiğimiz tarihte teslimat ve şeffaf iletişim',
                  en: 'Delivery on the promised date and transparent communication',
                  de: 'Lieferung zum versprochenen Termin und transparente Kommunikation',
                  fr: 'Livraison à la date promise et communication transparente'
                },
                fontSize: 16,
                color: '#666666',
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
                level: 'h3',
                content: {
                  tr: 'İnovasyon',
                  en: 'Innovation',
                  de: 'Innovation',
                  fr: 'Innovation'
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
                  tr: 'Modern teknoloji ve yenilikçi çözümlerle projeler geliştirme',
                  en: 'Developing projects with modern technology and innovative solutions',
                  de: 'Entwicklung von Projekten mit moderner Technologie und innovativen Lösungen',
                  fr: 'Développer des projets avec une technologie moderne et des solutions innovantes'
                },
                fontSize: 16,
                color: '#666666',
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
                level: 'h3',
                content: {
                  tr: 'Müşteri Odaklılık',
                  en: 'Customer Focus',
                  de: 'Kundenorientierung',
                  fr: 'Orientation Client'
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
                  tr: 'Müşteri memnuniyetini ön planda tutan hizmet anlayışı',
                  en: 'Service approach that prioritizes customer satisfaction',
                  de: 'Serviceansatz, der die Kundenzufriedenheit in den Vordergrund stellt',
                  fr: 'Approche de service qui donne la priorité à la satisfaction client'
                },
                fontSize: 16,
                color: '#666666',
              },
            },
          ],
        },
      ],
    },
  ],
};

