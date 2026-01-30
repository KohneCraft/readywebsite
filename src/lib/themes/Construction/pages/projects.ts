// ============================================
// Construction Theme - Projects Page
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionProjectsPage: ThemePageData = {
  slug: 'projects',
  title: 'Projelerimiz',
  titles: { tr: 'Projelerimiz', en: 'Our Projects', de: 'Unsere Projekte', fr: 'Nos Projets' },
  sections: [
    {
      name: 'Projects Hero',
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
                  tr: 'Projelerimiz',
                  en: 'Our Projects',
                  de: 'Unsere Projekte',
                  fr: 'Nos Projets'
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
                  tr: 'Tamamladığımız başarılı projelerden örnekler',
                  en: 'Examples of our successfully completed projects',
                  de: 'Beispiele unserer erfolgreich abgeschlossenen Projekte',
                  fr: 'Exemples de nos projets réalisés avec succès'
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
      name: 'Projects Grid',
      settings: {
        backgroundColor: '#ffffff',
        padding: { top: 100, right: 40, bottom: 100, left: 40 },
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
                fontSize: 24,
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
                fontSize: 24,
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
                fontSize: 24,
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
  ],
};

