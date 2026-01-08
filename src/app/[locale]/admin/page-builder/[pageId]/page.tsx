'use client';

// ============================================
// Page Builder - Admin Page Builder Editor Page
// Sayfa düzenleme sayfası
// ============================================

import { use, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/Spinner';

// PageBuilderEditor'ı dinamik import et (SSR hatalarını önlemek için)
const PageBuilderEditor = dynamic(
  () => import('@/components/pageBuilder/admin').then(mod => ({ default: mod.PageBuilderEditor })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    ),
  }
);

interface PageBuilderEditorPageProps {
  params: Promise<{
    pageId: string;
    locale: string;
  }>;
}

export default function PageBuilderEditorPage({ params }: PageBuilderEditorPageProps) {
  const { pageId } = use(params);
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    }>
      <PageBuilderEditor pageId={pageId} />
    </Suspense>
  );
}
