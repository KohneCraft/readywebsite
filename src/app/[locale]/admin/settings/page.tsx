'use client';

// ============================================
// Vav Yapı - Admin Settings Page
// Site settings management
// ============================================

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Save, 
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Upload,
  CheckCircle,
  AlertTriangle,
  Shield,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { toast } from '@/components/providers';
import { getSiteSettings, updateSiteSettings } from '@/lib/firebase/firestore';
import { getCurrentUser } from '@/lib/firebase/auth';
import { logger } from '@/lib/logger';
import { MediaSelector } from '@/components/pageBuilder/admin/media/MediaSelector';
import { uploadMedia } from '@/lib/firebase/media';

// Form schema
const settingsSchema = z.object({
  browser: z.object({
    favicon: z.string().optional(),
  }),
  company: z.object({
    name: z.string().min(1, 'Firma adı zorunludur'),
    slogan: z.string().optional(),
    logo: z.string().optional(),
    nameColor: z.string().optional(),
    nameFontSize: z.number().optional(),
    sloganColor: z.string().optional(),
    sloganFontSize: z.number().optional(),
  }),
  contact: z.object({
    email: z.string().email('Geçerli bir e-posta girin'),
    phone: z.string().min(1, 'Telefon zorunludur'),
    address: z.string().optional(),
    mapUrl: z.string().optional(),
  }),
  social: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
  }),
  maintenance: z.object({
    enabled: z.boolean(),
    message: z.string().optional(),
    allowedIPs: z.string().optional(),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const defaultSettings: SettingsFormData = {
  browser: {
    favicon: '',
  },
  company: {
    name: 'Vav Yapı',
    slogan: 'Güvenilir İnşaat Çözümleri',
    logo: '',
    nameColor: '',
    nameFontSize: undefined,
    sloganColor: '',
    sloganFontSize: undefined,
  },
  contact: {
    email: 'info@vavyapi.com',
    phone: '+90 212 123 4567',
    address: 'Levent, İstanbul, Türkiye',
    mapUrl: '',
  },
  social: {
    facebook: 'https://facebook.com/vavyapi',
    instagram: 'https://instagram.com/vavyapi',
    twitter: '',
    linkedin: 'https://linkedin.com/company/vavyapi',
    youtube: '',
  },
  seo: {
    metaTitle: 'Vav Yapı | İnşaat ve Müteahhitlik',
    metaDescription: 'Güvenilir ve kaliteli inşaat hizmetleri. Konut, ticari ve endüstriyel projeleriniz için profesyonel çözümler.',
    metaKeywords: 'inşaat, müteahhitlik, konut, ticari, endüstriyel',
    googleAnalyticsId: '',
  },
  maintenance: {
    enabled: false,
    message: 'Site bakım modundadır. Kısa süre içinde geri döneceğiz.',
    allowedIPs: '',
  },
};

type TabKey = 'company' | 'contact' | 'social' | 'seo' | 'maintenance';

export default function AdminSettingsPage() {
  const t = useTranslations('admin.settings');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('company');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
  
  // Browser tab ayarları
  const [browserFaviconPreview, setBrowserFaviconPreview] = useState<string | null>(null);
  const [isBrowserFaviconSelectorOpen, setIsBrowserFaviconSelectorOpen] = useState(false);
  
  // Admin Panel ayarları
  const [adminTitle, setAdminTitle] = useState<string>('Modern');
  const [adminIconUrl, setAdminIconUrl] = useState<string>('');
  const [isAdminIconSelectorOpen, setIsAdminIconSelectorOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettings,
  });

  useEffect(() => {
    // Firestore'dan ayarları yükle
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const settings = await getSiteSettings();
        
        // SiteSettings'i SettingsFormData formatına çevir
        const formData: SettingsFormData = {
          browser: {
            favicon: (settings as any).browserFavicon || '',
          },
          company: {
            name: settings.siteName?.tr || defaultSettings.company.name,
            slogan: settings.siteSlogan?.tr || defaultSettings.company.slogan,
            logo: settings.logo?.light?.url || defaultSettings.company.logo,
            // Renk ve font ayarları - undefined ise boş bırak (tema varsayılanları kullanılsın)
            nameColor: (settings as any).companyNameStyle?.color || '',
            nameFontSize: (settings as any).companyNameStyle?.fontSize || undefined,
            sloganColor: (settings as any).sloganStyle?.color || '',
            sloganFontSize: (settings as any).sloganStyle?.fontSize || undefined,
          },
          contact: {
            email: settings.contact?.email || defaultSettings.contact.email,
            phone: settings.contact?.phones?.[0] || defaultSettings.contact.phone,
            address: settings.contact?.address?.tr || defaultSettings.contact.address,
            mapUrl: defaultSettings.contact.mapUrl,
          },
          social: {
            facebook: settings.socialLinks?.facebook || defaultSettings.social.facebook,
            instagram: settings.socialLinks?.instagram || defaultSettings.social.instagram,
            twitter: settings.socialLinks?.twitter || defaultSettings.social.twitter,
            linkedin: settings.socialLinks?.linkedin || defaultSettings.social.linkedin,
            youtube: settings.socialLinks?.youtube || defaultSettings.social.youtube,
          },
          seo: {
            metaTitle: settings.seo?.titleTemplate?.tr || defaultSettings.seo.metaTitle,
            metaDescription: settings.seo?.defaultDescription?.tr || defaultSettings.seo.metaDescription,
            metaKeywords: settings.seo?.keywords?.tr?.join(', ') || defaultSettings.seo.metaKeywords,
            googleAnalyticsId: settings.seo?.googleAnalyticsId || defaultSettings.seo.googleAnalyticsId,
          },
          maintenance: {
            enabled: settings.maintenance?.enabled || defaultSettings.maintenance.enabled,
            message: settings.maintenance?.message?.tr || defaultSettings.maintenance.message,
            allowedIPs: settings.maintenance?.allowedIPs?.join(', ') || defaultSettings.maintenance.allowedIPs,
          },
        };
        
        reset(formData);
        setLogoPreview(formData.company.logo || null);
        setBrowserFaviconPreview(formData.browser.favicon || null);
        // Admin panel ayarlarını yükle
        const adminTitleValue = (settings as any).adminTitle || 'Modern';
        const adminIconValue = (settings as any).adminIcon || '';
        setAdminTitle(adminTitleValue);
        setAdminIconUrl(adminIconValue);
      } catch (error) {
        logger.api.error('Ayarlar yüklenirken hata', error);
        reset(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
    
    // Tema güncellemelerini dinle
    const handleThemeUpdate = () => {
      loadSettings();
    };
    window.addEventListener('theme-updated', handleThemeUpdate);
    
    return () => {
      window.removeEventListener('theme-updated', handleThemeUpdate);
    };
  }, [reset]);

  const onSubmit = async (data: SettingsFormData) => {
    setIsSaving(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Lütfen giriş yapın');
        return;
      }
      
      // SettingsFormData'yı SiteSettings formatına çevir
      const currentSettings = await getSiteSettings();
      
      await updateSiteSettings({
        ...currentSettings,
        // Browser tab ayarları
        browserFavicon: data.browser.favicon || '',
        // Company bilgileri
        siteName: {
          tr: data.company.name,
          en: data.company.name,
          de: data.company.name,
          fr: data.company.name,
        },
        siteSlogan: {
          tr: data.company.slogan || '',
          en: data.company.slogan || '',
          de: data.company.slogan || '',
          fr: data.company.slogan || '',
        },
        companyNameStyle: data.company.nameColor || data.company.nameFontSize ? {
          color: data.company.nameColor || undefined,
          fontSize: data.company.nameFontSize || undefined,
        } : undefined,
        sloganStyle: data.company.sloganColor || data.company.sloganFontSize ? {
          color: data.company.sloganColor || undefined,
          fontSize: data.company.sloganFontSize || undefined,
        } : undefined,
        logo: {
          ...currentSettings.logo,
          light: {
            ...currentSettings.logo.light,
            url: data.company.logo || '',
          },
          dark: {
            ...currentSettings.logo.dark,
            url: data.company.logo || '',
          },
          favicon: {
            url: data.company.logo || '',
            path: data.company.logo || '',
          },
        },
        // Admin panel ayarları
        adminTitle: adminTitle || 'Modern',
        adminIcon: adminIconUrl || '',
        // İletişim bilgileri
        contact: {
          ...currentSettings.contact,
          email: data.contact.email,
          phones: data.contact.phone ? [data.contact.phone] : [],
          address: {
            tr: data.contact.address || '',
            en: data.contact.address || '',
            de: data.contact.address || '',
            fr: data.contact.address || '',
          },
        },
        // Sosyal medya
        socialLinks: {
          facebook: data.social.facebook || '',
          instagram: data.social.instagram || '',
          twitter: data.social.twitter || '',
          linkedin: data.social.linkedin || '',
          youtube: data.social.youtube || '',
        },
        // SEO
        seo: {
          ...currentSettings.seo,
          titleTemplate: {
            tr: data.seo.metaTitle || '',
            en: data.seo.metaTitle || '',
            de: data.seo.metaTitle || '',
            fr: data.seo.metaTitle || '',
          },
          defaultDescription: {
            tr: data.seo.metaDescription || '',
            en: data.seo.metaDescription || '',
            de: data.seo.metaDescription || '',
            fr: data.seo.metaDescription || '',
          },
          keywords: {
            tr: data.seo.metaKeywords ? data.seo.metaKeywords.split(',').map(k => k.trim()) : [],
            en: data.seo.metaKeywords ? data.seo.metaKeywords.split(',').map(k => k.trim()) : [],
            de: data.seo.metaKeywords ? data.seo.metaKeywords.split(',').map(k => k.trim()) : [],
            fr: data.seo.metaKeywords ? data.seo.metaKeywords.split(',').map(k => k.trim()) : [],
          },
          googleAnalyticsId: data.seo.googleAnalyticsId || '',
        },
        // Bakım modu
        maintenance: {
          enabled: data.maintenance.enabled,
          message: {
            tr: data.maintenance.message || '',
            en: data.maintenance.message || '',
            de: data.maintenance.message || '',
            fr: data.maintenance.message || '',
          },
          allowedIPs: data.maintenance.allowedIPs ? data.maintenance.allowedIPs.split(',').map(ip => ip.trim()) : [],
        },
      } as any, user.uid);
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Theme güncellemesi bildir (header/footer güncellenebilir)
      window.dispatchEvent(new CustomEvent('theme-updated'));
    } catch (error) {
      logger.api.error('Ayarlar kaydedilirken hata', error);
      toast.error('Ayarlar kaydedilirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdminIconSelect = async (mediaUrl: string) => {
    setAdminIconUrl(mediaUrl);
    setIsAdminIconSelectorOpen(false);
  };

  const handleAdminIconFileUpload = async (file: File) => {
    try {
      setIsSaving(true);
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Lütfen giriş yapın');
        return;
      }

      if (file.size > 100 * 1024) {
        toast.error('Dosya boyutu 100KB\'dan büyük olamaz');
        return;
      }

      const uploadedMedia = await uploadMedia(file, 'image', user.uid);
      setAdminIconUrl(uploadedMedia.url);
      toast.success('Admin icon yüklendi');
    } catch (error) {
      logger.ui.error('Admin icon yükleme hatası', error);
      toast.error('Icon yüklenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async () => {
    setIsMediaSelectorOpen(true);
  };

  const handleBrowserFaviconUpload = async () => {
    setIsBrowserFaviconSelectorOpen(true);
  };

  const handleBrowserFaviconSelect = async (mediaUrl: string) => {
    setBrowserFaviconPreview(mediaUrl);
    const formValues = getValues();
    reset({
      ...formValues,
      browser: {
        ...formValues.browser,
        favicon: mediaUrl,
      },
    });
    setIsBrowserFaviconSelectorOpen(false);
  };

  const handleBrowserFaviconFileUpload = async (file: File) => {
    try {
      setIsSaving(true);
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Lütfen giriş yapın');
        return;
      }

      const uploadedMedia = await uploadMedia(file, 'image', user.uid);
      setBrowserFaviconPreview(uploadedMedia.url);
      const formValues = getValues();
      reset({
        ...formValues,
        browser: {
          ...formValues.browser,
          favicon: uploadedMedia.url,
        },
      });
      toast.success('Tarayıcı ikonu yüklendi');
    } catch (error) {
      logger.ui.error('Tarayıcı ikonu yükleme hatası', error);
      toast.error('Icon yüklenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoSelect = async (mediaUrl: string) => {
    setLogoPreview(mediaUrl);
    // Form'u güncelle - mevcut form değerlerini al
    const formValues = getValues();
    reset({
      ...formValues,
      company: {
        ...formValues.company,
        logo: mediaUrl,
      },
    });
    setIsMediaSelectorOpen(false);
  };

  const handleLogoFileUpload = async (file: File) => {
    try {
      setIsSaving(true);
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Lütfen giriş yapın');
        return;
      }

      const uploadedMedia = await uploadMedia(file, 'image', user.uid);
      setLogoPreview(uploadedMedia.url);
      // Form'u güncelle
      const formValues = getValues();
      reset({
        ...formValues,
        company: {
          ...formValues.company,
          logo: uploadedMedia.url,
        },
      });
    } catch (error) {
      logger.ui.error('Logo yükleme hatası', error);
      toast.error('Logo yüklenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'company', label: t('sections.company'), icon: Building2 },
    { key: 'contact', label: t('sections.contact'), icon: Phone },
    { key: 'social', label: t('sections.social'), icon: Globe },
    { key: 'seo', label: t('sections.seo'), icon: Globe },
    { key: 'maintenance', label: t('sections.maintenance'), icon: Shield },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('subtitle')}
          </p>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-green-600 dark:text-green-400"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{t('saved')}</span>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                        activeTab === tab.key
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Company Settings */}
            {activeTab === 'company' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t('sections.company')}</CardTitle>
                    <CardDescription>Firma temel bilgileri</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Browser Tab Settings */}
                    <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Tarayıcı Sekmesi Ayarları
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Sekme başlığı olarak "Firma Adı | Slogan" kullanılır.
                      </p>

                      {/* Browser Favicon */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Sekme İkonu (Favicon)
                        </label>
                        <div className="flex items-center gap-4">
                          {browserFaviconPreview ? (
                            <div className="w-16 h-16 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                              <Image
                                src={browserFaviconPreview}
                                alt="Favicon"
                                width={64}
                                height={64}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                              <Building2 className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleBrowserFaviconUpload}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Medyadan Seç
                            </Button>
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleBrowserFaviconFileUpload(file);
                                  }
                                }}
                                className="hidden"
                              />
                              <div className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                                Dosya Yükle
                              </div>
                            </label>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Tarayıcı sekmesinde görünen küçük ikon (32x32px veya 64x64px önerilir). Boş bırakılırsa logo kullanılır.
                        </p>
                      </div>
                    </div>

                    {/* Logo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.logo')}
                      </label>
                      <div className="flex items-center gap-4">
                        {logoPreview ? (
                          <div className="w-20 h-20 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <Image
                              src={logoPreview}
                              alt="Logo"
                              width={80}
                              height={80}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleLogoUpload}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Medyadan Seç
                          </Button>
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleLogoFileUpload(file);
                                }
                              }}
                              className="hidden"
                            />
                            <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                              Dosya Yükle
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.companyName')} *
                      </label>
                      <Input
                        {...register('company.name')}
                        className={errors.company?.name ? 'border-red-500' : ''}
                      />
                      {errors.company?.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.company.name.message}</p>
                      )}
                    </div>

                    {/* Slogan */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.slogan')}
                      </label>
                      <Input {...register('company.slogan')} />
                    </div>

                    {/* Firma Adı Stil Ayarları */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Firma Adı Stil Ayarları
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Firma Adı Rengi
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={watch('company.nameColor') || '#000000'}
                              onChange={(e) => {
                                setValue('company.nameColor', e.target.value, { shouldDirty: true });
                              }}
                              className="w-16 h-10"
                            />
                            <Input
                              type="text"
                              {...register('company.nameColor')}
                              placeholder="#000000"
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Firma Adı Boyutu (px)
                          </label>
                          <Input
                            type="number"
                            {...register('company.nameFontSize', { valueAsNumber: true })}
                            placeholder="18"
                            min="10"
                            max="72"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Slogan Stil Ayarları */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Slogan Stil Ayarları
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Slogan Rengi
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={watch('company.sloganColor') || '#666666'}
                              onChange={(e) => {
                                setValue('company.sloganColor', e.target.value, { shouldDirty: true });
                              }}
                              className="w-16 h-10"
                            />
                            <Input
                              type="text"
                              {...register('company.sloganColor')}
                              placeholder="#666666"
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Slogan Boyutu (px)
                          </label>
                          <Input
                            type="number"
                            {...register('company.sloganFontSize', { valueAsNumber: true })}
                            placeholder="12"
                            min="8"
                            max="48"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Admin Panel Ayarları */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Admin Panel Ayarları
                      </h3>
                      
                      {/* Admin Panel Başlık */}
                      <div className="space-y-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Admin Panel Başlığı
                        </label>
                        <Input
                          type="text"
                          value={adminTitle}
                          onChange={(e) => setAdminTitle(e.target.value)}
                          placeholder="Modern"
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Sidebar'da görünen admin panel başlığı
                        </p>
                      </div>

                      {/* Admin Panel Icon */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Admin Panel Icon
                        </label>
                        
                        {adminIconUrl && (
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-16 h-16 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 flex items-center justify-center">
                              <Image
                                src={adminIconUrl}
                                alt="Admin Icon"
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                                unoptimized
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (confirm('Admin icon\'u kaldırmak istediğinize emin misiniz?')) {
                                  setAdminIconUrl('');
                                  toast.success('Admin icon kaldırıldı');
                                }
                              }}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Kaldır
                            </Button>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAdminIconSelectorOpen(true)}
                            className="w-full"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Medyadan Seç
                          </Button>

                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept=".ico,.png,.svg,image/x-icon,image/png,image/svg+xml"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleAdminIconFileUpload(file);
                                }
                              }}
                              className="hidden"
                            />
                            <div className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              {isSaving ? (
                                <>
                                  <Spinner size="sm" className="mr-2" />
                                  Yükleniyor...
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  Dosya Yükle
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Admin panelinde görünecek icon (max 100KB, .ico, .png, .svg)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t('sections.contact')}</CardTitle>
                    <CardDescription>İletişim bilgileri</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Mail className="w-4 h-4 inline-block mr-2" />
                          {t('form.email')} *
                        </label>
                        <Input
                          type="email"
                          {...register('contact.email')}
                          className={errors.contact?.email ? 'border-red-500' : ''}
                        />
                        {errors.contact?.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.contact.email.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Phone className="w-4 h-4 inline-block mr-2" />
                          {t('form.phone')} *
                        </label>
                        <Input
                          {...register('contact.phone')}
                          className={errors.contact?.phone ? 'border-red-500' : ''}
                        />
                        {errors.contact?.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.contact.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline-block mr-2" />
                        {t('form.address')}
                      </label>
                      <textarea
                        {...register('contact.address')}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Social Media Settings */}
            {activeTab === 'social' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t('sections.social')}</CardTitle>
                    <CardDescription>Sosyal medya hesapları</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Facebook */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Facebook className="w-4 h-4 inline-block mr-2" />
                          {t('form.facebook')}
                        </label>
                        <Input
                          {...register('social.facebook')}
                          placeholder="https://facebook.com/..."
                        />
                      </div>

                      {/* Instagram */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Instagram className="w-4 h-4 inline-block mr-2" />
                          {t('form.instagram')}
                        </label>
                        <Input
                          {...register('social.instagram')}
                          placeholder="https://instagram.com/..."
                        />
                      </div>

                      {/* Twitter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Twitter className="w-4 h-4 inline-block mr-2" />
                          {t('form.twitter')}
                        </label>
                        <Input
                          {...register('social.twitter')}
                          placeholder="https://twitter.com/..."
                        />
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Linkedin className="w-4 h-4 inline-block mr-2" />
                          {t('form.linkedin')}
                        </label>
                        <Input
                          {...register('social.linkedin')}
                          placeholder="https://linkedin.com/company/..."
                        />
                      </div>

                      {/* YouTube */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Youtube className="w-4 h-4 inline-block mr-2" />
                          {t('form.youtube')}
                        </label>
                        <Input
                          {...register('social.youtube')}
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t('sections.seo')}</CardTitle>
                    <CardDescription>Arama motoru optimizasyonu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.metaTitle')}
                      </label>
                      <Input
                        {...register('seo.metaTitle')}
                        placeholder="Sayfa başlığı"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Önerilen: 50-60 karakter
                      </p>
                    </div>

                    {/* Meta Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.metaDescription')}
                      </label>
                      <textarea
                        {...register('seo.metaDescription')}
                        rows={3}
                        placeholder="Sayfa açıklaması"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Önerilen: 150-160 karakter
                      </p>
                    </div>

                    {/* Meta Keywords */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.metaKeywords')}
                      </label>
                      <Input
                        {...register('seo.metaKeywords')}
                        placeholder="anahtar, kelimeler, virgülle, ayrılmış"
                      />
                    </div>

                    {/* Google Analytics */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.googleAnalytics')}
                      </label>
                      <Input
                        {...register('seo.googleAnalyticsId')}
                        placeholder="UA-XXXXXXXX-X veya G-XXXXXXXXXX"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Maintenance Mode Settings */}
            {activeTab === 'maintenance' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      {t('sections.maintenance')}
                    </CardTitle>
                    <CardDescription>Bakım modu ayarları</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Maintenance Toggle */}
                    <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Bakım Modu
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Aktif edildiğinde site ziyaretçilere kapalı olur
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('maintenance.enabled')}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600" />
                      </label>
                    </div>

                    {/* Maintenance Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bakım Mesajı
                      </label>
                      <textarea
                        {...register('maintenance.message')}
                        rows={3}
                        placeholder="Ziyaretçilere gösterilecek mesaj"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Allowed IPs */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        İzin Verilen IP Adresleri
                      </label>
                      <Input
                        {...register('maintenance.allowedIPs')}
                        placeholder="192.168.1.1, 10.0.0.1"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Virgülle ayırarak birden fazla IP ekleyebilirsiniz
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSaving || !isDirty}
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
        </div>
      </form>

      {/* Media Selector Modal */}
      {isMediaSelectorOpen && (
        <MediaSelector
          isOpen={isMediaSelectorOpen}
          onClose={() => setIsMediaSelectorOpen(false)}
          onSelect={(media) => handleLogoSelect(media.url)}
          type="image"
        />
      )}
      
      {/* Browser Favicon Selector Modal */}
      {isBrowserFaviconSelectorOpen && (
        <MediaSelector
          isOpen={isBrowserFaviconSelectorOpen}
          onClose={() => setIsBrowserFaviconSelectorOpen(false)}
          onSelect={(media) => handleBrowserFaviconSelect(media.url)}
          type="image"
        />
      )}
      
      {/* Admin Icon Selector Modal */}
      {isAdminIconSelectorOpen && (
        <MediaSelector
          isOpen={isAdminIconSelectorOpen}
          onClose={() => setIsAdminIconSelectorOpen(false)}
          onSelect={(media) => handleAdminIconSelect(media.url)}
          type="image"
        />
      )}
    </div>
  );
}
