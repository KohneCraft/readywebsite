'use client';

// ============================================
// Page Builder - Preview Page
// Page Builder ile oluşturulan sayfaların önizlemesi
// ============================================

import { PageRenderer } from '@/components/pageBuilder/renderers/PageRenderer';
import { useParams } from 'next/navigation';

export default function PreviewPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            404
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sayfa Bulunamadı
          </p>
        </div>
      </div>
    );
  }

  // Preview sayfaları için Header/Footer gösterilir (PublicLayout zaten gösteriyor)
  return <PageRenderer slug={slug} allowDraft={false} />;
}

