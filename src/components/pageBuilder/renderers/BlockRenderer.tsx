'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  TextBlock,
  HeadingBlock,
  ImageBlock,
  VideoBlock,
  ButtonBlock,
  SpacerBlock,
  DividerBlock,
  FormBlock,
  MapBlock,
  HTMLBlock,
  SliderBlock
} from '../blocks';
import { getBlockById } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import type { Block, BlockType } from '@/types/pageBuilder';

interface BlockRendererProps {
  blockId: string;
  index: number;
  // Opsiyonel: Live preview için pending updates ile merge edilmiş block
  block?: Block;
}

const blockComponents: Record<BlockType, React.ComponentType<{ props: Block['props'] }>> = {
  text: TextBlock,
  heading: HeadingBlock,
  image: ImageBlock,
  video: VideoBlock,
  button: ButtonBlock,
  spacer: SpacerBlock,
  divider: DividerBlock,
  form: FormBlock,
  map: MapBlock,
  html: HTMLBlock,
  slider: SliderBlock,
};

export function BlockRenderer({ blockId, index, block: propBlock }: BlockRendererProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const [fetchedBlock, setFetchedBlock] = useState<Block | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(!propBlock); // propBlock varsa loading gerek yok

  // Kullanılacak block: propBlock varsa onu kullan, yoksa Firebase'den yüklenen
  const block = propBlock || fetchedBlock;

  useEffect(() => {
    // Eğer propBlock varsa Firebase'den yüklemeye gerek yok
    if (propBlock) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadBlock() {
      try {
        setLoading(true);
        const blockData = await getBlockById(blockId);
        if (!isMounted) return;

        logger.pageBuilder.debug(`Block yüklendi (${blockId})`, blockData);
        if (!blockData) {
          logger.pageBuilder.warn(`Block bulunamadı: ${blockId}`);
        }
        setFetchedBlock(blockData);
      } catch (error) {
        if (!isMounted) return;
        logger.pageBuilder.error(`Block yükleme hatası (${blockId})`, error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadBlock();

    return () => {
      isMounted = false;
    };
  }, [blockId, propBlock]);

  // Animation hesaplamaları - early return'lerden önce
  const animation = block?.props?.animation;
  const animationClass = useMemo(() =>
    animation?.enabled && isVisible
      ? `animate-${animation.type || 'fadeIn'}`
      : ''
    , [animation, isVisible]);

  const animationStyle = useMemo(() => animation?.enabled ? {
    '--animation-duration': `${animation.duration || 0.5}s`,
    '--animation-delay': `${animation.delay || 0}s`
  } : {}, [animation]);

  // Intersection Observer for animations
  useEffect(() => {
    if (!animation || !animation.enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = blockRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [animation]);

  // Loading state - skeleton placeholder
  if (loading) {
    return (
      <div className="block-renderer-skeleton animate-pulse">
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    );
  }

  // Error state - block not found
  if (!block) {
    logger.pageBuilder.warn(`Block bulunamadı (${blockId})`);
    return (
      <div className="block-renderer-error text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        Block yüklenemedi
      </div>
    );
  }

  const BlockComponent = blockComponents[block.type];

  // Error state - unknown block type
  if (!BlockComponent) {
    logger.pageBuilder.warn(`Unknown block type: ${block.type}`);
    return (
      <div className="block-renderer-error text-center py-4 text-red-500 dark:text-red-400 text-sm">
        Bilinmeyen block tipi: {block.type}
      </div>
    );
  }

  // Custom CSS ve Data Attributes
  const customClassName = block.props?.className || '';
  const customId = block.props?.id || `block-${blockId}`;
  const dataAttributes = block.props?.dataAttributes || {};
  const customCSS = block.props?.customCSS || '';

  // Data attributes'ları obje olarak hazırla
  const dataProps: Record<string, string> = {};
  if (dataAttributes && typeof dataAttributes === 'object') {
    Object.entries(dataAttributes).forEach(([key, value]) => {
      dataProps[`data-${key.replace(/^data-/, '')}`] = String(value);
    });
  }

  return (
    <>
      {/* Custom CSS - scoped to this block */}
      {customCSS && (
        <style dangerouslySetInnerHTML={{ __html: `#${customId} { ${customCSS} }` }} />
      )}
      <div
        ref={blockRef}
        id={customId}
        className={`block-renderer block-${block.type} ${customClassName} ${animationClass}`.trim()}
        style={animationStyle as React.CSSProperties}
        data-block-index={index ?? 0}
        {...dataProps}
      >
        <BlockComponent props={block.props} />
      </div>
    </>
  );
}

