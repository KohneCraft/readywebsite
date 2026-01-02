'use client';

import type { BlockProps } from '@/types/pageBuilder';

interface HeadingBlockProps {
  props: BlockProps;
}

export function HeadingBlock({ props }: HeadingBlockProps) {
  const Tag = (props.level || 'h2') as keyof JSX.IntrinsicElements;
  
  const style = {
    fontSize: props.fontSize || 32,
    fontFamily: props.fontFamily || 'inherit',
    fontWeight: props.fontWeight || 700,
    color: props.color || '#1a1a1a',
    textAlign: props.textAlign || 'left',
    lineHeight: props.lineHeight || 1.2,
    textTransform: props.textTransform || 'none',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
  };
  
  return (
    <Tag className="heading-block" style={style}>
      {props.content}
    </Tag>
  );
}

