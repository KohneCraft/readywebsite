'use client';

import { memo, useMemo } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { sanitizeHTML } from '@/lib/sanitize';
import type { BlockProps } from '@/types/pageBuilder';

interface TextBlockProps {
  props: BlockProps;
}

function TextBlockComponent({ props }: TextBlockProps) {
  const deviceType = useDeviceType();
  const responsiveProps = props.responsive?.[deviceType] || {};
  
  // İçeriği sanitize et (XSS koruması)
  const sanitizedContent = useMemo(() => 
    sanitizeHTML(props.content || ''), 
    [props.content]
  );
  
  // Responsive font size: mobilde %80, tablette %90
  const baseFontSize = props.fontSize || 16;
  const responsiveFontSize = responsiveProps.fontSize || 
    (deviceType === 'mobile' ? baseFontSize * 0.8 : 
     deviceType === 'tablet' ? baseFontSize * 0.9 : 
     baseFontSize);
  
  // Responsive padding: mobil ve tablette daha az padding
  const getPadding = () => {
    if (!props.padding) return '0';
    const scale = deviceType === 'mobile' ? 0.6 : deviceType === 'tablet' ? 0.8 : 1;
    return `${(props.padding.top || 0) * scale}px ${(props.padding.right || 0) * scale}px ${(props.padding.bottom || 0) * scale}px ${(props.padding.left || 0) * scale}px`;
  };
  
  const style: React.CSSProperties = {
    fontSize: responsiveFontSize,
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
    padding: getPadding(),
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
    border: props.border?.width 
      ? `${props.border.width}px ${props.border.style} ${props.border.color}` 
      : 'none',
    boxShadow: props.boxShadow || 'none',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%',
  };
  
  return (
    <div 
      className="text-block"
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

const TextBlock = memo(TextBlockComponent);
export { TextBlock };
