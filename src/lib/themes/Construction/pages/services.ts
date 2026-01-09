// ============================================
// Construction Theme - Services Page
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionServicesPage: ThemePageData = {
  slug: 'services',
  title: 'Hizmetlerimiz',
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
                content: 'Hizmetlerimiz',
                fontSize: 56,
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Geniş hizmet yelpazemiz ile inşaat ihtiyaçlarınızı karşılıyoruz',
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
                content: 'Konut İnşaatı',
                fontSize: 32,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Villa, apartman ve site projelerinde uzman ekibimizle hizmetinizdeyiz. Modern tasarım ve kaliteli malzeme kullanımı ile hayalinizdeki evi inşa ediyoruz.',
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
                content: 'Ticari İnşaat',
                fontSize: 32,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Ofis binaları, alışveriş merkezleri ve ticari kompleksler için profesyonel inşaat hizmetleri. İşletmenizin ihtiyaçlarına özel çözümler sunuyoruz.',
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
                content: 'Renovasyon & Tadilat',
                fontSize: 32,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Mevcut yapılarınızın yenilenmesi ve modernizasyonu için kapsamlı renovasyon hizmetleri. Banyo, mutfak ve genel tadilat işlerinde uzmanız.',
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
                content: 'İç Mimari',
                fontSize: 32,
                color: '#1a1a1a',
                fontWeight: 'bold',
              },
            },
            {
              type: 'text',
              props: {
                content: 'Modern ve fonksiyonel iç mekan tasarımları. Yaşam alanlarınızı ihtiyaçlarınıza göre optimize ediyoruz.',
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

