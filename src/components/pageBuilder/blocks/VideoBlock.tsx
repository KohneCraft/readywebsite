'use client';

import { useState, memo, useEffect } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { sanitizeCSS } from '@/lib/sanitize';
import type { BlockProps } from '@/types/pageBuilder';

interface VideoBlockProps {
  props: BlockProps;
}

function VideoBlockComponent({ props }: VideoBlockProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const deviceType = useDeviceType();

  // Responsive padding
  const getPadding = () => {
    if (!props.padding) return '0';
    const scale = deviceType === 'mobile' ? 0.5 : deviceType === 'tablet' ? 0.75 : 1;
    return `${(props.padding.top || 0) * scale}px ${(props.padding.right || 0) * scale}px ${(props.padding.bottom || 0) * scale}px ${(props.padding.left || 0) * scale}px`;
  };

  // Yatay hizalama
  const getJustifyContent = () => {
    switch (props.textAlign) {
      case 'center': return 'center';
      case 'right': return 'flex-end';
      default: return 'flex-start';
    }
  };

  // Dikey hizalama
  const getAlignItems = () => {
    switch (props.verticalAlign) {
      case 'center': return 'center';
      case 'bottom': return 'flex-end';
      default: return 'flex-start';
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: getJustifyContent(),
    alignItems: getAlignItems(),
    width: '100%',
    maxWidth: props.maxWidth ? `${props.maxWidth}px` : '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0 auto',
    padding: getPadding(),
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
      try {
        if (el && el.parentNode && el.parentNode.contains(el)) {
          el.parentNode.removeChild(el);
        }
      } catch (error) {
        // Sessizce yoksay
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

