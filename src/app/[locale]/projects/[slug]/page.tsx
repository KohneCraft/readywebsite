'use client';

// ============================================
// Vav Yapı - Project Detail Page
// Individual project view with gallery, map, video
// ============================================

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Ruler, 
  Building2,
  Layers,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Play,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { getProjectBySlug } from '@/lib/firebase/firestore';
import type { Locale } from '@/i18n';
import type { Project } from '@/types';

// YouTube URL'den video ID'sini çıkar
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function ProjectDetailPage() {
  const t = useTranslations('projects');
  const locale = useLocale() as Locale;
  const params = useParams();
  const slug = params?.slug as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectBySlug(slug);
        setProject(projectData);
      } catch (error) {
        console.error('Failed to load project:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) {
      loadProject();
    }
  }, [slug]);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  const statusColors = {
    planning: 'secondary',
    ongoing: 'primary',
    completed: 'success',
  } as const;

  const galleryImages = project?.gallery?.map(img => img.url) || [];
  const allImages = project?.coverImage?.url 
    ? [project.coverImage.url, ...galleryImages]
    : galleryImages;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Extend Project type for new fields
  const extendedProject = project as Project & { 
    roomLayout?: string; 
    youtubeUrl?: string;
  };

  const youtubeVideoId = extendedProject?.youtubeUrl 
    ? getYouTubeVideoId(extendedProject.youtubeUrl) 
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('notFound')}
        </h1>
        <Link
          href={getLocalizedHref('/projects')}
          className={buttonVariants({ variant: 'primary' })}
        >
          {t('backToProjects')}
        </Link>
      </div>
    );
  }

  const translation = project.translations[locale];
  const statusKey = project.status as keyof typeof statusColors;

  return (
    <>
      <article className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px]">
          <Image
            src={project.coverImage?.url || 'https://via.placeholder.com/1200x800?text=No+Image'}
            alt={translation.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Back button */}
          <Link
            href={getLocalizedHref('/projects')}
            className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToProjects')}</span>
          </Link>

          {/* Share button */}
          <button 
            onClick={() => navigator.share?.({ title: translation.name, url: window.location.href })}
            className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto">
              <Badge variant={statusColors[statusKey] || 'secondary'} className="mb-4">
                {t(`status.${project.status}`)}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {translation.name}
              </h1>
              <p className="text-lg text-white/80 max-w-3xl">
                {translation.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                {/* Project info cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('year')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.startDate.getFullYear()}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('location')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {translation.location?.city || translation.location?.fullAddress || '-'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <Ruler className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('area')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.totalArea?.toLocaleString() || '-'} m²
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('type')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t(`types.${project.type}`)}
                    </p>
                  </div>
                </div>

                {/* Additional info cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  {project.floors && project.floors > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                      <Layers className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('floors')}</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.floors}
                      </p>
                    </div>
                  )}
                  {extendedProject.roomLayout && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                      <Home className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('roomLayout')}</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {extendedProject.roomLayout}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                  <h2 className="text-2xl font-bold mb-4">{t('description')}</h2>
                  <div className="whitespace-pre-line">
                    {translation.description}
                  </div>
                </div>

                {/* YouTube Video */}
                {youtubeVideoId && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {t('video')}
                    </h2>
                    {showVideo ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                          title="Project Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="relative aspect-video w-full rounded-2xl overflow-hidden group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`}
                          alt="Video thumbnail"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-primary-600 ml-1" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* Map */}
                {project.coordinates && project.coordinates.lat && project.coordinates.lng && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {t('map')}
                    </h2>
                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${project.coordinates.lng}!3d${project.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1str!2str!4v1234567890`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                      />
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {t('openInMaps')}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Project summary */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('projectInfo')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">{t('status.label')}</span>
                      <Badge variant={statusColors[statusKey] || 'secondary'}>
                        {t(`status.${project.status}`)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">{t('type')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {t(`types.${project.type}`)}
                      </span>
                    </div>
                    {project.completionPercentage !== undefined && project.completionPercentage > 0 && (
                      <div className="py-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-500 dark:text-gray-400">{t('completion')}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {project.completionPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all"
                            style={{ width: `${project.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary-600 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    {t('cta.title')}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {t('cta.description')}
                  </p>
                  <Link
                    href={getLocalizedHref('/contact')}
                    className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                  >
                    {t('cta.button')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Gallery */}
            {allImages.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  {t('gallery')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {allImages.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openLightbox(index)}
                      className={cn(
                        'relative rounded-xl overflow-hidden cursor-pointer',
                        index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-video'
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${translation.name} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[lightboxIndex]}
                alt={`${translation.name} - ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
