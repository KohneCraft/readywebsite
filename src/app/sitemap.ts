// ============================================
// Page Builder - Sitemap Generator
// Dynamic sitemap for SEO
// ============================================

import { MetadataRoute } from 'next';
import { getAllPages } from '@/lib/firebase/firestore';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pagebuilder.com';
const LOCALES = ['tr', 'en', 'de', 'fr'];

type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'always' | 'hourly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [''];

  // Generate entries for all locales
  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 1,
    }))
  );

  // Fetch published pages from Firestore
  try {
    const pages = await getAllPages();
    const publishedPages = pages.filter(p => p.status === 'published');
    
    const pageEntries: MetadataRoute.Sitemap = publishedPages.flatMap((page) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}/${locale}/${page.slug}`,
        lastModified: page.updatedAt instanceof Date 
          ? page.updatedAt 
          : (page.updatedAt as any)?.toDate?.() || new Date(),
        changeFrequency: 'weekly' as ChangeFrequency,
        priority: page.slug === 'home' ? 1.0 : 0.8,
      }))
    );

    return [...staticEntries, ...pageEntries];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticEntries;
  }
}
