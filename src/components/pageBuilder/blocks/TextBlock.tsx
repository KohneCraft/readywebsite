'use client';

import { memo } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import type { BlockProps } from '@/types/pageBuilder';

interface TextBlockProps {
  props: BlockProps;
}

function TextBlockComponent({ props }: TextBlockProps) {
  const deviceType = useDeviceType();
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

const TextBlock = memo(TextBlockComponent);
export { TextBlock };
