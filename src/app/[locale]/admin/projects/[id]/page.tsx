'use client';

// ============================================
// Vav Yapı - Admin Project Form (Create/Edit)
// Form for creating and editing projects
// ============================================

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowLeft, 
  Save, 
  Upload,
  X,
  Image as ImageIcon,
  Globe,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { createProject, updateProject, getProjectById } from '@/lib/firebase/firestore';
import { uploadFile, STORAGE_PATHS, validateImageFile } from '@/lib/firebase/storage';
import type { Locale } from '@/i18n';
import type { ProjectCreateInput, ProjectImage } from '@/types';

// Form schema
const projectSchema = z.object({
  title: z.object({
    tr: z.string().min(1, 'Başlık zorunludur'),
    en: z.string().optional(),
    de: z.string().optional(),
    fr: z.string().optional(),
  }),
  slug: z.string().min(1, 'Slug zorunludur').regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
  description: z.object({
    tr: z.string().min(1, 'Açıklama zorunludur'),
    en: z.string().optional(),
    de: z.string().optional(),
    fr: z.string().optional(),
  }),
  type: z.enum(['residential', 'commercial', 'industrial', 'infrastructure', 'renovation']),
  status: z.enum(['planning', 'in_progress', 'completed', 'on_hold']),
  location: z.string().optional(),
  year: z.number().min(1900).max(2100),
  area: z.number().optional(),
  floors: z.number().min(1).optional(), // Kat sayısı
  roomLayout: z.string().optional(), // Oda düzeni: '3+1', '4+1', vb.
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
  youtubeUrl: z.string().url().optional().or(z.literal('')), // YouTube video linki
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const defaultValues: ProjectFormData = {
  title: { tr: '', en: '', de: '', fr: '' },
  slug: '',
  description: { tr: '', en: '', de: '', fr: '' },
  type: 'residential',
  status: 'planning',
  location: '',
  year: new Date().getFullYear(),
  area: undefined,
  floors: undefined,
  roomLayout: '',
  coordinates: { lat: undefined, lng: undefined },
  youtubeUrl: '',
  isFeatured: false,
  isPublished: false,
  seo: { title: '', description: '' },
};

export default function AdminProjectFormPage() {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;
  const isEditing = projectId && projectId !== 'new';

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<ProjectImage | null>(null);
  const [, setCoverImageFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<ProjectImage[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<Locale>('tr');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const watchTitle = watch('title.tr');

  // Auto-generate slug from Turkish title
  useEffect(() => {
    if (!isEditing && watchTitle) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchTitle, isEditing, setValue]);

  // Load project data if editing
  useEffect(() => {
    if (isEditing && projectId) {
      const loadProject = async () => {
        try {
          const project = await getProjectById(projectId);
          
          if (project) {
            setValue('title', {
              tr: project.translations.tr.name,
              en: project.translations.en.name,
              de: project.translations.de.name,
              fr: project.translations.fr.name,
            });
            setValue('slug', project.slug);
            setValue('description', {
              tr: project.translations.tr.description,
              en: project.translations.en.description,
              de: project.translations.de.description,
              fr: project.translations.fr.description,
            });
            setValue('type', project.type === 'public' ? 'infrastructure' : project.type as 'residential' | 'commercial' | 'industrial' | 'infrastructure' | 'renovation');
            setValue('status', project.status === 'ongoing' ? 'in_progress' : project.status as 'planning' | 'in_progress' | 'completed' | 'on_hold');
            setValue('location', project.translations.tr.location.fullAddress);
            setValue('year', project.startDate.getFullYear());
            setValue('area', project.totalArea);
            setValue('floors', project.floors);
            setValue('roomLayout', (project as unknown as { roomLayout?: string }).roomLayout || '');
            setValue('coordinates', project.coordinates);
            setValue('youtubeUrl', (project as unknown as { youtubeUrl?: string }).youtubeUrl || '');
            setValue('isFeatured', project.featured);
            setValue('isPublished', project.published);
            setValue('seo', {
              title: project.translations.tr.metaTitle,
              description: project.translations.tr.metaDescription,
            });
            
            if (project.coverImage) {
              setCoverImage(project.coverImage);
            }
            if (project.gallery && project.gallery.length > 0) {
              setGalleryImages(project.gallery);
            }
          }
        } catch (err) {
          console.error('Failed to load project:', err);
          setError('Proje yüklenemedi');
        } finally {
          setIsLoading(false);
        }
      };
      loadProject();
    }
  }, [isEditing, setValue, projectId]);

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Prepare project data for Firestore
      const projectData: ProjectCreateInput = {
        slug: data.slug,
        status: data.status === 'in_progress' ? 'ongoing' : data.status === 'on_hold' ? 'planning' : data.status as 'ongoing' | 'completed' | 'planning',
        type: data.type === 'infrastructure' || data.type === 'renovation' ? 'public' : data.type as 'residential' | 'commercial' | 'mixed' | 'public',
        featured: data.isFeatured,
        published: data.isPublished,
        translations: {
          tr: {
            name: data.title.tr || '',
            shortDescription: (data.description.tr || '').substring(0, 150),
            description: data.description.tr || '',
            location: {
              city: data.location?.split(',')[0]?.trim() || '',
              district: '',
              fullAddress: data.location || '',
            },
            metaTitle: data.seo?.title || data.title.tr || '',
            metaDescription: data.seo?.description || (data.description.tr || '').substring(0, 160),
          },
          en: {
            name: data.title.en || data.title.tr || '',
            shortDescription: (data.description.en || data.description.tr || '').substring(0, 150),
            description: data.description.en || data.description.tr || '',
            location: {
              city: data.location?.split(',')[0]?.trim() || '',
              district: '',
              fullAddress: data.location || '',
            },
            metaTitle: data.seo?.title || data.title.en || data.title.tr || '',
            metaDescription: data.seo?.description || (data.description.en || data.description.tr || '').substring(0, 160),
          },
          de: {
            name: data.title.de || data.title.tr || '',
            shortDescription: (data.description.de || data.description.tr || '').substring(0, 150),
            description: data.description.de || data.description.tr || '',
            location: {
              city: data.location?.split(',')[0]?.trim() || '',
              district: '',
              fullAddress: data.location || '',
            },
            metaTitle: data.seo?.title || data.title.de || data.title.tr || '',
            metaDescription: data.seo?.description || (data.description.de || data.description.tr || '').substring(0, 160),
          },
          fr: {
            name: data.title.fr || data.title.tr || '',
            shortDescription: (data.description.fr || data.description.tr || '').substring(0, 150),
            description: data.description.fr || data.description.tr || '',
            location: {
              city: data.location?.split(',')[0]?.trim() || '',
              district: '',
              fullAddress: data.location || '',
            },
            metaTitle: data.seo?.title || data.title.fr || data.title.tr || '',
            metaDescription: data.seo?.description || (data.description.fr || data.description.tr || '').substring(0, 160),
          },
        },
        totalArea: data.area || 0,
        floors: data.floors || 1,
        units: 1,
        parkingCapacity: 0,
        startDate: new Date(data.year, 0, 1),
        completionPercentage: data.status === 'completed' ? 100 : 0,
        coverImage: coverImage || {
          id: 'placeholder',
          url: 'https://via.placeholder.com/800x600?text=No+Image',
          path: '',
          alt: data.title.tr || 'Project',
          order: 0,
          createdAt: new Date(),
        },
        gallery: galleryImages,
        architecturalFeatures: [],
        socialAreas: [],
        coordinates: { 
          lat: data.coordinates?.lat || 41.0082, 
          lng: data.coordinates?.lng || 28.9784 
        },
        createdBy: 'admin',
        // Yeni alanlar
        roomLayout: data.roomLayout || '',
        youtubeUrl: data.youtubeUrl || '',
      } as ProjectCreateInput & { roomLayout?: string; youtubeUrl?: string };

      if (isEditing && projectId) {
        // Update existing project
        await updateProject(projectId, projectData);
      } else {
        // Create new project
        await createProject(projectData);
      }
      
      // Redirect to projects list
      router.push(getLocalizedHref('/admin/projects'));
    } catch (err) {
      console.error('Failed to save project:', err);
      setError(err instanceof Error ? err.message : 'Proje kaydedilemedi. Lütfen tekrar deneyin.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCoverImageUpload = () => {
    coverInputRef.current?.click();
  };

  const handleCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file, { maxSizeMB: 5 });
    if (!validation.valid) {
      setError(validation.error || 'Geçersiz dosya');
      return;
    }

    setUploadingCover(true);
    setError(null);
    
    try {
      // Create a temporary project ID for new projects
      const tempId = projectId && projectId !== 'new' ? projectId : `temp-${Date.now()}`;
      const result = await uploadFile(file, STORAGE_PATHS.projectCover(tempId));
      
      const newCoverImage: ProjectImage = {
        id: `cover-${Date.now()}`,
        url: result.url,
        path: result.path,
        alt: 'Kapak Görseli',
        order: 0,
        createdAt: new Date(),
      };
      
      setCoverImage(newCoverImage);
      setCoverImageFile(file);
    } catch (err) {
      console.error('Cover upload failed:', err);
      setError('Kapak görseli yüklenemedi');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = () => {
    galleryInputRef.current?.click();
  };

  const handleGalleryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    setError(null);

    try {
      const tempId = projectId && projectId !== 'new' ? projectId : `temp-${Date.now()}`;
      const newImages: ProjectImage[] = [];
      const newFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validation = validateImageFile(file, { maxSizeMB: 5 });
        
        if (!validation.valid) {
          console.warn(`Skipping invalid file: ${file.name}`);
          continue;
        }

        const result = await uploadFile(file, STORAGE_PATHS.projectGallery(tempId));
        
        newImages.push({
          id: `gallery-${Date.now()}-${i}`,
          url: result.url,
          path: result.path,
          alt: `Galeri ${galleryImages.length + i + 1}`,
          order: galleryImages.length + i,
          createdAt: new Date(),
        });
        newFiles.push(file);
      }

      setGalleryImages([...galleryImages, ...newImages]);
      setGalleryFiles([...galleryFiles, ...newFiles]);
    } catch (err) {
      console.error('Gallery upload failed:', err);
      setError('Galeri görseli yüklenemedi');
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
  };

  const languageTabs: { key: Locale; label: string }[] = [
    { key: 'tr', label: 'Türkçe' },
    { key: 'en', label: 'English' },
    { key: 'de', label: 'Deutsch' },
    { key: 'fr', label: 'Français' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={getLocalizedHref('/admin/projects')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditing ? t('projects.edit') : t('projects.new')}
          </h1>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={coverInputRef}
        onChange={handleCoverFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />
      <input
        type="file"
        ref={galleryInputRef}
        onChange={handleGalleryFileChange}
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Multi-language content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                İçerik
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Language tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
                {languageTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[2px]',
                      activeTab === tab.key
                        ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400'
                        : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.title')} *
                </label>
                <Input
                  {...register(`title.${activeTab}` as const)}
                  placeholder={`${t('projects.form.title')} (${activeTab.toUpperCase()})`}
                  className={errors.title?.[activeTab] ? 'border-red-500' : ''}
                />
                {errors.title?.[activeTab] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title[activeTab]?.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.description')} *
                </label>
                <textarea
                  {...register(`description.${activeTab}` as const)}
                  rows={4}
                  placeholder={`${t('projects.form.description')} (${activeTab.toUpperCase()})`}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700',
                    'bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500',
                    errors.description?.[activeTab] && 'border-red-500'
                  )}
                />
                {errors.description?.tr && activeTab === 'tr' && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.tr.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                {t('projects.form.coverImage')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadingCover ? (
                <div className="w-full aspect-video border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg flex flex-col items-center justify-center">
                  <Spinner size="lg" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Yükleniyor...
                  </span>
                </div>
              ) : coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={coverImage.url}
                    alt={coverImage.alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage(null);
                      setCoverImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCoverImageUpload}
                  className="w-full aspect-video border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Kapak görseli yükle
                  </span>
                </button>
              )}
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>{t('projects.form.gallery')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, index) => (
                  <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleGalleryUpload}
                  disabled={uploadingGallery}
                  className="aspect-video border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 transition-colors disabled:opacity-50"
                >
                  {uploadingGallery ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Görsel ekle
                      </span>
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Yayın Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('projects.form.isPublished')}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('isPublished')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('projects.form.isFeatured')}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('isFeatured')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Proje Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.slug')} *
                </label>
                <Input
                  {...register('slug')}
                  placeholder="proje-url-slug"
                  className={errors.slug ? 'border-red-500' : ''}
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.type')} *
                </label>
                <select
                  {...register('type')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="residential">{t('projects.type.residential')}</option>
                  <option value="commercial">{t('projects.type.commercial')}</option>
                  <option value="industrial">{t('projects.type.industrial')}</option>
                  <option value="infrastructure">{t('projects.type.infrastructure')}</option>
                  <option value="renovation">{t('projects.type.renovation')}</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.status')} *
                </label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="planning">{t('projects.status.planning')}</option>
                  <option value="in_progress">{t('projects.status.in_progress')}</option>
                  <option value="completed">{t('projects.status.completed')}</option>
                  <option value="on_hold">{t('projects.status.on_hold')}</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.year')} *
                </label>
                <Input
                  type="number"
                  {...register('year', { valueAsNumber: true })}
                  min={1900}
                  max={2100}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.location')}
                </label>
                <Input {...register('location')} placeholder="Şehir, Ülke" />
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.area')}
                </label>
                <Input
                  type="number"
                  {...register('area', { valueAsNumber: true })}
                  placeholder="m²"
                />
              </div>

              {/* Floors - Kat Sayısı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kat Sayısı
                </label>
                <Input
                  type="number"
                  {...register('floors', { valueAsNumber: true })}
                  placeholder="Örn: 5"
                  min={1}
                />
              </div>

              {/* Room Layout - Oda Düzeni */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Oda Düzeni
                </label>
                <select
                  {...register('roomLayout')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="">Seçiniz</option>
                  <option value="1+0">1+0 (Stüdyo)</option>
                  <option value="1+1">1+1</option>
                  <option value="2+1">2+1</option>
                  <option value="3+1">3+1</option>
                  <option value="4+1">4+1</option>
                  <option value="5+1">5+1</option>
                  <option value="6+1">6+1</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              {/* YouTube URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  YouTube Video Linki
                </label>
                <Input
                  {...register('youtubeUrl')}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Map Coordinates - Harita Konumu */}
          <Card>
            <CardHeader>
              <CardTitle>Harita Konumu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Google Maps&apos;ten koordinatları alabilirsiniz. Haritada konumu sağ tıklayıp koordinatları kopyalayın.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enlem (Latitude)
                  </label>
                  <Input
                    type="number"
                    step="any"
                    {...register('coordinates.lat', { valueAsNumber: true })}
                    placeholder="Örn: 41.0082"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Boylam (Longitude)
                  </label>
                  <Input
                    type="number"
                    step="any"
                    {...register('coordinates.lng', { valueAsNumber: true })}
                    placeholder="Örn: 28.9784"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.seoTitle')}
                </label>
                <Input {...register('seo.title')} placeholder="SEO başlığı" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.seoDescription')}
                </label>
                <textarea
                  {...register('seo.description')}
                  rows={3}
                  placeholder="SEO açıklaması"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href={getLocalizedHref('/admin/projects')}
              className={cn(buttonVariants({ variant: 'outline' }), 'flex-1')}
            >
              İptal
            </Link>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSaving}
            >
              {isSaving ? (
                <Spinner size="sm" className="mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Kaydet
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
