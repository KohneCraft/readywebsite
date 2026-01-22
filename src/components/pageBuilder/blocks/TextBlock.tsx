'use client';

import { memo, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useThemeColors } from '@/hooks/useThemeColor';
import { sanitizeHTML } from '@/lib/sanitize';
import { getLocalizedValue } from '@/types/localization';
import type { BlockProps } from '@/types/pageBuilder';
import type { Locale } from '@/i18n';

interface TextBlockProps {
  props: BlockProps;
}

function TextBlockComponent({ props }: TextBlockProps) {
  const locale = useLocale() as Locale;
  const deviceType = useDeviceType();
  const responsiveProps = props.responsive?.[deviceType] || {};

  // Tema renkleri
  const colors = useThemeColors({
    text: { light: props.color || '#333', dark: props.colorDark || 'auto' },
    bg: { light: props.backgroundColor || 'transparent', dark: props.backgroundColorDark || 'auto' },
  });

  // Locale'e göre içeriği al
  const content = useMemo(() =>
    getLocalizedValue(props.content, locale),
    [props.content, locale]
  );

  // İçeriği sanitize et (XSS koruması)
  const sanitizedContent = useMemo(() =>
    sanitizeHTML(content || ''),
    [content]
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
    fontWeight: props.fontWeight || 400,
    fontStyle: props.fontStyle || 'normal',
    color: colors.text || '#333',
    backgroundColor: colors.bg || 'transparent',
    backdropFilter: props.backgroundBlur ? `blur(${props.backgroundBlur}px)` : undefined,
    WebkitBackdropFilter: props.backgroundBlur ? `blur(${props.backgroundBlur}px)` : undefined,
    textAlign: (props.textAlign as React.CSSProperties['textAlign']) || 'left',
    lineHeight: props.lineHeight || 1.6,
    letterSpacing: `${props.letterSpacing || 0}px`,
    textDecoration: props.textDecoration || 'none',
    textTransform: props.textTransform || 'none',
    padding: props.backgroundPadding
      ? `${props.backgroundPadding}px`
      : getPadding(),
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

  // Data attributes'ları objeye çevir
  const dataAttrs = props.dataAttributes
    ? Object.entries(props.dataAttributes).reduce((acc, [key, value]) => ({
      ...acc,
      [`data-${key}`]: value,
    }), {} as Record<string, string>)
    : {};

  // Özel CSS'i scope'la - blok ID'si veya className ile
  const scopedCSS = props.customCSS
    ? props.customCSS
      // .text-block seçicisini otomatik olarak güçlendir
      .replace(/\.text-block\s*\{/g, `.text-block-wrapper${props.className ? '.' + props.className : ''} .text-block {`)
    : '';

  return (
    <div
      className={`text-block-wrapper ${props.className || ''}`}
      style={wrapperStyle}
      id={props.id || undefined}
      {...dataAttrs}
    >
      {/* Özel CSS - Scope'lanmış */}
      {scopedCSS && (
        <style dangerouslySetInnerHTML={{ __html: scopedCSS }} />
      )}
      <div
        className={`text-block ${props.className || ''}`}
        style={style}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}

const TextBlock = memo(TextBlockComponent);
export { TextBlock };

