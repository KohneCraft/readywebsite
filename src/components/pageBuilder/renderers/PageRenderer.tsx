'use client';

import { useState, useEffect } from 'react';
import { SectionRenderer } from './SectionRenderer';
import { BlockRenderer } from './BlockRenderer';
import { getPageById, getPageBySlug, getBlockById, getSectionById } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Page, Block, Section } from '@/types/pageBuilder';

interface PageRendererProps {
  pageId?: string;
  slug?: string;
  allowDraft?: boolean; // Preview modunda taslak sayfaları da göster
}

function updateMetaTag(property: string, content: string, dataAttribute: string = 'data-generated-by-page-renderer'): HTMLMetaElement | null {
  if (!content) return null;

  let tag = document.querySelector(`meta[property="${property}"][${dataAttribute}]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    tag.setAttribute(dataAttribute, 'true');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
  return tag;
}

export function PageRenderer({ pageId, slug, allowDraft = false }: PageRendererProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [sectionsData, setSectionsData] = useState<Section[]>([]);
  const [globalPanels, setGlobalPanels] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);

        // Sayfa verilerini çek (ID veya slug ile)
        const pageData = pageId
          ? await getPageById(pageId)
          : slug
            ? await getPageBySlug(slug)
            : null;

        if (!pageData) {
          setError('Sayfa bulunamadı');
          return;
        }

        logger.pageBuilder.debug('Sayfa yüklendi', {
          id: pageData.id,
          title: pageData.title,
          slug: pageData.slug,
          status: pageData.status,
          sectionsCount: pageData.sections?.length || 0,
          globalPanelsCount: pageData.globalPanels?.length || 0,
        });

        // Status kontrolü (preview modunda taslak sayfalar da görüntülenebilir)
        // Eğer status yoksa veya undefined ise, published olarak kabul et (geriye dönük uyumluluk)
        const pageStatus = pageData.status || 'published';
        if (!allowDraft && pageStatus !== 'published') {
          setError('Bu sayfa henüz yayınlanmamış');
          return;
        }

        setPage(pageData);

        // Sections verilerini yükle (rowOrder için)
        if (pageData.sections && pageData.sections.length > 0) {
          const sections = await Promise.all(
            pageData.sections.map((id: string) => getSectionById(id))
          );
          setSectionsData(sections.filter(Boolean) as Section[]);
        } else {
          setSectionsData([]);
        }

        // Global panelleri yükle
        if (pageData.globalPanels && pageData.globalPanels.length > 0) {
          const panels = await Promise.all(
            pageData.globalPanels.map((id: string) => getBlockById(id))
          );
          setGlobalPanels(panels.filter(Boolean) as Block[]);
        } else {
          setGlobalPanels([]);
        }
      } catch (err) {
        logger.pageBuilder.error('Sayfa yükleme hatası', err);
        setError('Sayfa yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [pageId, slug, allowDraft]);

  // Orphan section temizleme event listener
  useEffect(() => {
    if (!page) return;

    const orphanSections = new Set<string>();

    const handleOrphanSection = (e: CustomEvent<{ sectionId: string }>) => {
      const { sectionId } = e.detail;
      orphanSections.add(sectionId);

      // Debounce - birden fazla orphan section için tek bir güncelleme yap
      setTimeout(async () => {
        if (orphanSections.size === 0) return;

        const sectionsToRemove = Array.from(orphanSections);
        orphanSections.clear();

        logger.pageBuilder.warn('Orphan section ID\'leri temizleniyor', sectionsToRemove);

        // Page state'ini güncelle (UI için)
        const updatedSections = page.sections?.filter(id => !sectionsToRemove.includes(id)) || [];
        setPage(prev => prev ? { ...prev, sections: updatedSections } : null);

        // Firestore'da da güncelle (kalıcı)
        try {
          const { updatePage } = await import('@/lib/firebase/firestore');
          await updatePage(page.id, { sections: updatedSections });
          logger.pageBuilder.info('Orphan section ID\'leri başarıyla temizlendi');
        } catch (error) {
          logger.pageBuilder.error('Orphan section temizleme hatası', error);
        }
      }, 500);
    };

    window.addEventListener('orphan-section', handleOrphanSection as EventListener);
    return () => {
      window.removeEventListener('orphan-section', handleOrphanSection as EventListener);
    };
  }, [page]);

  // SEO Meta Tags
  useEffect(() => {
    if (!page?.settings?.seo) return;

    const originalTitle = document.title;
    const addedMetaTags: HTMLElement[] = [];

    document.title = page.settings.seo.title || page.title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"][data-generated-by-page-renderer]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('data-generated-by-page-renderer', 'true');
      document.head.appendChild(metaDesc);
      addedMetaTags.push(metaDesc);
    }
    metaDesc.setAttribute('content', page.settings.seo.description || '');

    // Open Graph tags
    if (page.settings.seo.ogTitle) {
      const tag = updateMetaTag('og:title', page.settings.seo.ogTitle);
      if (tag) addedMetaTags.push(tag);
    }
    if (page.settings.seo.ogDescription) {
      const tag = updateMetaTag('og:description', page.settings.seo.ogDescription);
      if (tag) addedMetaTags.push(tag);
    }
    if (page.settings.seo.ogImage) {
      const tag = updateMetaTag('og:image', page.settings.seo.ogImage);
      if (tag) addedMetaTags.push(tag);
    }

    // Cleanup: Bu component tarafından eklenen meta tag'leri kaldır
    return () => {
      document.title = originalTitle;

      // Güvenli cleanup: Her elementi ayrı ayrı ve null check ile kaldır
      document.querySelectorAll('meta[data-generated-by-page-renderer]').forEach(el => {
        try {
          if (el && el.parentNode && el.parentNode.contains(el)) {
            el.parentNode.removeChild(el);
          }
        } catch (error) {
          // Sessizce yoksay - element zaten kaldırılmış olabilir
        }
      });
    };
  }, [page]);

  // Custom CSS/JS injection
  useEffect(() => {
    if (!page?.settings?.customCSS) return;

    const styleId = `custom-page-css-${page.id}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = page.settings.customCSS;

    return () => {
      const el = document.getElementById(styleId);
      try {
        if (el && el.parentNode && el.parentNode.contains(el)) {
          el.parentNode.removeChild(el);
        }
      } catch (error) {
        // Sessizce yoksay - element zaten kaldırılmış olabilir
      }
    };
  }, [page?.settings?.customCSS, page?.id]);

  if (loading) {
    return (
      <div className="page-loading min-h-screen flex items-center justify-center">
        <div className="spinner w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="ml-4">Sayfa yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-5xl text-red-500 mb-5">Hata</h1>
        <p className="text-lg text-gray-600">{error}</p>
      </div>
    );
  }

  if (!page) {
    return null;
  }

  return (
    <div
      className={`page-renderer page-${page.settings?.layout || 'default'}`}
      style={{
        '--primary-color': page.settings?.primaryColor || '#007bff',
        '--secondary-color': page.settings?.secondaryColor || '#6c757d',
        '--body-font': page.settings?.bodyFont || 'Roboto',
        '--heading-font': page.settings?.headingFont || 'Montserrat'
      } as React.CSSProperties}
    >
      {/* Sections - CSS Grid ile rowSpan desteği */}
      {sectionsData.length > 0 ? (
        (() => {
          // Section'ları rowOrder'a göre grupla
          const rows = sectionsData.reduce((acc, section) => {
            const rowOrder = section.rowOrder ?? section.order ?? 0;
            if (!acc[rowOrder]) acc[rowOrder] = [];
            acc[rowOrder].push(section);
            return acc;
          }, {} as Record<number, Section[]>);

          // Her row'u columnOrder'a göre sırala
          Object.keys(rows).forEach(rowKey => {
            rows[Number(rowKey)].sort((a, b) => (a.columnOrder ?? 0) - (b.columnOrder ?? 0));
          });

          const sortedRowOrders = Object.keys(rows).map(Number).sort((a, b) => a - b);

          // rowSpan olan section var mı kontrol et
          const hasRowSpan = sectionsData.some(s => (s.rowSpan ?? 1) > 1);

          // rowSpan varsa CSS Grid kullan
          if (hasRowSpan) {
            // Grid için maksimum kolon sayısını bul
            const maxCols = Math.max(...sortedRowOrders.map(r => rows[r].length));
            const rowCount = sortedRowOrders.length;

            return (
              <div
                className="sections-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
                  gridTemplateRows: `repeat(${rowCount}, auto)`,
                  gap: '0',
                  width: '100%'
                }}
              >
                {sectionsData.map(section => {
                  const rowSpan = section.rowSpan ?? 1;
                  const sectionWidth = section.settings?.maxWidth;
                  const gridStyle: React.CSSProperties = {
                    gridRow: `span ${rowSpan}`,
                    maxWidth: sectionWidth ? `${sectionWidth}px` : undefined,
                  };
                  return (
                    <div key={section.id} style={gridStyle}>
                      <SectionRenderer sectionId={section.id} />
                    </div>
                  );
                })}
              </div>
            );
          }

          // rowSpan yoksa normal flex render
          return sortedRowOrders.map(rowOrder => {
            const rowSections = rows[rowOrder];
            // Tek section varsa normal render
            if (rowSections.length === 1) {
              return (
                <SectionRenderer
                  key={rowSections[0].id}
                  sectionId={rowSections[0].id}
                />
              );
            }
            // Birden fazla section varsa flex container içinde yan yana
            return (
              <div
                key={`row-${rowOrder}`}
                className="flex gap-0"
                style={{ width: '100%' }}
              >
                {rowSections.map(section => {
                  const sectionWidth = section.settings?.maxWidth;
                  const flexStyle = sectionWidth
                    ? { flex: `0 0 ${sectionWidth}px`, maxWidth: `${sectionWidth}px` }
                    : { flex: 1 };
                  return (
                    <div key={section.id} style={flexStyle}>
                      <SectionRenderer sectionId={section.id} />
                    </div>
                  );
                })}
              </div>
            );
          });
        })()
      ) : page?.sections && page.sections.length > 0 ? (
        // Fallback: sectionsData henüz yüklenmemişse eski yöntem
        page.sections.map((sectionId) => (
          <SectionRenderer
            key={sectionId}
            sectionId={sectionId}
          />
        ))
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p>Bu sayfada henüz içerik yok.</p>
          <p className="text-sm mt-2">Section sayısı: {page?.sections?.length || 0}</p>
        </div>
      )}

      {/* Global Paneller - Section'ların dışında, sabit pozisyonda */}
      {globalPanels.length > 0 && (
        <div className="global-panels-container">
          {globalPanels.map((panel, index) => (
            <BlockRenderer
              key={panel.id}
              blockId={panel.id}
              index={index}
              block={panel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

