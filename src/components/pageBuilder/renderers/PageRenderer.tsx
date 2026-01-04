'use client';

import { useState, useEffect } from 'react';
import { SectionRenderer } from './SectionRenderer';
import { getPageById, getPageBySlug } from '@/lib/firebase/firestore';
import type { Page } from '@/types/pageBuilder';

interface PageRendererProps {
  pageId?: string;
  slug?: string;
  allowDraft?: boolean; // Preview modunda taslak sayfaları da göster
}

function updateMetaTag(property: string, content: string) {
  if (!content) return;
  
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function PageRenderer({ pageId, slug, allowDraft = false }: PageRendererProps) {
  const [page, setPage] = useState<Page | null>(null);
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
        
        console.log('PageRenderer - Sayfa yüklendi:', {
          id: pageData.id,
          title: pageData.title,
          slug: pageData.slug,
          status: pageData.status,
          sectionsCount: pageData.sections?.length || 0,
          sections: pageData.sections,
        });
        
        // Status kontrolü (preview modunda taslak sayfalar da görüntülenebilir)
        // Eğer status yoksa veya undefined ise, published olarak kabul et (geriye dönük uyumluluk)
        const pageStatus = pageData.status || 'published';
        if (!allowDraft && pageStatus !== 'published') {
          setError('Bu sayfa henüz yayınlanmamış');
          return;
        }
        
        setPage(pageData);
      } catch (err) {
        console.error('Sayfa yükleme hatası:', err);
        setError('Sayfa yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }
    
    loadPage();
  }, [pageId, slug, allowDraft]);
  
  // SEO Meta Tags
  useEffect(() => {
    if (page?.settings?.seo) {
      document.title = page.settings.seo.title || page.title;
      
      // Meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', page.settings.seo.description || '');
      
      // Open Graph tags
      if (page.settings.seo.ogTitle) updateMetaTag('og:title', page.settings.seo.ogTitle);
      if (page.settings.seo.ogDescription) updateMetaTag('og:description', page.settings.seo.ogDescription);
      if (page.settings.seo.ogImage) updateMetaTag('og:image', page.settings.seo.ogImage);
    }
  }, [page]);
  
  // Custom CSS/JS injection
  useEffect(() => {
    if (page?.settings?.customCSS) {
      const styleEl = document.createElement('style');
      styleEl.innerHTML = page.settings.customCSS;
      styleEl.id = 'custom-page-css';
      document.head.appendChild(styleEl);
      
      return () => {
        document.getElementById('custom-page-css')?.remove();
      };
    }
  }, [page?.settings?.customCSS]);
  
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
      {/* Custom head code */}
      {page.settings?.headCode && (
        <div dangerouslySetInnerHTML={{ __html: page.settings.headCode }} />
      )}
      
      {/* Sections */}
      {page.sections && page.sections.length > 0 ? (
        page.sections.map((sectionId) => (
          <SectionRenderer 
            key={sectionId} 
            sectionId={sectionId}
          />
        ))
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p>Bu sayfada henüz içerik yok.</p>
          <p className="text-sm mt-2">Section sayısı: {page.sections?.length || 0}</p>
        </div>
      )}
      
      {/* Custom footer code */}
      {page.settings?.footerCode && (
        <div dangerouslySetInnerHTML={{ __html: page.settings.footerCode }} />
      )}
    </div>
  );
}

