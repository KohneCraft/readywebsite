'use client';

// ============================================
// Vav Yapı - Home Page
// Main landing page with all sections
// ============================================

import { useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Building2, 
  ShoppingBag, 
  Factory, 
  Hammer,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Locale } from '@/i18n';

// Lazy load heavy components
const HeroSlider = dynamic(() => import('@/components/home/HeroSlider').then(mod => ({ default: mod.HeroSlider })), {
  loading: () => <div className="min-h-[90vh] bg-gray-900 animate-pulse" />,
  ssr: true,
});

const PartnersSection = dynamic(() => import('@/components/home/PartnersSection').then(mod => ({ default: mod.PartnersSection })), {
  loading: () => <div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse" />,
  ssr: true,
});

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;

  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  // Stats data
  const stats = useMemo(() => [
    { value: '30+', label: t('about.experience') },
    { value: '500+', label: t('about.projects') },
    { value: '1000+', label: t('about.clients') },
    { value: '200+', label: t('about.employees') },
  ], [t]);

  // Services data
  const services = useMemo(() => [
    {
      icon: Building2,
      title: t('services.residential.title'),
      description: t('services.residential.description'),
    },
    {
      icon: ShoppingBag,
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
    },
    {
      icon: Factory,
      title: t('services.industrial.title'),
      description: t('services.industrial.description'),
    },
    {
      icon: Hammer,
      title: t('services.renovation.title'),
      description: t('services.renovation.description'),
    },
  ], [t]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2070"
            alt="Construction site"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Content */}
        <div className="container relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" size="lg" className="mb-4">
                🏗️ 30+ Yıllık Tecrübe
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href={getLocalizedHref('/projects')}
                className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href={getLocalizedHref('/contact')}
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'text-white border-white hover:bg-white hover:text-gray-900')}
              >
                {t('hero.ctaSecondary')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-600">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                  alt="About Vav Yapı"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={85}
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">ISO 9001:2015</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Kalite Sertifikası</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="primary" className="mb-4">{t('about.title')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('about.subtitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                {t('about.description')}
              </p>

              <ul className="space-y-4 mb-8">
                {['Zamanında teslim garantisi', 'Kalite odaklı yaklaşım', 'Deneyimli mühendis kadrosu', 'Modern teknoloji kullanımı'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={getLocalizedHref('/about')}
                className={cn(buttonVariants(), 'gap-2')}
              >
                {t('about.cta')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="primary" className="mb-4">{t('services.title')}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('services.subtitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-6 h-full">
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <Badge variant="primary" className="mb-4">{t('featured.title')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('featured.subtitle')}
              </h2>
            </div>
            <Link 
              href={getLocalizedHref('/projects')}
              className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
            >
              {t('featured.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Placeholder for featured projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1486325212027-8a9603f8853e' : i === 2 ? '1545324418-cc69e901e8cc' : '1487958449943-2429e8be8625'}?q=80&w=800`}
                      alt={`Project ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      quality={85}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={i === 1 ? 'success' : i === 2 ? 'warning' : 'primary'}>
                        {i === 1 ? 'Tamamlandı' : i === 2 ? 'Devam Ediyor' : 'Konut'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Örnek Proje {i}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      İstanbul, Türkiye
                    </p>
                    <Link
                      href={getLocalizedHref(`/projects/project-${i}`)}
                      className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-3 transition-all"
                    >
                      Detayları Gör
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary-600 z-10" />
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="container relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {t('cta.description')}
            </p>
            <Link 
              href={getLocalizedHref('/contact')}
              className={cn(buttonVariants({ size: 'xl', variant: 'secondary' }), 'gap-2')}
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </>
  );
}
