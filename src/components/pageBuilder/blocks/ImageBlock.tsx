'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import { useDeviceType } from '@/hooks/useDeviceType';
import type { BlockProps } from '@/types/pageBuilder';

interface ImageBlockProps {
  props: BlockProps;
}

function ImageBlockComponent({ props }: ImageBlockProps) {
  const [loaded, setLoaded] = useState(false);
  const deviceType = useDeviceType();

  // Responsive padding
  const getPadding = () => {
    if (!props.padding) return '0';
    const scale = deviceType === 'mobile' ? 0.5 : deviceType === 'tablet' ? 0.75 : 1;
    return `${(props.padding.top || 0) * scale}px ${(props.padding.right || 0) * scale}px ${(props.padding.bottom || 0) * scale}px ${(props.padding.left || 0) * scale}px`;
  };

  const containerStyle = {
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
          loading={props.priority ? "eager" : "lazy"}
          priority={props.priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
        />
      </ImageWrapper>
    </div>
  );
}

const ImageBlock = memo(ImageBlockComponent);
export { ImageBlock };

