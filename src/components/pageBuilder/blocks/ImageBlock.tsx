'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BlockProps } from '@/types/pageBuilder';

interface ImageBlockProps {
  props: BlockProps;
}

export function ImageBlock({ props }: ImageBlockProps) {
  const [loaded, setLoaded] = useState(false);
  
  const containerStyle = {
    width: props.imageWidth || '100%',
    maxWidth: props.maxWidth ? `${props.maxWidth}px` : '100%',
    margin: props.margin
      ? `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px`
      : '0',
    padding: props.padding
      ? `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px`
      : '0',
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
          loading="lazy"
          unoptimized
        />
      </ImageWrapper>
    </div>
  );
}

