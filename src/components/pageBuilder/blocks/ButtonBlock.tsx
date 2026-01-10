'use client';

import { memo } from 'react';
import Link from 'next/link';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useThemeColors } from '@/hooks/useThemeColor';
import type { BlockProps } from '@/types/pageBuilder';

interface ButtonBlockProps {
  props: BlockProps;
}

function ButtonBlockComponent({ props }: ButtonBlockProps) {
  const deviceType = useDeviceType();

  // Tema renkleri
  const colors = useThemeColors({
    bg: { light: props.backgroundColor || '#007bff', dark: props.backgroundColorDark || 'auto' },
    text: { light: props.textColor || '#ffffff', dark: props.textColorDark || 'auto' },
  });

  // Responsive font size and padding
  const baseFontSize = props.fontSize || 16;
  const responsiveFontSize = deviceType === 'mobile' ? baseFontSize * 0.85 : baseFontSize;

  const getPadding = () => {
    if (props.padding) {
      const scale = deviceType === 'mobile' ? 0.75 : deviceType === 'tablet' ? 0.9 : 1;
      return `${(props.padding.top || 12) * scale}px ${(props.padding.right || 24) * scale}px ${(props.padding.bottom || 12) * scale}px ${(props.padding.left || 24) * scale}px`;
    }
    return deviceType === 'mobile' ? '10px 18px' : '12px 24px';
  };

  const buttonStyle = {
    backgroundColor: colors.bg || '#007bff',
    color: colors.text || '#ffffff',
    fontSize: `${responsiveFontSize}px`,
    fontWeight: props.fontWeight || 600,
    fontFamily: props.fontFamily || 'inherit',
    padding: getPadding(),
    borderRadius: `${props.borderRadius || 6}px`,
    border: props.border?.width
      ? `${props.border.width}px ${props.border.style} ${props.border.color}`
      : 'none',
    width: props.buttonWidth === 'full' || deviceType === 'mobile' ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: deviceType === 'mobile' ? '100%' : 'auto',
  };

  // Yatay hizalama: left, center, right -> flex-start, center, flex-end
  const getJustifyContent = () => {
    switch (props.textAlign) {
      case 'center': return 'center';
      case 'right': return 'flex-end';
      default: return 'flex-start';
    }
  };

  // Dikey hizalama: top, center, bottom -> flex-start, center, flex-end
  const getAlignItems = () => {
    switch (props.verticalAlign) {
      case 'center': return 'center';
      case 'bottom': return 'flex-end';
      default: return 'flex-start';
    }
  };

  const containerStyle: React.CSSProperties = {
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    display: 'flex',
    justifyContent: getJustifyContent(),
    alignItems: getAlignItems(),
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

const ButtonBlock = memo(ButtonBlockComponent);
export { ButtonBlock };

