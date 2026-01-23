'use client';

// ============================================
// Page Builder - Admin Settings Page
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
  Key,
  Eye,
  EyeOff,
  Map,
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { MultiLangInput } from '@/components/ui/MultiLangInput';
import { cn } from '@/lib/utils';
import { toast } from '@/components/providers';
import { getSiteSettingsClient, updateSiteSettings } from '@/lib/firebase/firestore';
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
    name: z.record(z.string(), z.string()).optional(), // Çoklu dil: { tr: string, en: string, ... }
    slogan: z.record(z.string(), z.string()).optional(), // Çoklu dil
    logo: z.string().optional(),
    nameColor: z.string().optional(),
    nameColorDark: z.string().optional(), // Koyu tema rengi
    nameFontSize: z.number().optional(),
    sloganColor: z.string().optional(),
    sloganColorDark: z.string().optional(), // Koyu tema rengi
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
    metaTitle: z.record(z.string(), z.string()).optional(), // Çoklu dil
    metaDescription: z.record(z.string(), z.string()).optional(), // Çoklu dil
    metaKeywords: z.record(z.string(), z.string()).optional(), // Çoklu dil
    googleAnalyticsId: z.string().optional(),
  }),
  maintenance: z.object({
    enabled: z.boolean(),
    message: z.record(z.string(), z.string()).optional(), // Çoklu dil
    allowedIPs: z.string().optional(),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const defaultSettings: SettingsFormData = {
  browser: {
    favicon: '',
  },
  company: {
    name: { tr: 'X Şirketi', en: 'X Company' },
    slogan: { tr: 'X', en: 'X' },
    logo: '',
    nameColor: '',
    nameColorDark: '', // Koyu tema
    nameFontSize: undefined,
    sloganColor: '',
    sloganColorDark: '', // Koyu tema
    sloganFontSize: undefined,
  },
  contact: {
    email: 'info@x.com',
    phone: '+90 212 123 4567',
    address: 'Levent, İstanbul, Türkiye',
    mapUrl: '',
  },
  social: {
    facebook: 'https://facebook.com/x',
    instagram: 'https://instagram.com/x',
    twitter: '',
    linkedin: 'https://linkedin.com/company/x',
    youtube: '',
  },
  seo: {
    metaTitle: { tr: 'X Şirketi | Y', en: 'X Company | Y' },
    metaDescription: { tr: 'X açıklaması burada yer alır.', en: 'X description here.' },
    metaKeywords: { tr: 'x, şirket, hizmetler', en: 'x, company, services' },
    googleAnalyticsId: '',
  },
  maintenance: {
    enabled: false,
    message: { tr: 'Site bakım modundadır. Kısa süre içinde geri döneceğiz.', en: 'Site is under maintenance. We will be back shortly.' },
    allowedIPs: '',
  },
};

type TabKey = 'company' | 'contact' | 'social' | 'seo' | 'maintenance' | 'apiKeys';

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

  // API Keys ayarları
  const [translationProvider, setTranslationProvider] = useState<'google' | 'deepl' | 'none'>('none');
  const [googleTranslateKey, setGoogleTranslateKey] = useState<string>('');
  const [deeplApiKey, setDeeplApiKey] = useState<string>('');
  const [showGoogleTranslateKey, setShowGoogleTranslateKey] = useState(false);
  const [showDeeplKey, setShowDeeplKey] = useState(false);
  const [hasGoogleTranslateKey, setHasGoogleTranslateKey] = useState(false);
  const [hasDeeplKey, setHasDeeplKey] = useState(false);
  
  // Google Maps API
  const [googleMapsKey, setGoogleMapsKey] = useState<string>('');
  const [showGoogleMapsKey, setShowGoogleMapsKey] = useState(false);
  const [hasGoogleMapsKey, setHasGoogleMapsKey] = useState(false);
  
  // Map Provider
  const [mapProvider, setMapProvider] = useState<'google' | 'openstreetmap' | 'none'>('none');
  
  // API Settings Loading/Saving
  const [isApiKeysSaving, setIsApiKeysSaving] = useState(false);
  const [isApiKeysLoading, setIsApiKeysLoading] = useState(true);

  // Form dışı değişiklik takibi (logo, favicon, admin panel ayarları vb.)
  const [hasNonFormChanges, setHasNonFormChanges] = useState(false);

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
        const settings = await getSiteSettingsClient();

        // Aktif temayı yükle
        let themeSettings: any = null;
        try {
          const { getSiteSettingsClient: getSettings, getAvailableThemes } = await import('@/lib/firebase/firestore');
          const { getDefaultThemes } = await import('@/lib/themes/default/defaultThemes');

          // Client-safe fonksiyon kullan (getSiteSettings yerine getSiteSettingsClient)
          const siteSettings = await getSettings();
          const activeThemeName = siteSettings.activeThemeName;
          const activeThemeId = siteSettings.activeThemeId;

          if (activeThemeName || activeThemeId) {
            const firestoreThemes = await getAvailableThemes();
            const targetTheme = firestoreThemes.find(t =>
              t.name === activeThemeName ||
              t.id === activeThemeId ||
              (activeThemeId && t.id.includes(activeThemeId.replace('theme-', '')))
            );

            if (targetTheme) {
              const defaultThemes = getDefaultThemes();
              const matchedTheme = defaultThemes.find(t =>
                t.metadata.name === targetTheme.name ||
                t.metadata.id === targetTheme.id ||
                targetTheme.id.includes(t.metadata.id.replace('theme-', ''))
              );

              if (matchedTheme) {
                // Admin settings sayfası SADECE default tema ayarlarını kullanmalı
                // Firestore'daki özel ayarlar (navbar/footer customization) buraya dahil edilmemeli
                // Çünkü bu sayfa tema bilgilerini göstermek için, özel ayarları değil
                themeSettings = matchedTheme.metadata.settings;
                logger.api.debug('Tema default ayarları yüklendi (özel ayarlar dahil edilmedi)');
              }
            }
          }
        } catch (error) {
          logger.api.warn('Tema ayarları yüklenirken hata:', error);
        }

        // Tema ayarlarından default değerleri al
        const themeDefaults = themeSettings ? {
          company: {
            name: themeSettings.company?.name || defaultSettings.company.name,
            slogan: themeSettings.company?.slogan || defaultSettings.company.slogan,
            logo: themeSettings.company?.logo || defaultSettings.company.logo,
            favicon: themeSettings.company?.favicon || defaultSettings.browser.favicon || '',
          },
          social: themeSettings.footer?.socialLinks || defaultSettings.social,
          contact: {
            email: themeSettings.contact?.email || defaultSettings.contact.email,
            phone: themeSettings.contact?.phone || defaultSettings.contact.phone,
            address: themeSettings.contact?.address || defaultSettings.contact.address,
            mapUrl: themeSettings.contact?.mapUrl || defaultSettings.contact.mapUrl,
          },
          seo: {
            metaTitle: themeSettings.seo?.metaTitle || defaultSettings.seo.metaTitle,
            metaDescription: themeSettings.seo?.metaDescription || defaultSettings.seo.metaDescription,
            metaKeywords: themeSettings.seo?.metaKeywords || defaultSettings.seo.metaKeywords,
            googleAnalyticsId: themeSettings.seo?.googleAnalyticsId || defaultSettings.seo.googleAnalyticsId,
          },
          maintenance: {
            enabled: defaultSettings.maintenance.enabled,
            message: defaultSettings.maintenance.message,
            allowedIPs: defaultSettings.maintenance.allowedIPs,
          },
        } : {
          company: {
            name: defaultSettings.company.name,
            slogan: defaultSettings.company.slogan,
            logo: defaultSettings.company.logo,
            favicon: defaultSettings.browser.favicon || '',
          },
          social: defaultSettings.social,
          contact: defaultSettings.contact,
          seo: defaultSettings.seo,
          maintenance: defaultSettings.maintenance,
        };

        // SiteSettings'i SettingsFormData formatına çevir
        const formData: SettingsFormData = {
          browser: {
            favicon: (settings as any).browserFavicon || themeDefaults.company.favicon,
          },
          company: {
            name: settings.siteName || { tr: themeDefaults.company.name?.tr || '', en: themeDefaults.company.name?.en || '' },
            slogan: settings.siteSlogan || { tr: themeDefaults.company.slogan?.tr || '', en: themeDefaults.company.slogan?.en || '' },
            logo: settings.logo?.light?.url || themeDefaults.company.logo,
            // Renk ve font ayarları - undefined ise boş bırak (tema varsayılanları kullanılsın)
            nameColor: (settings as any).companyNameStyle?.color || '',
            nameColorDark: (settings as any).companyNameStyle?.colorDark || '',
            nameFontSize: (settings as any).companyNameStyle?.fontSize || undefined,
            sloganColor: (settings as any).sloganStyle?.color || '',
            sloganColorDark: (settings as any).sloganStyle?.colorDark || '',
            sloganFontSize: (settings as any).sloganStyle?.fontSize || undefined,
          },
          contact: {
            email: settings.contact?.email || themeDefaults.contact.email,
            phone: settings.contact?.phones?.[0] || themeDefaults.contact.phone,
            address: settings.contact?.address?.tr || themeDefaults.contact.address,
            mapUrl: (settings as any).mapUrl || themeDefaults.contact.mapUrl,
          },
          social: {
            facebook: settings.socialLinks?.facebook || themeDefaults.social.facebook || '',
            instagram: settings.socialLinks?.instagram || themeDefaults.social.instagram || '',
            twitter: settings.socialLinks?.twitter || themeDefaults.social.twitter || '',
            linkedin: settings.socialLinks?.linkedin || themeDefaults.social.linkedin || '',
            youtube: settings.socialLinks?.youtube || themeDefaults.social.youtube || '',
          },
          seo: {
            metaTitle: settings.seo?.titleTemplate || { tr: themeDefaults.seo.metaTitle, en: '' },
            metaDescription: settings.seo?.defaultDescription || { tr: themeDefaults.seo.metaDescription, en: '' },
            metaKeywords: settings.seo?.keywords ? {
              tr: settings.seo.keywords.tr?.join(', ') || '',
              en: settings.seo.keywords.en?.join(', ') || '',
              de: settings.seo.keywords.de?.join(', ') || '',
              fr: settings.seo.keywords.fr?.join(', ') || '',
            } : { tr: themeDefaults.seo.metaKeywords, en: '' },
            googleAnalyticsId: settings.seo?.googleAnalyticsId || themeDefaults.seo.googleAnalyticsId,
          },
          maintenance: {
            enabled: settings.maintenance?.enabled || themeDefaults.maintenance.enabled,
            message: settings.maintenance?.message || { tr: themeDefaults.maintenance.message, en: '' },
            allowedIPs: settings.maintenance?.allowedIPs?.join(', ') || themeDefaults.maintenance.allowedIPs,
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

    // API Keys ayarlarını yükle
    const loadApiKeysSettings = async () => {
      try {
        setIsApiKeysLoading(true);
        const response = await fetch('/api/settings/api-keys');
        if (response.ok) {
          const data = await response.json();
          // Translation settings
          setTranslationProvider(data.translationProvider || 'none');
          setHasGoogleTranslateKey(data.hasGoogleTranslateKey || false);
          setHasDeeplKey(data.hasDeeplKey || false);
          // Map settings
          setMapProvider(data.mapProvider || 'none');
          setHasGoogleMapsKey(data.hasGoogleMapsKey || false);
        }
      } catch (error) {
        logger.api.error('API Keys ayarları yüklenirken hata', error);
      } finally {
        setIsApiKeysLoading(false);
      }
    };

    loadSettings();
    loadApiKeysSettings();

    // Tema güncellemelerini dinle
    const handleThemeUpdate = () => {
      loadSettings();
    };
    window.addEventListener('theme-updated', handleThemeUpdate);

    return () => {
      window.removeEventListener('theme-updated', handleThemeUpdate);
    };
  }, [reset]);

  // API Keys kaydetme fonksiyonu
  const handleSaveApiKeysSettings = async () => {
    setIsApiKeysSaving(true);
    try {
      const payload: any = {
        // Translation settings
        translationProvider,
        // Map settings
        mapProvider,
      };

      // Sadece doldurulmuş key'leri gönder
      if (googleTranslateKey && googleTranslateKey.trim()) {
        payload.googleTranslateKey = googleTranslateKey.trim();
      }
      if (deeplApiKey && deeplApiKey.trim()) {
        payload.deeplApiKey = deeplApiKey.trim();
      }
      if (googleMapsKey && googleMapsKey.trim()) {
        payload.googleMapsKey = googleMapsKey.trim();
      }

      const response = await fetch('/api/settings/api-keys', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setHasGoogleTranslateKey(data.hasGoogleTranslateKey);
        setHasDeeplKey(data.hasDeeplKey);
        setHasGoogleMapsKey(data.hasGoogleMapsKey);
        // Inputları temizle
        setGoogleTranslateKey('');
        setDeeplApiKey('');
        setGoogleMapsKey('');
        toast.success(t('apiKeys.saved'));
      } else {
        const error = await response.json();
        console.error('API Keys save error response:', error);
        toast.error(error.details || error.error || 'Hata oluştu');
      }
    } catch (error: any) {
      logger.api.error('API Keys ayarları kaydedilirken hata', error);
      console.error('API Keys save fetch error:', error);
      toast.error(error?.message || 'Ayarlar kaydedilirken hata oluştu');
    } finally {
      setIsApiKeysSaving(false);
    }
  };

  const onSubmit = async (data: SettingsFormData) => {
    setIsSaving(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Lütfen giriş yapın');
        return;
      }

      // SettingsFormData'yı SiteSettings formatına çevir
      const currentSettings = await getSiteSettingsClient();

      await updateSiteSettings({
        ...currentSettings,
        // Browser tab ayarları
        browserFavicon: data.browser.favicon || '',
        // Company bilgileri - çoklu dil desteği
        siteName: {
          tr: data.company.name?.tr || '',
          en: data.company.name?.en || '',
          de: data.company.name?.de || data.company.name?.en || '',
          fr: data.company.name?.fr || data.company.name?.en || '',
        },
        siteSlogan: {
          tr: data.company.slogan?.tr || '',
          en: data.company.slogan?.en || '',
          de: data.company.slogan?.de || data.company.slogan?.en || '',
          fr: data.company.slogan?.fr || data.company.slogan?.en || '',
        },
        companyNameStyle: data.company.nameColor || data.company.nameColorDark || data.company.nameFontSize ? {
          color: data.company.nameColor || undefined,
          colorDark: data.company.nameColorDark || undefined,
          fontSize: data.company.nameFontSize || undefined,
        } : undefined,
        sloganStyle: data.company.sloganColor || data.company.sloganColorDark || data.company.sloganFontSize ? {
          color: data.company.sloganColor || undefined,
          colorDark: data.company.sloganColorDark || undefined,
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
          titleTemplate: data.seo.metaTitle || { tr: '', en: '', de: '', fr: '' },
          defaultDescription: data.seo.metaDescription || { tr: '', en: '', de: '', fr: '' },
          keywords: (() => {
            const keywords = data.seo.metaKeywords;
            if (typeof keywords === 'object' && keywords !== null) {
              return {
                tr: keywords?.tr ? (Array.isArray(keywords.tr) ? keywords.tr : keywords.tr.split(',').map(k => k.trim())) : [],
                en: keywords?.en ? (Array.isArray(keywords.en) ? keywords.en : keywords.en.split(',').map(k => k.trim())) : [],
                de: keywords?.de ? (Array.isArray(keywords.de) ? keywords.de : keywords.de.split(',').map(k => k.trim())) : [],
                fr: keywords?.fr ? (Array.isArray(keywords.fr) ? keywords.fr : keywords.fr.split(',').map(k => k.trim())) : [],
              };
            } else if (typeof keywords === 'string') {
              const arr = (keywords as string).split(',').map(k => k.trim());
              return { tr: arr, en: [], de: [], fr: [] };
            }
            return { tr: [], en: [], de: [], fr: [] };
          })(),
          googleAnalyticsId: data.seo.googleAnalyticsId || '',
        },
        // Bakım modu
        maintenance: {
          enabled: data.maintenance.enabled,
          message: data.maintenance.message || { tr: '', en: '', de: '', fr: '' },
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
    setHasNonFormChanges(true);
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
      setHasNonFormChanges(true);
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
    setHasNonFormChanges(true);
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
      setHasNonFormChanges(true);
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
    setHasNonFormChanges(true);
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
    { key: 'apiKeys', label: t('sections.apiKeys'), icon: Key },
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
                    <CardDescription>{t('descriptions.company')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Browser Tab Settings */}
                    <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {t('browser.title')}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        {t('browser.description')}
                      </p>

                      {/* Browser Favicon */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('browser.favicon')}
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
                              {t('buttons.selectFromMedia')}
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
                                {t('buttons.uploadFile')}
                              </div>
                            </label>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {t('browser.faviconDesc')}
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
                            {t('buttons.selectFromMedia')}
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
                              {t('buttons.uploadFile')}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Company Name - Çoklu Dil */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.companyName')} *
                      </label>
                      <MultiLangInput
                        value={watch('company.name') || { tr: '', en: '' }}
                        onChange={(value) => setValue('company.name', value, { shouldDirty: true })}
                        placeholder="Şirket adını girin..."
                      />
                    </div>

                    {/* Slogan - Çoklu Dil */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.slogan')}
                      </label>
                      <MultiLangInput
                        value={watch('company.slogan') || { tr: '', en: '' }}
                        onChange={(value) => setValue('company.slogan', value, { shouldDirty: true })}
                        placeholder="Slogan girin..."
                      />
                    </div>

                    {/* Firma Adı Stil Ayarları */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        {t('companyStyle.title')}
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('companyStyle.nameColorLight')}
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
                            {t('companyStyle.nameColorDark')}
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={watch('company.nameColorDark') || '#ffffff'}
                              onChange={(e) => {
                                setValue('company.nameColorDark', e.target.value, { shouldDirty: true });
                              }}
                              className="w-16 h-10"
                            />
                            <Input
                              type="text"
                              {...register('company.nameColorDark')}
                              placeholder="#ffffff"
                              className="flex-1"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{t('companyStyle.autoCalculated')}</p>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('companyStyle.nameFontSize')}
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
                        {t('sloganStyle.title')}
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('sloganStyle.colorLight')}
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
                            {t('sloganStyle.colorDark')}
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={watch('company.sloganColorDark') || '#aaaaaa'}
                              onChange={(e) => {
                                setValue('company.sloganColorDark', e.target.value, { shouldDirty: true });
                              }}
                              className="w-16 h-10"
                            />
                            <Input
                              type="text"
                              {...register('company.sloganColorDark')}
                              placeholder="#aaaaaa"
                              className="flex-1"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{t('companyStyle.autoCalculated')}</p>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('sloganStyle.fontSize')}
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
                        {t('adminPanel.title')}
                      </h3>

                      {/* Admin Panel Başlık */}
                      <div className="space-y-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('adminPanel.panelTitle')}
                        </label>
                        <Input
                          type="text"
                          value={adminTitle}
                          onChange={(e) => setAdminTitle(e.target.value)}
                          placeholder="Modern"
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('adminPanel.panelTitleDesc')}
                        </p>
                      </div>

                      {/* Admin Panel Icon */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('adminPanel.icon')}
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
                                if (confirm(t('adminPanel.removeConfirm'))) {
                                  setAdminIconUrl('');
                                  toast.success(t('adminPanel.iconRemoved'));
                                }
                              }}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              <X className="w-4 h-4 mr-2" />
                              {t('buttons.remove')}
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
                            {t('buttons.selectFromMedia')}
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
                                  {t('buttons.uploading')}
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  {t('buttons.uploadFile')}
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {t('adminPanel.iconDesc')}
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
                    <CardDescription>{t('descriptions.contact')}</CardDescription>
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
                    <CardDescription>{t('descriptions.social')}</CardDescription>
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
                    <CardDescription>{t('descriptions.seo')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.metaTitle')}
                      </label>
                      <MultiLangInput
                        value={watch('seo.metaTitle') || { tr: '', en: '' }}
                        onChange={(value) => setValue('seo.metaTitle', value, { shouldDirty: true })}
                        placeholder="Sayfa başlığı"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t('seoHints.titleLength')}
                      </p>
                    </div>

                    {/* Meta Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.metaDescription')}
                      </label>
                      <MultiLangInput
                        value={watch('seo.metaDescription') || { tr: '', en: '' }}
                        onChange={(value) => setValue('seo.metaDescription', value, { shouldDirty: true })}
                        type="textarea"
                        rows={3}
                        placeholder="Sayfa açıklaması"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t('seoHints.descLength')}
                      </p>
                    </div>

                    {/* Meta Keywords */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.metaKeywords')}
                      </label>
                      <MultiLangInput
                        value={watch('seo.metaKeywords') || { tr: '', en: '' }}
                        onChange={(value) => setValue('seo.metaKeywords', value, { shouldDirty: true })}
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
                    <CardDescription>{t('descriptions.maintenance')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Maintenance Toggle */}
                    <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {t('maintenanceMode.title')}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('maintenanceMode.description')}
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
                        {t('maintenanceMode.message')}
                      </label>
                      <MultiLangInput
                        value={watch('maintenance.message') || { tr: '', en: '' }}
                        onChange={(value) => setValue('maintenance.message', value, { shouldDirty: true })}
                        type="textarea"
                        rows={3}
                        placeholder={t('maintenanceMode.messagePlaceholder')}
                      />
                    </div>

                    {/* Allowed IPs */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('maintenanceMode.allowedIPs')}
                      </label>
                      <Input
                        {...register('maintenance.allowedIPs')}
                        placeholder="192.168.1.1, 10.0.0.1"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t('maintenanceMode.allowedIPsHint')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* API Keys Settings */}
            {activeTab === 'apiKeys' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      {t('sections.apiKeys')}
                    </CardTitle>
                    <CardDescription>{t('descriptions.apiKeys')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {isApiKeysLoading ? (
                      <div className="flex justify-center py-8">
                        <Spinner size="md" />
                      </div>
                    ) : (
                      <>
                        {/* ==================== TRANSLATION API SECTION ==================== */}
                        <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            🌐 {t('apiKeys.translationTitle')}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {t('apiKeys.translationDesc')}
                          </p>

                          {/* Translation Provider Selection */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* None Option */}
                            <button
                              type="button"
                              onClick={() => setTranslationProvider('none')}
                              className={cn(
                                'p-4 rounded-xl border-2 transition-all text-left',
                                translationProvider === 'none'
                                  ? 'border-gray-500 bg-gray-50 dark:bg-gray-800'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              )}
                            >
                              <div className="font-medium text-gray-900 dark:text-white">
                                {t('apiKeys.disabled')}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t('apiKeys.translationDisabledDesc')}
                              </p>
                            </button>

                            {/* Google Translate Option */}
                            <button
                              type="button"
                              onClick={() => setTranslationProvider('google')}
                              className={cn(
                                'p-4 rounded-xl border-2 transition-all text-left',
                                translationProvider === 'google'
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">🔵</span>
                                <span className="font-medium text-gray-900 dark:text-white">Google Translate</span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t('apiKeys.googleTranslateDesc')}
                              </p>
                              {hasGoogleTranslateKey && (
                                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
                                  <CheckCircle className="w-3 h-3" /> {t('apiKeys.configured')}
                                </span>
                              )}
                            </button>

                            {/* DeepL Option */}
                            <button
                              type="button"
                              onClick={() => setTranslationProvider('deepl')}
                              className={cn(
                                'p-4 rounded-xl border-2 transition-all text-left',
                                translationProvider === 'deepl'
                                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-700'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">🔷</span>
                                <span className="font-medium text-gray-900 dark:text-white">DeepL</span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t('apiKeys.deeplDesc')}
                              </p>
                              {hasDeeplKey && (
                                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
                                  <CheckCircle className="w-3 h-3" /> {t('apiKeys.configured')}
                                </span>
                              )}
                            </button>
                          </div>

                          {/* Google Translate API Key Input */}
                          {translationProvider === 'google' && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Google Translate API Key
                              </label>
                              <div className="relative">
                                <Input
                                  type={showGoogleTranslateKey ? 'text' : 'password'}
                                  value={googleTranslateKey}
                                  onChange={(e) => setGoogleTranslateKey(e.target.value)}
                                  placeholder={hasGoogleTranslateKey ? '••••••••••••' : t('apiKeys.enterApiKey')}
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowGoogleTranslateKey(!showGoogleTranslateKey)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showGoogleTranslateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {t('apiKeys.googleTranslateHint')}
                              </p>
                            </div>
                          )}

                          {/* DeepL API Key Input */}
                          {translationProvider === 'deepl' && (
                            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-xl border border-cyan-200 dark:border-cyan-800">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                DeepL API Key
                              </label>
                              <div className="relative">
                                <Input
                                  type={showDeeplKey ? 'text' : 'password'}
                                  value={deeplApiKey}
                                  onChange={(e) => setDeeplApiKey(e.target.value)}
                                  placeholder={hasDeeplKey ? '••••••••••••' : t('apiKeys.enterApiKey')}
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowDeeplKey(!showDeeplKey)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showDeeplKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {t('apiKeys.deeplHint')}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* ==================== MAPS API SECTION ==================== */}
                        <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Map className="w-5 h-5" /> {t('apiKeys.mapsTitle')}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {t('apiKeys.mapsDesc')}
                          </p>

                          {/* Map Provider Selection */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* None Option */}
                            <button
                              type="button"
                              onClick={() => setMapProvider('none')}
                              className={cn(
                                'p-4 rounded-xl border-2 transition-all text-left',
                                mapProvider === 'none'
                                  ? 'border-gray-500 bg-gray-50 dark:bg-gray-800'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              )}
                            >
                              <div className="font-medium text-gray-900 dark:text-white">
                                {t('apiKeys.disabled')}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t('apiKeys.mapsDisabledDesc')}
                              </p>
                            </button>

                            {/* Google Maps Option */}
                            <button
                              type="button"
                              onClick={() => setMapProvider('google')}
                              className={cn(
                                'p-4 rounded-xl border-2 transition-all text-left',
                                mapProvider === 'google'
                                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">📍</span>
                                <span className="font-medium text-gray-900 dark:text-white">Google Maps</span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t('apiKeys.googleMapsDesc')}
                              </p>
                              {hasGoogleMapsKey && (
                                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
                                  <CheckCircle className="w-3 h-3" /> {t('apiKeys.configured')}
                                </span>
                              )}
                            </button>

                            {/* OpenStreetMap Option */}
                            <button
                              type="button"
                              onClick={() => setMapProvider('openstreetmap')}
                              className={cn(
                                'p-4 rounded-xl border-2 transition-all text-left',
                                mapProvider === 'openstreetmap'
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">🗺️</span>
                                <span className="font-medium text-gray-900 dark:text-white">OpenStreetMap</span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t('apiKeys.openStreetMapDesc')}
                              </p>
                              <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 mt-2">
                                {t('apiKeys.free')}
                              </span>
                            </button>
                          </div>

                          {/* Google Maps API Key Input */}
                          {mapProvider === 'google' && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Google Maps API Key
                              </label>
                              <div className="relative">
                                <Input
                                  type={showGoogleMapsKey ? 'text' : 'password'}
                                  value={googleMapsKey}
                                  onChange={(e) => setGoogleMapsKey(e.target.value)}
                                  placeholder={hasGoogleMapsKey ? '••••••••••••' : t('apiKeys.enterApiKey')}
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowGoogleMapsKey(!showGoogleMapsKey)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showGoogleMapsKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {t('apiKeys.googleMapsHint')}
                              </p>
                            </div>
                          )}

                          {/* OpenStreetMap Info */}
                          {mapProvider === 'openstreetmap' && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                ✅ {t('apiKeys.openStreetMapInfo')}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* ==================== FUTURE APIs INFO ==================== */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            💡 {t('apiKeys.futureApisNote')}
                          </p>
                        </div>

                        {/* Save API Keys Button */}
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="primary"
                            onClick={handleSaveApiKeysSettings}
                            disabled={isApiKeysSaving}
                          >
                            {isApiKeysSaving ? (
                              <Spinner size="sm" className="mr-2" />
                            ) : (
                              <Save className="w-4 h-4 mr-2" />
                            )}
                            {t('apiKeys.save')}
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSaving || (!isDirty && !hasNonFormChanges)}
              >
                {isSaving ? (
                  <Spinner size="sm" className="mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {t('save')}
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
