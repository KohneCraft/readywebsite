// ============================================
// Fireworks Effect - Havai Fişek
// ============================================

import { IEffectInstance, hexToRgba } from './base';
import type { FireworksSettings } from '@/types/effects';

interface Firework {
    x: number;
    y: number;
    targetY: number;
    speed: number;
    color: string;
    exploded: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    life: number;
    decay: number;
}

export class FireworksEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: FireworksSettings;
    private fireworks: Firework[] = [];
    private particles: Particle[] = [];
    private lastLaunch: number = 0;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: FireworksSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    private launchFirework(): void {
        const now = Date.now();
        if (now - this.lastLaunch > 1000 / this.settings.frequency) {
            this.fireworks.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height,
                targetY: Math.random() * this.canvas.height * 0.5,
                speed: 5,
                color: this.settings.colors[Math.floor(Math.random() * this.settings.colors.length)],
                exploded: false,
            });
            this.lastLaunch = now;
        }
    }

    private explode(firework: Firework): void {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 3 + 2;

            this.particles.push({
                x: firework.x,
                y: firework.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: firework.color,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
            });
        }
    }

    init(): void {
        this.fireworks = [];
        this.particles = [];
        this.lastLaunch = 0;
        this.launchFirework();
    }

    update(): void {
        this.launchFirework();

        // Havai fişekleri güncelle
        this.fireworks = this.fireworks.filter(firework => {
            if (!firework.exploded) {
                firework.y -= firework.speed;

                if (firework.y <= firework.targetY) {
                    this.explode(firework);
                    firework.exploded = true;
                    return false;
                }
                return true;
            }
            return false;
        });

        // Parçacıkları güncelle
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // Yerçekimi
            particle.life -= particle.decay;

            return particle.life > 0;
        });
    }

    render(): void {
        // Havai fişekleri çiz
        this.fireworks.forEach(firework => {
            this.ctx.beginPath();
            this.ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = firework.color;
            this.ctx.fill();

            // İz efekti
            this.ctx.beginPath();
            this.ctx.moveTo(firework.x, firework.y);
            this.ctx.lineTo(firework.x, firework.y + 10);
            this.ctx.strokeStyle = firework.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });

        // Parçacıkları çiz
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = hexToRgba(particle.color, particle.life);
            this.ctx.fill();
        });
    }

    destroy(): void {
        this.fireworks = [];
        this.particles = [];
    }
}
