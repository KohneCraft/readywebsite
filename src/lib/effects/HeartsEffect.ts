// ============================================
// Hearts Effect - Uçan Kalpler
// ============================================

import { IEffectInstance, hexToRgba } from './base';
import type { HeartsSettings } from '@/types/effects';

interface Heart {
    x: number;
    y: number;
    size: number;
    speed: number;
    swing: number;
    swingSpeed: number;
    color: string;
    opacity: number;
}

export class HeartsEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: HeartsSettings;
    private hearts: Heart[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: HeartsSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    private createHeart(): Heart {
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + Math.random() * 100,
            size: Math.random() * 20 + 15,
            speed: Math.random() * this.settings.speed + 0.5,
            swing: Math.random() * Math.PI * 2,
            swingSpeed: Math.random() * 0.05 + 0.02,
            color: this.settings.colors[Math.floor(Math.random() * this.settings.colors.length)],
            opacity: Math.random() * 0.3 + 0.7,
        };
    }

    init(): void {
        this.hearts = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.hearts.push(this.createHeart());
        }
    }

    update(): void {
        this.hearts.forEach(heart => {
            heart.y -= heart.speed;
            heart.swing += heart.swingSpeed;
            heart.x += Math.sin(heart.swing) * 2;

            if (heart.y + heart.size < 0) {
                heart.y = this.canvas.height + heart.size;
                heart.x = Math.random() * this.canvas.width;
            }
        });
    }

    render(): void {
        this.hearts.forEach(heart => {
            this.ctx.save();
            this.ctx.translate(heart.x, heart.y);
            this.ctx.scale(heart.size / 20, heart.size / 20);

            // Kalp şekli çiz
            this.ctx.fillStyle = hexToRgba(heart.color, heart.opacity);
            this.ctx.beginPath();
            this.ctx.moveTo(0, 3);
            this.ctx.bezierCurveTo(-5, -3, -10, 1, 0, 10);
            this.ctx.bezierCurveTo(10, 1, 5, -3, 0, 3);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    destroy(): void {
        this.hearts = [];
    }
}
