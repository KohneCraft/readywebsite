'use client';

// ============================================
// Vav Yapı - Page Builder Left Panel
// Blok kütüphanesi ve Sayfa Panelleri yönetimi
// ============================================

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  Type,
  Heading,
  Image,
  Video,
  MousePointer,
  Minus,
  Divide,
  Mail,
  MapPin,
  Code,
  Search,
  Plus,
  Columns,
  SlidersHorizontal,
  PanelRight,
  Layers,
  PanelTop,
  PanelBottom,
  PanelLeft,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlockType, Block } from '@/types/pageBuilder';

interface BlockLibraryItem {
  type: BlockType | 'column';
  icon: typeof Type;
  label: string;
  description: string;
  category: 'basic' | 'media' | 'form' | 'advanced';
}

const blockLibrary: BlockLibraryItem[] = [
  // Temel Bloklar
  { type: 'text', icon: Type, label: 'Metin', description: 'Metin içeriği ekle', category: 'basic' },
  { type: 'heading', icon: Heading, label: 'Başlık', description: 'Başlık ekle', category: 'basic' },
  { type: 'button', icon: MousePointer, label: 'Buton', description: 'Tıklanabilir buton', category: 'basic' },
  { type: 'spacer', icon: Minus, label: 'Boşluk', description: 'Dikey boşluk ekle', category: 'basic' },
  { type: 'divider', icon: Divide, label: 'Ayırıcı', description: 'Yatay çizgi', category: 'basic' },
  { type: 'column', icon: Columns, label: 'Kolon', description: 'Yeni kolon ekle', category: 'basic' },

  // Medya Blokları
  { type: 'image', icon: Image, label: 'Görsel', description: 'Resim ekle', category: 'media' },
  { type: 'video', icon: Video, label: 'Video', description: 'Video ekle', category: 'media' },
  { type: 'slider', icon: SlidersHorizontal, label: 'Slider', description: 'Resim/Video slider', category: 'media' },

  // Form Blokları
  { type: 'form', icon: Mail, label: 'Form', description: 'İletişim formu', category: 'form' },

  // Gelişmiş Bloklar
  { type: 'map', icon: MapPin, label: 'Harita', description: 'Google Maps', category: 'advanced' },
  { type: 'html', icon: Code, label: 'HTML', description: 'Özel HTML kodu', category: 'advanced' },
  { type: 'panel', icon: PanelRight, label: 'Panel', description: 'Section içine panel', category: 'advanced' },
];

const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'basic', label: 'Temel' },
  { id: 'media', label: 'Medya' },
  { id: 'form', label: 'Form' },
  { id: 'advanced', label: 'Gelişmiş' },
];

// Panel pozisyon ikonları
const panelPositionIcons = {
  right: PanelRight,
  left: PanelLeft,
  top: PanelTop,
  bottom: PanelBottom,
};

function DraggableBlock({ block }: { block: BlockLibraryItem }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${block.type}`,
    data: {
      type: block.type,
      source: 'library',
    },
  });

  const Icon = block.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
        'cursor-grab active:cursor-grabbing transition-all',
        'hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {block.label}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {block.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Global Panel Item Component
interface GlobalPanelItemProps {
  panel: Block;
  onSelect: () => void;
  onDelete: () => void;
  isSelected: boolean;
}

function GlobalPanelItem({ panel, onSelect, onDelete, isSelected }: GlobalPanelItemProps) {
  const position = panel.props?.panelPosition || 'right';
  const Icon = panelPositionIcons[position as keyof typeof panelPositionIcons] || PanelRight;

  const positionLabels = {
    right: 'Sağ Panel',
    left: 'Sol Panel',
    top: 'Üst Panel',
    bottom: 'Alt Panel',
  };

  return (
    <div
      className={cn(
        'p-3 rounded-lg border transition-all cursor-pointer',
        isSelected
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300'
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {positionLabels[position as keyof typeof positionLabels]}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {panel.props?.panelBlocks?.length || 0} blok
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Paneli Sil"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface LeftPanelProps {
  globalPanels?: Block[];
  onAddGlobalPanel?: (position: 'right' | 'left' | 'top' | 'bottom') => Promise<void>;
  onDeleteGlobalPanel?: (panelId: string) => Promise<void>;
  onSelectGlobalPanel?: (panelId: string) => void;
  selectedGlobalPanelId?: string;
}

export function LeftPanel({
  globalPanels = [],
  onAddGlobalPanel,
  onDeleteGlobalPanel,
  onSelectGlobalPanel,
  selectedGlobalPanelId,
}: LeftPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'blocks' | 'panels'>('blocks');
  const [isAddingPanel, setIsAddingPanel] = useState(false);

  // Filtreleme
  const filteredBlocks = blockLibrary.filter(block => {
    const matchesSearch = block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Panel ekleme
  const handleAddPanel = async (position: 'right' | 'left' | 'top' | 'bottom') => {
    if (!onAddGlobalPanel) return;
    setIsAddingPanel(true);
    try {
      await onAddGlobalPanel(position);
    } finally {
      setIsAddingPanel(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('blocks')}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2',
            activeTab === 'blocks'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          )}
        >
          <Layers className="w-4 h-4" />
          Bloklar
        </button>
        <button
          onClick={() => setActiveTab('panels')}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2',
            activeTab === 'panels'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          )}
        >
          <PanelRight className="w-4 h-4" />
          Sayfa Panelleri
        </button>
      </div>

      {/* Blocks Tab */}
      {activeTab === 'blocks' && (
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Bloklar
            </h3>

            {/* Arama */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Blok ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Kategoriler */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors',
                    selectedCategory === category.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Blok Listesi */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredBlocks.length > 0 ? (
              filteredBlocks.map(block => (
                <DraggableBlock key={block.type} block={block} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="text-sm">Blok bulunamadı</p>
              </div>
            )}
          </div>

          {/* Footer - Yeni Section Ekle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('add-section'));
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Yeni Section Ekle
            </button>
          </div>
        </>
      )}

      {/* Panels Tab */}
      {activeTab === 'panels' && (
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Sayfa Panelleri
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tüm section'ların üzerinde görünen sabit paneller
            </p>
          </div>

          {/* Panel Listesi */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {globalPanels.length > 0 ? (
              globalPanels.map(panel => (
                <GlobalPanelItem
                  key={panel.id}
                  panel={panel}
                  isSelected={selectedGlobalPanelId === panel.id}
                  onSelect={() => onSelectGlobalPanel?.(panel.id)}
                  onDelete={() => onDeleteGlobalPanel?.(panel.id)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
                  <PanelRight className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Panel bulunmuyor</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Aşağıdan yeni panel ekleyin
                </p>
              </div>
            )}
          </div>

          {/* Panel Ekleme Butonları */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Panel Ekle
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { position: 'right' as const, label: 'Sağ', icon: PanelRight },
                { position: 'left' as const, label: 'Sol', icon: PanelLeft },
                { position: 'top' as const, label: 'Üst', icon: PanelTop },
                { position: 'bottom' as const, label: 'Alt', icon: PanelBottom },
              ].map(({ position, label, icon: Icon }) => (
                <button
                  key={position}
                  onClick={() => handleAddPanel(position)}
                  disabled={isAddingPanel || !onAddGlobalPanel}
                  className={cn(
                    'flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
                    'hover:bg-purple-200 dark:hover:bg-purple-900/50',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {!onAddGlobalPanel && (
              <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                ⚠️ Panel eklemek için bir sayfa seçin
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
