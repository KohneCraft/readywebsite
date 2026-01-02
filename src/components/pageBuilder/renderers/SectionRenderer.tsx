'use client';

import { useState, useEffect, useMemo } from 'react';
import { ColumnRenderer } from './ColumnRenderer';
import { getSectionById } from '@/lib/firebase/firestore';
import type { Section, Breakpoint } from '@/types/pageBuilder';

interface SectionRendererProps {
  sectionId: string;
}

function getDeviceType(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function SectionRenderer({ sectionId }: SectionRendererProps) {
  const [section, setSection] = useState<Section | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadSection() {
      try {
        setLoading(true);
        const sectionData = await getSectionById(sectionId);
        console.log(`SectionRenderer - Section yüklendi (${sectionId}):`, sectionData);
        if (!sectionData) {
          console.warn(`Section bulunamadı: ${sectionId}`);
        }
        setSection(sectionData);
      } catch (error) {
        console.error(`Section yükleme hatası (${sectionId}):`, error);
      } finally {
        setLoading(false);
      }
    }
    loadSection();
  }, [sectionId]);
  
  const deviceType = useMemo(() => getDeviceType(), []);
  
  // Intersection Observer for animations
  useEffect(() => {
    const animation = section?.settings?.animation;
    if (!animation || !animation.enabled) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, [section, sectionId]);
  
  // Loading durumunda hiçbir şey render etme (null uyarısını önlemek için)
  if (loading) {
    return null;
  }
  
  if (!section) {
    console.warn(`SectionRenderer - Section bulunamadı (${sectionId})`);
    return null;
  }
  
  // Responsive visibility check
  if (section.visibility && !section.visibility[deviceType]) {
    console.log(`SectionRenderer - Section görünür değil (${sectionId}, device: ${deviceType})`);
    return null;
  }
  
  // Column kontrolü
  if (!section.columns || section.columns.length === 0) {
    console.warn(`SectionRenderer - Section'da column yok (${sectionId})`);
    return null;
  }
  
  console.log(`SectionRenderer - Section render ediliyor (${sectionId}):`, {
    name: section.name,
    columnsCount: section.columns.length,
    columns: section.columns,
  });
  
  const settings = section.settings || {};
  const animation = settings.animation;
  
  const sectionStyle: React.CSSProperties = {
    backgroundColor: settings.backgroundColor,
    backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
    backgroundSize: settings.backgroundSize || 'cover',
    backgroundPosition: settings.backgroundPosition || 'center',
    backgroundRepeat: settings.backgroundRepeat || 'no-repeat',
    backgroundAttachment: settings.backgroundAttachment || 'scroll',
    padding: settings.padding
      ? `${settings.padding.top || 0}px ${settings.padding.right || 0}px ${settings.padding.bottom || 0}px ${settings.padding.left || 0}px`
      : '0',
    margin: settings.margin
      ? `${settings.margin.top || 0}px ${settings.margin.right || 0}px ${settings.margin.bottom || 0}px ${settings.margin.left || 0}px`
      : '0',
    minHeight: settings.minHeight ? `${settings.minHeight}px` : 'auto',
    borderTop: settings.borderTop?.width 
      ? `${settings.borderTop.width}px ${settings.borderTop.style} ${settings.borderTop.color}` 
      : 'none',
    borderBottom: settings.borderBottom?.width 
      ? `${settings.borderBottom.width}px ${settings.borderBottom.style} ${settings.borderBottom.color}` 
      : 'none',
    borderRadius: settings.borderRadius ? `${settings.borderRadius}px` : '0',
    boxShadow: settings.boxShadow || 'none',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const animationClass = animation?.enabled && isVisible 
    ? `animate-${animation.type || 'fadeIn'}` 
    : '';
  
  const animationStyle = animation?.enabled ? {
    '--animation-duration': `${animation.duration || 0.8}s`,
    '--animation-delay': `${animation.delay || 0}s`
  } : {};
  
  return (
    <section 
      id={`section-${sectionId}`}
      className={`section-renderer ${animationClass}`}
      style={{ ...sectionStyle, ...animationStyle } as React.CSSProperties}
      data-section-name={section.name}
    >
      {/* Overlay */}
      {settings.overlay?.enabled && (
        <div 
          className="section-overlay absolute inset-0 z-0"
          style={{
            backgroundColor: settings.overlay.color,
            backdropFilter: settings.overlay.blur ? `blur(${settings.overlay.blur}px)` : 'none'
          }}
        />
      )}
      
      {/* Content Container */}
      <div 
        className={`section-container ${settings.fullWidth ? 'w-full' : 'container mx-auto'}`}
        style={{
          maxWidth: settings.fullWidth ? '100%' : `${settings.maxWidth || 1200}px`,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div 
          className="columns-wrapper grid grid-cols-12"
          style={{
            gap: `${settings.columnGap || 30}px`
          }}
        >
          {section.columns && section.columns.length > 0 ? (
            section.columns.map((columnId, colIndex) => (
              <ColumnRenderer 
                key={columnId} 
                columnId={columnId}
                index={colIndex}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 p-8">
              <p>Bu section'da henüz içerik yok.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

