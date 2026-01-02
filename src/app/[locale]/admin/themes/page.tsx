'use client';

// ============================================
// Page Builder - Theme Selector Page
// Tema seçim ve yükleme sayfası
// ============================================

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
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
import type { Locale } from '@/i18n';
import type { ThemePreview } from '@/types/theme';

export default function ThemesPage() {
  const locale = useLocale() as Locale;
  
  const [themes, setThemes] = useState<ThemePreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [installingTheme, setInstallingTheme] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Önce varsayılan temaları hazırla (Firebase bağlantısı olmasa bile)
      const defaultThemes = getDefaultThemes();
      console.log('📦 Varsayılan temalar yüklendi:', defaultThemes.map(t => t.metadata.name));
      const defaultThemesPreview: ThemePreview[] = defaultThemes.map(t => ({
        id: t.metadata.id,
        name: t.metadata.name,
        description: t.metadata.description,
        thumbnail: t.metadata.thumbnail,
        category: t.metadata.category,
        version: t.metadata.version,
      }));
      console.log('📋 Tema preview listesi:', defaultThemesPreview.map(t => t.name));
      
      // Firebase'den temaları çekmeyi dene (timeout ile)
      try {
        const timeoutPromise = new Promise<ThemePreview[]>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        const themesPromise = getAvailableThemes();
        const availableThemes = await Promise.race([themesPromise, timeoutPromise]);
        
        // Firebase'den gelen temaları varsayılan temalarla birleştir
        // Eğer bir tema Firebase'de varsa onu kullan, yoksa varsayılan temadan al
        const mergedThemes: ThemePreview[] = defaultThemesPreview.map(defaultTheme => {
          // Firebase'de bu tema var mı kontrol et (ID veya name ile eşleştir)
          const firestoreTheme = availableThemes.find(ft => {
            // ID ile eşleştir
            if (ft.id === defaultTheme.id) return true;
            // Name ile eşleştir (büyük/küçük harf duyarsız)
            const defaultName = defaultTheme.name.toLowerCase().trim();
            const firestoreName = ft.name.toLowerCase().trim();
            if (defaultName === firestoreName) return true;
            return false;
          });
          
          // Firebase'de varsa onu kullan, yoksa varsayılan temayı kullan
          return firestoreTheme || defaultTheme;
        });
        
        console.log('🔀 Birleştirilmiş temalar:', mergedThemes.map(t => t.name));
        setThemes(mergedThemes);
        
        // Arka planda eksik temaları Firestore'a kaydetmeyi dene
        if (availableThemes.length < defaultThemesPreview.length) {
          // Firebase'de olmayan temaları bul ve kaydet
          const missingThemes = defaultThemes.filter(defaultTheme => {
            return !availableThemes.some(ft => {
              const defaultName = defaultTheme.metadata.name.toLowerCase().trim();
              const firestoreName = ft.name.toLowerCase().trim();
              return defaultName === firestoreName || ft.id === defaultTheme.metadata.id;
            });
          });
          
          if (missingThemes.length > 0) {
            console.log('📝 Eksik temalar Firestore\'a kaydediliyor:', missingThemes.map(t => t.metadata.name));
            Promise.all(
              missingThemes.map(themeData => createTheme(themeData.metadata))
            ).catch(() => {
              console.warn('Bazı temalar Firestore\'a kaydedilemedi');
            });
          }
        }
      } catch (firestoreError: any) {
        // Firebase bağlantısı yoksa veya timeout olursa varsayılan temaları göster
        console.warn('Firebase bağlantısı yok veya timeout, varsayılan temalar kullanılıyor:', firestoreError?.message);
        setThemes(defaultThemesPreview);
      }
    } catch (error) {
      console.error('Temalar yüklenemedi:', error);
      setError('Temalar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
      // Hata durumunda da varsayılan temaları göster
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
  };

  const handleThemeInstall = async (themeIdOrName: string) => {
    // Tema ID veya name'i sakla (eşleştirme için)
    setShowWarning(themeIdOrName);
  };

  const confirmThemeInstall = async (themeId: string) => {
    try {
      setInstallingTheme(themeId);
      setError(null);
      setSuccess(null);
      setShowWarning(null);

      // Kullanıcı bilgisini al (geçici session veya Firebase auth)
      let userId: string | null = null;
      
      // Önce geçici session kontrolü
      const tempSession = localStorage.getItem('temp_admin_session');
      if (tempSession) {
        const session = JSON.parse(tempSession);
        userId = session.id || 'temp-admin-001';
      } else {
        // Firebase auth kontrolü
        const user = getCurrentUser();
        if (user) {
          userId = user.uid;
        }
      }
      
      if (!userId) {
        throw new Error('Kullanıcı bulunamadı. Lütfen giriş yapın.');
      }

      // 1. Mevcut temayı sil (tüm sayfalar, section'lar, column'lar, block'lar)
      await deleteCurrentTheme();

      // 2. Yeni tema verilerini getir (her zaman varsayılan temalardan)
      // Firestore'da sadece metadata var, pages verileri yok
      const defaultThemes = getDefaultThemes();
      
      // Önce ID ile eşleştirmeyi dene
      let themeToInstall = defaultThemes.find(t => t.metadata.id === themeId);
      
      // Eğer ID ile bulunamazsa, Firestore'dan tema bilgisini al ve name ile eşleştir
      if (!themeToInstall) {
        try {
          const firestoreThemes = await getAvailableThemes();
          const foundFirestoreTheme = firestoreThemes.find(t => t.id === themeId);
          
          if (foundFirestoreTheme) {
            console.log('Firestore tema bulundu:', foundFirestoreTheme);
            // Name ile eşleştir (tam eşleşme veya kısmi eşleşme)
            themeToInstall = defaultThemes.find(t => {
              const defaultName = t.metadata.name.toLowerCase().trim();
              const firestoreName = foundFirestoreTheme.name.toLowerCase().trim();
              
              // Tam eşleşme
              if (defaultName === firestoreName) return true;
              
              // Kısmi eşleşme (örneğin "Modern Business" vs "Modern Business")
              if (defaultName.includes(firestoreName) || firestoreName.includes(defaultName)) {
                return true;
              }
              
              // ID'den name çıkar (theme-modern -> Modern Business)
              const idBasedName = themeId.toLowerCase().replace('theme-', '').replace(/-/g, ' ');
              if (defaultName.includes(idBasedName) || idBasedName.includes(defaultName.split(' ')[0])) {
                return true;
              }
              
              return false;
            });
            
            if (themeToInstall) {
              console.log('Tema eşleştirildi:', themeToInstall.metadata.name, '->', foundFirestoreTheme.name);
            }
          }
        } catch (error) {
          console.warn('Firestore\'dan tema bilgisi alınamadı:', error);
          // Firestore hatası olsa bile varsayılan temalardan name ile eşleştirmeyi dene
          const themeNameFromId = themeId.toLowerCase().replace(/^[a-z0-9-]+-/, '').replace(/-/g, ' ');
          themeToInstall = defaultThemes.find(t => {
            const defaultName = t.metadata.name.toLowerCase();
            return defaultName.includes(themeNameFromId) || themeNameFromId.includes(defaultName.split(' ')[0]);
          });
        }
      }
      
      // Hala bulunamazsa, tüm temaları listele ve hata ver
      if (!themeToInstall) {
        console.error('Tema bulunamadı. Aranan ID:', themeId);
        console.error('Mevcut varsayılan temalar:', defaultThemes.map(t => ({ id: t.metadata.id, name: t.metadata.name })));
        throw new Error(`Tema verileri bulunamadı. Tema ID: ${themeId}. Lütfen sayfayı yenileyin ve tekrar deneyin.`);
      }
      
      const themeData = themeToInstall;
      console.log('✓ Yüklenecek tema bulundu:', themeData.metadata.name, `(ID: ${themeData.metadata.id})`);

      // 3. Tema yükle - Tüm sayfaları oluştur
      await installTheme(themeData, userId);

      setSuccess('Tema başarıyla yüklendi! Sayfalar oluşturuluyor...');
      
      // 4. Sayfayı yenile
      setTimeout(() => {
        window.location.href = locale === 'tr' ? '/admin/page-builder' : `/${locale}/admin/page-builder`;
      }, 2000);
    } catch (error: any) {
      console.error('Tema yükleme hatası:', error);
      setError(error.message || 'Tema yüklenirken bir hata oluştu');
    } finally {
      setInstallingTheme(null);
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Palette className="w-8 h-8" />
          Tema Seç
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hazır temalardan birini seçerek hızlıca başlayın. Tema yüklendikten sonra istediğiniz gibi özelleştirebilirsiniz.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </motion.div>
      )}

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

      {showWarning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                ⚠️ Dikkat!
              </h3>
              <p className="text-yellow-800 dark:text-yellow-300 mb-4">
                Yeni bir tema yüklemek, <strong>mevcut tüm sayfa ve içeriklerinizi silecektir</strong>.
              </p>
              <p className="text-yellow-800 dark:text-yellow-300 mb-4">
                Bu işlem geri alınamaz!
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowWarning(null)}
              variant="outline"
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              onClick={() => confirmThemeInstall(showWarning)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={installingTheme !== null}
            >
              {installingTheme === showWarning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Yükleniyor...
                </>
              ) : (
                'Anladım, Devam Et'
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {themes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Palette className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Henüz tema yok
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Şu anda yüklenebilecek hazır tema bulunmuyor.
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
                <div className="relative">
                  {theme.thumbnail ? (
                    <img
                      src={theme.thumbnail}
                      alt={theme.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-t-lg flex items-center justify-center">
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
                  <CardTitle>{theme.name}</CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Kategori: {theme.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      v{theme.version}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleThemeInstall(theme.id)}
                      disabled={installingTheme !== null || showWarning !== null}
                      className="flex-1"
                      title={`Tema ID: ${theme.id}, Name: ${theme.name}`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Yükle
                    </Button>
                    <Button
                      variant="outline"
                      disabled={installingTheme !== null}
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

