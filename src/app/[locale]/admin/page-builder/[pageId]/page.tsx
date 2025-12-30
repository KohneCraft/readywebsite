'use client';

// ============================================
// Vav Yapı - Admin Page Builder Editor Page
// Sayfa düzenleme sayfası
// ============================================

import { useState, useEffect } from 'react';
import { PageBuilderEditor } from '@/components/pageBuilder/admin';

interface PageBuilderEditorPageProps {
  params: Promise<{
    pageId: string;
    locale: string;
  }>;
}

export default function PageBuilderEditorPage({ params }: PageBuilderEditorPageProps) {
  return <PageBuilderEditorWrapper params={params} />;
}

function PageBuilderEditorWrapper({ params }: PageBuilderEditorPageProps) {
  const [pageId, setPageId] = useState<string>('');
  
  useEffect(() => {
    params.then(({ pageId: id }) => setPageId(id));
  }, [params]);
  
  if (!pageId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return <PageBuilderEditor pageId={pageId} />;
}
