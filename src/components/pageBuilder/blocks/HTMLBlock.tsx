'use client';

import { useEffect, useRef } from 'react';
import type { BlockProps } from '@/types/pageBuilder';

interface HTMLBlockProps {
  props: BlockProps;
}

export function HTMLBlock({ props }: HTMLBlockProps) {
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
      let styleEl = document.getElementById(styleId);
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.innerHTML = props.css;
    }
    
    // Custom JavaScript çalıştır
    if (props.javascript) {
      try {
        // eslint-disable-next-line no-eval
        eval(props.javascript);
      } catch (error) {
        console.error('HTML Block JavaScript hatası:', error);
      }
    }
    
    return () => {
      // Cleanup
      if (props.css) {
        const styleId = `html-block-css-${props.id || 'default'}`;
        const styleEl = document.getElementById(styleId);
        if (styleEl) {
          styleEl.remove();
        }
      }
    };
  }, [props.css, props.javascript, props.id]);
  
  if (!props.css && !props.javascript) {
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
    >
      {props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: props.customCSS }} />
      )}
    </div>
  );
}

