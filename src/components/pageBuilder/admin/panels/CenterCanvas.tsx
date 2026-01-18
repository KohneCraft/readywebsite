'use client';

// ============================================
// Vav Yapı - Page Builder Center Canvas
// Ana düzenleme alanı - Section'ları gösterir
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SectionEditor } from '../components/SectionEditor';
import { getSectionById } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';
import type { Page, Section, Column, Block } from '@/types/pageBuilder';

interface CenterCanvasProps {
  page: Page;
  device: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  selectedElement: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null;
  onSelectElement: (element: { type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null) => void;
  onMoveSection?: (sectionId: string, direction: 'up' | 'down') => Promise<void>;
  onDuplicateSection?: (sectionId: string) => Promise<void>;
  onDeleteSection?: (sectionId: string) => Promise<void>;
  // Pending updates for live preview
  pendingSectionUpdates?: Record<string, Partial<Section>>;
  pendingColumnUpdates?: Record<string, Partial<Column>>;
  pendingBlockUpdates?: Record<string, Partial<Block>>;
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
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
  pendingSectionUpdates = {},
  pendingColumnUpdates = {},
  pendingBlockUpdates = {},
}: CenterCanvasProps) {
  const [baseSections, setBaseSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  // Section'ları yükle
  useEffect(() => {
    async function loadSections() {
      if (!page.sections || page.sections.length === 0) {
        setBaseSections([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const sectionPromises = page.sections.map(sectionId => getSectionById(sectionId));
        const loadedSections = await Promise.all(sectionPromises);
        setBaseSections(loadedSections.filter(Boolean) as Section[]);
      } catch (error) {
        logger.pageBuilder.error('Section yükleme hatası', error);
        setBaseSections([]);
      } finally {
        setLoading(false);
      }
    }

    loadSections();

    // Section güncelleme event'ini dinle
    const handleSectionUpdate = async (event: Event) => {
      const customEvent = event as CustomEvent<{ sectionId: string }>;
      const { sectionId } = customEvent.detail;
      try {
        const updatedSection = await getSectionById(sectionId);
        if (updatedSection) {
          setBaseSections(prev => prev.map(s => s.id === sectionId ? updatedSection : s));
        }
      } catch (error) {
        logger.pageBuilder.error('Section güncelleme hatası', error);
      }
    };

    window.addEventListener('section-updated', handleSectionUpdate);
    return () => {
      window.removeEventListener('section-updated', handleSectionUpdate);
    };
  }, [page.sections]);

  // Pending updates'i merge ederek live preview sections oluştur
  // Not: columns string array (ID'ler) olduğu için column/block merge SectionEditor'da yapılacak
  const sections = useMemo(() => {
    return baseSections.map(section => {
      // Section'a pending updates uygula
      if (pendingSectionUpdates[section.id]) {
        return { ...section, ...pendingSectionUpdates[section.id] };
      }
      return section;
    });
  }, [baseSections, pendingSectionUpdates]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
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
              <div className="space-y-4">
                {/* Section'ları rowOrder'a göre grupla */}
                {(() => {
                  // Section'ları rowOrder'a göre grupla
                  const rows = sections.reduce((acc, section) => {
                    const rowOrder = section.rowOrder ?? section.order ?? 0;
                    if (!acc[rowOrder]) acc[rowOrder] = [];
                    acc[rowOrder].push(section);
                    return acc;
                  }, {} as Record<number, typeof sections>);

                  // Her row'u columnOrder'a göre sırala
                  Object.keys(rows).forEach(rowKey => {
                    rows[Number(rowKey)].sort((a, b) => (a.columnOrder ?? 0) - (b.columnOrder ?? 0));
                  });

                  // Row'ları sıralı render et
                  return Object.keys(rows)
                    .map(Number)
                    .sort((a, b) => a - b)
                    .map(rowOrder => (
                      <div
                        key={`row-${rowOrder}`}
                        className="flex gap-4"
                        style={{ minHeight: '100px' }}
                      >
                        {rows[rowOrder].map((section, index) => (
                          <div key={section.id} className="flex-1">
                            <SectionEditor
                              section={section}
                              index={index}
                              isSelected={selectedElement?.type === 'section' && selectedElement.id === section.id}
                              onSelect={() => onSelectElement({ type: 'section', id: section.id })}
                              selectedElement={selectedElement}
                              onSelectElement={onSelectElement}
                              onMove={onMoveSection}
                              onDuplicate={onDuplicateSection}
                              onDelete={onDeleteSection}
                              pendingColumnUpdates={pendingColumnUpdates}
                              pendingBlockUpdates={pendingBlockUpdates}
                            />
                          </div>
                        ))}
                      </div>
                    ));
                })()}
              </div>
            ) : (
              <EmptyCanvas
                onAddSection={() => {
                  // Window event dispatch et - PageBuilderEditor dinliyor
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('add-section'));
                  }
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

