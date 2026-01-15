'use client';

// ============================================
// Page Builder - Public Layout Wrapper
// Shows Header/Footer only for non-admin pages
// ============================================

import { usePathname, useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EffectRenderer } from '@/components/effects/EffectRenderer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const params = useParams();

  // Check if current path is admin page
  const isAdminPage = pathname.includes('/admin');

  // Admin pages render children directly (admin layout handles its own structure)
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Get current page ID from params or pathname
  // params.slug ana sayfa için undefined olabilir
  // pathname '/' ise pageId null olmalı (EffectRenderer mantığına göre)
  const pageId = params?.slug ? (Array.isArray(params.slug) ? params.slug.join('/') : params.slug) : null;

  // Public pages get Header and Footer
  return (
    <div className="flex min-h-screen flex-col">
      <EffectRenderer pageId={pageId} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
