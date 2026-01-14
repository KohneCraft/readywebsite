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
import { DualColorPicker } from '../controls/DualColorPicker';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import type { NavItem } from '@/types/theme';

interface HeaderSettingsProps {
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate?: (() => void) | ((updates: any) => void);
}

export function HeaderSettings({ activeTab, onUpdate }: HeaderSettingsProps) {
  const { themeSettings, currentTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]); // Açık alt menü indexleri
  const [headerConfig, setHeaderConfig] = useState<{
    logo?: string;
    logoText?: string;
    navItems?: NavItem[];
    backgroundColor?: string;
    backgroundColorDark?: string | 'auto';
    textColor?: string;
    textColorDark?: string | 'auto';
    sticky?: boolean;
    transparent?: boolean;
    hoverOpenMenu?: boolean;
  }>(themeSettings?.header || {
    logo: '',
    logoText: 'Page Builder',
    navItems: [{ href: '/', label: 'Ana Sayfa' }],
    backgroundColor: '#FFFFFF',
    backgroundColorDark: 'auto',
    textColor: '#1a1a1a',
    textColorDark: 'auto',
    hoverOpenMenu: true,
  });

  // ThemeSettings değiştiğinde formu güncelle
  useEffect(() => {
    if (themeSettings?.header) {
      setHeaderConfig(themeSettings.header);
    }
  }, [themeSettings]);

  const handleSave = async () => {
    if (!currentTheme) {
      toast.error('Tema yüklü değil. Lütfen önce bir tema yükleyin.');
      logger.theme.error('currentTheme undefined - tema yüklenmemiş');
      return;
    }

    try {
      setLoading(true);
      const user = getCurrentUser();
      if (!user) {
        toast.error('Giriş yapmanız gerekiyor');
        return;
      }

      logger.theme.debug('Header kaydediliyor...', {
        themeName: currentTheme.metadata.name,
        headerConfig,
      });

      // Firestore'a kaydet (aktif tema adına göre)
      await updateActiveThemeSettings(currentTheme.metadata.name, {
        header: headerConfig,
      });

      logger.theme.info('Header başarıyla kaydedildi');

      // Tema yeniden yükle ki değişiklikler sayfada görünsün
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
    // Silinen item'ı expanded listesinden çıkar
    setExpandedItems(prev => prev.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const updateNavItem = (index: number, field: 'href' | 'label', value: string) => {
    const newNavItems = [...(headerConfig.navItems || [])];
    newNavItems[index] = { ...newNavItems[index], [field]: value };
    setHeaderConfig({
      ...headerConfig,
      navItems: newNavItems,
    });
  };

  // Alt link ekleme
  const addChildItem = (parentIndex: number) => {
    const newNavItems = [...(headerConfig.navItems || [])];
    const parent = newNavItems[parentIndex];
    newNavItems[parentIndex] = {
      ...parent,
      children: [...(parent.children || []), { href: '/', label: 'Alt Link' }],
    };
    setHeaderConfig({ ...headerConfig, navItems: newNavItems });
    // Parent'ı expanded yap
    if (!expandedItems.includes(parentIndex)) {
      setExpandedItems([...expandedItems, parentIndex]);
    }
  };

  // Alt link silme
  const removeChildItem = (parentIndex: number, childIndex: number) => {
    const newNavItems = [...(headerConfig.navItems || [])];
    const parent = newNavItems[parentIndex];
    const newChildren = [...(parent.children || [])];
    newChildren.splice(childIndex, 1);
    newNavItems[parentIndex] = { ...parent, children: newChildren };
    setHeaderConfig({ ...headerConfig, navItems: newNavItems });
  };

  // Alt link güncelleme
  const updateChildItem = (parentIndex: number, childIndex: number, field: 'href' | 'label', value: string) => {
    const newNavItems = [...(headerConfig.navItems || [])];
    const parent = newNavItems[parentIndex];
    const newChildren = [...(parent.children || [])];
    newChildren[childIndex] = { ...newChildren[childIndex], [field]: value };
    newNavItems[parentIndex] = { ...parent, children: newChildren };
    setHeaderConfig({ ...headerConfig, navItems: newNavItems });
  };

  // Expanded toggle
  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
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
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arka Plan Rengi
          </label>
          <DualColorPicker
            lightColor={headerConfig.backgroundColor || '#FFFFFF'}
            darkColor={headerConfig.backgroundColorDark || 'auto'}
            onLightChange={(color) => setHeaderConfig({ ...headerConfig, backgroundColor: color })}
            onDarkChange={(colorDark) => setHeaderConfig({ ...headerConfig, backgroundColorDark: colorDark })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Metin Rengi
          </label>
          <DualColorPicker
            lightColor={headerConfig.textColor || '#1a1a1a'}
            darkColor={headerConfig.textColorDark || 'auto'}
            onLightChange={(color) => setHeaderConfig({ ...headerConfig, textColor: color })}
            onDarkChange={(colorDark) => setHeaderConfig({ ...headerConfig, textColorDark: colorDark })}
          />
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
            <Plus className="w-3 h-3 mr-1" /> Ekle
          </Button>
        </div>

        <div className="space-y-3">
          {headerConfig.navItems?.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Ana Link Başlığı */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.children && item.children.length > 0 && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        {expandedItems.includes(index) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    )}
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Link {index + 1}
                      {item.children && item.children.length > 0 && (
                        <span className="ml-1 text-gray-400">({item.children.length} alt link)</span>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => removeNavItem(index)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    title="Linki Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Ana Link URL ve Label */}
                <div className="space-y-2">
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

                {/* Alt Link Ekle Butonu */}
                <button
                  onClick={() => addChildItem(index)}
                  className="mt-2 flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  <Plus className="w-3 h-3" /> Alt Link Ekle
                </button>
              </div>

              {/* Alt Linkler (Accordion) */}
              {item.children && item.children.length > 0 && expandedItems.includes(index) && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-900/30 p-2 space-y-2">
                  {item.children.map((child, childIndex) => (
                    <div key={childIndex} className="flex items-start gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                      <div className="flex-1 space-y-1">
                        <Input
                          type="text"
                          value={child.href}
                          onChange={(e) => updateChildItem(index, childIndex, 'href', e.target.value)}
                          placeholder="/alt-sayfa"
                          className="text-xs h-8"
                        />
                        <Input
                          type="text"
                          value={child.label}
                          onChange={(e) => updateChildItem(index, childIndex, 'label', e.target.value)}
                          placeholder="Alt Link Metni"
                          className="text-xs h-8"
                        />
                      </div>
                      <button
                        onClick={() => removeChildItem(index, childIndex)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        title="Alt Linki Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Hover ile Menü Aç
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={headerConfig.hoverOpenMenu !== false}
            onChange={(e) => setHeaderConfig({ ...headerConfig, hoverOpenMenu: e.target.checked })}
            className="rounded"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Fareyi üzerine getirince menüyü otomatik aç
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

