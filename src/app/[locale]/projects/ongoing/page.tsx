// ============================================
// Vav Yapı - Ongoing Projects Page
// Lists all projects with status 'ongoing'
// ============================================

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, Hammer, ChevronLeft } from 'lucide-react';

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('projects');
  return {
    title: t('ongoing.title'),
    description: t('ongoing.description'),
  };
}

// Mock data - will be replaced with Firestore data
const ongoingProjects = [
  {
    id: '1',
    title: { tr: 'Vav Residence', en: 'Vav Residence', de: 'Vav Residenz', fr: 'Résidence Vav' },
    description: { 
      tr: 'Modern yaşam standartlarında lüks konut projesi',
      en: 'Luxury residential project with modern living standards',
      de: 'Luxuswohnprojekt mit modernen Lebensstandards',
      fr: 'Projet résidentiel de luxe aux normes de vie modernes'
    },
    location: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey', de: 'Istanbul, Türkei', fr: 'Istanbul, Turquie' },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    startDate: '2024-01',
    expectedEnd: '2025-06',
    progress: 65,
    category: 'residential',
  },
  {
    id: '2',
    title: { tr: 'Marina Plaza', en: 'Marina Plaza', de: 'Marina Plaza', fr: 'Marina Plaza' },
    description: { 
      tr: 'Deniz manzaralı iş merkezi projesi',
      en: 'Business center project with sea view',
      de: 'Geschäftszentrumprojekt mit Meerblick',
      fr: 'Projet de centre d\'affaires avec vue sur mer'
    },
    location: { tr: 'İzmir, Türkiye', en: 'Izmir, Turkey', de: 'Izmir, Türkei', fr: 'Izmir, Turquie' },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    startDate: '2024-03',
    expectedEnd: '2025-12',
    progress: 35,
    category: 'commercial',
  },
  {
    id: '3',
    title: { tr: 'Green Valley', en: 'Green Valley', de: 'Grünes Tal', fr: 'Vallée Verte' },
    description: { 
      tr: 'Doğayla iç içe villa projesi',
      en: 'Villa project integrated with nature',
      de: 'Villa-Projekt in der Natur',
      fr: 'Projet de villa intégré à la nature'
    },
    location: { tr: 'Antalya, Türkiye', en: 'Antalya, Turkey', de: 'Antalya, Türkei', fr: 'Antalya, Turquie' },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    startDate: '2024-06',
    expectedEnd: '2026-01',
    progress: 20,
    category: 'residential',
  },
];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function OngoingProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('projects');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/90 to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="container relative z-10">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('backToProjects')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('ongoing.title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {t('ongoing.description')}
          </p>
          <div className="mt-6 flex items-center gap-2 text-white/90">
            <Hammer className="w-5 h-5" />
            <span>{ongoingProjects.length} {t('ongoing.activeProjects')}</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title[locale as keyof typeof project.title] || project.title.tr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Progress Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    %{project.progress} {t('completed')}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {t(`categories.${project.category}`)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title[locale as keyof typeof project.title] || project.title.tr}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description[locale as keyof typeof project.description] || project.description.tr}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location[locale as keyof typeof project.location] || project.location.tr}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.expectedEnd}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{t('progress')}</span>
                      <span className="font-medium text-primary">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-2 text-primary font-medium">
                    {t('viewDetails')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
