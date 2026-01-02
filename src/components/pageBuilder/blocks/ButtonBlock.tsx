'use client';

import Link from 'next/link';
import type { BlockProps } from '@/types/pageBuilder';

interface ButtonBlockProps {
  props: BlockProps;
}

export function ButtonBlock({ props }: ButtonBlockProps) {
  const buttonStyle = {
    backgroundColor: props.backgroundColor || '#007bff',
    color: props.textColor || '#ffffff',
    fontSize: `${props.fontSize || 16}px`,
    fontWeight: props.fontWeight || 600,
    fontFamily: props.fontFamily || 'inherit',
    padding: props.padding
      ? `${props.padding.top || 12}px ${props.padding.right || 24}px ${props.padding.bottom || 12}px ${props.padding.left || 24}px`
      : '12px 24px',
    borderRadius: `${props.borderRadius || 6}px`,
    border: props.border?.width 
      ? `${props.border.width}px ${props.border.style} ${props.border.color}` 
      : 'none',
    width: props.buttonWidth === 'full' ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };
  
  const containerStyle = {
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    textAlign: props.textAlign || 'left',
  };
  
  const buttonContent = (
    <>
      {props.icon?.enabled && props.icon.position === 'left' && (
        <span>{props.icon.name}</span>
      )}
      <span>{props.text || 'Button'}</span>
      {props.icon?.enabled && props.icon.position === 'right' && (
        <span>{props.icon.name}</span>
      )}
    </>
  );
  
  if (props.link && props.link !== '#') {
    return (
      <div className="button-block" style={containerStyle}>
        <Link
          href={props.link}
          target={props.target || '_self'}
          rel={props.target === '_blank' ? 'noopener noreferrer' : undefined}
          className={`button button-${props.buttonStyle || 'primary'} button-${props.size || 'medium'}`}
          style={buttonStyle}
        >
          {buttonContent}
        </Link>
      </div>
    );
  }
  
  return (
    <div className="button-block" style={containerStyle}>
      <button
        className={`button button-${props.style || 'primary'} button-${props.size || 'medium'}`}
        style={buttonStyle}
      >
        {buttonContent}
      </button>
    </div>
  );
}

