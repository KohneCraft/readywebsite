'use client';

// ============================================
// Vav Yapı - Admin Dashboard
// Main dashboard with stats and recent activity
// ============================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Mail, 
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  RefreshCcw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { cn } from '@/lib/utils';
import { getProjects, getContactForms } from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';

// Initial stats - will be updated from Firestore
const initialStats = {
  totalProjects: 0,
  activeProjects: 0,
  totalContacts: 0,
  unreadContacts: 0,
  monthlyViews: 0,
  growthRate: 0,
};

interface RecentProject {
  id: string;
  title: string;
  status: 'planning' | 'in_progress' | 'completed';
  updatedAt: string;
}

interface RecentContact {
  id: string;
  name: string;
  subject: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  const [stats, setStats] = useState(initialStats);
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load projects from Firestore
      const projectsResult = await getProjects({ locale, limit: 5 });
      const contactsResult = await getContactForms({ limit: 5 });

      // Calculate stats
      const allProjects = await getProjects({ locale, limit: 100 });
      const activeCount = allProjects.projects.filter(
        p => p.status === 'ongoing' || p.status === 'planning'
      ).length;

      setStats({
        totalProjects: allProjects.total || allProjects.projects.length,
        activeProjects: activeCount,
        totalContacts: contactsResult.stats.new + contactsResult.stats.read + contactsResult.stats.replied + contactsResult.stats.archived,
        unreadContacts: contactsResult.stats.new,
        monthlyViews: 0, // Analytics integration needed
        growthRate: 0,
      });

      // Set recent projects
      const recentProjectsList: RecentProject[] = projectsResult.projects.map(p => ({
        id: p.id,
        title: p.name,
        status: p.status === 'ongoing' ? 'in_progress' : p.status as RecentProject['status'],
        updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : String(p.updatedAt),
      }));
      setRecentProjects(recentProjectsList);

      // Set recent contacts
      const recentContactsList: RecentContact[] = contactsResult.forms.map(f => ({
        id: f.id,
        name: f.name,
        subject: f.subject,
        isRead: f.status !== 'new',
        createdAt: f.createdAt instanceof Date ? f.createdAt.toISOString() : String(f.createdAt),
      }));
      setRecentContacts(recentContactsList);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Keep initial empty state on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [locale]);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  const statusColors = {
    planning: 'secondary',
    in_progress: 'primary',
    completed: 'success',
  } as const;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
    });
  };

  const statsCards = [
    {
      title: t('dashboard.stats.totalProjects'),
      value: stats.totalProjects,
      icon: FolderKanban,
      color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
      change: stats.totalProjects > 0 ? 'Tüm projeler' : 'Henüz proje yok',
    },
    {
      title: t('dashboard.stats.activeProjects'),
      value: stats.activeProjects,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
      change: stats.activeProjects > 0 ? 'Devam eden' : 'Aktif proje yok',
    },
    {
      title: t('dashboard.stats.totalContacts'),
      value: stats.totalContacts,
      icon: Mail,
      color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
      change: stats.unreadContacts > 0 ? `${stats.unreadContacts} okunmamış` : 'Tüm mesajlar okundu',
    },
    {
      title: t('dashboard.stats.monthlyViews'),
      value: stats.monthlyViews.toLocaleString(),
      icon: Eye,
      color: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
      change: stats.growthRate > 0 ? `+${stats.growthRate}%` : 'Görüntülenme bekleniyor',
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.recentProjects')}</CardTitle>
                  <CardDescription>Son güncellenen projeler</CardDescription>
                </div>
                <Link
                  href={getLocalizedHref('/admin/projects')}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  Tümü
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderKanban className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Henüz proje eklenmemiş
                    </p>
                    <Link
                      href={getLocalizedHref('/admin/projects/new')}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline mt-2 inline-block"
                    >
                      İlk projeyi ekle
                    </Link>
                  </div>
                ) : (
                  recentProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={getLocalizedHref(`/admin/projects/${project.id}`)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <FolderKanban className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <Badge variant={statusColors[project.status]}>
                        {t(`projects.status.${project.status}`)}
                      </Badge>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.recentContacts')}</CardTitle>
                  <CardDescription>Son gelen mesajlar</CardDescription>
                </div>
                <Link
                  href={getLocalizedHref('/admin/contacts')}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  Tümü
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentContacts.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t('dashboard.empty.noContacts')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentContacts.map((contact) => (
                    <Link
                      key={contact.id}
                      href={getLocalizedHref(`/admin/contacts/${contact.id}`)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center',
                          contact.isRead
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'bg-primary-100 dark:bg-primary-900/30'
                        )}>
                          <Mail className={cn(
                            'w-5 h-5',
                            contact.isRead
                              ? 'text-gray-600 dark:text-gray-400'
                              : 'text-primary-600 dark:text-primary-400'
                          )} />
                        </div>
                        <div>
                          <p className={cn(
                            'text-sm text-gray-900 dark:text-white',
                            !contact.isRead && 'font-medium'
                          )}>
                            {contact.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {contact.subject}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(contact.createdAt)}
                        </span>
                        {!contact.isRead && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
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
                href={getLocalizedHref('/admin/projects/new')}
                className={buttonVariants({ variant: 'primary' })}
              >
                <FolderKanban className="w-4 h-4 mr-2" />
                {t('dashboard.newProject')}
              </Link>
              <Link
                href={getLocalizedHref('/admin/contacts?filter=unread')}
                className={buttonVariants({ variant: 'outline' })}
              >
                <Mail className="w-4 h-4 mr-2" />
                Okunmamış Mesajlar ({stats.unreadContacts})
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
