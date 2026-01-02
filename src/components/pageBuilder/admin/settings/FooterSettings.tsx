'use client';

// ============================================
// Page Builder - Footer Settings
// Footer düzenleme componenti
// ============================================

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentUser } from '@/lib/firebase/auth';
import { updateActiveThemeSettings } from '@/lib/firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { ThemeSettings } from '@/types/theme';

interface FooterSettingsProps {
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate?: (() => void) | ((updates: any) => void);
}

export function FooterSettings({ activeTab, onUpdate }: FooterSettingsProps) {
  const { themeSettings, currentTheme, setCurrentTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [footerConfig, setFooterConfig] = useState(themeSettings?.footer || {
    logo: '',
    logoText: 'Page Builder',
    description: 'Kod bilgisi olmadan profesyonel web sayfaları oluşturun.',
    quickLinks: [{ href: '/', label: 'Ana Sayfa' }],
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
    ],
    copyright: '© 2026 Page Builder. Tüm hakları saklıdır.',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
  });

  useEffect(() => {
    if (themeSettings?.footer) {
      setFooterConfig(themeSettings.footer);
    }
  }, [themeSettings]);

  const handleSave = async () => {
    if (!currentTheme) return;
    
    try {
      setLoading(true);
      const user = getCurrentUser();
      if (!user) {
        alert('Giriş yapmanız gerekiyor');
        return;
      }

      // Tema ayarlarını güncelle
      const updatedSettings: ThemeSettings = {
        ...currentTheme.metadata.settings,
        footer: footerConfig,
      };

      // Firestore'a kaydet
      await updateActiveThemeSettings({
        footer: footerConfig,
      });

      // Context'i güncelle
      if (setCurrentTheme) {
        setCurrentTheme({
          ...currentTheme,
          metadata: {
            ...currentTheme.metadata,
            settings: updatedSettings,
          },
        });
      }

      // Tema güncelleme event'i gönder (diğer component'ler için)
      window.dispatchEvent(new CustomEvent('theme-updated'));

      if (onUpdate) {
        if (onUpdate.length === 0) {
          (onUpdate as () => void)();
        } else {
          (onUpdate as (updates: any) => void)({});
        }
      }
      alert('Footer ayarları kaydedildi. Sayfayı yenileyin.');
    } catch (error) {
      console.error('Footer ayarları kaydedilirken hata:', error);
      alert('Footer ayarları kaydedilemedi');
    } finally {
      setLoading(false);
    }
  };

  const addQuickLink = () => {
    setFooterConfig({
      ...footerConfig,
      quickLinks: [...(footerConfig.quickLinks || []), { href: '/', label: 'Yeni Link' }],
    });
  };

  const removeQuickLink = (index: number) => {
    const newLinks = [...(footerConfig.quickLinks || [])];
    newLinks.splice(index, 1);
    setFooterConfig({
      ...footerConfig,
      quickLinks: newLinks,
    });
  };

  const updateQuickLink = (index: number, field: 'href' | 'label', value: string) => {
    const newLinks = [...(footerConfig.quickLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooterConfig({
      ...footerConfig,
      quickLinks: newLinks,
    });
  };

  const addSocialLink = () => {
    setFooterConfig({
      ...footerConfig,
      socialLinks: [...(footerConfig.socialLinks || []), { platform: 'facebook', url: 'https://facebook.com' }],
    });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = [...(footerConfig.socialLinks || [])];
    newLinks.splice(index, 1);
    setFooterConfig({
      ...footerConfig,
      socialLinks: newLinks,
    });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...(footerConfig.socialLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooterConfig({
      ...footerConfig,
      socialLinks: newLinks,
    });
  };

  if (activeTab === 'style') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Logo URL
          </label>
          <Input
            type="text"
            value={footerConfig.logo || ''}
            onChange={(e) => setFooterConfig({ ...footerConfig, logo: e.target.value })}
            placeholder="/logo.svg"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Logo Metni
          </label>
          <Input
            type="text"
            value={footerConfig.logoText || ''}
            onChange={(e) => setFooterConfig({ ...footerConfig, logoText: e.target.value })}
            placeholder="Page Builder"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Açıklama
          </label>
          <textarea
            value={footerConfig.description || ''}
            onChange={(e) => setFooterConfig({ ...footerConfig, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            placeholder="Footer açıklaması"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arka Plan Rengi
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={footerConfig.backgroundColor || '#1a1a1a'}
              onChange={(e) => setFooterConfig({ ...footerConfig, backgroundColor: e.target.value })}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={footerConfig.backgroundColor || '#1a1a1a'}
              onChange={(e) => setFooterConfig({ ...footerConfig, backgroundColor: e.target.value })}
              placeholder="#1a1a1a"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Metin Rengi
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={footerConfig.textColor || '#ffffff'}
              onChange={(e) => setFooterConfig({ ...footerConfig, textColor: e.target.value })}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={footerConfig.textColor || '#ffffff'}
              onChange={(e) => setFooterConfig({ ...footerConfig, textColor: e.target.value })}
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="space-y-6">
        {/* Quick Links */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Hızlı Bağlantılar
            </label>
            <Button
              size="sm"
              variant="outline"
              onClick={addQuickLink}
            >
              + Ekle
            </Button>
          </div>

          <div className="space-y-3">
            {footerConfig.quickLinks?.map((link, index) => (
              <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Link {index + 1}</span>
                  <button
                    onClick={() => removeQuickLink(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Sil
                  </button>
                </div>
                <Input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                  placeholder="/"
                  className="text-sm"
                />
                <Input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                  placeholder="Link Metni"
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Sosyal Medya Linkleri
            </label>
            <Button
              size="sm"
              variant="outline"
              onClick={addSocialLink}
            >
              + Ekle
            </Button>
          </div>

          <div className="space-y-3">
            {footerConfig.socialLinks?.map((social, index) => (
              <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Sosyal Medya {index + 1}</span>
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Sil
                  </button>
                </div>
                <select
                  value={social.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="twitter">Twitter</option>
                  <option value="github">GitHub</option>
                </select>
                <Input
                  type="text"
                  value={social.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Copyright Metni
        </label>
        <Input
          type="text"
          value={footerConfig.copyright || ''}
          onChange={(e) => setFooterConfig({ ...footerConfig, copyright: e.target.value })}
          placeholder="© 2026 Page Builder. Tüm hakları saklıdır."
        />
      </div>

      <Button
        onClick={handleSave}
        disabled={loading}
        className="w-full"
        variant="primary"
      >
        {loading ? 'Kaydediliyor...' : 'Footer Ayarlarını Kaydet'}
      </Button>
    </div>
  );
}

