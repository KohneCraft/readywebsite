'use client';

import { memo } from 'react';
import type { BlockProps } from '@/types/pageBuilder';

interface DividerBlockProps {
  props: BlockProps;
}

function DividerBlockComponent({ props }: DividerBlockProps) {
  const height = props.dividerHeight || 1;
  const color = props.dividerColor || '#e5e7eb';
  const style = props.dividerStyle || 'solid';
  
  const containerStyle = {
    width: '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
  };
  
  const dividerStyle = {
    width: '100%',
    height: `${height}px`,
    border: 'none',
    borderTop: `${height}px ${style} ${color}`,
    backgroundColor: style === 'solid' ? color : 'transparent',
    backgroundImage: style === 'dashed' ? `repeating-linear-gradient(90deg, ${color} 0, ${color} 10px, transparent 10px, transparent 20px)` : 
                     style === 'dotted' ? `radial-gradient(circle, ${color} 1px, transparent 1px)` : 'none',
    backgroundSize: style === 'dashed' ? '20px 100%' : style === 'dotted' ? '10px 10px' : 'auto',
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
  };
  
  return (
    <div 
      className={`divider-block ${props.className || ''}`}
      style={containerStyle}
      id={props.id}
      {...(props.dataAttributes || {})}
    >
      <hr style={dividerStyle} />
      {props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: props.customCSS }} />
      )}
    </div>
  );
}

const DividerBlock = memo(DividerBlockComponent);
export { DividerBlock };

