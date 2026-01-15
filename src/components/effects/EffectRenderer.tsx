'use client';

// ============================================
// Effect Renderer - Canvas Based Effect Display
// ============================================

import { useEffect, useRef, useCallback } from 'react';
import { useEffects } from '@/hooks/useEffects';
import type { Effect, EffectType, EffectSettings } from '@/types/effects';
import type { IEffectInstance } from '@/lib/effects';
import {
    SnowEffect,
    ConfettiEffect,
    StarsEffect,
    BubblesEffect,
    RainEffect,
    FireworksEffect,
    SakuraEffect,
    SparklesEffect,
    HeartsEffect,
    AutumnLeavesEffect,
} from '@/lib/effects';

interface EffectRendererProps {
    pageId?: string | null;
}

/**
 * Efekt instance'ı oluştur
 */
export function createEffectInstance(
    effectName: EffectType,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    settings: EffectSettings
): IEffectInstance | null {
    switch (effectName) {
        case 'snow':
            return new SnowEffect(canvas, ctx, settings as any);
        case 'autumn-leaves':
            return new AutumnLeavesEffect(canvas, ctx, settings as any);
        case 'confetti':
            return new ConfettiEffect(canvas, ctx, settings as any);
        case 'stars':
            return new StarsEffect(canvas, ctx, settings as any);
        case 'fireworks':
            return new FireworksEffect(canvas, ctx, settings as any);
        case 'bubbles':
            return new BubblesEffect(canvas, ctx, settings as any);
        case 'sakura':
            return new SakuraEffect(canvas, ctx, settings as any);
        case 'rain':
            return new RainEffect(canvas, ctx, settings as any);
        case 'sparkles':
            return new SparklesEffect(canvas, ctx, settings as any);
        case 'hearts':
            return new HeartsEffect(canvas, ctx, settings as any);
        default:
            return null;
    }
}

export function EffectRenderer({ pageId = null }: EffectRendererProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const effectInstancesRef = useRef<IEffectInstance[]>([]);
    const animationFrameRef = useRef<number>();
    const { activeEffects, isLoading } = useEffects(pageId);

    // Canvas boyutlarını ayarla
    const resizeCanvas = useCallback(() => {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
    }, []);

    useEffect(() => {
        if (!canvasRef.current || isLoading || activeEffects.length === 0) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvas boyutlarını ayarla
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mevcut efekt instance'larını temizle
        effectInstancesRef.current.forEach((instance) => {
            if (instance && instance.destroy) {
                instance.destroy();
            }
        });
        effectInstancesRef.current = [];

        // Yeni efekt instance'larını oluştur
        activeEffects.forEach((effect: Effect) => {
            const instance = createEffectInstance(effect.name, canvas, ctx, effect.settings);
            if (instance) {
                instance.init();
                effectInstancesRef.current.push(instance);
            }
        });

        // Animasyon döngüsü
        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            effectInstancesRef.current.forEach((instance) => {
                if (instance && instance.update) {
                    instance.update();
                    instance.render();
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            effectInstancesRef.current.forEach((instance) => {
                if (instance && instance.destroy) {
                    instance.destroy();
                }
            });
            effectInstancesRef.current = [];
        };
    }, [activeEffects, isLoading, resizeCanvas]);

    // Efekt yoksa veya yükleniyorsa render etme
    if (isLoading || activeEffects.length === 0) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="effect-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
            aria-hidden="true"
        />
    );
}
