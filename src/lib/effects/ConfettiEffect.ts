// ============================================
// Confetti Effect - Konfeti
// ============================================

import { IEffectInstance } from './base';
import type { ConfettiSettings } from '@/types/effects';

interface Particle {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    speedY: number;
    speedX: number;
}

export class ConfettiEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: ConfettiSettings;
    private particles: Particle[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: ConfettiSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    init(): void {
        this.particles = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                width: Math.random() * 8 + 4,
                height: Math.random() * 4 + 2,
                color: this.settings.colors[Math.floor(Math.random() * this.settings.colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                speedY: Math.random() * this.settings.speed + 1,
                speedX: (Math.random() - 0.5) * 2,
            });
        }
    }

    update(): void {
        this.particles.forEach(particle => {
            particle.y += particle.speedY;
            particle.x += particle.speedX;
            particle.rotation += particle.rotationSpeed;
            particle.speedY += this.settings.gravity;

            if (particle.y > this.canvas.height) {
                particle.y = -20;
                particle.x = Math.random() * this.canvas.width;
                particle.speedY = Math.random() * this.settings.speed + 1;
            }
        });
    }

    render(): void {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate((particle.rotation * Math.PI) / 180);
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
            this.ctx.restore();
        });
    }

    destroy(): void {
        this.particles = [];
    }
}
