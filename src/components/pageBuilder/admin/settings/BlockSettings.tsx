'use client';

// ============================================
// Vav Yapı - Block Settings
// Block ayarları paneli - block tipine göre değişir
// ============================================

import { useState, useEffect } from 'react';
import { getBlockById } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import { TextBlockSettings } from './blocks/TextBlockSettings';
import { HeadingBlockSettings } from './blocks/HeadingBlockSettings';
import { ImageBlockSettings } from './blocks/ImageBlockSettings';
import { VideoBlockSettings } from './blocks/VideoBlockSettings';
import { ButtonBlockSettings } from './blocks/ButtonBlockSettings';
import { SpacerBlockSettings } from './blocks/SpacerBlockSettings';
import { DividerBlockSettings } from './blocks/DividerBlockSettings';
import { FormBlockSettings } from './blocks/FormBlockSettings';
import { MapBlockSettings } from './blocks/MapBlockSettings';
import { HTMLBlockSettings } from './blocks/HTMLBlockSettings';
import { SliderBlockSettings } from './blocks/SliderBlockSettings';
import { Spinner } from '@/components/ui/Spinner';
import type { Block } from '@/types/pageBuilder';

interface BlockSettingsProps {
  blockId: string;
  activeTab: 'style' | 'settings' | 'advanced';
  onUpdate: (updates: Partial<Block>) => void;
  // Live preview için: pending updates ile birleştirilmiş block
  pendingBlock?: Partial<Block>;
}

export function BlockSettings({ blockId, activeTab, onUpdate, pendingBlock }: BlockSettingsProps) {
  const [fetchedBlock, setFetchedBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(!pendingBlock);

  useEffect(() => {
    // PendingBlock varsa ve tam bir block ise Firebase'den yüklemeye gerek yok
    if (pendingBlock && 'id' in pendingBlock && 'type' in pendingBlock) {
      setLoading(false);
      return;
    }

    async function loadBlock() {
      try {
        setLoading(true);
        const blockData = await getBlockById(blockId);
        setFetchedBlock(blockData);
      } catch (error) {
        logger.pageBuilder.error('Block yükleme hatası', error);
      } finally {
        setLoading(false);
      }
    }
    loadBlock();
  }, [blockId, pendingBlock]);

  // Kullanılacak block: pendingBlock varsa onu kullan, yoksa Firebase'den yüklenen
  // pendingBlock tam bir Block değilse, fetchedBlock ile birleştir
  const block: Block | null = (() => {
    if (pendingBlock && 'id' in pendingBlock && 'type' in pendingBlock) {
      return pendingBlock as Block;
    }
    if (fetchedBlock && pendingBlock) {
      return { ...fetchedBlock, ...pendingBlock } as Block;
    }
    return fetchedBlock;
  })();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!block) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        Block bulunamadı
      </div>
    );
  }

  // Block tipine göre settings component'i render et
  const renderBlockSettings = () => {
    switch (block.type) {
      case 'text':
        return (
          <TextBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'heading':
        return (
          <HeadingBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'image':
        return (
          <ImageBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'video':
        return (
          <VideoBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'button':
        return (
          <ButtonBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'spacer':
        return (
          <SpacerBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'divider':
        return (
          <DividerBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'form':
        return (
          <FormBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'map':
        return (
          <MapBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'html':
        return (
          <HTMLBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      case 'slider':
        return (
          <SliderBlockSettings
            block={block}
            activeTab={activeTab}
            onUpdate={(updates) => {
              const updated = { ...block, props: { ...block.props, ...updates } };
              onUpdate(updated);
            }}
          />
        );
      default:
        return (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            Bu blok tipi için ayarlar henüz eklenmedi
          </div>
        );
    }
  };

  return renderBlockSettings();
}
