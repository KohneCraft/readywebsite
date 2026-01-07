'use client';

// ============================================
// Vav Yapı - Page Builder Left Panel
// Blok kütüphanesi - sürüklenebilir bloklar
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlockType } from '@/types/pageBuilder';

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
  
  // Form Blokları
  { type: 'form', icon: Mail, label: 'Form', description: 'İletişim formu', category: 'form' },
  
  // Gelişmiş Bloklar
  { type: 'map', icon: MapPin, label: 'Harita', description: 'Google Maps', category: 'advanced' },
  { type: 'html', icon: Code, label: 'HTML', description: 'Özel HTML kodu', category: 'advanced' },
];

const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'basic', label: 'Temel' },
  { id: 'media', label: 'Medya' },
  { id: 'form', label: 'Form' },
  { id: 'advanced', label: 'Gelişmiş' },
];

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

export function LeftPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtreleme
  const filteredBlocks = blockLibrary.filter(block => {
    const matchesSearch = block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full flex flex-col">
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
            // Bu fonksiyon PageBuilderEditor'dan prop olarak gelecek
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
    </div>
  );
}

