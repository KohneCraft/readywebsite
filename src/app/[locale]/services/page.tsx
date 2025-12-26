'use client';

// ============================================
// Vav Yapı - Services Page
// ============================================

import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Home, 
  Factory, 
  Hammer, 
  HardHat,
  Ruler,
  PenTool,
  ClipboardCheck,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n';

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale() as Locale;

  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  const services = [
    {
      icon: Home,
      title: t('residential.title'),
      description: t('residential.description'),
      features: [
        t('residential.features.design'),
        t('residential.features.construction'),
        t('residential.features.renovation'),
        t('residential.features.landscaping'),
      ],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    },
    {
      icon: Building2,
      title: t('commercial.title'),
      description: t('commercial.description'),
      features: [
        t('commercial.features.office'),
        t('commercial.features.retail'),
        t('commercial.features.hotel'),
        t('commercial.features.mixed'),
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    },
    {
      icon: Factory,
      title: t('industrial.title'),
      description: t('industrial.description'),
      features: [
        t('industrial.features.factory'),
        t('industrial.features.warehouse'),
        t('industrial.features.logistics'),
        t('industrial.features.energy'),
      ],
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    },
    {
      icon: Hammer,
      title: t('renovation.title'),
      description: t('renovation.description'),
      features: [
        t('renovation.features.restoration'),
        t('renovation.features.modernization'),
        t('renovation.features.expansion'),
        t('renovation.features.reinforcement'),
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    },
  ];

  const additionalServices = [
    { icon: PenTool, title: t('additional.design'), description: t('additional.designDesc') },
    { icon: Ruler, title: t('additional.planning'), description: t('additional.planningDesc') },
    { icon: HardHat, title: t('additional.supervision'), description: t('additional.supervisionDesc') },
    { icon: ClipboardCheck, title: t('additional.consulting'), description: t('additional.consultingDesc') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1541976590-713941681591?w=1920"
            alt="Construction"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'grid md:grid-cols-2 gap-12 items-center',
                  index % 2 === 1 && 'md:flex-row-reverse'
                )}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                      <service.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={getLocalizedHref('/contact')}
                    className={cn(buttonVariants({ variant: 'primary' }), 'gap-2')}
                  >
                    {t('getQuote')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={cn('relative aspect-[4/3] rounded-2xl overflow-hidden', index % 2 === 1 ? 'md:order-1' : '')}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('additionalTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('additionalSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}

