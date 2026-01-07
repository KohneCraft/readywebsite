'use client';

import { useState } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { PageElement, ElementSettings as ElementSettingsType, ElementWidth, Breakpoint } from '@/types';

interface ElementSettingsProps {
  element: PageElement;
  onSave: (element: PageElement) => void;
  onClose: () => void;
}

const WIDTH_OPTIONS: { value: ElementWidth; label: string }[] = [
  { value: 'full', label: 'Tam Genişlik' },
  { value: 'three-quarters', label: '3/4' },
  { value: 'two-thirds', label: '2/3' },
  { value: 'half', label: '1/2' },
  { value: 'third', label: '1/3' },
  { value: 'quarter', label: '1/4' },
];

const SHADOW_OPTIONS = [
  { value: 'none', label: 'Yok' },
  { value: 'sm', label: 'Küçük' },
  { value: 'md', label: 'Orta' },
  { value: 'lg', label: 'Büyük' },
  { value: 'xl', label: 'Ekstra Büyük' },
];

export function ElementSettings({ element, onSave, onClose }: ElementSettingsProps) {
  const [settings, setSettings] = useState<ElementSettingsType>(element.settings);
  const [label, setLabel] = useState(element.label);
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('desktop');

  const handleSave = () => {
    onSave({
      ...element,
      label,
      settings,
    });
    onClose();
  };

  const updateSpacing = (
    type: 'margin' | 'padding',
    side: 'top' | 'right' | 'bottom' | 'left',
    value: number
  ) => {
    setSettings({
      ...settings,
      [type]: {
        ...settings[type],
        [side]: value,
      },
    });
  };

  const updateResponsive = (
    breakpoint: Breakpoint,
    key: keyof typeof settings.responsive.desktop,
    value: boolean | string | number
  ) => {
    setSettings({
      ...settings,
      responsive: {
        ...settings.responsive,
        [breakpoint]: {
          ...settings.responsive[breakpoint],
          [key]: value,
        },
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Element Ayarları
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Element Adı
            </label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Element adı"
            />
          </div>

          {/* Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Genişlik
            </label>
            <div className="grid grid-cols-3 gap-2">
              {WIDTH_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSettings({ ...settings, width: option.value })}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    settings.width === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pozisyon
            </label>
            <div className="flex gap-2">
              {(['left', 'center', 'right'] as const).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setSettings({ ...settings, position: pos })}
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    settings.position === pos
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  {pos === 'left' ? 'Sol' : pos === 'center' ? 'Orta' : 'Sağ'}
                </button>
              ))}
            </div>
          </div>

          {/* Margin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dış Boşluk (Margin) - px
            </label>
            <div className="grid grid-cols-4 gap-3">
              {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <div key={side}>
                  <label className="block text-xs text-gray-500 mb-1 capitalize">
                    {side === 'top' ? 'Üst' : side === 'right' ? 'Sağ' : side === 'bottom' ? 'Alt' : 'Sol'}
                  </label>
                  <Input
                    type="number"
                    value={settings.margin[side]}
                    onChange={(e) => updateSpacing('margin', side, parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Padding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İç Boşluk (Padding) - px
            </label>
            <div className="grid grid-cols-4 gap-3">
              {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <div key={side}>
                  <label className="block text-xs text-gray-500 mb-1 capitalize">
                    {side === 'top' ? 'Üst' : side === 'right' ? 'Sağ' : side === 'bottom' ? 'Alt' : 'Sol'}
                  </label>
                  <Input
                    type="number"
                    value={settings.padding[side]}
                    onChange={(e) => updateSpacing('padding', side, parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Köşe Yuvarlaklığı - px
            </label>
            <Input
              type="number"
              value={settings.borderRadius || 0}
              onChange={(e) => setSettings({ ...settings, borderRadius: parseInt(e.target.value) || 0 })}
              min={0}
              max={50}
            />
          </div>

          {/* Shadow */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gölge
            </label>
            <div className="flex flex-wrap gap-2">
              {SHADOW_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSettings({ ...settings, shadow: option.value as typeof settings.shadow })}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    settings.shadow === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Responsive Ayarlar
            </label>
            
            {/* Breakpoint Tabs */}
            <div className="flex gap-2 mb-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {([
                { key: 'desktop' as Breakpoint, icon: Monitor, label: 'Masaüstü' },
                { key: 'tablet' as Breakpoint, icon: Tablet, label: 'Tablet' },
                { key: 'mobile' as Breakpoint, icon: Smartphone, label: 'Mobil' },
              ]).map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveBreakpoint(key)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    activeBreakpoint === key
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Breakpoint Settings */}
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Görünür</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.responsive[activeBreakpoint].visible}
                    onChange={(e) => updateResponsive(activeBreakpoint, 'visible', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Genişlik
                </label>
                <select
                  value={settings.responsive[activeBreakpoint].width}
                  onChange={(e) => updateResponsive(activeBreakpoint, 'width', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {WIDTH_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Sıra
                </label>
                <Input
                  type="number"
                  value={settings.responsive[activeBreakpoint].order}
                  onChange={(e) => updateResponsive(activeBreakpoint, 'order', parseInt(e.target.value) || 0)}
                  min={0}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}

