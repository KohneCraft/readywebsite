'use client';

// ============================================
// Vav Yapı - Project Detail Page
// Individual project view with gallery, map, video
// Layout-aware dynamic rendering
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
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { getProjectBySlug } from '@/lib/firebase/firestore';
import { usePageLayout } from '@/hooks/usePageLayout';
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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Layout hook'u - Firebase'den sayfa düzenini oku
  const { isElementVisible, getElementSettings } = usePageLayout('project-detail');

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

  // Paylaşım fonksiyonları
  const getShareUrl = () => typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = async () => {
    const shareUrl = getShareUrl();
    const shareTitle = project ? project.translations[locale]?.name : '';
    
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: shareTitle, 
          url: shareUrl 
        });
      } catch {
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const copyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const shareToSocial = (platform: string) => {
    const shareUrl = encodeURIComponent(getShareUrl());
    const shareTitle = encodeURIComponent(project?.translations[locale]?.name || '');
    
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

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

  // Element render fonksiyonları
  const renderHero = () => {
    if (!isElementVisible('hero')) return null;
    const settings = getElementSettings('hero');
    
    return (
      <section 
        className="relative h-[60vh] min-h-[400px]"
        style={settings ? { 
          marginTop: settings.margin.top,
          marginBottom: settings.margin.bottom 
        } : undefined}
      >
        <Image
          src={project.coverImage?.url || 'https://via.placeholder.com/1200x800?text=No+Image'}
          alt={translation.name}
          fill
          className="object-cover"
          priority
          unoptimized
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
        <div className="absolute top-8 right-8 z-20">
          <button 
            onClick={handleShare}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg border border-white/20"
            title={t('share')}
          >
            <Share2 className="w-6 h-6 text-white" />
          </button>

          {/* Share Menu */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-3 min-w-[200px]"
              >
                <div className="flex flex-col gap-2">
                  <button onClick={() => shareToSocial('facebook')} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-200">Facebook</span>
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Twitter className="w-5 h-5 text-sky-500" />
                    <span className="text-gray-700 dark:text-gray-200">Twitter</span>
                  </button>
                  <button onClick={() => shareToSocial('linkedin')} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span className="text-gray-700 dark:text-gray-200">LinkedIn</span>
                  </button>
                  <button onClick={() => shareToSocial('whatsapp')} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-200">WhatsApp</span>
                  </button>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <button onClick={copyLink} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    {linkCopied ? (
                      <>
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-green-500">{t('linkCopied')}</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-200">{t('copyLink')}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showShareMenu && <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)} />}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <Badge variant={statusColors[statusKey] || 'secondary'} className="mb-4">
              {t(`status.${project.status}`)}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {translation.name}
            </h1>
            {translation.shortDescription && (
              <p className="text-lg text-white/90 max-w-3xl backdrop-blur-sm bg-black/20 rounded-lg px-4 py-2 inline-block">
                {translation.shortDescription}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderDescription = () => {
    if (!isElementVisible('description')) return null;
    const settings = getElementSettings('description');
    const widthClass = settings?.width === 'two-thirds' ? 'lg:col-span-2' : 
                       settings?.width === 'full' ? 'lg:col-span-3' : 'lg:col-span-2';
    
    return (
      <div className={widthClass}>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('description')}
          </h2>
          <div className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-relaxed">
            {translation.description}
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    if (!isElementVisible('sidebar')) return null;
    
    return (
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
            {t('projectInfo')}
          </h3>
          <div className="space-y-4">
            {/* Durum */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                {t('status.label')}
              </span>
              <Badge variant={statusColors[statusKey] || 'secondary'}>
                {t(`status.${project.status}`)}
              </Badge>
            </div>
            
            {/* Yıl */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('year')}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {project.startDate.getFullYear()}
              </span>
            </div>

            {/* Konum */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('location')}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white text-right">
                {translation.location?.city || translation.location?.fullAddress || '-'}
              </span>
            </div>

            {/* Alan */}
            {project.totalArea && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  {t('area')}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {project.totalArea.toLocaleString()} m²
                </span>
              </div>
            )}

            {/* Tip */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {t('type')}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t(`types.${project.type}`)}
              </span>
            </div>

            {/* Kat Sayısı */}
            {project.floors && project.floors > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  {t('floors')}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {project.floors}
                </span>
              </div>
            )}

            {/* Oda Düzeni */}
            {extendedProject.roomLayout && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  {t('roomLayout')}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {extendedProject.roomLayout}
                </span>
              </div>
            )}

            {/* Tamamlanma Yüzdesi */}
            {project.completionPercentage !== undefined && project.completionPercentage > 0 && (
              <div className="py-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 dark:text-gray-400">{t('completion')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {project.completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${project.completionPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          {isElementVisible('cta') && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-5 text-white">
                <h4 className="font-semibold mb-2">{t('cta.title')}</h4>
                <p className="text-white/80 text-sm mb-4">{t('cta.description')}</p>
                <Link
                  href={getLocalizedHref('/contact')}
                  className="inline-block bg-white text-primary-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-sm"
                >
                  {t('cta.button')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderVideo = () => {
    if (!isElementVisible('video') || !youtubeVideoId) return null;
    
    return (
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('video')}
        </h2>
        {showVideo ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
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
            className="relative aspect-video w-full rounded-2xl overflow-hidden group shadow-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play className="w-8 h-8 text-primary-600 ml-1" />
              </div>
            </div>
          </button>
        )}
      </div>
    );
  };

  const renderMap = () => {
    if (!isElementVisible('map') || !project.coordinates?.lat || !project.coordinates?.lng) return null;
    
    return (
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('map')}
        </h2>
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
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
          className="inline-flex items-center gap-2 mt-4 text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          {t('openInMaps')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  };

  const renderGallery = () => {
    if (!isElementVisible('gallery') || allImages.length === 0) return null;
    
    return (
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
                'relative rounded-xl overflow-hidden cursor-pointer shadow-lg',
                index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-video'
              )}
            >
              <Image
                src={image}
                alt={`${translation.name} - ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <article className="min-h-screen">
        {/* Hero - Layout'a göre */}
        {renderHero()}

        {/* Content - Layout'a göre dinamik sıralama */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Açıklama ve Sidebar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {renderDescription()}
              {renderSidebar()}
            </div>

            {/* Video ve Harita - Yan Yana */}
            {(isElementVisible('video') || isElementVisible('map')) && 
             (youtubeVideoId || (project.coordinates?.lat && project.coordinates?.lng)) && (
              <div className="mt-16">
                <div className="flex flex-col lg:flex-row gap-8">
                  {renderVideo()}
                  {renderMap()}
                </div>
              </div>
            )}

            {/* Galeri */}
            {renderGallery()}
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
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

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
                unoptimized
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
