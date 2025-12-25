'use client';

// ============================================
// Vav Yapı - Admin Projects List
// Project management list with CRUD operations
// ============================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  StarOff,
  Filter,
  ChevronDown,
  RefreshCcw,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { 
  getProjects, 
  deleteProject as firestoreDeleteProject, 
  updateProject 
} from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';

// Admin project interface for display
interface AdminProject {
  id: string;
  title: {
    tr: string;
    en: string;
    de: string;
    fr: string;
  };
  slug: string;
  type: 'residential' | 'commercial' | 'industrial' | 'infrastructure' | 'renovation';
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  year: number;
  coverImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjectsPage() {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load projects from Firestore
  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getProjects({ locale, limit: 100 });
      
      // Convert ProjectSummary to AdminProject format
      const adminProjects: AdminProject[] = result.projects.map((p) => ({
        id: p.id,
        title: {
          tr: p.name,
          en: p.name,
          de: p.name,
          fr: p.name,
        },
        slug: p.slug,
        type: p.type as AdminProject['type'],
        status: p.status === 'ongoing' ? 'in_progress' : p.status as AdminProject['status'],
        year: p.startDate ? new Date(p.startDate).getFullYear() : new Date().getFullYear(),
        coverImage: p.coverImage?.url || 'https://via.placeholder.com/400x300?text=No+Image',
        isFeatured: p.featured,
        isPublished: p.published,
        createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString().split('T')[0] : String(p.createdAt),
        updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString().split('T')[0] : String(p.updatedAt),
      }));
      
      setProjects(adminProjects);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(t('projects.loadError') || 'Projeler yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [locale]);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesType = filterType === 'all' || project.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusColors = {
    planning: 'secondary',
    in_progress: 'primary',
    completed: 'success',
    on_hold: 'warning',
  } as const;

  const handleDelete = async (id: string) => {
    try {
      await firestoreDeleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(t('projects.deleteError') || 'Proje silinirken hata oluştu');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const project = projects.find(p => p.id === id);
      if (project) {
        await updateProject(id, { featured: !project.isFeatured });
        setProjects(projects.map(p => 
          p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
        ));
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError(t('projects.updateError') || 'Proje güncellenirken hata oluştu');
    }
  };

  const handleTogglePublished = async (id: string) => {
    try {
      const project = projects.find(p => p.id === id);
      if (project) {
        await updateProject(id, { published: !project.isPublished });
        setProjects(projects.map(p => 
          p.id === id ? { ...p, isPublished: !p.isPublished } : p
        ));
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError(t('projects.updateError') || 'Proje güncellenirken hata oluştu');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>
            ✕
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('projects.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('projects.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadProjects}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            {t('projects.refresh') || 'Yenile'}
          </Button>
          <Link
            href={getLocalizedHref('/admin/projects/new')}
            className={buttonVariants({ variant: 'primary' })}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('projects.new')}
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder={t('projects.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtreler
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </Button>
          </div>

          {/* Filter options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Status filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.status')}
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="all">Tümü</option>
                  <option value="planning">{t('projects.status.planning')}</option>
                  <option value="in_progress">{t('projects.status.in_progress')}</option>
                  <option value="completed">{t('projects.status.completed')}</option>
                  <option value="on_hold">{t('projects.status.on_hold')}</option>
                </select>
              </div>

              {/* Type filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.type')}
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="all">Tümü</option>
                  <option value="residential">{t('projects.type.residential')}</option>
                  <option value="commercial">{t('projects.type.commercial')}</option>
                  <option value="industrial">{t('projects.type.industrial')}</option>
                  <option value="infrastructure">{t('projects.type.infrastructure')}</option>
                  <option value="renovation">{t('projects.type.renovation')}</option>
                </select>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {t('projects.noProjects')}
              </p>
              <Link
                href={getLocalizedHref('/admin/projects/new')}
                className={cn(buttonVariants({ variant: 'primary' }), 'mt-4')}
              >
                {t('projects.addFirst')}
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.image')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.title')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.type')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.status')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.year')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.featured')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.published')}
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('projects.table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProjects.map((project) => (
                    <tr 
                      key={project.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={project.coverImage}
                            alt={project.title[locale]}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {project.title[locale]}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          /{project.slug}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`projects.type.${project.type}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={statusColors[project.status]}>
                          {t(`projects.status.${project.status}`)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {project.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleFeatured(project.id)}
                          className={cn(
                            'p-1 rounded-full transition-colors',
                            project.isFeatured
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : 'text-gray-400 hover:text-gray-500'
                          )}
                        >
                          {project.isFeatured ? (
                            <Star className="w-5 h-5 fill-current" />
                          ) : (
                            <StarOff className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublished(project.id)}
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                            project.isPublished
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                          )}
                        >
                          {project.isPublished ? 'Yayında' : 'Taslak'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={getLocalizedHref(`/projects/${project.slug}`)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title="Görüntüle"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={getLocalizedHref(`/admin/projects/${project.id}`)}
                            className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                            title="Düzenle"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(project.id)}
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Projeyi Sil
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('projects.confirmDelete')}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
              >
                İptal
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700"
              >
                Sil
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
