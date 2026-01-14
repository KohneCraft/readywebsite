'use client';

import { useEffect, useRef, memo } from 'react';
import { sanitizeCSS, sanitizeHTML } from '@/lib/sanitize';
import { logger } from '@/lib/logger';
import type { BlockProps } from '@/types/pageBuilder';

interface HTMLBlockProps {
  props: BlockProps;
}

function HTMLBlockComponent({ props }: HTMLBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerStyle = {
    width: '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Custom CSS ekle
    if (props.css) {
      const styleId = `html-block-css-${props.id || 'default'}`;
      let styleEl = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = props.css;
    }

    // Custom JavaScript çalıştır
    if (props.javascript) {
      try {
        // eslint-disable-next-line no-eval
        eval(props.javascript);
      } catch (error) {
        logger.pageBuilder.error('HTML Block JavaScript hatası', error);
      }
    }

    return () => {
      // Cleanup
      if (props.css) {
        const styleId = `html-block-css-${props.id || 'default'}`;
        const styleEl = document.getElementById(styleId);
        try {
          if (styleEl && styleEl.parentNode && styleEl.parentNode.contains(styleEl)) {
            styleEl.parentNode.removeChild(styleEl);
          }
        } catch (error) {
          // Sessizce yoksay
        }
      }
    };
  }, [props.css, props.javascript, props.id]);

  // Custom CSS cleanup for customCSS prop (must be before early return)
  useEffect(() => {
    if (!props.customCSS) return;

    const styleId = `html-block-custom-css-${props.id || 'default'}`;
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

  // İçerik kontrolü - html, css veya javascript varsa render et
  if (!props.html && !props.css && !props.javascript) {
    return (
      <div
        ref={containerRef}
        className={`html-block ${props.className || ''}`}
        style={containerStyle}
        id={props.id}
        {...(props.dataAttributes || {})}
      >
        <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-gray-400">HTML içeriği eklenmedi</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`html-block ${props.className || ''}`}
      style={containerStyle}
      id={props.id}
      {...(props.dataAttributes || {})}
      dangerouslySetInnerHTML={{ __html: sanitizeHTML(props.html || '') }}
    />
  );
}

const HTMLBlock = memo(HTMLBlockComponent);
export { HTMLBlock };

