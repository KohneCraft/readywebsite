'use client';

// ============================================
// Vav Yapı - Page Builder Editor
// Ana Page Builder editör componenti
// 3 panelli layout: LeftPanel, CenterCanvas, RightPanel
// ============================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, KeyboardSensor, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { LeftPanel } from './panels/LeftPanel';
import { CenterCanvas } from './panels/CenterCanvas';
import { RightPanel } from './panels/RightPanel';
import { TopBar } from './TopBar';
import {
  getPageById,
  updatePage,
  createSection,
  createBlock,
  moveBlock,
} from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Page, BlockType, Section, Column, Block } from '@/types/pageBuilder';
import { updateSection, updateColumn, updateBlock } from '@/lib/firebase/firestore';

// History State Type
interface HistoryState {
  page: Page | null;
  pendingSectionUpdates: Record<string, Partial<Section>>;
  pendingColumnUpdates: Record<string, Partial<Column>>;
  pendingBlockUpdates: Record<string, Partial<Block>>;
}

interface PageBuilderEditorProps {
  pageId: string;
}

export function PageBuilderEditor({ pageId }: PageBuilderEditorProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedElement, setSelectedElement] = useState<{ type: 'section' | 'column' | 'block' | 'page' | 'header' | 'footer'; id: string } | null>(null);
  const [activeBlock, setActiveBlock] = useState<{ type: string; source: 'library' | 'canvas' } | null>(null);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState(100);
  const [hasChanges, setHasChanges] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(320); // Varsayılan 320px (w-80)
  const [rightPanelWidth, setRightPanelWidth] = useState(320); // Varsayılan 320px (w-80)
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Pending değişiklikleri tutmak için state'ler
  const [pendingSectionUpdates, setPendingSectionUpdates] = useState<Record<string, Partial<Section>>>({});
  const [pendingColumnUpdates, setPendingColumnUpdates] = useState<Record<string, Partial<Column>>>({});
  const [pendingBlockUpdates, setPendingBlockUpdates] = useState<Record<string, Partial<Block>>>({});

  // History (Undo/Redo) State
  const historyRef = useRef<HistoryState[]>([]);
  const futureRef = useRef<HistoryState[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const isUndoRedoRef = useRef(false); // Undo/Redo sırasında history kaydetmeyi önle
  const MAX_HISTORY = 50;

  // Current state'i snapshot olarak al
  const getCurrentSnapshot = useCallback((): HistoryState => {
    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      pendingSectionUpdates: JSON.parse(JSON.stringify(pendingSectionUpdates)),
      pendingColumnUpdates: JSON.parse(JSON.stringify(pendingColumnUpdates)),
      pendingBlockUpdates: JSON.parse(JSON.stringify(pendingBlockUpdates)),
    };
  }, [page, pendingSectionUpdates, pendingColumnUpdates, pendingBlockUpdates]);

  // History'ye mevcut state'i ekle
  const saveToHistory = useCallback(() => {
    if (isUndoRedoRef.current) return; // Undo/Redo sırasında kaydetme

    const snapshot = getCurrentSnapshot();
    historyRef.current = [...historyRef.current.slice(-MAX_HISTORY + 1), snapshot];
    futureRef.current = []; // Yeni değişiklik yapıldığında future'ı temizle
    setCanUndo(historyRef.current.length > 0);
    setCanRedo(false);
    logger.pageBuilder.debug('History kaydedildi', { historyLength: historyRef.current.length });
  }, [getCurrentSnapshot]);

  // Undo işlemi
  const handleUndo = useCallback(() => {
    if (historyRef.current.length === 0) return;

    isUndoRedoRef.current = true;

    // Mevcut state'i future'a kaydet
    futureRef.current = [getCurrentSnapshot(), ...futureRef.current];

    // Son history'yi al
    const previousState = historyRef.current.pop()!;

    // State'i geri yükle
    if (previousState.page) {
      setPage(previousState.page);
    }
    setPendingSectionUpdates(previousState.pendingSectionUpdates);
    setPendingColumnUpdates(previousState.pendingColumnUpdates);
    setPendingBlockUpdates(previousState.pendingBlockUpdates);
    setHasChanges(true);

    setCanUndo(historyRef.current.length > 0);
    setCanRedo(true);

    logger.pageBuilder.info('Undo yapıldı', {
      historyLength: historyRef.current.length,
      futureLength: futureRef.current.length
    });

    // Bir sonraki tick'te flag'i sıfırla
    setTimeout(() => { isUndoRedoRef.current = false; }, 0);
  }, [getCurrentSnapshot]);

  // Redo işlemi
  const handleRedo = useCallback(() => {
    if (futureRef.current.length === 0) return;

    isUndoRedoRef.current = true;

    // Mevcut state'i history'ye kaydet
    historyRef.current = [...historyRef.current, getCurrentSnapshot()];

    // İlk future'ı al
    const nextState = futureRef.current.shift()!;

    // State'i yükle
    if (nextState.page) {
      setPage(nextState.page);
    }
    setPendingSectionUpdates(nextState.pendingSectionUpdates);
    setPendingColumnUpdates(nextState.pendingColumnUpdates);
    setPendingBlockUpdates(nextState.pendingBlockUpdates);
    setHasChanges(true);

    setCanUndo(true);
    setCanRedo(futureRef.current.length > 0);

    logger.pageBuilder.info('Redo yapıldı', {
      historyLength: historyRef.current.length,
      futureLength: futureRef.current.length
    });

    // Bir sonraki tick'te flag'i sıfırla
    setTimeout(() => { isUndoRedoRef.current = false; }, 0);
  }, [getCurrentSnapshot]);

  // Ctrl+Z / Ctrl+Y klavye kısayolları
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z (Undo)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl+Y veya Ctrl+Shift+Z (Redo)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sayfa yükleme
  const loadPage = useCallback(async (preserveHistory = false) => {
    try {
      setLoading(true);
      const pageData = await getPageById(pageId);
      setPage(pageData);
      setHasChanges(false);
      // Pending değişiklikleri temizle
      setPendingSectionUpdates({});
      setPendingColumnUpdates({});
      setPendingBlockUpdates({});
      // History'yi preserveHistory false ise temizle
      if (!preserveHistory) {
        historyRef.current = [];
        futureRef.current = [];
        setCanUndo(false);
        setCanRedo(false);
      }
    } catch (error) {
      logger.pageBuilder.error('Sayfa yüklenirken hata', error);
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  // Page değiştiğinde önceki state'i history'ye kaydet
  const prevPageRef = useRef<Page | null>(null);
  useEffect(() => {
    // İlk yükleme veya undo/redo sırasında kaydetme
    if (!prevPageRef.current || isUndoRedoRef.current || !hasChanges) {
      prevPageRef.current = page;
      return;
    }

    // Sayfa değiştiğinde önceki state'i kaydet
    if (page && JSON.stringify(page) !== JSON.stringify(prevPageRef.current)) {
      saveToHistory();
      prevPageRef.current = page;
    }
  }, [page, hasChanges, saveToHistory]);

  // Drag start
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;
    if (data) {
      setActiveBlock({
        type: data.type,
        source: data.source || 'library',
      });
    }
  }, []);

  // Drag end
  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !page) {
      setActiveBlock(null);
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    // Yeni kolon ekleme (library'den)
    if (activeData?.source === 'library' && activeData?.type === 'column') {
      try {
        const { createColumn, getSectionById, getColumnById, updateColumn } = await import('@/lib/firebase/firestore');

        // Eğer section'a bırakıldıysa
        if (overData?.type === 'section') {
          const sectionId = over.id as string;
          const section = await getSectionById(sectionId);
          if (!section) {
            setActiveBlock(null);
            return;
          }

          // Mevcut kolon sayısını al
          const currentColumns = section.columns || [];
          const numColumns = currentColumns.length + 1;
          const equalWidth = 100 / numColumns;

          // Yeni kolon oluştur
          await createColumn({
            sectionId: sectionId,
            width: equalWidth,
            order: currentColumns.length,
          });

          // Mevcut kolonların genişliklerini güncelle
          for (const colId of currentColumns) {
            const col = await getColumnById(colId);
            if (col) {
              await updateColumn(colId, { width: equalWidth });
            }
          }

          // Sayfayı yeniden yükle
          const pageData = await getPageById(pageId);
          if (pageData) setPage(pageData);
          setHasChanges(true);
        }
        // Eğer column'a bırakıldıysa, iç kolon oluştur
        else if (overData?.type === 'column') {
          const parentColumnId = over.id as string;
          const parentColumn = await getColumnById(parentColumnId);
          if (!parentColumn) {
            setActiveBlock(null);
            return;
          }

          // Mevcut iç kolon sayısını al
          const currentNestedColumns = parentColumn.columns || [];
          const numColumns = currentNestedColumns.length + 1;
          const equalWidth = 100 / numColumns;

          // Yeni iç kolon oluştur
          await createColumn({
            sectionId: parentColumn.sectionId,
            parentColumnId: parentColumnId,
            width: equalWidth,
            order: currentNestedColumns.length,
          });

          // Mevcut iç kolonların genişliklerini güncelle
          for (const nestedColId of currentNestedColumns) {
            const nestedCol = await getColumnById(nestedColId);
            if (nestedCol) {
              await updateColumn(nestedColId, { width: equalWidth });
            }
          }

          // Sayfayı yeniden yükle
          const pageData = await getPageById(pageId);
          if (pageData) setPage(pageData);
          setHasChanges(true);
        } else {
          setActiveBlock(null);
          return;
        }
      } catch (error) {
        logger.pageBuilder.error('Kolon ekleme hatası', error);
      }
      setActiveBlock(null);
      return;
    }

    // Yeni blok ekleme (library'den)
    if (activeData?.source === 'library' && activeData?.type) {
      try {
        let targetColumnId: string;

        // Eğer column'a bırakıldıysa
        if (overData?.type === 'column') {
          targetColumnId = over.id as string;
        }
        // Eğer boş section'a bırakıldıysa, önce column oluştur
        else if (overData?.type === 'section') {
          const { createColumn } = await import('@/lib/firebase/firestore');
          targetColumnId = await createColumn({
            sectionId: over.id as string,
            width: 100,
            order: 0,
          });
        } else {
          setActiveBlock(null);
          return;
        }

        // Blok oluştur
        await createBlock({
          columnId: targetColumnId,
          type: activeData.type as BlockType,
          props: {},
        });

        // Kısa bir bekleme - column güncellemesinin tamamlanması için
        await new Promise(resolve => setTimeout(resolve, 300));

        // Sayfayı yeniden yükle
        const pageData = await getPageById(pageId);
        if (pageData) setPage(pageData);
        setHasChanges(true);
      } catch (error) {
        logger.pageBuilder.error('Blok ekleme hatası', error);
      }
    }

    // Blok taşıma (canvas içinde)
    if (activeData?.source === 'canvas' && overData?.type === 'column') {
      try {
        await moveBlock(active.id as string, over.id as string);
        // Sayfayı yeniden yükle
        const pageData = await getPageById(pageId);
        if (pageData) setPage(pageData);
        setHasChanges(true);
      } catch (error) {
        logger.pageBuilder.error('Blok taşıma hatası', error);
      }
    }

    setActiveBlock(null);
  }, [page, pageId]);

  // Kaydet - Tüm pending değişiklikleri kaydet
  const handleSave = useCallback(async () => {
    if (!page) return;

    // Eğer hiç pending değişiklik yoksa ve hasChanges false ise, sadece page'i kaydet
    const hasPendingChanges =
      Object.keys(pendingSectionUpdates).length > 0 ||
      Object.keys(pendingColumnUpdates).length > 0 ||
      Object.keys(pendingBlockUpdates).length > 0 ||
      hasChanges;

    if (!hasPendingChanges) return;

    try {
      setIsSaving(true);

      // Pending section değişikliklerini kaydet
      for (const [sectionId, updates] of Object.entries(pendingSectionUpdates)) {
        try {
          await updateSection(sectionId, updates);
          window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId } }));
        } catch (error) {
          logger.pageBuilder.error(`Section ${sectionId} güncelleme hatası`, error);
        }
      }

      // Pending column değişikliklerini kaydet
      for (const [columnId, updates] of Object.entries(pendingColumnUpdates)) {
        try {
          await updateColumn(columnId, updates);
          window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
        } catch (error) {
          logger.pageBuilder.error(`Column ${columnId} güncelleme hatası`, error);
        }
      }

      // Pending block değişikliklerini kaydet
      for (const [blockId, updates] of Object.entries(pendingBlockUpdates)) {
        try {
          await updateBlock(blockId, updates);
          window.dispatchEvent(new CustomEvent('section-updated', { detail: { sectionId: 'any' } }));
        } catch (error) {
          logger.pageBuilder.error(`Block ${blockId} güncelleme hatası`, error);
        }
      }

      // Page değişikliklerini kaydet (eğer varsa)
      if (hasChanges) {
        const updateData: Partial<Page> = {
          title: page.title,
          slug: page.slug,
          sections: page.sections,
          settings: page.settings,
          status: page.status,
        };
        await updatePage(pageId, updateData);
      }

      // Pending değişiklikleri temizle
      setPendingSectionUpdates({});
      setPendingColumnUpdates({});
      setPendingBlockUpdates({});
      setHasChanges(false);

      // Artık live preview olduğu için sayfa yenilemeye gerek yok
      // Kullanıcıya başarı mesajı göster
      logger.pageBuilder.info('Sayfa başarıyla kaydedildi');
    } catch (error) {
      logger.pageBuilder.error('Kaydetme hatası', error);
    } finally {
      setIsSaving(false);
    }
  }, [page, pageId, hasChanges, pendingSectionUpdates, pendingColumnUpdates, pendingBlockUpdates]);

  // Sayfa güncelleme
  const handlePageUpdate = useCallback((updates: Partial<Page>) => {
    if (!page) return;
    setPage({ ...page, ...updates });
    setHasChanges(true);
  }, [page]);

  // Yeni section ekleme
  useEffect(() => {
    const handleAddSection = async () => {
      if (!page) return;

      try {
        await createSection({
          pageId: page.id,
          name: 'Yeni Bölüm',
          order: page.sections?.length || 0,
          settings: {},
        });

        // Sayfayı yeniden yükle
        const pageData = await getPageById(pageId);
        if (pageData) setPage(pageData);
        setHasChanges(true);
      } catch (error) {
        logger.pageBuilder.error('Section ekleme hatası', error);
      }
    };

    // Section güncelleme event'ini dinle (kolon eklendiğinde)
    const handleSectionUpdate = async () => {
      if (!page) return;
      try {
        const pageData = await getPageById(pageId);
        if (pageData) setPage(pageData);
        setHasChanges(true);
      } catch (error) {
        logger.pageBuilder.error('Sayfa yenileme hatası', error);
      }
    };

    window.addEventListener('add-section', handleAddSection);
    window.addEventListener('section-updated', handleSectionUpdate);
    return () => {
      window.removeEventListener('add-section', handleAddSection);
      window.removeEventListener('section-updated', handleSectionUpdate);
    };
  }, [page, pageId]);

  // Resize handlers - TÜM hook'lar early return'lerden ÖNCE olmalı
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingLeft) {
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
          setLeftPanelWidth(newWidth);
        }
      }
      if (isResizingRight) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
          setRightPanelWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };

    if (isResizingLeft || isResizingRight) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingLeft, isResizingRight]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Sayfa yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-50">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Sayfa bulunamadı</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-gray-900 z-50">
        {/* Top Bar */}
        <TopBar
          page={page}
          device={device}
          onDeviceChange={setDevice}
          zoom={zoom}
          onZoomChange={setZoom}
          hasChanges={hasChanges}
          isSaving={isSaving}
          onSave={handleSave}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Panel - Blok Kütüphanesi */}
          <div
            className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col relative"
            style={{ width: `${leftPanelWidth}px`, minWidth: '200px', maxWidth: '600px' }}
          >
            <LeftPanel />
            {/* Resize Handle */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary-500 transition-colors z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizingLeft(true);
              }}
            />
          </div>

          {/* Center Canvas - Düzenleme Alanı */}
          <div className="flex-1 overflow-auto" style={{ width: `calc(100% - ${leftPanelWidth + rightPanelWidth}px)` }}>
            <CenterCanvas
              page={page}
              device={device}
              zoom={zoom}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              pendingSectionUpdates={pendingSectionUpdates}
              pendingColumnUpdates={pendingColumnUpdates}
              pendingBlockUpdates={pendingBlockUpdates}
              onMoveSection={async (sectionId, direction) => {
                // Önce history'ye kaydet
                saveToHistory();
                const { moveSection } = await import('@/lib/firebase/firestore');
                await moveSection(sectionId, direction);
                await loadPage(true); // History'yi koru
              }}
              onDuplicateSection={async (sectionId) => {
                // Önce history'ye kaydet
                saveToHistory();
                const { duplicateSection } = await import('@/lib/firebase/firestore');
                await duplicateSection(sectionId);
                await loadPage(true); // History'yi koru
              }}
              onDeleteSection={async (sectionId) => {
                // Önce history'ye kaydet
                saveToHistory();
                const { deleteSection } = await import('@/lib/firebase/firestore');
                await deleteSection(sectionId);
                // Page'den section ID'sini çıkar
                const updatedSections = page.sections?.filter(id => id !== sectionId) || [];
                await updatePage(page.id, { sections: updatedSections });
                await loadPage(true); // History'yi koru
              }}
            />
          </div>

          {/* Right Panel - Ayarlar */}
          <div
            className="bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col relative"
            style={{ width: `${rightPanelWidth}px`, minWidth: '200px', maxWidth: '600px' }}
          >
            {/* Resize Handle */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary-500 transition-colors z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizingRight(true);
              }}
            />
            <RightPanel
              selectedElement={selectedElement}
              page={page}
              onUpdate={handlePageUpdate}
              onSelectElement={setSelectedElement}
              onSectionUpdate={(sectionId, updates) => {
                setPendingSectionUpdates(prev => ({
                  ...prev,
                  [sectionId]: { ...prev[sectionId], ...updates }
                }));
                setHasChanges(true);
              }}
              onColumnUpdate={(columnId, updates) => {
                setPendingColumnUpdates(prev => ({
                  ...prev,
                  [columnId]: { ...prev[columnId], ...updates }
                }));
                setHasChanges(true);
              }}
              onBlockUpdate={(blockId, updates) => {
                setPendingBlockUpdates(prev => ({
                  ...prev,
                  [blockId]: { ...prev[blockId], ...updates }
                }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeBlock && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activeBlock.type} bloğu
              </p>
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

