'use client';

import { memo } from 'react';
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
  
  return (
    <div 
      className={`spacer-block ${props.className || ''}`}
      style={containerStyle}
      id={props.id}
      {...(props.dataAttributes || {})}
    >
      {props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: sanitizeCSS(props.customCSS) }} />
      )}
    </div>
  );
}

const SpacerBlock = memo(SpacerBlockComponent);
export { SpacerBlock };

