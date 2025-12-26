'use client';

// ============================================
// Vav Yapı - Terms of Service Page
// ============================================

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Scale, Gavel, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import type { Locale } from '@/i18n';

export default function TermsPage() {
  const t = useTranslations('terms');
  const locale = useLocale() as Locale;

  const sections = [
    {
      icon: CheckCircle,
      title: t('sections.acceptance.title'),
      content: t('sections.acceptance.content'),
    },
    {
      icon: FileText,
      title: t('sections.services.title'),
      content: t('sections.services.content'),
    },
    {
      icon: AlertTriangle,
      title: t('sections.responsibilities.title'),
      content: t('sections.responsibilities.content'),
    },
    {
      icon: Scale,
      title: t('sections.intellectualProperty.title'),
      content: t('sections.intellectualProperty.content'),
    },
    {
      icon: Gavel,
      title: t('sections.liability.title'),
      content: t('sections.liability.content'),
    },
    {
      icon: HelpCircle,
      title: t('sections.disputes.title'),
      content: t('sections.disputes.content'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <FileText className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('subtitle')}
            </p>
            <p className="text-sm text-gray-400 mt-4">
              {t('lastUpdated')}: 01.01.2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {t('intro')}
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <section.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {section.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

