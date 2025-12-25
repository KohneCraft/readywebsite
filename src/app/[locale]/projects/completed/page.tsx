// ============================================
// Vav Yapı - Completed Projects Page
// Lists all projects with status 'completed'
// ============================================

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, CheckCircle, ChevronLeft, Award } from 'lucide-react';

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('projects');
  return {
    title: t('completed.title'),
    description: t('completed.description'),
  };
}

// Mock data - will be replaced with Firestore data
const completedProjects = [
  {
    id: '10',
    title: { tr: 'Merkez Kule', en: 'Central Tower', de: 'Zentralturm', fr: 'Tour Centrale' },
    description: { 
      tr: '45 katlı ikonik iş merkezi',
      en: '45-story iconic business center',
      de: '45-stöckiges ikonisches Geschäftszentrum',
      fr: 'Centre d\'affaires emblématique de 45 étages'
    },
    location: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey', de: 'Istanbul, Türkei', fr: 'Istanbul, Turquie' },
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800',
    completedDate: '2024-01',
    year: 2024,
    category: 'commercial',
    awards: ['Yılın Projesi 2024', 'Sürdürülebilir Yapı Ödülü'],
  },
  {
    id: '11',
    title: { tr: 'Sahil Evleri', en: 'Coastal Homes', de: 'Küstenhäuser', fr: 'Maisons Côtières' },
    description: { 
      tr: 'Lüks deniz manzaralı vilalar',
      en: 'Luxury villas with sea view',
      de: 'Luxusvillen mit Meerblick',
      fr: 'Villas de luxe avec vue sur mer'
    },
    location: { tr: 'Bodrum, Türkiye', en: 'Bodrum, Turkey', de: 'Bodrum, Türkei', fr: 'Bodrum, Turquie' },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    completedDate: '2023-08',
    year: 2023,
    category: 'residential',
    awards: [],
  },
  {
    id: '12',
    title: { tr: 'Park AVM', en: 'Park Mall', de: 'Park Einkaufszentrum', fr: 'Centre Commercial Park' },
    description: { 
      tr: 'Modern alışveriş ve eğlence merkezi',
      en: 'Modern shopping and entertainment center',
      de: 'Modernes Einkaufs- und Unterhaltungszentrum',
      fr: 'Centre commercial et de divertissement moderne'
    },
    location: { tr: 'Ankara, Türkiye', en: 'Ankara, Turkey', de: 'Ankara, Türkei', fr: 'Ankara, Turquie' },
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
    completedDate: '2023-05',
    year: 2023,
    category: 'commercial',
    awards: ['Tasarım Mükemmelliği Ödülü'],
  },
  {
    id: '13',
    title: { tr: 'Yeşil Vadi Konutları', en: 'Green Valley Residences', de: 'Grüntal Residenzen', fr: 'Résidences Vallée Verte' },
    description: { 
      tr: 'Ekolojik ve sürdürülebilir konut projesi',
      en: 'Ecological and sustainable residential project',
      de: 'Ökologisches und nachhaltiges Wohnprojekt',
      fr: 'Projet résidentiel écologique et durable'
    },
    location: { tr: 'Bursa, Türkiye', en: 'Bursa, Turkey', de: 'Bursa, Türkei', fr: 'Bursa, Turquie' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    completedDate: '2022-12',
    year: 2022,
    category: 'residential',
    awards: ['Yeşil Bina Sertifikası'],
  },
  {
    id: '14',
    title: { tr: 'Sanayi Lojistik Merkezi', en: 'Industrial Logistics Center', de: 'Industrielogistikzentrum', fr: 'Centre Logistique Industriel' },
    description: { 
      tr: 'A sınıfı depolama ve dağıtım tesisi',
      en: 'Class A storage and distribution facility',
      de: 'Lager- und Vertriebsanlage der Klasse A',
      fr: 'Installation de stockage et de distribution de classe A'
    },
    location: { tr: 'Kocaeli, Türkiye', en: 'Kocaeli, Turkey', de: 'Kocaeli, Türkei', fr: 'Kocaeli, Turquie' },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    completedDate: '2022-06',
    year: 2022,
    category: 'industrial',
    awards: [],
  },
  {
    id: '15',
    title: { tr: 'Hastane Kompleksi', en: 'Hospital Complex', de: 'Krankenhauskomplex', fr: 'Complexe Hospitalier' },
    description: { 
      tr: '500 yataklı tam donanımlı hastane',
      en: '500-bed fully equipped hospital',
      de: '500-Betten-Krankenhaus mit voller Ausstattung',
      fr: 'Hôpital entièrement équipé de 500 lits'
    },
    location: { tr: 'Gaziantep, Türkiye', en: 'Gaziantep, Turkey', de: 'Gaziantep, Türkei', fr: 'Gaziantep, Turquie' },
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800',
    completedDate: '2021-09',
    year: 2021,
    category: 'healthcare',
    awards: ['Sağlık Yapıları Ödülü 2021'],
  },
];

// Group projects by year
const groupedProjects = completedProjects.reduce((acc, project) => {
  if (!acc[project.year]) {
    acc[project.year] = [];
  }
  acc[project.year].push(project);
  return acc;
}, {} as Record<number, typeof completedProjects>);

const sortedYears = Object.keys(groupedProjects).map(Number).sort((a, b) => b - a);

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CompletedProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('projects');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
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
            {t('completed.title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {t('completed.description')}
          </p>
          <div className="mt-6 flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span>{completedProjects.length} {t('completed.totalProjects')}</span>
          </div>
        </div>
      </section>

      {/* Projects by Year */}
      <section className="py-16">
        <div className="container">
          {sortedYears.map((year) => (
            <div key={year} className="mb-16 last:mb-0">
              {/* Year Header */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{year}</h2>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-gray-500 dark:text-gray-400">
                  {groupedProjects[year].length} {t('projects')}
                </span>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedProjects[year].map((project) => (
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
                      
                      {/* Completed Badge */}
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {t('completedStatus')}
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
                          {project.completedDate}
                        </div>
                      </div>

                      {/* Awards */}
                      {project.awards.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.awards.map((award, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs"
                            >
                              <Award className="w-3 h-3" />
                              {award}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Arrow */}
                      <div className="flex items-center gap-2 text-primary font-medium">
                        {t('viewDetails')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{completedProjects.length}+</div>
              <div className="text-gray-600 dark:text-gray-400">{t('stats.completedProjects')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{sortedYears.length}</div>
              <div className="text-gray-600 dark:text-gray-400">{t('stats.yearsExperience')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {completedProjects.filter(p => p.awards.length > 0).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{t('stats.awardWinning')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">{t('stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
