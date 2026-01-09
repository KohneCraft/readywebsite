// ============================================
// Construction Theme - About Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionAboutPage: ThemePageData = {
  slug: 'about',
  title: 'Hakkımızda',
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
                content: 'Hakkımızda',
                fontSize: 56,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: '20 yılı aşkın tecrübemizle inşaat sektöründe öncüyüz',
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
                content: 'Hikayemiz',
                fontSize: 36,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Vav İnşaat, 2003 yılında kurulmuş ve o günden bu yana inşaat sektöründe faaliyet gösteren güvenilir bir firmadır. Müşteri memnuniyetini ön planda tutarak, kaliteli ve güvenilir inşaat hizmetleri sunmaktayız.',
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
                alt: 'Vav İnşaat',
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
                content: 'Değerlerimiz',
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
                content: 'Kalite',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'En yüksek kalite standartlarında işçilik ve malzeme kullanımı',
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
                content: 'Güvenilirlik',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Söz verdiğimiz tarihte teslimat ve şeffaf iletişim',
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
                content: 'İnovasyon',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Modern teknoloji ve yenilikçi çözümlerle projeler geliştirme',
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
                content: 'Müşteri Odaklılık',
                fontSize: 24,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Müşteri memnuniyetini ön planda tutan hizmet anlayışı',
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

