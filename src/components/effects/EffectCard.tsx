'use client';

// ============================================
// Effect Card - Efekt Önizleme Kartı
// ============================================

import { Play } from 'lucide-react';
import type { EffectTemplate } from '@/types/effects';

interface EffectCardProps {
    effect: EffectTemplate;
    isActive: boolean;
    onAdd: () => void;
}

export function EffectCard({ effect, isActive, onAdd }: EffectCardProps) {
    return (
        <div
            className={`
        bg-white dark:bg-gray-800 
        border-2 rounded-xl overflow-hidden 
        transition-all duration-200
        ${isActive ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'}
        hover:shadow-lg hover:-translate-y-1
      `}
        >
            {/* Preview Area */}
            <div className="relative h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">{effect.icon}</span>

                {/* Preview Button Overlay */}
                <button
                    className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all"
                    aria-label="Önizle"
                >
                    <div className="bg-white/90 px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                        <Play size={18} />
                        Önizle
                    </div>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{effect.icon}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {effect.displayName}
                    </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {effect.description}
                </p>

                <div className="mb-3">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded capitalize">
                        {effect.category === 'seasonal' && 'Mevsimsel'}
                        {effect.category === 'party' && 'Parti'}
                        {effect.category === 'nature' && 'Doğa'}
                        {effect.category === 'animations' && 'Animasyonlar'}
                    </span>
                </div>

                <button
                    onClick={onAdd}
                    disabled={isActive}
                    className={`
            w-full py-2 px-4 rounded-lg font-semibold transition-all
            ${isActive
                            ? 'bg-green-500 text-white cursor-default'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }
            disabled:opacity-60
          `}
                >
                    {isActive ? '✓ Eklendi' : '+ Ekle'}
                </button>
            </div>
        </div>
    );
}
