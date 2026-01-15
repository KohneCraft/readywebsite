// ============================================
// Autumn Leaves Effect - Sonbahar Yaprakları
// ============================================

import { IEffectInstance } from './base';
import type { AutumnLeavesSettings } from '@/types/effects';

interface Leaf {
    x: number;
    y: number;
    emoji: string;
    size: number;
    speed: number;
    swing: number;
    swingSpeed: number;
    rotation: number;
    rotationSpeed: number;
    wind: number;
}

export class AutumnLeavesEffect implements IEffectInstance {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: AutumnLeavesSettings;
    private leaves: Leaf[] = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: AutumnLeavesSettings) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.settings = settings;
    }

    private createLeaf(): Leaf {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            emoji: this.settings.leafTypes[Math.floor(Math.random() * this.settings.leafTypes.length)],
            size: Math.random() * 20 + 15,
            speed: Math.random() * this.settings.speed + 0.5,
            swing: Math.random() * Math.PI * 2,
            swingSpeed: Math.random() * 0.05 + 0.02,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            wind: (Math.random() - 0.5) * this.settings.wind,
        };
    }

    init(): void {
        this.leaves = [];
        for (let i = 0; i < this.settings.intensity; i++) {
            this.leaves.push(this.createLeaf());
        }
    }

    update(): void {
        this.leaves.forEach(leaf => {
            leaf.y += leaf.speed;
            leaf.swing += leaf.swingSpeed;
            leaf.x += Math.sin(leaf.swing) * 2 + leaf.wind;
            leaf.rotation += leaf.rotationSpeed;

            if (leaf.y > this.canvas.height) {
                leaf.y = -leaf.size;
                leaf.x = Math.random() * this.canvas.width;
            }

            if (leaf.x > this.canvas.width) {
                leaf.x = 0;
            } else if (leaf.x < 0) {
                leaf.x = this.canvas.width;
            }
        });
    }

    render(): void {
        this.leaves.forEach(leaf => {
            this.ctx.save();
            this.ctx.translate(leaf.x, leaf.y);
            this.ctx.rotate((leaf.rotation * Math.PI) / 180);
            this.ctx.font = `${leaf.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(leaf.emoji, 0, 0);
            this.ctx.restore();
        });
    }

    destroy(): void {
        this.leaves = [];
    }
}
