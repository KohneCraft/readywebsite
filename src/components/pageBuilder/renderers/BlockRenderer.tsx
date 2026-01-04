'use client';

import { useState, useEffect, useMemo } from 'react';
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
  HTMLBlock
} from '../blocks';
import { getBlockById } from '@/lib/firebase/firestore';
import type { Block, BlockType } from '@/types/pageBuilder';

interface BlockRendererProps {
  blockId: string;
  index: number;
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
};

export function BlockRenderer({ blockId, index }: BlockRendererProps) {
  const [block, setBlock] = useState<Block | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadBlock() {
      try {
        setLoading(true);
        const blockData = await getBlockById(blockId);
        if (process.env.NODE_ENV === 'development') {
          console.log(`BlockRenderer - Block yüklendi (${blockId}):`, blockData);
        }
        if (!blockData) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Block bulunamadı: ${blockId}`);
          }
        }
        setBlock(blockData);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Block yükleme hatası (${blockId}):`, error);
        }
      } finally {
        setLoading(false);
      }
    }
    loadBlock();
  }, [blockId]);
  
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
    
    const element = document.getElementById(`block-${blockId}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, [animation, blockId]);
  
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
    if (process.env.NODE_ENV === 'development') {
      console.warn(`BlockRenderer - Block bulunamadı (${blockId})`);
    }
    return (
      <div className="block-renderer-error text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        Block yüklenemedi
      </div>
    );
  }
  
  const BlockComponent = blockComponents[block.type];
  
  // Error state - unknown block type
  if (!BlockComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Unknown block type: ${block.type}`);
    }
    return (
      <div className="block-renderer-error text-center py-4 text-red-500 dark:text-red-400 text-sm">
        Bilinmeyen block tipi: {block.type}
      </div>
    );
  }
  
  return (
    <div 
      id={`block-${blockId}`}
      className={`block-renderer block-${block.type} ${animationClass}`}
      style={animationStyle as React.CSSProperties}
      data-block-index={index ?? 0}
    >
      <BlockComponent props={block.props} />
    </div>
  );
}

