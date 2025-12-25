'use client';

// ============================================
// Vav Yapı - Hero Slider Component
// Dynamic carousel for homepage
// ============================================

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import type { Locale } from '@/i18n';

export interface HeroSlide {
  id: string;
  title: { tr: string; en: string; de: string; fr: string };
  subtitle: { tr: string; en: string; de: string; fr: string };
  image: string;
  ctaLink?: string;
  ctaText?: { tr: string; en: string; de: string; fr: string };
}

interface HeroSliderProps {
  slides?: HeroSlide[];
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const defaultSlides: HeroSlide[] = [
  {
    id: '1',
    title: {
      tr: 'Geleceği Birlikte İnşa Ediyoruz',
      en: 'Building the Future Together',
      de: 'Gemeinsam die Zukunft bauen',
      fr: 'Construire l\'avenir ensemble',
    },
    subtitle: {
      tr: 'Kalite, güvenilirlik ve yenilikçilik ile hayallerinizdeki yapıları gerçeğe dönüştürüyoruz.',
      en: 'Transforming your dream buildings into reality with quality, reliability and innovation.',
      de: 'Wir verwandeln Ihre Traumgebäude mit Qualität, Zuverlässigkeit und Innovation in Realität.',
      fr: 'Transformer vos bâtiments de rêve en réalité avec qualité, fiabilité et innovation.',
    },
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2070',
    ctaLink: '/projects',
    ctaText: { tr: 'Projelerimizi Keşfedin', en: 'Explore Our Projects', de: 'Entdecken Sie unsere Projekte', fr: 'Découvrez nos projets' },
  },
  {
    id: '2',
    title: {
      tr: '30 Yılı Aşkın Deneyim',
      en: 'Over 30 Years of Experience',
      de: 'Über 30 Jahre Erfahrung',
      fr: 'Plus de 30 ans d\'expérience',
    },
    subtitle: {
      tr: '500\'den fazla başarılı proje ile sektörün güvenilir ismi.',
      en: 'The trusted name in the industry with over 500 successful projects.',
      de: 'Der vertrauenswürdige Name in der Branche mit über 500 erfolgreichen Projekten.',
      fr: 'Le nom de confiance dans l\'industrie avec plus de 500 projets réussis.',
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    ctaLink: '/about',
    ctaText: { tr: 'Hakkımızda', en: 'About Us', de: 'Über uns', fr: 'À propos' },
  },
  {
    id: '3',
    title: {
      tr: 'Sürdürülebilir Yapılar',
      en: 'Sustainable Buildings',
      de: 'Nachhaltige Gebäude',
      fr: 'Bâtiments durables',
    },
    subtitle: {
      tr: 'Çevreye duyarlı, enerji verimli ve modern mimari projeler.',
      en: 'Environmentally friendly, energy efficient and modern architectural projects.',
      de: 'Umweltfreundliche, energieeffiziente und moderne Architekturprojekte.',
      fr: 'Projets architecturaux modernes, écoénergétiques et respectueux de l\'environnement.',
    },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
    ctaLink: '/contact',
    ctaText: { tr: 'İletişime Geçin', en: 'Contact Us', de: 'Kontaktieren Sie uns', fr: 'Contactez-nous' },
  },
];

export function HeroSlider({ slides = defaultSlides, autoplaySpeed = 6000, showDots = true, showArrows = true }: HeroSliderProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length, autoplaySpeed]);

  const goToSlide = useCallback((index: number) => { 
    setCurrentSlide(index); 
    setIsAutoplay(false); 
    setTimeout(() => setIsAutoplay(true), 10000); 
  }, []);
  
  const goToPrev = useCallback(() => { 
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); 
    setIsAutoplay(false); 
    setTimeout(() => setIsAutoplay(true), 10000); 
  }, [slides.length]);
  
  const goToNext = useCallback(() => { 
    setCurrentSlide((prev) => (prev + 1) % slides.length); 
    setIsAutoplay(false); 
    setTimeout(() => setIsAutoplay(true), 10000); 
  }, [slides.length]);
  
  const getLocalizedHref = useCallback((href: string) => locale === 'tr' ? href : `/${locale}${href}`, [locale]);
  
  const handleMouseEnter = useCallback(() => setIsAutoplay(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoplay(true), []);

  const slide = slides[currentSlide];

  return (
      <section 
        className="relative min-h-[90vh] flex items-center overflow-hidden" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
      <AnimatePresence mode="wait">
        <motion.div key={slide.id} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60 z-10" />
          <Image 
            src={slide.image} 
            alt={slide.title[locale]} 
            fill 
            className="object-cover" 
            priority 
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-20">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">{slide.title[locale]}</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">{slide.subtitle[locale]}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {slide.ctaLink && (
                <Link href={getLocalizedHref(slide.ctaLink)} className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                  {slide.ctaText?.[locale] || t('hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              <Link href={getLocalizedHref('/contact')} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'text-white border-white hover:bg-white hover:text-gray-900')}>
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button onClick={goToPrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors" aria-label="Previous">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={goToNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors" aria-label="Next">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={cn('w-3 h-3 rounded-full transition-all', index === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60')} aria-label={`Slide ${index + 1}`} />
          ))}
        </div>
      )}

      {isAutoplay && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
          <motion.div key={currentSlide} className="h-full bg-primary-500" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: autoplaySpeed / 1000, ease: 'linear' }} />
        </div>
      )}
    </section>
  );
}
