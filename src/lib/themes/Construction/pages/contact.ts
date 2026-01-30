// ============================================
// Construction Theme - Contact Page
// Çoklu dil desteği ile (TR/EN/DE/FR)
// ============================================

import type { ThemePageData } from '@/types/theme';

export const constructionContactPage: ThemePageData = {
  slug: 'contact',
  title: 'İletişim',
  titles: { tr: 'İletişim', en: 'Contact', de: 'Kontakt', fr: 'Contact' },
  sections: [
    {
      name: 'Contact Hero',
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
                  tr: 'İletişim',
                  en: 'Contact Us',
                  de: 'Kontaktieren Sie uns',
                  fr: 'Contactez-nous'
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
                  tr: 'Projeleriniz için bizimle iletişime geçin',
                  en: 'Contact us for your projects',
                  de: 'Kontaktieren Sie uns für Ihre Projekte',
                  fr: 'Contactez-nous pour vos projets'
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
      name: 'Contact Info',
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
                  tr: 'İletişim Bilgileri',
                  en: 'Contact Information',
                  de: 'Kontaktinformationen',
                  fr: 'Informations de Contact'
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
                  tr: 'Adres: Atatürk Mah. İnşaat Cad. No:123 İstanbul',
                  en: 'Address: Atatürk Mah. İnşaat Cad. No:123 Istanbul',
                  de: 'Adresse: Atatürk Mah. İnşaat Cad. No:123 Istanbul',
                  fr: 'Adresse: Atatürk Mah. İnşaat Cad. No:123 Istanbul'
                },
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Telefon: +90 (212) 123 45 67',
                  en: 'Phone: +90 (212) 123 45 67',
                  de: 'Telefon: +90 (212) 123 45 67',
                  fr: 'Téléphone: +90 (212) 123 45 67'
                },
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'E-posta: info@vavinsaat.com',
                  en: 'Email: info@vavinsaat.com',
                  de: 'E-Mail: info@vavinsaat.com',
                  fr: 'E-mail: info@vavinsaat.com'
                },
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
              },
            },
            {
              type: 'text',
              props: {
                content: {
                  tr: 'Çalışma Saatleri: Pazartesi - Cuma 09:00 - 18:00',
                  en: 'Working Hours: Monday - Friday 09:00 - 18:00',
                  de: 'Arbeitszeiten: Montag - Freitag 09:00 - 18:00',
                  fr: 'Heures d\'ouverture: Lundi - Vendredi 09:00 - 18:00'
                },
                fontSize: 18,
                color: '#666666',
                lineHeight: 2,
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
              type: 'heading',
              props: {
                level: 'h2',
                content: {
                  tr: 'Bize Ulaşın',
                  en: 'Get in Touch',
                  de: 'Erreichen Sie uns',
                  fr: 'Contactez-nous'
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
                  tr: 'Projeleriniz için ücretsiz keşif ve fiyat teklifi almak için formu doldurun veya doğrudan iletişime geçin.',
                  en: 'Fill out the form or contact us directly for a free site visit and quote for your projects.',
                  de: 'Füllen Sie das Formular aus oder kontaktieren Sie uns direkt für eine kostenlose Besichtigung und ein Angebot für Ihre Projekte.',
                  fr: 'Remplissez le formulaire ou contactez-nous directement pour une visite gratuite et un devis pour vos projets.'
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
                  tr: 'Hemen Arayın',
                  en: 'Call Now',
                  de: 'Jetzt anrufen',
                  fr: 'Appelez Maintenant'
                },
                link: 'tel:+902121234567',
                style: 'primary',
                size: 'large',
              },
            },
          ],
        },
      ],
    },
  ],
};

