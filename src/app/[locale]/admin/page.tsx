'use client';

// ============================================
// Page Builder - Admin Dashboard
// Main dashboard with stats and recent activity
// ============================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Eye,
  TrendingUp,
  Calendar,
  ArrowRight,
  RefreshCcw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { cn } from '@/lib/utils';
import { getAllPagesClient } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Locale } from '@/i18n';

// Initial stats - will be updated from Firestore
const initialStats = {
  totalPages: 0,
  publishedPages: 0,
  draftPages: 0,
  totalSections: 0,
};

interface RecentPage {
  id: string;
  title: string;
  status: 'published' | 'draft';
  updatedAt: string;
  sectionsCount: number;
}

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [stats, setStats] = useState(initialStats);
  const [recentPages, setRecentPages] = useState<RecentPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Load pages from Firestore
      const pages = await getAllPagesClient();

      // Calculate stats
      const publishedCount = pages.filter(p => p.status === 'published').length;
      const draftCount = pages.filter(p => p.status === 'draft').length;
      const totalSections = pages.reduce((sum, p) => sum + (p.sections?.length || 0), 0);

      setStats({
        totalPages: pages.length,
        publishedPages: publishedCount,
        draftPages: draftCount,
        totalSections: totalSections,
      });

      // Set recent pages
      const recentPagesList: RecentPage[] = pages
        .sort((a, b) => {
          const aDate = a.updatedAt instanceof Date 
            ? a.updatedAt 
            : (a.updatedAt as any)?.toDate?.() || new Date(a.updatedAt as any);
          const bDate = b.updatedAt instanceof Date 
            ? b.updatedAt 
            : (b.updatedAt as any)?.toDate?.() || new Date(b.updatedAt as any);
          return bDate.getTime() - aDate.getTime();
        })
        .slice(0, 5)
        .map(p => {
          const updatedAt = p.updatedAt instanceof Date 
            ? p.updatedAt 
            : (p.updatedAt as any)?.toDate?.() || new Date(p.updatedAt as any);
          return {
            id: p.id,
            title: p.title || 'İsimsiz Sayfa',
            status: p.status as 'published' | 'draft',
            updatedAt: updatedAt.toISOString(),
            sectionsCount: p.sections?.length || 0,
          };
        });
      setRecentPages(recentPagesList);

    } catch (error) {
      logger.api.error('Error loading dashboard data', error);
      // Keep initial empty state on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };


  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
    });
  };

  const statsCards = [
    {
      title: 'Toplam Sayfa',
      value: stats.totalPages,
      icon: FolderKanban,
      color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
      change: stats.totalPages > 0 ? 'Sayfalar' : 'Henüz sayfa yok',
    },
    {
      title: 'Yayında',
      value: stats.publishedPages,
      icon: Eye,
      color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
      change: stats.publishedPages > 0 ? 'Yayınlanmış' : 'Yayınlanmış sayfa yok',
    },
    {
      title: 'Taslak',
      value: stats.draftPages,
      icon: FolderKanban,
      color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
      change: stats.draftPages > 0 ? 'Taslak sayfalar' : 'Taslak yok',
    },
    {
      title: 'Toplam Section',
      value: stats.totalSections,
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
      change: stats.totalSections > 0 ? 'Section' : 'Section yok',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadDashboardData}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          {t('dashboard.refresh') || 'Yenile'}
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={cn('p-3 rounded-lg', stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent activity grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Recent Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Son Güncellenen Sayfalar</CardTitle>
                  <CardDescription>Son düzenlenen sayfalar</CardDescription>
                </div>
                <Link
                  href={getLocalizedHref('/admin/page-builder')}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  Tümü
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPages.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderKanban className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Henüz sayfa eklenmemiş
                    </p>
                    <Link
                      href={getLocalizedHref('/admin/page-builder')}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline mt-2 inline-block"
                    >
                      İlk sayfayı oluştur
                    </Link>
                  </div>
                ) : (
                  recentPages.map((page) => (
                    <div
                      key={page.id}
                      onClick={() => {
                        router.push(getLocalizedHref(`/admin/page-builder/${page.id}`));
                      }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <FolderKanban className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {page.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(page.updatedAt)} • {page.sectionsCount} section
                          </p>
                        </div>
                      </div>
                      <Badge variant={page.status === 'published' ? 'success' : 'secondary'}>
                        {page.status === 'published' ? 'Yayında' : 'Taslak'}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions')}</CardTitle>
            <CardDescription>Hızlı işlemler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link
                href={getLocalizedHref('/admin/page-builder')}
                className={buttonVariants({ variant: 'primary' })}
              >
                <FolderKanban className="w-4 h-4 mr-2" />
                Yeni Sayfa Oluştur
              </Link>
              <Link
                href={getLocalizedHref('/admin/page-builder')}
                className={buttonVariants({ variant: 'outline' })}
              >
                <Eye className="w-4 h-4 mr-2" />
                Tüm Sayfaları Görüntüle
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <DashboardCharts />
      </motion.div>
    </div>
  );
}
