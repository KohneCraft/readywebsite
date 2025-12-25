'use client';

// ============================================
// Vav Yapı - Projects Page
// Project listing with filters and pagination
// ============================================

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin,
  Calendar,
  ArrowRight,
  Building2,
  Factory,
  Home,
  LayoutGrid,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import type { Locale } from '@/i18n';
// Project type definitions for the page
type PageProjectStatus = 'completed' | 'ongoing' | 'planned' | 'onHold';
type PageProjectType = 'residential' | 'commercial' | 'industrial' | 'mixed' | 'infrastructure' | 'renovation';

// Mock project data - in production, this would come from Firestore
const mockProjects = [
  {
    id: '1',
    title: { tr: 'Vav Residence', en: 'Vav Residence', de: 'Vav Residenz', fr: 'Résidence Vav' },
    description: { 
      tr: 'Modern yaşam alanları sunan lüks konut projesi',
      en: 'Luxury residential project offering modern living spaces',
      de: 'Luxuswohnprojekt mit modernen Wohnräumen',
      fr: 'Projet résidentiel de luxe offrant des espaces de vie modernes'
    },
    type: 'residential' as PageProjectType,
    status: 'completed' as PageProjectStatus,
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc69e901e8cc?w=800',
    location: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey', de: 'Istanbul, Türkei', fr: 'Istanbul, Turquie' },
    completionDate: '2023-06-15',
  },
  {
    id: '2',
    title: { tr: 'Metro Business Center', en: 'Metro Business Center', de: 'Metro Geschäftszentrum', fr: 'Centre d\'Affaires Metro' },
    description: { 
      tr: 'A+ ofis alanları ile modern iş merkezi',
      en: 'Modern business center with A+ office spaces',
      de: 'Modernes Geschäftszentrum mit A+ Büroflächen',
      fr: 'Centre d\'affaires moderne avec des espaces de bureau A+'
    },
    type: 'commercial' as PageProjectType,
    status: 'ongoing' as PageProjectStatus,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8a9603f8853e?w=800',
    location: { tr: 'Ankara, Türkiye', en: 'Ankara, Turkey', de: 'Ankara, Türkei', fr: 'Ankara, Turquie' },
    completionDate: '2024-12-01',
  },
  {
    id: '3',
    title: { tr: 'Tekno Fabrika', en: 'Techno Factory', de: 'Techno Fabrik', fr: 'Usine Techno' },
    description: { 
      tr: 'Son teknoloji üretim tesisi',
      en: 'State-of-the-art manufacturing facility',
      de: 'Hochmoderne Produktionsanlage',
      fr: 'Installation de fabrication de pointe'
    },
    type: 'industrial' as PageProjectType,
    status: 'completed' as PageProjectStatus,
    coverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
    location: { tr: 'İzmir, Türkiye', en: 'Izmir, Turkey', de: 'Izmir, Türkei', fr: 'Izmir, Turquie' },
    completionDate: '2022-09-20',
  },
  {
    id: '4',
    title: { tr: 'Green Valley Villaları', en: 'Green Valley Villas', de: 'Green Valley Villen', fr: 'Villas Green Valley' },
    description: { 
      tr: 'Doğayla iç içe lüks villa projesi',
      en: 'Luxury villa project surrounded by nature',
      de: 'Luxusvillenprojekt inmitten der Natur',
      fr: 'Projet de villas de luxe entouré par la nature'
    },
    type: 'residential' as PageProjectType,
    status: 'ongoing' as PageProjectStatus,
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    location: { tr: 'Bodrum, Türkiye', en: 'Bodrum, Turkey', de: 'Bodrum, Türkei', fr: 'Bodrum, Turquie' },
    completionDate: '2025-03-01',
  },
  {
    id: '5',
    title: { tr: 'Central AVM', en: 'Central Mall', de: 'Central Einkaufszentrum', fr: 'Centre Commercial Central' },
    description: { 
      tr: 'Şehrin kalbinde modern alışveriş merkezi',
      en: 'Modern shopping mall in the heart of the city',
      de: 'Modernes Einkaufszentrum im Herzen der Stadt',
      fr: 'Centre commercial moderne au cœur de la ville'
    },
    type: 'commercial' as PageProjectType,
    status: 'completed' as PageProjectStatus,
    coverImage: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
    location: { tr: 'Bursa, Türkiye', en: 'Bursa, Turkey', de: 'Bursa, Türkei', fr: 'Bursa, Turquie' },
    completionDate: '2021-11-15',
  },
  {
    id: '6',
    title: { tr: 'Lojistik Merkezi', en: 'Logistics Center', de: 'Logistikzentrum', fr: 'Centre Logistique' },
    description: { 
      tr: 'Entegre depolama ve dağıtım tesisi',
      en: 'Integrated storage and distribution facility',
      de: 'Integrierte Lager- und Vertriebsanlage',
      fr: 'Installation de stockage et de distribution intégrée'
    },
    type: 'industrial' as PageProjectType,
    status: 'planned' as PageProjectStatus,
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    location: { tr: 'Kocaeli, Türkiye', en: 'Kocaeli, Turkey', de: 'Kocaeli, Türkei', fr: 'Kocaeli, Turquie' },
    completionDate: '2026-06-01',
  },
];

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const locale = useLocale() as Locale;
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PageProjectType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<PageProjectStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Getters
  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title[locale].toLowerCase().includes(searchLower) ||
        project.description[locale].toLowerCase().includes(searchLower) ||
        project.location[locale].toLowerCase().includes(searchLower);

      // Type filter
      const matchesType = selectedType === 'all' || project.type === selectedType;

      // Status filter
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, selectedType, selectedStatus, locale]);

  // Project type icons
  const typeIcons: Record<PageProjectType, typeof Building2> = {
    residential: Home,
    commercial: Building2,
    industrial: Factory,
    mixed: LayoutGrid,
    infrastructure: Building2,
    renovation: Building2,
  };

  // Status badge variants
  const statusVariants: Record<PageProjectStatus, 'success' | 'warning' | 'primary' | 'secondary'> = {
    completed: 'success',
    ongoing: 'warning',
    planned: 'primary',
    onHold: 'secondary',
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920"
            alt="Projects"
            fill
            className="object-cover"
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-30">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedType === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {t('filters.all')}
              </button>
              {(['residential', 'commercial', 'industrial'] as PageProjectType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                    selectedType === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {(() => {
                    const Icon = typeIcons[type];
                    return <Icon className="w-4 h-4" />;
                  })()}
                  {t(`types.${type}`)}
                </button>
              ))}
            </div>

            {/* Status Filter & View Toggle */}
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as PageProjectStatus | 'all')}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                <option value="all">{t('status.all')}</option>
                <option value="completed">{t('status.completed')}</option>
                <option value="ongoing">{t('status.ongoing')}</option>
                <option value="planned">{t('status.planned')}</option>
              </select>

              <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  )}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="section">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Building2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('empty.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('empty.description')}
              </p>
            </motion.div>
          ) : (
            <>
              {/* Results count */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('results', { count: filteredProjects.length })}
              </p>

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={getLocalizedHref(`/projects/${project.id}`)}>
                          <Card hover className="overflow-hidden group h-full">
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={project.coverImage}
                                alt={project.title[locale]}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                              
                              {/* Status Badge */}
                              <div className="absolute top-4 left-4">
                                <Badge variant={statusVariants[project.status]}>
                                  {t(`status.${project.status}`)}
                                </Badge>
                              </div>

                              {/* Type Badge */}
                              <div className="absolute top-4 right-4">
                                <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm">
                                  {t(`types.${project.type}`)}
                                </Badge>
                              </div>

                              {/* Content */}
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                                  {project.title[locale]}
                                </h3>
                                <div className="flex items-center gap-4 text-gray-300 text-sm">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {project.location[locale]}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(project.completionDate).getFullYear()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4">
                              <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                                {project.description[locale]}
                              </p>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={getLocalizedHref(`/projects/${project.id}`)}>
                          <Card hover className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-64 aspect-[16/9] md:aspect-square flex-shrink-0">
                                <Image
                                  src={project.coverImage}
                                  alt={project.title[locale]}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-6 flex-1">
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge variant={statusVariants[project.status]}>
                                    {t(`status.${project.status}`)}
                                  </Badge>
                                  <Badge variant="secondary">
                                    {t(`types.${project.type}`)}
                                  </Badge>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                  {project.title[locale]}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                  {project.description[locale]}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {project.location[locale]}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(project.completionDate).toLocaleDateString(locale)}
                                  </span>
                                </div>
                              </div>
                              <div className="p-6 flex items-center">
                                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {t('cta.description')}
            </p>
            <Link
              href={getLocalizedHref('/contact')}
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'gap-2')}
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
