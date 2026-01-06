'use client';

import { memo, useEffect } from 'react';
import { sanitizeCSS } from '@/lib/sanitize';
import type { BlockProps } from '@/types/pageBuilder';

interface SpacerBlockProps {
  props: BlockProps;
}

function SpacerBlockComponent({ props }: SpacerBlockProps) {
  const height = props.spacerHeight || 50;
  
  const containerStyle = {
    width: '100%',
    height: `${height}px`,
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
  };
  
  // Custom CSS cleanup
  useEffect(() => {
    if (!props.customCSS) return;
    
    const styleId = `spacer-block-css-${props.id || 'default'}`;
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
  
  return (
    <div 
      className={`spacer-block ${props.className || ''}`}
      style={containerStyle}
      id={props.id}
      {...(props.dataAttributes || {})}
    />
  );
}

const SpacerBlock = memo(SpacerBlockComponent);
export { SpacerBlock };

