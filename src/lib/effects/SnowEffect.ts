// ============================================
// Snow Effect - Kar Yağışı
// ============================================

import { IEffectInstance, hexToRgba } from './base';
import type { SnowEffectSettings } from '@/types/effects';

interface Particle {
    x: number;
    y: number;
    radius: number;
    speed: number;
    wind: number;
    opacity: number;
}

export class SnowEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: SnowEffectSettings;
    private particles: Particle[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: SnowEffectSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    init(): void {
        this.particles = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * this.settings.size + 1,
                speed: Math.random() * this.settings.speed + 0.5,
                wind: (Math.random() - 0.5) * this.settings.wind,
                opacity: Math.random() * 0.5 + 0.5,
            });
        }
    }

    update(): void {
        this.particles.forEach(particle => {
            particle.y += particle.speed;
            particle.x += particle.wind;

            // Ekrandan çıkarsa yukarıdan tekrar başlat
            if (particle.y > this.canvas.height) {
                particle.y = -10;
                particle.x = Math.random() * this.canvas.width;
            }

            if (particle.x > this.canvas.width) {
                particle.x = 0;
            } else if (particle.x < 0) {
                particle.x = this.canvas.width;
            }
        });
    }

    render(): void {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = hexToRgba(this.settings.color, particle.opacity);
            this.ctx.fill();
        });
    }

    destroy(): void {
        this.particles = [];
    }
}
