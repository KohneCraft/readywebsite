'use client';

// ============================================
// Vav Yapı - Project Detail Page
// Individual project view with gallery
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
  User,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Heart,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n';

// Mock project data
interface ProjectDetail {
  id: string;
  slug: string;
  title: { [key: string]: string };
  description: { [key: string]: string };
  content: { [key: string]: string };
  type: 'residential' | 'commercial' | 'industrial' | 'infrastructure' | 'renovation';
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  client: string;
  location: string;
  year: number;
  area: number;
  coverImage: string;
  gallery: string[];
}

const mockProject: ProjectDetail = {
  id: '1',
  slug: 'istanbul-business-center',
  title: {
    tr: 'İstanbul Business Center',
    en: 'Istanbul Business Center',
    de: 'Istanbul Business Center',
    fr: 'Centre d\'affaires Istanbul',
  },
  description: {
    tr: 'İstanbul\'un kalbinde modern ve sürdürülebilir bir iş merkezi projesi.',
    en: 'A modern and sustainable business center project in the heart of Istanbul.',
    de: 'Ein modernes und nachhaltiges Geschäftszentrum im Herzen von Istanbul.',
    fr: 'Un centre d\'affaires moderne et durable au cœur d\'Istanbul.',
  },
  content: {
    tr: `İstanbul Business Center, şehrin en prestijli bölgelerinden birinde konumlanan, A+ sınıfı ofis binası projesidir.

## Proje Özellikleri

- 45 katlı modern yapı
- 25.000 m² kullanım alanı
- LEED Gold sertifikası hedefi
- Akıllı bina teknolojileri
- Yer altı otoparkı (500 araç kapasiteli)

## Sürdürülebilirlik

Projede enerji verimliliği ve çevre dostu tasarım ön plandadır. Güneş panelleri, yağmur suyu toplama sistemleri ve yeşil çatı uygulamaları ile karbon ayak izini minimize etmeyi hedefliyoruz.

## Konum Avantajları

Metro ve metrobüs hatlarına yürüme mesafesinde bulunan proje, toplu taşıma erişimi açısından benzersiz bir konuma sahiptir. Ayrıca bölgedeki alışveriş merkezleri, oteller ve restoranlara yakınlığı ile çalışanlar için ideal bir iş ortamı sunmaktadır.`,
    en: `Istanbul Business Center is an A+ class office building project located in one of the most prestigious districts of the city.

## Project Features

- 45-story modern building
- 25,000 m² usable area
- LEED Gold certification target
- Smart building technologies
- Underground parking (500 vehicle capacity)

## Sustainability

Energy efficiency and eco-friendly design are at the forefront of this project. We aim to minimize carbon footprint with solar panels, rainwater harvesting systems, and green roof applications.

## Location Advantages

Walking distance to metro and metrobus lines, the project has a unique location in terms of public transportation access. Its proximity to shopping centers, hotels, and restaurants in the area provides an ideal work environment for employees.`,
    de: `Istanbul Business Center ist ein A+ Klasse Bürogebäudeprojekt in einem der prestigeträchtigsten Viertel der Stadt.

## Projektmerkmale

- 45-stöckiges modernes Gebäude
- 25.000 m² Nutzfläche
- LEED Gold Zertifizierungsziel
- Intelligente Gebäudetechnologien
- Tiefgarage (500 Fahrzeuge Kapazität)

## Nachhaltigkeit

Energieeffizienz und umweltfreundliches Design stehen bei diesem Projekt im Vordergrund. Wir streben danach, den CO2-Fußabdruck mit Sonnenkollektoren, Regenwassernutzungssystemen und Dachbegrünung zu minimieren.`,
    fr: `Istanbul Business Center est un projet d'immeuble de bureaux de classe A+ situé dans l'un des quartiers les plus prestigieux de la ville.

## Caractéristiques du projet

- Bâtiment moderne de 45 étages
- 25 000 m² de surface utilisable
- Objectif de certification LEED Gold
- Technologies de bâtiment intelligent
- Parking souterrain (500 véhicules)

## Durabilité

L'efficacité énergétique et la conception écologique sont au premier plan de ce projet. Nous visons à minimiser l'empreinte carbone avec des panneaux solaires, des systèmes de récupération des eaux de pluie et des toitures végétalisées.`,
  },
  type: 'commercial',
  status: 'in_progress',
  client: 'ABC Holding',
  location: 'Levent, İstanbul',
  year: 2024,
  area: 25000,
  coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=800&fit=crop',
  ],
};

export default function ProjectDetailPage() {
  const t = useTranslations('projects');
  const locale = useLocale() as Locale;
  const params = useParams();
  const slug = params?.slug as string;
  
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    // In production, fetch from Firestore by slug
    const loadProject = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProject(mockProject);
      setIsLoading(false);
    };
    loadProject();
  }, [slug]);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  const statusColors = {
    planning: 'secondary',
    in_progress: 'primary',
    completed: 'success',
    on_hold: 'warning',
  } as const;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    if (project) {
      setLightboxIndex((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevImage = () => {
    if (project) {
      setLightboxIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
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
          Proje Bulunamadı
        </h1>
        <Link
          href={getLocalizedHref('/projects')}
          className={buttonVariants({ variant: 'primary' })}
        >
          Projelere Dön
        </Link>
      </div>
    );
  }

  return (
    <>
      <article className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px]">
          <Image
            src={project.coverImage}
            alt={project.title[locale]}
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
          <button className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10">
            <Share2 className="w-5 h-5 text-white" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto">
              <Badge variant={statusColors[project.status]} className="mb-4">
                {t(`status.${project.status}`)}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {project.title[locale]}
              </h1>
              <p className="text-lg text-white/80 max-w-3xl">
                {project.description[locale]}
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
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{project.year}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('location')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{project.location}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <Ruler className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('area')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{project.area.toLocaleString()} m²</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('type')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{t(`types.${project.type}`)}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {project.content[locale].split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                      return (
                        <ul key={index} className="list-disc pl-6 space-y-2">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Client info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Proje Bilgileri
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Müşteri</p>
                        <p className="font-medium text-gray-900 dark:text-white">{project.client}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary-600 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    Benzer bir proje mi düşünüyorsunuz?
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Size özel çözümler için bizimle iletişime geçin.
                  </p>
                  <Link
                    href={getLocalizedHref('/contact')}
                    className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                  >
                    İletişime Geç
                  </Link>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Proje Galerisi
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.gallery.map((image, index) => (
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
                      alt={`${project.title[locale]} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
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
                src={project.gallery[lightboxIndex]}
                alt={`${project.title[locale]} - ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
              {lightboxIndex + 1} / {project.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
