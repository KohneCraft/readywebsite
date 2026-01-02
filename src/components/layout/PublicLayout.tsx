'use client';

// ============================================
// Page Builder - Public Layout Wrapper
// Shows Header/Footer only for non-admin pages
// ============================================

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  
  // Check if current path is admin page
  const isAdminPage = pathname.includes('/admin');
  
  // Admin pages render children directly (admin layout handles its own structure)
  if (isAdminPage) {
    return <>{children}</>;
  }
  
  // Public pages get Header and Footer
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
