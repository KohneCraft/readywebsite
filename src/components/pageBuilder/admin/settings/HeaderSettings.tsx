'use client';

// ============================================
// Page Builder - Header Settings
// Navbar düzenleme componenti
// ============================================

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentUser } from '@/lib/firebase/auth';
import { updateActiveThemeSettings } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from '@/components/providers';
import type { ThemeSettings } from '@/types/theme';

interface HeaderSettingsProps {
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate?: (() => void) | ((updates: any) => void);
}

export function HeaderSettings({ activeTab, onUpdate }: HeaderSettingsProps) {
  const { themeSettings, currentTheme, setCurrentTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [headerConfig, setHeaderConfig] = useState(themeSettings?.header || {
    logo: '',
    logoText: 'Page Builder',
    navItems: [{ href: '/', label: 'Ana Sayfa' }],
    backgroundColor: '#FFFFFF',
    textColor: '#1a1a1a',
  });

  useEffect(() => {
    if (themeSettings?.header) {
      setHeaderConfig(themeSettings.header);
    }
  }, [themeSettings]);

  const handleSave = async () => {
    if (!currentTheme) return;
    
    try {
      setLoading(true);
      const user = getCurrentUser();
      if (!user) {
        toast.error('Giriş yapmanız gerekiyor');
        return;
      }

      // Tema ayarlarını güncelle
      const updatedSettings: ThemeSettings = {
        ...currentTheme.metadata.settings,
        header: headerConfig,
      };

      // Firestore'a kaydet (aktif tema adına göre)
      await updateActiveThemeSettings(currentTheme.metadata.name, {
        header: headerConfig,
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
      toast.success('Header ayarları kaydedildi');
    } catch (error) {
      logger.theme.error('Header ayarları kaydedilirken hata', error);
      toast.error('Header ayarları kaydedilemedi');
    } finally {
      setLoading(false);
    }
  };

  const addNavItem = () => {
    setHeaderConfig({
      ...headerConfig,
      navItems: [...(headerConfig.navItems || []), { href: '/', label: 'Yeni Link' }],
    });
  };

  const removeNavItem = (index: number) => {
    const newNavItems = [...(headerConfig.navItems || [])];
    newNavItems.splice(index, 1);
    setHeaderConfig({
      ...headerConfig,
      navItems: newNavItems,
    });
  };

  const updateNavItem = (index: number, field: 'href' | 'label', value: string) => {
    const newNavItems = [...(headerConfig.navItems || [])];
    newNavItems[index] = { ...newNavItems[index], [field]: value };
    setHeaderConfig({
      ...headerConfig,
      navItems: newNavItems,
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
            value={headerConfig.logo || ''}
            onChange={(e) => setHeaderConfig({ ...headerConfig, logo: e.target.value })}
            placeholder="/logo.svg"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Logo Metni
          </label>
          <Input
            type="text"
            value={headerConfig.logoText || ''}
            onChange={(e) => setHeaderConfig({ ...headerConfig, logoText: e.target.value })}
            placeholder="Page Builder"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arka Plan Rengi
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={headerConfig.backgroundColor || '#FFFFFF'}
              onChange={(e) => setHeaderConfig({ ...headerConfig, backgroundColor: e.target.value.toUpperCase() })}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={headerConfig.backgroundColor || '#FFFFFF'}
              onChange={(e) => setHeaderConfig({ ...headerConfig, backgroundColor: e.target.value.toUpperCase() })}
              placeholder="#FFFFFF"
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
              value={headerConfig.textColor || '#1a1a1a'}
              onChange={(e) => setHeaderConfig({ ...headerConfig, textColor: e.target.value })}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={headerConfig.textColor || '#1a1a1a'}
              onChange={(e) => setHeaderConfig({ ...headerConfig, textColor: e.target.value })}
              placeholder="#1a1a1a"
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Navigasyon Linkleri
          </label>
          <Button
            size="sm"
            variant="outline"
            onClick={addNavItem}
          >
            + Ekle
          </Button>
        </div>

        <div className="space-y-3">
          {headerConfig.navItems?.map((item, index) => (
            <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Link {index + 1}</span>
                <button
                  onClick={() => removeNavItem(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Sil
                </button>
              </div>
              <Input
                type="text"
                value={item.href}
                onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                placeholder="/"
                className="text-sm"
              />
              <Input
                type="text"
                value={item.label}
                onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                placeholder="Link Metni"
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Sticky Header
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={headerConfig.sticky !== false}
            onChange={(e) => setHeaderConfig({ ...headerConfig, sticky: e.target.checked })}
            className="rounded"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Sayfa kaydırıldığında header sabit kalsın
          </span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Şeffaf Header
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={headerConfig.transparent === true}
            onChange={(e) => setHeaderConfig({ ...headerConfig, transparent: e.target.checked })}
            className="rounded"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Header şeffaf olsun
          </span>
        </label>
      </div>

      <Button
        onClick={handleSave}
        disabled={loading}
        className="w-full"
        variant="primary"
      >
        {loading ? 'Kaydediliyor...' : 'Header Ayarlarını Kaydet'}
      </Button>
    </div>
  );
}

