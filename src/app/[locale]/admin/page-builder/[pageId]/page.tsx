'use client';

// ============================================
// Page Builder - Admin Page Builder Editor Page
// Sayfa düzenleme sayfası
// ============================================

import { use } from 'react';
import { PageBuilderEditor } from '@/components/pageBuilder/admin';

interface PageBuilderEditorPageProps {
  params: Promise<{
    pageId: string;
    locale: string;
  }>;
}

export default function PageBuilderEditorPage({ params }: PageBuilderEditorPageProps) {
  const { pageId } = use(params);
  
  return <PageBuilderEditor pageId={pageId} />;
}
