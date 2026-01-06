'use client';

// ============================================
// Page Builder - Home Page
// Dinamik ana sayfa: Tema yülendiyse home sayfasını göster, yoksa landing page
// ============================================

import { useState, useEffect } from 'react';
import { PageRenderer } from '@/components/pageBuilder/renderers/PageRenderer';
import { getPageBySlug } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Page } from '@/types/pageBuilder';
import LandingPage from './LandingPage';

export default function HomePage() {
  const [homePage, setHomePage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomePage() {
      try {
        // 'home' slug'ına sahip sayfayı kontrol et
        const page = await getPageBySlug('home');
        logger.pageBuilder.debug('Ana sayfa yüklendi', page);
        if (page) {
          logger.pageBuilder.debug('Sayfa durumu', { status: page.status, sectionsCount: page.sections?.length || 0 });
          if (page.status === 'published') {
            setHomePage(page);
          } else {
            logger.pageBuilder.warn('Ana sayfa yayınlanmamış', { status: page.status });
          }
        } else {
          logger.pageBuilder.warn('Ana sayfa bulunamadı (slug: home)');
        }
      } catch (error) {
        logger.pageBuilder.error('Ana sayfa yüklenirken hata', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHomePage();
  }, []);

  // Loading durumu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Tema yüklendiyse home sayfasını göster (Header/Footer ile)
  if (homePage) {
    return (
      <>
        <PageRenderer pageId={homePage.id} allowDraft={false} />
      </>
    );
  }

  // Tema yüklenmediyse landing page göster
  return <LandingPage />;
}
