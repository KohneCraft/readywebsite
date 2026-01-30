'use client';

// ============================================
// Icon Settings Component
// Site favicon/icon seçme ve yükleme
// Bandwidth tasarrufu için boyut limitleri
// ============================================

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Image as ImageIcon, Upload, X, Info, Edit2 } from 'lucide-react';
import Image from 'next/image';
import { MediaSelector } from '../media/MediaSelector';
import { uploadMedia } from '@/lib/firebase/media';
import { validateFile } from '@/lib/firebase/storage';
import { getSiteSettingsClient, updateSiteSettings } from '@/lib/firebase/firestore';
import { getCurrentUser } from '@/lib/firebase/auth';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

interface IconSettingsProps {
  activeTab?: 'style' | 'settings' | 'advanced';
  onUpdate?: () => void;
}

export function IconSettings({ onUpdate }: IconSettingsProps) {
  const [iconUrl, setIconUrl] = useState<string>('');
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  
  // Admin panel başlık ve icon ayarları
  const [adminTitle, setAdminTitle] = useState<string>('Page Builder');
  const [adminIconUrl, setAdminIconUrl] = useState<string>('');
  const [isAdminIconSelectorOpen, setIsAdminIconSelectorOpen] = useState(false);

  useEffect(() => {
    loadIcon();
  }, []);

  const loadIcon = async () => {
    try {
      setIsLoading(true);
      const settings = await getSiteSettingsClient();
      const favicon = settings?.logo?.favicon?.url || '';
      setIconUrl(favicon);
      setManualUrl(favicon);
      
      // Admin panel ayarlarını yükle
      const adminTitle = settings?.adminTitle || 'Page Builder';
      const adminIcon = settings?.adminIcon || '';
      setAdminTitle(adminTitle);
      setAdminIconUrl(adminIcon);
    } catch (error) {
      logger.ui.error('Icon yükleme hatası', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaSelect = async (mediaUrl: string) => {
    setIconUrl(mediaUrl);
    setManualUrl(mediaUrl);
    setIsMediaSelectorOpen(false);
    await saveIcon(mediaUrl);
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsSaving(true);
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Lütfen giriş yapın');
        return;
      }

      // Favicon için özel validasyon - daha küçük boyut limiti
      const validation = validateFile(file, 'favicon', 'tr');
      
      if (!validation.valid) {
        toast.error(validation.error || 'Geçersiz dosya');
        setIsSaving(false);
        return;
      }
      
      if (validation.warning) {
        toast.warning ? toast.warning(validation.warning) : toast.error(`⚠️ ${validation.warning}`);
      }

      // Upload to Firebase Storage
      const uploadedMedia = await uploadMedia(file, 'image', user.uid);
      setIconUrl(uploadedMedia.url);
      setManualUrl(uploadedMedia.url);
      await saveIcon(uploadedMedia.url);
    } catch (error) {
      logger.ui.error('Icon yükleme hatası', error);
      toast.error('Icon yüklenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualUrlChange = (url: string) => {
    setManualUrl(url);
  };

  const handleManualUrlSave = async () => {
    if (manualUrl.trim()) {
      setIconUrl(manualUrl.trim());
      await saveIcon(manualUrl.trim());
    }
  };

  const saveIcon = async (url: string) => {
    try {
      setIsSaving(true);
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Lütfen giriş yapın');
        return;
      }
      await updateSiteSettings({ 
        logo: {
          light: { url: '', path: '', width: 200, height: 60 },
          dark: { url: '', path: '', width: 200, height: 60 },
          favicon: { url, path: url },
        }
      }, user.uid);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      logger.ui.error('Icon kaydetme hatası', error);
      toast.error('Icon kaydedilirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveIcon = async () => {
    if (confirm('Icon\'u kaldırmak istediğinize emin misiniz?')) {
      setIconUrl('');
      setManualUrl('');
      await saveIcon('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Icon Bilgilendirme */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
              Icon/Favicon Bilgileri
            </h4>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• <strong>Önerilen boyut:</strong> 32x32px veya 16x16px</li>
              <li>• <strong>Desteklenen formatlar:</strong> .ico, .png, .svg</li>
              <li>• <strong>Maksimum boyut:</strong> 100KB</li>
              <li>• <strong>Kare format:</strong> Icon'lar genellikle kare olmalıdır</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mevcut Icon Preview */}
      {iconUrl && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mevcut Icon
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 flex items-center justify-center">
              <Image
                src={iconUrl}
                alt="Site Icon"
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
              onClick={handleRemoveIcon}
              className="text-red-600 hover:text-red-700 hover:border-red-300"
            >
              <X className="w-4 h-4 mr-2" />
              Kaldır
            </Button>
          </div>
        </div>
      )}

      {/* Icon Seçme/Yükleme */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Icon Seç veya Yükle
        </label>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Medya Yöneticisinden Seç */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsMediaSelectorOpen(true)}
            className="w-full"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Medyadan Seç
          </Button>

          {/* Dosya Yükle */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".ico,.png,.svg,image/x-icon,image/png,image/svg+xml"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Dosya boyutu kontrolü (100KB)
                  if (file.size > 100 * 1024) {
                    toast.error('Dosya boyutu 100KB\'dan büyük olamaz');
                    return;
                  }
                  handleFileUpload(file);
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
      </div>

      {/* Manuel URL */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Veya URL Gir
        </label>
        <div className="flex gap-2">
          <Input
            type="url"
            value={manualUrl}
            onChange={(e) => handleManualUrlChange(e.target.value)}
            placeholder="https://example.com/favicon.ico"
            className="flex-1"
          />
          <Button
            type="button"
            variant="primary"
            onClick={handleManualUrlSave}
            disabled={!manualUrl.trim() || isSaving}
          >
            {isSaving ? <Spinner size="sm" /> : 'Kaydet'}
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Harici bir URL'den icon yüklemek için kullanın
        </p>
      </div>

      {/* Media Selector Modal */}
      {isMediaSelectorOpen && (
        <MediaSelector
          isOpen={isMediaSelectorOpen}
          onClose={() => setIsMediaSelectorOpen(false)}
          onSelect={(media) => handleMediaSelect(media.url)}
          type="image"
        />
      )}

      {/* Admin Panel Ayarları */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Edit2 className="w-4 h-4" />
          Admin Panel Ayarları
        </h3>
        
        {/* Admin Panel Başlık */}
        <div className="space-y-2 mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Admin Panel Başlığı
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={adminTitle}
              onChange={(e) => setAdminTitle(e.target.value)}
              placeholder="Page Builder"
              className="flex-1"
            />
            <Button
              type="button"
              variant="primary"
              onClick={async () => {
                try {
                  setIsSaving(true);
                  const user = await getCurrentUser();
                  if (!user) {
                    toast.error('Lütfen giriş yapın');
                    return;
                  }
                  await updateSiteSettings({ adminTitle }, user.uid);
                  // Sayfayı yenile
                  window.location.reload();
                } catch (error) {
                  logger.ui.error('Admin başlık kaydetme hatası', error);
                  toast.error('Başlık kaydedilirken bir hata oluştu');
                } finally {
                  setIsSaving(false);
                }
              }}
              disabled={!adminTitle.trim() || isSaving}
            >
              {isSaving ? <Spinner size="sm" /> : 'Kaydet'}
            </Button>
          </div>
        </div>

        {/* Admin Panel Icon */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Admin Panel Icon
          </label>
          
          {adminIconUrl && (
            <div className="flex items-center gap-4 mb-2">
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
                onClick={async () => {
                  if (confirm('Admin icon\'u kaldırmak istediğinize emin misiniz?')) {
                    try {
                      setIsSaving(true);
                      const user = await getCurrentUser();
                      if (!user) {
                        toast.error('Lütfen giriş yapın');
                        return;
                      }
                      setAdminIconUrl('');
                      await updateSiteSettings({ adminIcon: '' }, user.uid);
                      window.location.reload();
                    } catch (error) {
                      logger.ui.error('Admin icon kaldırma hatası', error);
                      toast.error('Icon kaldırılırken bir hata oluştu');
                    } finally {
                      setIsSaving(false);
                    }
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
              <ImageIcon className="w-4 h-4 mr-2" />
              Medyadan Seç
            </Button>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".ico,.png,.svg,image/x-icon,image/png,image/svg+xml"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 100 * 1024) {
                      toast.error('Dosya boyutu 100KB\'dan büyük olamaz');
                      return;
                    }
                    try {
                      setIsSaving(true);
                      const user = await getCurrentUser();
                      if (!user) {
                        toast.error('Lütfen giriş yapın');
                        return;
                      }
                      const uploadedMedia = await uploadMedia(file, 'image', user.uid);
                      setAdminIconUrl(uploadedMedia.url);
                      await updateSiteSettings({ adminIcon: uploadedMedia.url }, user.uid);
                      window.location.reload();
                    } catch (error) {
                      logger.ui.error('Admin icon yükleme hatası', error);
                      toast.error('Icon yüklenirken bir hata oluştu');
                    } finally {
                      setIsSaving(false);
                    }
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
        </div>
      </div>

      {/* Admin Icon Media Selector Modal */}
      {isAdminIconSelectorOpen && (
        <MediaSelector
          isOpen={isAdminIconSelectorOpen}
          onClose={() => setIsAdminIconSelectorOpen(false)}
          onSelect={async (media) => {
            try {
              setIsSaving(true);
              const user = await getCurrentUser();
              if (!user) {
                toast.error('Lütfen giriş yapın');
                return;
              }
              setAdminIconUrl(media.url);
              await updateSiteSettings({ adminIcon: media.url }, user.uid);
              setIsAdminIconSelectorOpen(false);
              window.location.reload();
            } catch (error) {
              logger.ui.error('Admin icon kaydetme hatası', error);
              toast.error('Icon kaydedilirken bir hata oluştu');
            } finally {
              setIsSaving(false);
            }
          }}
          type="image"
        />
      )}
    </div>
  );
}

