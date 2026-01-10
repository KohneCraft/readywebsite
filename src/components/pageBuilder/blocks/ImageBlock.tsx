'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import { useDeviceType } from '@/hooks/useDeviceType';
import type { BlockProps } from '@/types/pageBuilder';

interface ImageBlockProps {
  props: BlockProps;
  priority?: boolean; // LCP görselleri için öncelikli yükleme
}

function ImageBlockComponent({ props, priority = false }: ImageBlockProps) {
  const [loaded, setLoaded] = useState(false);
  const deviceType = useDeviceType();

  // Responsive padding
  const getPadding = () => {
    if (!props.padding) return '0';
    const scale = deviceType === 'mobile' ? 0.5 : deviceType === 'tablet' ? 0.75 : 1;
    return `${(props.padding.top || 0) * scale}px ${(props.padding.right || 0) * scale}px ${(props.padding.bottom || 0) * scale}px ${(props.padding.left || 0) * scale}px`;
  };

  // Yatay hizalama
  const getJustifyContent = () => {
    switch (props.textAlign) {
      case 'center': return 'center';
      case 'right': return 'flex-end';
      default: return 'flex-start';
    }
  };

  // Dikey hizalama
  const getAlignItems = () => {
    switch (props.verticalAlign) {
      case 'center': return 'center';
      case 'bottom': return 'flex-end';
      default: return 'flex-start';
    }
  };

  const containerStyle: React.CSSProperties = {
    display: (props.textAlign || props.verticalAlign) ? 'flex' : 'block',
    justifyContent: getJustifyContent(),
    alignItems: getAlignItems(),
    width: '100%',
    maxWidth: props.maxWidth ? `${props.maxWidth}px` : '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0 auto',
    padding: getPadding(),
  };

  const imageStyle = {
    width: '100%',
    height: props.imageHeight || 'auto',
    objectFit: props.objectFit || 'cover',
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
    filter: props.filter
      ? `brightness(${props.filter.brightness || 100}%) contrast(${props.filter.contrast || 100}%) saturate(${props.filter.saturate || 100}%) grayscale(${props.filter.grayscale || 0}%) blur(${props.filter.blur || 0}px)`
      : 'none',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    opacity: loaded ? 1 : 0,
  };

  const ImageWrapper = props.link ? 'a' : 'div';
  const wrapperProps = props.link ? {
    href: props.link,
    target: props.linkTarget || '_self',
    rel: props.linkTarget === '_blank' ? 'noopener noreferrer' : undefined,
  } : {};

  if (!props.src) {
    return (
      <div className="image-block" style={containerStyle}>
        <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-gray-400">Görsel yüklenmedi</span>
        </div>
      </div>
    );
  }

  // Responsive sizes için dinamik hesaplama
  const getSizes = () => {
    if (props.maxWidth) {
      return `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, ${props.maxWidth}px`;
    }
    return '(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 100vw';
  };

  return (
    <div className="image-block" style={containerStyle}>
      <ImageWrapper {...wrapperProps} className="image-wrapper block">
        <Image
          src={props.src}
          alt={props.alt || ''}
          width={800}
          height={600}
          style={imageStyle}
          onLoad={() => setLoaded(true)}
          loading={priority ? undefined : "lazy"}
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=="
          sizes={getSizes()}
          unoptimized
        />
      </ImageWrapper>
    </div>
  );
}

const ImageBlock = memo(ImageBlockComponent);
export { ImageBlock };

