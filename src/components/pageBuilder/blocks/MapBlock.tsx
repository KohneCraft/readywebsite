'use client';

import { useEffect, useRef, memo } from 'react';
import { sanitizeCSS } from '@/lib/sanitize';
import { logger } from '@/lib/logger';
import type { BlockProps } from '@/types/pageBuilder';

interface MapBlockProps {
  props: BlockProps;
}

function MapBlockComponent({ props }: MapBlockProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Harita genişliği responsive hesaplama
  const getMapWidth = () => {
    if (!props.mapWidth) return '100%';

    // Ekran genişliğine göre responsive değer
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;

      // Mobil: 100%
      if (screenWidth < 768) {
        return '100%';
      }
      // Tablet: 90%
      else if (screenWidth < 1024) {
        return '90%';
      }
      // Desktop: belirtilen px değeri (max-width olarak)
      else {
        return `min(${props.mapWidth}px, 100%)`;
      }
    }

    // SSR için px değerini kullan
    return `min(${props.mapWidth}px, 100%)`;
  };

  const containerStyle = {
    width: getMapWidth(),
    maxWidth: '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0 auto', // Center align
    height: props.mapHeight ? `${props.mapHeight}px` : '400px',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
  };

  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
    overflow: 'hidden',
  };

  // Custom CSS cleanup
  useEffect(() => {
    if (!props.customCSS) return;

    const styleId = `map-block-css-${props.id || 'default'}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = sanitizeCSS(props.customCSS);

    return () => {
      const el = document.getElementById(styleId);
      try {
        if (el && el.parentNode && el.parentNode.contains(el)) {
          el.parentNode.removeChild(el);
        }
      } catch (error) {
        // Sessizce yoksay
      }
    };
  }, [props.customCSS, props.id]);

  useEffect(() => {
    if (!mapRef.current || !props.latitude || !props.longitude) return;

    const currentRef = mapRef.current;
    const showMarker = props.marker !== false; // Varsayılan true

    // Google Maps veya OpenStreetMap entegrasyonu
    if (props.mapProvider === 'google') {
      // Google Maps API key'i environment variable'dan al
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      if (!apiKey) {
        logger.pageBuilder.warn('Google Maps API key bulunamadı. Lütfen NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable\'ını ayarlayın.');
        // React-safe DOM manipulation
        try {
          while (currentRef.firstChild) {
            currentRef.removeChild(currentRef.firstChild);
          }
          const placeholder = document.createElement('div');
          placeholder.className = 'flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg gap-2 p-4';
          placeholder.innerHTML = `
            <span class="text-gray-400 text-center">Google Maps API key gerekli</span>
            <span class="text-gray-500 text-xs text-center">.env.local dosyasına NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ekleyin</span>
          `;
          currentRef.appendChild(placeholder);
        } catch (error) {
          // Sessizce yoksay
        }
        return;
      }

      const iframe = document.createElement('iframe');
      // Marker gösterilecekse place mode, gösterilmeyecekse view mode kullan
      if (showMarker) {
        // Place mode - marker ile konum gösterir
        // Her zaman koordinat kullan (markerTitle sadece Google'ın bulamadığı yerlerde aranır)
        const query = `${props.latitude},${props.longitude}`;
        iframe.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=${props.zoom || 15}`;
      } else {
        // View mode - marker olmadan sadece harita
        iframe.src = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${props.latitude},${props.longitude}&zoom=${props.zoom || 15}&maptype=roadmap`;
      }
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.setAttribute('frameborder', '0');
      iframe.style.border = '0';
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

      // React-safe DOM manipulation
      try {
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild);
        }
        currentRef.appendChild(iframe);
      } catch (error) {
        // Sessizce yoksay
      }
    } else {
      // OpenStreetMap
      const iframe = document.createElement('iframe');
      const bbox = `${(props.longitude || 0) - 0.01},${(props.latitude || 0) - 0.01},${(props.longitude || 0) + 0.01},${(props.latitude || 0) + 0.01}`;

      // Marker gösterilecekse marker parametresi ekle
      if (showMarker) {
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${props.latitude},${props.longitude}`;
      } else {
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
      }
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.setAttribute('frameborder', '0');
      iframe.style.border = '0';
      iframe.setAttribute('loading', 'lazy');

      // React-safe DOM manipulation
      try {
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild);
        }
        currentRef.appendChild(iframe);
      } catch (error) {
        // Sessizce yoksay
      }
    }

    return () => {
      // Cleanup: Remove all children safely
      try {
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild);
        }
      } catch (error) {
        // Sessizce yoksay - ref zaten unmount olmuş olabilir
      }
    };
  }, [props.latitude, props.longitude, props.zoom, props.mapProvider, props.marker, props.markerTitle]);

  if (!props.latitude || !props.longitude) {
    return (
      <div
        className={`map-block ${props.className || ''}`}
        style={containerStyle}
        id={props.id}
        {...(props.dataAttributes || {})}
      >
        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-gray-400">Harita konumu belirtilmedi</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`map-block ${props.className || ''}`}
      style={containerStyle}
      id={props.id}
      {...(props.dataAttributes || {})}
    >
      <div ref={mapRef} style={mapStyle} />
    </div>
  );
}

const MapBlock = memo(MapBlockComponent);
export { MapBlock };

