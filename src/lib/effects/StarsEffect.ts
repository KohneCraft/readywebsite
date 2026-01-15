// ============================================
// Stars Effect - Parlayan Yıldızlar
// ============================================

import { IEffectInstance, hexToRgba } from './base';
import type { StarsSettings } from '@/types/effects';

interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    twinkleSpeed: number;
    increasing: boolean;
}

export class StarsEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: StarsSettings;
    private stars: Star[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: StarsSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    init(): void {
        this.stars = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * this.settings.size + 1,
                opacity: Math.random(),
                twinkleSpeed: Math.random() * this.settings.twinkleSpeed + 0.5,
                increasing: Math.random() > 0.5,
            });
        }
    }

    update(): void {
        this.stars.forEach(star => {
            if (star.increasing) {
                star.opacity += 0.01 * star.twinkleSpeed;
                if (star.opacity >= 1) {
                    star.increasing = false;
                }
            } else {
                star.opacity -= 0.01 * star.twinkleSpeed;
                if (star.opacity <= 0.3) {
                    star.increasing = true;
                }
            }
        });
    }

    render(): void {
        this.stars.forEach(star => {
            // Ana yıldız
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = hexToRgba(this.settings.color, star.opacity);
            this.ctx.fill();

            // Parıltı efekti
            const gradient = this.ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.radius * 3
            );
            gradient.addColorStop(0, hexToRgba(this.settings.color, star.opacity * 0.5));
            gradient.addColorStop(1, hexToRgba(this.settings.color, 0));

            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }

    destroy(): void {
        this.stars = [];
    }
}
