'use client';

import { useMemo } from 'react';
import type { BlockProps, Breakpoint } from '@/types/pageBuilder';

interface TextBlockProps {
  props: BlockProps;
}

function getDeviceType(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function TextBlock({ props }: TextBlockProps) {
  const deviceType = useMemo(() => getDeviceType(), []);
  const responsiveProps = props.responsive?.[deviceType] || {};
  
  const style = {
    fontSize: responsiveProps.fontSize || props.fontSize || 16,
    fontFamily: props.fontFamily || 'inherit',
    fontWeight: props.fontWeight || 400,
    fontStyle: props.fontStyle || 'normal',
    color: props.color || '#333',
    backgroundColor: props.backgroundColor || 'transparent',
    textAlign: props.textAlign || 'left',
    lineHeight: props.lineHeight || 1.6,
    letterSpacing: `${props.letterSpacing || 0}px`,
    textDecoration: props.textDecoration || 'none',
    textTransform: props.textTransform || 'none',
    padding: props.padding 
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
    border: props.border?.width 
      ? `${props.border.width}px ${props.border.style} ${props.border.color}` 
      : 'none',
    boxShadow: props.boxShadow || 'none',
  };
  
  return (
    <div 
      className="text-block"
      style={style}
      dangerouslySetInnerHTML={{ __html: props.content || '' }}
    />
  );
}

