'use client';

// ============================================
// Page Builder - Theme Selector Page
// Tema seçim ve yükleme sayfası - Modal + Progress Bar
// ============================================

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { getAvailableThemes, deleteCurrentTheme, installTheme, createTheme } from '@/lib/firebase/firestore';
import { getCurrentUser } from '@/lib/firebase/auth';
import { getDefaultThemes } from '@/lib/themes/default/defaultThemes';
import { logger } from '@/lib/logger';
import type { Locale } from '@/i18n';
import type { ThemePreview } from '@/types/theme';

// Log tipi
interface InstallLog {
  time: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export default function ThemesPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations('admin.themes');

  // Türkçe karakterleri ASCII'ye dönüştür
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/i̇/g, 'i') // Unicode noktalı i
      .replace(/İ/g, 'i')
      .replace(/ş/g, 's')
      .replace(/Ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/Ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/Ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'c')
      .trim();
  };

  // Tema adından çeviri key'i oluştur
  const getThemeNameKey = (themeName: string): string => {
    const normalized = normalizeText(themeName);
    
    const nameMap: Record<string, string> = {
      // Modern Business
      'modern is': 'modernBusiness',
      'modern business': 'modernBusiness',
      // Minimal / Sade
      'sade tasarim': 'minimal',
      'sade tema': 'minimal',
      'minimal tema': 'minimal',
      'minimal': 'minimal',
      'sade': 'minimal',
      // Corporate / Kurumsal
      'kurumsal isletme': 'corporate',
      'kurumsal': 'corporate',
      'corporate': 'corporate',
      // Construction / İnşaat
      'insaat firmasi': 'construction',
      'insaat': 'construction',
      'construction': 'construction',
      // Restaurant / Restoran
      'restoran & kafe': 'restaurant',
      'restoran kafe': 'restaurant',
      'restoran': 'restaurant',
      'restaurant': 'restaurant',
      // Healthcare / Sağlık
      'saglik & klinik': 'healthcare',
      'saglik klinik': 'healthcare',
      'saglik': 'healthcare',
      'healthcare': 'healthcare',
      // Education / Eğitim
      'egitim kurumu': 'education',
      'egitim': 'education',
      'education': 'education',
      // E-commerce / E-ticaret
      'online magaza': 'ecommerce',
      'e-ticaret': 'ecommerce',
      'ecommerce': 'ecommerce',
    };
    
    return nameMap[normalized] || normalized.replace(/[^a-z0-9]/g, '');
  };

  const getThemeTranslation = (type: 'name' | 'description', themeName: string, fallback: string): string => {
    const key = getThemeNameKey(themeName);
    const translationKey = type === 'name' ? `themeNames.${key}` : `themeDescriptions.${key}`;
    const translated = t.raw(translationKey);
    return typeof translated === 'string' ? translated : fallback;
  };

  const [themes, setThemes] = useState<ThemePreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [installingTheme, setInstallingTheme] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Progress tracking
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [installLogs, setInstallLogs] = useState<InstallLog[]>([]);
  const logPanelRef = useRef<HTMLDivElement>(null);

  // Log ekleme fonksiyonu
  const addLog = useCallback((message: string, type: InstallLog['type'] = 'info') => {
    const time = new Date().toLocaleTimeString(locale === 'tr' ? 'tr-TR' : locale === 'de' ? 'de-DE' : locale === 'fr' ? 'fr-FR' : 'en-US');
    setInstallLogs(prev => [...prev, { time, message, type }]);

    // Logger'a da yaz
    if (type === 'error') {
      logger.theme.error(message);
    } else if (type === 'warning') {
      logger.theme.warn(message);
    } else {
      logger.theme.debug(message);
    }
  }, [locale]);

  // Log paneli auto-scroll
  useEffect(() => {
    if (logPanelRef.current) {
      logPanelRef.current.scrollTop = logPanelRef.current.scrollHeight;
    }
  }, [installLogs]);

  // Tema önizleme fonksiyonu
  const handlePreview = (themeId: string) => {
    const previewUrl = `/${locale}/admin/themes/preview/${themeId}`;
    window.open(previewUrl, '_blank');
  };

  const loadThemes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const defaultThemes = getDefaultThemes();
      logger.theme.debug('Varsayılan temalar yüklendi', defaultThemes.map(t => t.metadata.name));
      const defaultThemesPreview: ThemePreview[] = defaultThemes.map(t => ({
        id: t.metadata.id,
        name: t.metadata.name,
        description: t.metadata.description,
        thumbnail: t.metadata.thumbnail,
        category: t.metadata.category,
        version: t.metadata.version,
      }));

      try {
        const timeoutPromise = new Promise<ThemePreview[]>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );

        const themesPromise = getAvailableThemes();
        const availableThemes = await Promise.race([themesPromise, timeoutPromise]);

        const mergedThemes: ThemePreview[] = defaultThemesPreview.map(defaultTheme => {
          const firestoreTheme = availableThemes.find(ft => {
            if (ft.id === defaultTheme.id) return true;
            const defaultName = defaultTheme.name.toLowerCase().trim();
            const firestoreName = ft.name.toLowerCase().trim();
            if (defaultName === firestoreName) return true;
            return false;
          });

          if (firestoreTheme) {
            return {
              ...firestoreTheme,
              thumbnail: defaultTheme.thumbnail,
            };
          }

          return defaultTheme;
        });

        setThemes(mergedThemes);

        if (availableThemes.length < defaultThemesPreview.length) {
          const missingThemes = defaultThemes.filter(defaultTheme => {
            return !availableThemes.some(ft => {
              const defaultName = defaultTheme.metadata.name.toLowerCase().trim();
              const firestoreName = ft.name.toLowerCase().trim();
              return defaultName === firestoreName || ft.id === defaultTheme.metadata.id;
            });
          });

          if (missingThemes.length > 0) {
            Promise.all(
              missingThemes.map(themeData => createTheme(themeData.metadata))
            ).catch(() => {
              logger.theme.warn('Bazı temalar Firestore\'a kaydedilemedi');
            });
          }
        }
      } catch (firestoreError: any) {
        logger.theme.warn('Firebase bağlantısı yok veya timeout', { message: firestoreError?.message });
        setThemes(defaultThemesPreview);
      }
    } catch (error) {
      logger.theme.error('Temalar yüklenemedi', error);
      setError(t('loadError'));
      const defaultThemes = getDefaultThemes();
      setThemes(defaultThemes.map(t => ({
        id: t.metadata.id,
        name: t.metadata.name,
        description: t.metadata.description,
        thumbnail: t.metadata.thumbnail,
        category: t.metadata.category,
        version: t.metadata.version,
      })));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadThemes();
  }, [loadThemes]);

  const handleThemeInstall = (themeIdOrName: string) => {
    setShowWarning(themeIdOrName);
  };

  const confirmThemeInstall = async (themeId: string) => {
    try {
      setInstallingTheme(themeId);
      setError(null);
      setSuccess(null);
      setProgress(0);
      setInstallLogs([]);

      addLog(t('logs.starting'), 'info');
      setProgress(5);
      setProgressText(t('logs.authenticating'));

      // Kullanıcı bilgisini al
      let userId: string | null = null;
      const tempSession = localStorage.getItem('temp_admin_session');
      if (tempSession) {
        const session = JSON.parse(tempSession);
        userId = session.id || 'temp-admin-001';
        addLog(t('logs.authenticatedTemp'), 'success');
      } else {
        const user = getCurrentUser();
        if (user) {
          userId = user.uid;
          addLog(t('logs.authenticatedFirebase'), 'success');
        }
      }
      setProgress(10);

      if (!userId) {
        addLog(t('logs.userNotFound'), 'error');
        throw new Error(t('logs.userNotFound'));
      }

      // Mevcut temayı sil
      addLog(t('logs.deletingTheme'), 'info');
      setProgressText(t('logs.deletingTheme'));
      setProgress(20);

      await deleteCurrentTheme();
      addLog(t('logs.themeDeleted'), 'success');
      setProgress(35);

      // Tema verilerini bul
      addLog(t('logs.searchingTheme'), 'info');
      setProgressText(t('logs.preparingData'));
      const defaultThemes = getDefaultThemes();

      let themeToInstall = defaultThemes.find(t => t.metadata.id === themeId);

      if (!themeToInstall) {
        try {
          addLog(t('logs.themeNotFoundWarning'), 'warning');
          const firestoreThemes = await getAvailableThemes();
          const foundFirestoreTheme = firestoreThemes.find(t => t.id === themeId);

          if (foundFirestoreTheme) {
            themeToInstall = defaultThemes.find(t => {
              const defaultName = t.metadata.name.toLowerCase().trim();
              const firestoreName = foundFirestoreTheme.name.toLowerCase().trim();
              if (defaultName === firestoreName) return true;
              if (defaultName.includes(firestoreName) || firestoreName.includes(defaultName)) return true;
              const idBasedName = themeId.toLowerCase().replace('theme-', '').replace(/-/g, ' ');
              if (defaultName.includes(idBasedName)) return true;
              return false;
            });
          }
        } catch (error) {
          addLog(t('logs.firestoreWarning'), 'warning');
        }
      }

      if (!themeToInstall) {
        addLog(t('logs.themeNotFound'), 'error');
        throw new Error(`${t('logs.themeNotFound')} ID: ${themeId}`);
      }

      addLog(t('logs.themeFound', { name: themeToInstall.metadata.name }), 'success');
      setProgress(45);

      // Tema yükleme
      addLog(t('logs.installingTheme'), 'info');
      setProgressText(t('logs.creatingPages'));
      setProgress(50);

      // metadata.pages dizisinden sayfa sayısını al (bu dizideki sayfalar yüklenecek)
      const pageCount = themeToInstall.metadata.pages?.length || 0;
      addLog(t('logs.pagesCount', { count: pageCount }), 'info');

      // Sayfa isimlerini logla
      themeToInstall.metadata.pages?.forEach((page) => {
        addLog(t('logs.creatingPage', { title: page.title }), 'info');
      });

      // Progress tracking için sayaç
      let pagesCreated = 0;
      const progressPerPage = 40 / Math.max(pageCount, 1);

      // installTheme'e callback ile sayfa oluşturma bilgisini al
      await installTheme(themeToInstall, userId, (event) => {
        if (event.type === 'page-created') {
          pagesCreated++;
          const currentProgress = 50 + (pagesCreated * progressPerPage);
          setProgress(Math.min(90, Math.round(currentProgress)));
          addLog(t('logs.pageCreated', { title: event.title, count: event.sectionCount }), 'success');
        }
      });

      setProgress(95);
      addLog(t('logs.allPagesCreated'), 'success');
      addLog(t('logs.settingsSaved'), 'success');

      setProgress(100);
      setProgressText(t('logs.completed'));
      addLog(t('logs.success'), 'success');

      setSuccess(t('installSuccess'));

      setTimeout(() => {
        window.location.href = locale === 'tr' ? '/admin/page-builder' : `/${locale}/admin/page-builder`;
      }, 2000);
    } catch (error: any) {
      addLog(t('logs.error', { message: error.message }), 'error');
      setError(error.message || t('loadError'));
      setProgress(0);
      setProgressText('');
    } finally {
      if (!success) {
        setTimeout(() => {
          setInstallingTheme(null);
        }, 1000);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Palette className="w-8 h-8" />
          {t('title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('subtitle')}
        </p>
      </div>

      {/* Error Message */}
      {error && !installingTheme && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-green-800 dark:text-green-200">{success}</p>
        </motion.div>
      )}

      {/* MODAL: Warning Popup */}
      <AnimatePresence>
        {showWarning && !installingTheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowWarning(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('warning.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: t.raw('warning.message') }} />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('warning.irreversible')}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowWarning(null)}
                  variant="outline"
                  className="flex-1"
                >
                  {t('warning.cancel')}
                </Button>
                <Button
                  onClick={() => {
                    setShowWarning(null);
                    confirmThemeInstall(showWarning);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {t('warning.confirm')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: Progress & Logs */}
      <AnimatePresence>
        {installingTheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-primary-600 dark:text-primary-400 animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t('installing')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {progressText || t('pleaseWait')}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('progress')}
                  </span>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                    %{progress}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                  />
                </div>
              </div>

              {/* Log Panel */}
              <div ref={logPanelRef} className="bg-gray-900 rounded-lg p-4 max-h-48 overflow-y-auto font-mono text-xs">
                {installLogs.length === 0 ? (
                  <p className="text-gray-500">{t('waiting')}</p>
                ) : (
                  installLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`mb-1 ${log.type === 'error' ? 'text-red-400' :
                        log.type === 'success' ? 'text-green-400' :
                          log.type === 'warning' ? 'text-yellow-400' :
                            'text-gray-400'
                        }`}
                    >
                      <span className="text-gray-600">[{log.time}]</span> {log.message}
                    </div>
                  ))
                )}
              </div>

              {/* Error in modal */}
              {error && (
                <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  <Button
                    onClick={() => {
                      setInstallingTheme(null);
                      setError(null);
                      setProgress(0);
                      setInstallLogs([]);
                    }}
                    className="mt-2"
                    size="sm"
                  >
                    {t('warning.cancel')}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Grid */}
      {themes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Palette className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('noThemes')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('noThemesDescription')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  {theme.thumbnail ? (
                    <Image
                      src={theme.thumbnail}
                      alt={theme.name}
                      fill
                      className="object-cover rounded-t-lg"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMUMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQADAQEBAAAAAAAAAAAAAAAAAQIDBBH/2gAMAwEAAhEDEEA/ALLRr3UZOoNPi1bUPMEV7MvjxrGqoq7CFGdoycD3jPJNWlFMNNFCJL5sz//Z"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-t-lg flex items-center justify-center">
                      <Palette className="w-16 h-16 text-primary-400" />
                    </div>
                  )}
                  {installingTheme === theme.id && (
                    <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{getThemeTranslation('name', theme.name, theme.name)}</CardTitle>
                  <CardDescription>{getThemeTranslation('description', theme.name, theme.description)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t('category')}: {theme.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t('version', { version: theme.version })}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleThemeInstall(theme.id)}
                      disabled={installingTheme !== null || showWarning !== null}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('install')}
                    </Button>
                    <Button
                      variant="outline"
                      disabled={installingTheme !== null}
                      onClick={() => handlePreview(theme.id)}
                      title={t('preview')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
