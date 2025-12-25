'use client';

// ============================================
// Vav Yapı - Partners/References Section
// Logo slider for business partners
// ============================================

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

interface PartnersSectionProps {
  partners?: Partner[];
}

const defaultPartners: Partner[] = [
  { id: '1', name: 'Partner 1', logo: 'https://via.placeholder.com/200x80?text=Partner+1' },
  { id: '2', name: 'Partner 2', logo: 'https://via.placeholder.com/200x80?text=Partner+2' },
  { id: '3', name: 'Partner 3', logo: 'https://via.placeholder.com/200x80?text=Partner+3' },
  { id: '4', name: 'Partner 4', logo: 'https://via.placeholder.com/200x80?text=Partner+4' },
  { id: '5', name: 'Partner 5', logo: 'https://via.placeholder.com/200x80?text=Partner+5' },
  { id: '6', name: 'Partner 6', logo: 'https://via.placeholder.com/200x80?text=Partner+6' },
];

export function PartnersSection({ partners = defaultPartners }: PartnersSectionProps) {
  const t = useTranslations('home');

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {partner.website ? (
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src={partner.logo} alt={partner.name} width={150} height={60} className="object-contain h-12 w-auto grayscale hover:grayscale-0 transition-all" />
                </a>
              ) : (
                <div className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src={partner.logo} alt={partner.name} width={150} height={60} className="object-contain h-12 w-auto grayscale hover:grayscale-0 transition-all" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
