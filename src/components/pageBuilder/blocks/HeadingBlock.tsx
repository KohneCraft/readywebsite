'use client';

import { memo, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getLocalizedValue } from '@/types/localization';
import type { BlockProps } from '@/types/pageBuilder';
import type { Locale } from '@/i18n';

interface HeadingBlockProps {
  props: BlockProps;
}

function HeadingBlockComponent({ props }: HeadingBlockProps) {
  const locale = useLocale() as Locale;
  const Tag = (props.level || 'h2') as keyof JSX.IntrinsicElements;
  const deviceType = useDeviceType();

  // Locale'e göre içeriği al
  const content = useMemo(() =>
    getLocalizedValue(props.content, locale),
    [props.content, locale]
  );

  // Tema rengi
  const effectiveColor = useThemeColor({
    lightColor: props.color || '#1a1a1a',
    darkColor: props.colorDark || 'auto',
  });

  // Responsive font size: mobilde %70, tablette %85
  const baseFontSize = props.fontSize || 32;
  const responsiveFontSize = deviceType === 'mobile' ? baseFontSize * 0.7 :
    deviceType === 'tablet' ? baseFontSize * 0.85 :
      baseFontSize;

  // Responsive padding
  const getPadding = () => {
    if (!props.padding) return '0';
    const scale = deviceType === 'mobile' ? 0.6 : deviceType === 'tablet' ? 0.8 : 1;
    return `${(props.padding.top || 0) * scale}px ${(props.padding.right || 0) * scale}px ${(props.padding.bottom || 0) * scale}px ${(props.padding.left || 0) * scale}px`;
  };

  // Dikey hizalama
  const getAlignItems = () => {
    switch (props.verticalAlign) {
      case 'center': return 'center';
      case 'bottom': return 'flex-end';
      default: return 'flex-start';
    }
  };

  // Yatay hizalama
  const getJustifyContent = () => {
    switch (props.textAlign) {
      case 'center': return 'center';
      case 'right': return 'flex-end';
      default: return 'flex-start';
    }
  };

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: getAlignItems(),
    alignItems: getJustifyContent(),
    width: '100%',
    height: '100%',
  };

  const style: React.CSSProperties = {
    fontSize: responsiveFontSize,
    fontFamily: props.fontFamily || 'inherit',
    fontWeight: props.fontWeight || 700,
    color: effectiveColor || '#1a1a1a',
    backgroundColor: props.backgroundColor || 'transparent',
    backdropFilter: props.backgroundBlur ? `blur(${props.backgroundBlur}px)` : undefined,
    WebkitBackdropFilter: props.backgroundBlur ? `blur(${props.backgroundBlur}px)` : undefined,
    textAlign: (props.textAlign as React.CSSProperties['textAlign']) || 'left',
    lineHeight: props.lineHeight || 1.2,
    textTransform: props.textTransform || 'none',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.backgroundPadding
      ? `${props.backgroundPadding}px`
      : getPadding(),
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%',
  };

  // Data attributes'ları objeye çevir
  const dataAttrs = props.dataAttributes
    ? Object.entries(props.dataAttributes).reduce((acc, [key, value]) => ({
      ...acc,
      [`data-${key}`]: value,
    }), {} as Record<string, string>)
    : {};

  return (
    <div
      className={`heading-block-wrapper ${props.className || ''}`}
      style={wrapperStyle}
      id={props.id || undefined}
      {...dataAttrs}
    >
      {/* Özel CSS */}
      {props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: props.customCSS }} />
      )}
      <Tag className="heading-block" style={style}>
        {content}
      </Tag>
    </div>
  );
}

const HeadingBlock = memo(HeadingBlockComponent);
export { HeadingBlock };

