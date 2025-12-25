'use client';

// ============================================
// Vav Yapı - Team Section Component
// Display team members on public pages
// ============================================

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';

export interface TeamMemberDisplay {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
}

interface TeamSectionProps {
  members?: TeamMemberDisplay[];
  showBio?: boolean;
  columns?: 3 | 4;
}

const defaultTeamMembers: TeamMemberDisplay[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    position: 'CEO & Kurucu',
    bio: '25 yıllık sektör deneyimi ile şirketimizin vizyonunu belirliyor.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    email: 'ahmet@vavyapi.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '2',
    name: 'Elif Demir',
    position: 'Proje Direktörü',
    bio: 'Tüm projelerin zamanında ve bütçe dahilinde tamamlanmasını sağlıyor.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    email: 'elif@vavyapi.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    position: 'Baş Mimar',
    bio: 'Yenilikçi tasarımlarıyla projelerimize değer katıyor.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    email: 'mehmet@vavyapi.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '4',
    name: 'Ayşe Özkan',
    position: 'İnşaat Mühendisi',
    bio: 'Yapısal mükemmellik için teknik liderlik sağlıyor.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    email: 'ayse@vavyapi.com',
    linkedin: 'https://linkedin.com',
  },
];

export function TeamSection({ 
  members = defaultTeamMembers, 
  showBio = true,
  columns = 4 
}: TeamSectionProps) {
  const t = useTranslations('about');

  const gridCols = columns === 3 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

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
            {t('team.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('team.subtitle')}
          </p>
        </motion.div>

        <div className={`grid ${gridCols} gap-8`}>
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links - Show on Hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.position}
                  </p>
                  {showBio && member.bio && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
