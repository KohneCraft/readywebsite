'use client';

import { useState, useEffect } from 'react';
import { TextBlock, HeadingBlock, ImageBlock, ButtonBlock } from '../blocks';
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
  video: () => <div>Video Block - Coming Soon</div>,
  button: ButtonBlock,
  spacer: () => <div>Spacer Block - Coming Soon</div>,
  divider: () => <div>Divider Block - Coming Soon</div>,
  form: () => <div>Form Block - Coming Soon</div>,
  map: () => <div>Map Block - Coming Soon</div>,
  html: () => <div>HTML Block - Coming Soon</div>,
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
        console.log(`BlockRenderer - Block yüklendi (${blockId}):`, blockData);
        if (!blockData) {
          console.warn(`Block bulunamadı: ${blockId}`);
        }
        setBlock(blockData);
      } catch (error) {
        console.error(`Block yükleme hatası (${blockId}):`, error);
      } finally {
        setLoading(false);
      }
    }
    loadBlock();
  }, [blockId]);
  
  // Intersection Observer for animations
  useEffect(() => {
    if (!block?.props?.animation?.enabled) return;
    
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
  }, [block, blockId]);
  
  // Loading durumunda hiçbir şey render etme (null uyarısını önlemek için)
  if (loading) {
    return null;
  }
  
  if (!block) {
    console.warn(`BlockRenderer - Block bulunamadı (${blockId})`);
    return null;
  }
  
  const BlockComponent = blockComponents[block.type];
  
  if (!BlockComponent) {
    console.warn(`Unknown block type: ${block.type}`);
    return null;
  }
  
  const animation = block.props?.animation;
  const animationClass = animation?.enabled && isVisible 
    ? `animate-${animation.type || 'fadeIn'}` 
    : '';
  
  const animationStyle = animation?.enabled ? {
    '--animation-duration': `${animation.duration || 0.5}s`,
    '--animation-delay': `${animation.delay || 0}s`
  } : {};
  
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

