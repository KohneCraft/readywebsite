'use client';

// ============================================
// Page Builder - Dynamic Page Route
// Page Builder ile oluşturulan sayfaların dinamik route'u
// /[locale]/[slug] formatında çalışır
// ============================================

import { PageRenderer } from '@/components/pageBuilder/renderers/PageRenderer';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

// Statik route'lar - bunlar dinamik route tarafından yakalanmamalı
// Not: about ve contact artık dinamik sayfalar olduğu için listeden çıkarıldı
const STATIC_ROUTES = [
  'admin',
  'preview',
  'privacy',
  'terms',
  'projects',
  'services',
];

export default function DynamicPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const locale = params?.locale as string;

  // Slug kontrolü
  const isValidSlug = useMemo(() => {
    if (!slug) return false;
    // Statik route'lardan biri değilse geçerli
    return !STATIC_ROUTES.includes(slug.toLowerCase());
  }, [slug]);

  if (!slug || !isValidSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl text-red-500 mb-5">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sayfa Bulunamadı
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <a
            href={locale === 'tr' ? '/' : `/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  // PageRenderer slug ile sayfayı yükler
  return <PageRenderer slug={slug} allowDraft={false} />;
}

