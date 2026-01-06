'use client';

import { useState, memo, useEffect } from 'react';
import { sanitizeCSS } from '@/lib/sanitize';
import type { BlockProps } from '@/types/pageBuilder';

interface VideoBlockProps {
  props: BlockProps;
}

function VideoBlockComponent({ props }: VideoBlockProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const containerStyle = {
    width: props.imageWidth || '100%',
    maxWidth: props.maxWidth ? `${props.maxWidth}px` : '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
  };
  
  const videoStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
    transition: 'opacity 0.3s ease',
    opacity: loaded ? 1 : 0,
  };
  
  // Custom CSS cleanup
  useEffect(() => {
    if (!props.customCSS) return;
    
    const styleId = `video-block-css-${props.id || 'default'}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = sanitizeCSS(props.customCSS);
    
    return () => {
      const el = document.getElementById(styleId);
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [props.customCSS, props.id]);
  
  if (!props.src) {
    return (
      <div className="video-block" style={containerStyle}>
        <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-gray-400">Video yüklenmedi</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="video-block" style={containerStyle}>
      <div 
        className="video-wrapper relative"
        style={{
          borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
          overflow: 'hidden',
        }}
      >
        {error ? (
          <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-400">Video yüklenemedi</span>
          </div>
        ) : (
          <video
            src={props.src}
            title={props.alt || ''}
            aria-label={props.alt || 'Video'}
            style={videoStyle}
            onLoadedData={() => setLoaded(true)}
            onError={() => setError(true)}
            controls={props.controls !== false}
            autoPlay={props.autoplay || false}
            loop={props.loop || false}
            muted={props.muted !== false}
            playsInline={props.playsInline !== false}
            className={props.className}
            id={props.id}
            {...(props.dataAttributes || {})}
          />
        )}
      </div>
    </div>
  );
}

const VideoBlock = memo(VideoBlockComponent);
export { VideoBlock };

