// ============================================
// Bubbles Effect - Kabarcıklar
// ============================================

import { IEffectInstance } from './base';
import type { BubblesSettings } from '@/types/effects';

interface Bubble {
    x: number;
    y: number;
    radius: number;
    speed: number;
    wobble: number;
    wobbleSpeed: number;
}

export class BubblesEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: BubblesSettings;
    private bubbles: Bubble[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: BubblesSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    init(): void {
        this.bubbles = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.bubbles.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height + Math.random() * 100,
                radius: Math.random() * this.settings.size + 10,
                speed: Math.random() * this.settings.speed + 0.5,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.05 + 0.01,
            });
        }
    }

    update(): void {
        this.bubbles.forEach(bubble => {
            bubble.y -= bubble.speed;
            bubble.wobble += bubble.wobbleSpeed;
            bubble.x += Math.sin(bubble.wobble) * 2;

            if (bubble.y + bubble.radius < 0) {
                bubble.y = this.canvas.height + bubble.radius;
                bubble.x = Math.random() * this.canvas.width;
            }
        });
    }

    render(): void {
        this.bubbles.forEach(bubble => {
            // Ana kabarcık
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);

            const gradient = this.ctx.createRadialGradient(
                bubble.x - bubble.radius * 0.3,
                bubble.y - bubble.radius * 0.3,
                0,
                bubble.x,
                bubble.y,
                bubble.radius
            );

            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.settings.opacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.settings.opacity * 0.4})`);
            gradient.addColorStop(1, `rgba(200, 230, 255, ${this.settings.opacity * 0.2})`);

            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Parıltı
            this.ctx.beginPath();
            this.ctx.arc(
                bubble.x - bubble.radius * 0.4,
                bubble.y - bubble.radius * 0.4,
                bubble.radius * 0.2,
                0,
                Math.PI * 2
            );
            this.ctx.fillStyle = `rgba(255, 255, 255, ${this.settings.opacity})`;
            this.ctx.fill();
        });
    }

    destroy(): void {
        this.bubbles = [];
    }
}
