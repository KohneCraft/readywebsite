'use client';

// ============================================
// Vav Yapı - Privacy Policy Page
// ============================================

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  const sections = [
    {
      icon: Database,
      title: t('sections.dataCollection.title'),
      content: t('sections.dataCollection.content'),
    },
    {
      icon: Eye,
      title: t('sections.dataUsage.title'),
      content: t('sections.dataUsage.content'),
    },
    {
      icon: Lock,
      title: t('sections.dataSecurity.title'),
      content: t('sections.dataSecurity.content'),
    },
    {
      icon: UserCheck,
      title: t('sections.userRights.title'),
      content: t('sections.userRights.content'),
    },
    {
      icon: Shield,
      title: t('sections.cookies.title'),
      content: t('sections.cookies.content'),
    },
    {
      icon: Mail,
      title: t('sections.contact.title'),
      content: t('sections.contact.content'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Shield className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-primary-100">
              {t('subtitle')}
            </p>
            <p className="text-sm text-primary-200 mt-4">
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
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                        <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
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

