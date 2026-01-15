// ============================================
// Sparkles Effect - Parıltılar (Mouse Takipli)
// ============================================

import { IEffectInstance, hexToRgba } from './base';
import type { SparklesSettings } from '@/types/effects';

interface Sparkle {
    x: number;
    y: number;
    size: number;
    life: number;
    maxLife: number;
    vx: number;
    vy: number;
}

export class SparklesEffect implements IEffectInstance {
    private ctx: CanvasRenderingContext2D;
    private settings: SparklesSettings;
    private sparkles: Sparkle[] = [];
    private mouseX: number = 0;
    private mouseY: number = 0;
    private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

    constructor(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: SparklesSettings) {
        this.ctx = ctx;
        this.settings = settings;
    }

    init(): void {
        this.sparkles = [];

        // Mouse hareketini dinle
        this.mouseMoveHandler = (e: MouseEvent) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            // Yeni parıltılar oluştur
            if (this.settings.trail) {
                for (let i = 0; i < 3; i++) {
                    this.sparkles.push({
                        x: this.mouseX + (Math.random() - 0.5) * 20,
                        y: this.mouseY + (Math.random() - 0.5) * 20,
                        size: Math.random() * this.settings.size + 2,
                        life: this.settings.lifetime,
                        maxLife: this.settings.lifetime,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                    });
                }
            }
        };

        window.addEventListener('mousemove', this.mouseMoveHandler);
    }

    update(): void {
        this.sparkles = this.sparkles.filter(sparkle => {
            sparkle.life -= 16; // ~60fps
            sparkle.x += sparkle.vx;
            sparkle.y += sparkle.vy;

            return sparkle.life > 0;
        });
    }

    render(): void {
        this.sparkles.forEach(sparkle => {
            const alpha = sparkle.life / sparkle.maxLife;

            // Yıldız şekli
            this.ctx.save();
            this.ctx.translate(sparkle.x, sparkle.y);

            for (let i = 0; i < 5; i++) {
                this.ctx.rotate(Math.PI / 5);
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(0, sparkle.size);
                this.ctx.strokeStyle = hexToRgba(this.settings.color, alpha);
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }

            this.ctx.restore();

            // Parıltı efekti
            const gradient = this.ctx.createRadialGradient(
                sparkle.x, sparkle.y, 0,
                sparkle.x, sparkle.y, sparkle.size * 2
            );
            gradient.addColorStop(0, hexToRgba(this.settings.color, alpha * 0.5));
            gradient.addColorStop(1, hexToRgba(this.settings.color, 0));

            this.ctx.beginPath();
            this.ctx.arc(sparkle.x, sparkle.y, sparkle.size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }

    destroy(): void {
        if (this.mouseMoveHandler) {
            window.removeEventListener('mousemove', this.mouseMoveHandler);
            this.mouseMoveHandler = null;
        }
        this.sparkles = [];
    }
}
