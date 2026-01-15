// ============================================
// Rain Effect - Yağmur
// ============================================

import { IEffectInstance } from './base';
import type { RainSettings } from '@/types/effects';

interface Drop {
    x: number;
    y: number;
    length: number;
    speed: number;
    wind: number;
}

export class RainEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: RainSettings;
    private drops: Drop[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: RainSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    private createDrop(): Drop {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * this.settings.speed + 3,
            wind: this.settings.wind,
        };
    }

    init(): void {
        this.drops = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.drops.push(this.createDrop());
        }
    }

    update(): void {
        this.drops.forEach(drop => {
            drop.y += drop.speed;
            drop.x += drop.wind;

            if (drop.y > this.canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * this.canvas.width;
            }
        });
    }

    render(): void {
        this.ctx.strokeStyle = this.settings.color;
        this.ctx.lineWidth = 1;

        this.drops.forEach(drop => {
            this.ctx.beginPath();
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(drop.x, drop.y + drop.length);
            this.ctx.stroke();
        });
    }

    destroy(): void {
        this.drops = [];
    }
}
