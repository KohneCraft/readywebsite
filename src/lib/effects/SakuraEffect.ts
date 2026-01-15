// ============================================
// Sakura Effect - Kiraz Çiçekleri
// ============================================

import { IEffectInstance } from './base';
import type { SakuraSettings } from '@/types/effects';

interface Petal {
    x: number;
    y: number;
    size: number;
    speed: number;
    swing: number;
    swingSpeed: number;
    rotation: number;
    rotationSpeed: number;
}

export class SakuraEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: SakuraSettings;
    private petals: Petal[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: SakuraSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    private createPetal(): Petal {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * this.settings.speed + 0.5,
            swing: Math.random() * 2,
            swingSpeed: Math.random() * 0.05 + 0.01,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 5,
        };
    }

    init(): void {
        this.petals = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.petals.push(this.createPetal());
        }
    }

    update(): void {
        this.petals.forEach(petal => {
            petal.y += petal.speed;
            petal.swing += petal.swingSpeed;
            petal.x += Math.sin(petal.swing) * 2;

            if (this.settings.rotation) {
                petal.rotation += petal.rotationSpeed;
            }

            if (petal.y > this.canvas.height) {
                petal.y = -petal.size;
                petal.x = Math.random() * this.canvas.width;
            }
        });
    }

    render(): void {
        this.petals.forEach(petal => {
            this.ctx.save();
            this.ctx.translate(petal.x, petal.y);
            this.ctx.rotate((petal.rotation * Math.PI) / 180);

            // Çiçek yaprağı şekli (elips)
            this.ctx.fillStyle = this.settings.color;
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    destroy(): void {
        this.petals = [];
    }
}
