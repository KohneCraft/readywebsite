'use client';

// ============================================
// Vav Yapı - Admin Project Form (Create/Edit)
// Form for creating and editing projects
// ============================================

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n';

// Form schema
const projectSchema = z.object({
  title: z.object({
    tr: z.string().min(1, 'Başlık zorunludur'),
    en: z.string().min(1, 'Title is required'),
    de: z.string().min(1, 'Titel erforderlich'),
    fr: z.string().min(1, 'Titre requis'),
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
  client: z.string().optional(),
  location: z.string().optional(),
  year: z.number().min(1900).max(2100),
  area: z.number().optional(),
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
  client: '',
  location: '',
  year: new Date().getFullYear(),
  area: undefined,
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
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Locale>('tr');

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
    if (isEditing) {
      const loadProject = async () => {
        try {
          // In production, fetch from Firestore
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mock data
          setValue('title', {
            tr: 'İstanbul Business Center',
            en: 'Istanbul Business Center',
            de: 'Istanbul Business Center',
            fr: 'Centre d\'affaires Istanbul',
          });
          setValue('slug', 'istanbul-business-center');
          setValue('description', {
            tr: 'Modern iş merkezi projesi',
            en: 'Modern business center project',
            de: 'Modernes Geschäftszentrum-Projekt',
            fr: 'Projet de centre d\'affaires moderne',
          });
          setValue('type', 'commercial');
          setValue('status', 'in_progress');
          setValue('client', 'ABC Holding');
          setValue('location', 'İstanbul, Türkiye');
          setValue('year', 2024);
          setValue('area', 25000);
          setValue('isFeatured', true);
          setValue('isPublished', true);
          setCoverImage('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop');
        } catch (error) {
          console.error('Failed to load project:', error);
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
    try {
      // In production, save to Firestore
      console.log('Saving project:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to projects list
      router.push(getLocalizedHref('/admin/projects'));
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCoverImageUpload = () => {
    // In production, open file picker and upload to Firebase Storage
    setCoverImage('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop');
  };

  const handleGalleryUpload = () => {
    // In production, open file picker and upload to Firebase Storage
    setGalleryImages([
      ...galleryImages,
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    ]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
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
              {coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCoverImage(null)}
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
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
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
                  className="aspect-video border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Görsel ekle
                  </span>
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

              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('projects.form.client')}
                </label>
                <Input {...register('client')} placeholder="Müşteri adı" />
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
