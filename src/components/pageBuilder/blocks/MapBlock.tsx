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
  
  const containerStyle = {
    width: '100%',
    height: props.mapHeight ? `${props.mapHeight}px` : '400px',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
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
  
  useEffect(() => {
    if (!mapRef.current || !props.latitude || !props.longitude) return;
    
    // Google Maps veya OpenStreetMap entegrasyonu
    if (props.mapProvider === 'google') {
      // Google Maps API key'i environment variable'dan al
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      if (!apiKey) {
        logger.pageBuilder.warn('Google Maps API key bulunamadı. Lütfen NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable\'\u0131nı ayarlayın.');
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg"><span class="text-gray-400">Google Maps API key gerekli</span></div>';
        }
        return;
      }
      
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${props.latitude},${props.longitude}&zoom=${props.zoom || 15}`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.setAttribute('frameborder', '0');
      iframe.style.border = '0';
      iframe.setAttribute('allowfullscreen', 'true');
      
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    } else {
      // OpenStreetMap
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${(props.longitude || 0) - 0.01},${(props.latitude || 0) - 0.01},${(props.longitude || 0) + 0.01},${(props.latitude || 0) + 0.01}&layer=mapnik&marker=${props.latitude},${props.longitude}`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.setAttribute('frameborder', '0');
      iframe.style.border = '0';
      
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    }
  }, [props.latitude, props.longitude, props.zoom, props.mapProvider]);
  
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
      {props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: sanitizeCSS(props.customCSS) }} />
      )}
    </div>
  );
}

const MapBlock = memo(MapBlockComponent);
export { MapBlock };

