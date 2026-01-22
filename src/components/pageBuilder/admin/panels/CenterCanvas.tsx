'use client';

// ============================================
// Vav Yapı - Page Builder Center Canvas
// Ana düzenleme alanı - Section'ları gösterir
// ============================================

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  // Canvas scroll offset bilgisi ve reset
  onScrollOffsetChange?: (hasOffset: boolean) => void;
  onResetScrollRef?: (resetFn: () => void) => void;
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
  onScrollOffsetChange,
  onResetScrollRef,
}: CenterCanvasProps) {
  const [baseSections, setBaseSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pan (sürükleme) için state - transform based
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [panOffsetStart, setPanOffsetStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Pan özelliği için offset tracking (reset butonu için)
  const [hasScrollOffset, setHasScrollOffset] = useState(false);

  // Pan event handlers - transform based
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Sadece boş alana tıklanırsa pan başlat
    const target = e.target as HTMLElement;
    // Herhangi bir interaktif element içinde değilse pan başlat
    const isInteractiveElement = 
      target.closest('button') || 
      target.closest('input') || 
      target.closest('textarea') || 
      target.closest('select') ||
      target.closest('[data-block-id]') ||
      target.closest('[data-no-pan]');
    
    // Sol tık ve interaktif element değilse
    if (!isInteractiveElement && e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      setPanOffsetStart({ x: panOffset.x, y: panOffset.y });
      e.preventDefault();
    }
  }, [panOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    
    const newOffset = {
      x: panOffsetStart.x + dx,
      y: panOffsetStart.y + dy
    };
    
    setPanOffset(newOffset);
    
    // Offset kontrolü
    const hasOffset = newOffset.x !== 0 || newOffset.y !== 0;
    setHasScrollOffset(hasOffset);
  }, [isPanning, panStart, panOffsetStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Mouse leave durumunda da pan'ı durdur
  const handleMouseLeave = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Canvas'ı ortala (reset)
  const handleResetScroll = useCallback(() => {
    setPanOffset({ x: 0, y: 0 });
    setHasScrollOffset(false);
  }, []);

  // Reset fonksiyonunu parent'a expose et
  useEffect(() => {
    if (onResetScrollRef) {
      onResetScrollRef(handleResetScroll);
    }
  }, [onResetScrollRef, handleResetScroll]);

  // hasScrollOffset değiştiğinde parent'ı bilgilendir
  useEffect(() => {
    if (onScrollOffsetChange) {
      onScrollOffsetChange(hasScrollOffset);
    }
  }, [hasScrollOffset, onScrollOffsetChange]);

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
      <div 
        ref={canvasRef}
        className={cn(
          "flex-1 overflow-hidden p-8 canvas-scroll-area",
          isPanning ? "cursor-grabbing select-none" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Pan için wrapper - transform translate ile hareket */}
        <div 
          className="w-full h-full"
          style={{ 
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
            transition: isPanning ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <div className="mx-auto" style={{ width: deviceWidths[device] }}>
            <div
              className={cn(
                "bg-white dark:bg-gray-800 shadow-xl min-h-screen section-editor",
                device === 'mobile' && "canvas-mobile-view",
                device === 'tablet' && "canvas-tablet-view"
              )}
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
              (() => {
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

                const sortedRowOrders = Object.keys(rows).map(Number).sort((a, b) => a - b);

                // rowSpan veya colSpan olan section var mı kontrol et
                const hasSpan = sections.some(s => (s.rowSpan ?? 1) > 1 || (s.colSpan ?? 1) > 1);

                // Span varsa CSS Grid kullan (PageRenderer ile aynı)
                if (hasSpan) {
                  // Grid için maksimum kolon sayısını bul
                  const maxCols = Math.max(...sortedRowOrders.map(r => rows[r].length), 1);
                  const rowCount = sortedRowOrders.length || 1;

                  return (
                    <div
                      className="sections-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
                        gridTemplateRows: `repeat(${rowCount}, auto)`,
                        gap: '16px',
                        width: '100%',
                        minHeight: '200px'
                      }}
                    >
                      {sections.map((section, idx) => {
                        const rowSpan = section.rowSpan ?? 1;
                        const colSpan = section.colSpan ?? 1;

                        return (
                          <div
                            key={section.id}
                            style={{
                              gridRow: `span ${rowSpan}`,
                              gridColumn: `span ${colSpan}`,
                              minHeight: '100px'
                            }}
                          >
                            <SectionEditor
                              section={section}
                              index={idx}
                              isSelected={selectedElement?.type === 'section' && selectedElement.id === section.id}
                              onSelect={() => onSelectElement({ type: 'section', id: section.id })}
                              selectedElement={selectedElement}
                              onSelectElement={onSelectElement}
                              onMove={onMoveSection}
                              onDuplicate={onDuplicateSection}
                              onDelete={onDeleteSection}
                              pendingColumnUpdates={pendingColumnUpdates}
                              pendingBlockUpdates={pendingBlockUpdates}
                              device={device}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // Span yoksa normal row-based render
                return (
                  <div className="space-y-4">
                    {sortedRowOrders.map(rowOrder => (
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
                              device={device}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })()
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

