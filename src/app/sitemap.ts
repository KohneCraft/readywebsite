// ============================================
// Vav Yapı - Sitemap Generator
// Dynamic sitemap for SEO
// ============================================

import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vavyapi.com';
const LOCALES = ['tr', 'en', 'de', 'fr'];

type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'always' | 'hourly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '',
    '/about',
    '/projects',
    '/projects/ongoing',
    '/projects/completed',
    '/contact',
  ];

  // Generate entries for all locales
  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '' ? 'daily' : 'weekly') as ChangeFrequency,
      priority: page === '' ? 1 : page === '/projects' ? 0.9 : 0.8,
    }))
  );

  // TODO: Fetch dynamic project pages from Firestore
  // const projects = await getProjects();
  // const projectEntries = projects.flatMap((project) =>
  //   LOCALES.map((locale) => ({
  //     url: `${BASE_URL}/${locale}/projects/${project.id}`,
  //     lastModified: project.updatedAt,
  //     changeFrequency: 'monthly' as ChangeFrequency,
  //     priority: 0.7,
  //   }))
  // );

  // Mock project entries for now
  const mockProjectIds = ['1', '2', '3', '10', '11', '12'];
  const projectEntries: MetadataRoute.Sitemap = mockProjectIds.flatMap((id) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/projects/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...projectEntries];
}
