'use client';

// ============================================
// Vav Yapı - Page Builder Center Canvas
// Ana düzenleme alanı - Section'ları gösterir
// ============================================

import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SectionEditor } from '../components/SectionEditor';
import { getSectionById } from '@/lib/firebase/firestore';
import { cn } from '@/lib/utils';
import type { Page, Section } from '@/types/pageBuilder';

interface CenterCanvasProps {
  page: Page;
  device: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  selectedElement: { type: 'section' | 'column' | 'block'; id: string } | null;
  onSelectElement: (element: { type: 'section' | 'column' | 'block'; id: string } | null) => void;
}

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export function CenterCanvas({
  page,
  device,
  zoom,
  selectedElement,
  onSelectElement,
}: CenterCanvasProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  // Section'ları yükle
  useEffect(() => {
    async function loadSections() {
      if (!page.sections || page.sections.length === 0) {
        setSections([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const sectionPromises = page.sections.map(sectionId => getSectionById(sectionId));
        const loadedSections = await Promise.all(sectionPromises);
        setSections(loadedSections.filter(Boolean) as Section[]);
      } catch (error) {
        console.error('Section yükleme hatası:', error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    }

    loadSections();
  }, [page.sections]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Canvas Toolbar */}
      <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center px-4">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {device === 'desktop' ? 'Masaüstü Görünümü' : device === 'tablet' ? 'Tablet Görünümü' : 'Mobil Görünümü'}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto" style={{ width: deviceWidths[device] }}>
          <div
            className="bg-white dark:bg-gray-800 shadow-xl min-h-screen"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Yükleniyor...</p>
                </div>
              </div>
            ) : sections.length > 0 ? (
              sections.map((section, index) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  index={index}
                  isSelected={selectedElement?.type === 'section' && selectedElement.id === section.id}
                  onSelect={() => onSelectElement({ type: 'section', id: section.id })}
                />
              ))
            ) : (
              <EmptyCanvas
                onAddSection={() => {
                  // Yeni section ekleme işlemi
                  console.log('Yeni section ekle');
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCanvas({ onAddSection }: { onAddSection: () => void }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'empty-canvas',
    data: { type: 'canvas' },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'min-h-screen flex items-center justify-center p-12 border-2 border-dashed transition-colors',
        isOver
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50'
      )}
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Boş Sayfa
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Sol panelden blokları sürükleyerek başlayın veya yeni bir section ekleyin.
        </p>
        <button
          onClick={onAddSection}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          İlk Section'ı Ekle
        </button>
      </div>
    </div>
  );
}

