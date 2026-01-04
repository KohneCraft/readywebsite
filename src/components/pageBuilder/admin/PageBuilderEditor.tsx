'use client';

// ============================================
// Vav Yapı - Page Builder Editor
// Ana Page Builder editör componenti
// 3 panelli layout: LeftPanel, CenterCanvas, RightPanel
// ============================================

import { useState, useEffect, useCallback } from 'react';
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
import type { Page, BlockType } from '@/types/pageBuilder';

interface PageBuilderEditorProps {
  pageId: string;
}

export function PageBuilderEditor({ pageId }: PageBuilderEditorProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedElement, setSelectedElement] = useState<{ type: 'section' | 'column' | 'block'; id: string } | null>(null);
  const [activeBlock, setActiveBlock] = useState<{ type: string; source: 'library' | 'canvas' } | null>(null);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState(100);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
  const loadPage = useCallback(async () => {
    try {
      setLoading(true);
      const pageData = await getPageById(pageId);
      setPage(pageData);
      setHasChanges(false);
    } catch (error) {
      console.error('Sayfa yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

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
        console.error('Blok ekleme hatası:', error);
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
        console.error('Blok taşıma hatası:', error);
      }
    }

    setActiveBlock(null);
  }, [page, pageId]);

  // Kaydet
  const handleSave = useCallback(async () => {
    if (!page || !hasChanges) return;

      try {
        setIsSaving(true);
        // Sadece güncellenebilir field'ları gönder (undefined field'ları filtrele)
        const updateData: Partial<Page> = {
          title: page.title,
          slug: page.slug,
          sections: page.sections,
          settings: page.settings,
          status: page.status,
        };
        
        // publishedAt sadece published ise ve yoksa ekle
        if (page.status === 'published' && !page.publishedAt) {
          // updatePage fonksiyonu zaten bunu handle ediyor
        }
        
        await updatePage(pageId, updateData);
        setHasChanges(false);
      } catch (error) {
        console.error('Kaydetme hatası:', error);
      } finally {
        setIsSaving(false);
      }
  }, [page, pageId, hasChanges]);

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
        console.error('Section ekleme hatası:', error);
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
        console.error('Sayfa yenileme hatası:', error);
      }
    };

    window.addEventListener('add-section', handleAddSection);
    window.addEventListener('section-updated', handleSectionUpdate);
    return () => {
      window.removeEventListener('add-section', handleAddSection);
      window.removeEventListener('section-updated', handleSectionUpdate);
    };
  }, [page, pageId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Sayfa yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="h-screen flex items-center justify-center">
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
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
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
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Blok Kütüphanesi */}
          <LeftPanel />

          {/* Center Canvas - Düzenleme Alanı */}
          <CenterCanvas
            page={page}
            device={device}
            zoom={zoom}
            selectedElement={selectedElement}
            onSelectElement={setSelectedElement}
            onMoveSection={async (sectionId, direction) => {
              const { moveSection } = await import('@/lib/firebase/firestore');
              await moveSection(sectionId, direction);
              await loadPage();
            }}
            onDuplicateSection={async (sectionId) => {
              const { duplicateSection } = await import('@/lib/firebase/firestore');
              await duplicateSection(sectionId);
              await loadPage();
            }}
            onDeleteSection={async (sectionId) => {
              const { deleteSection } = await import('@/lib/firebase/firestore');
              await deleteSection(sectionId);
              // Page'den section ID'sini çıkar
              const updatedSections = page.sections?.filter(id => id !== sectionId) || [];
              await updatePage(page.id, { sections: updatedSections });
              await loadPage();
            }}
          />

          {/* Right Panel - Ayarlar */}
          <RightPanel
            selectedElement={selectedElement}
            page={page}
            onUpdate={handlePageUpdate}
          />
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

