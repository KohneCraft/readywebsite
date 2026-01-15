import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import type { EffectTemplate } from '@/types/effects';
import { createEffectInstance } from './EffectRenderer';
import type { IEffectInstance } from '@/lib/effects';

interface EffectCardProps {
    effect: EffectTemplate;
    isActive: boolean;
    onAdd: () => void;
}

export function EffectCard({ effect, isActive, onAdd }: EffectCardProps) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceRef = useRef<IEffectInstance | null>(null);
    const animationRef = useRef<number>();

    // Önizleme mantığı
    useEffect(() => {
        if (!isPreviewOpen || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvas boyutlarını ayarla
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Efekt instance oluştur
        const instance = createEffectInstance(
            effect.id as any,
            canvas,
            ctx,
            effect.defaultSettings
        );

        if (instance) {
            instance.init();
            instanceRef.current = instance;

            // Animasyon döngüsü
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (instanceRef.current) {
                    instanceRef.current.update();
                    instanceRef.current.render();
                }
                animationRef.current = requestAnimationFrame(animate);
            };
            animate();
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (instanceRef.current) instanceRef.current.destroy();
            instanceRef.current = null;
        };
    }, [isPreviewOpen, effect]);

    return (
        <>
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
                <div className="relative h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{effect.icon}</span>

                    {/* Preview Button Overlay */}
                    <button
                        onClick={() => setIsPreviewOpen(true)}
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        aria-label="Önizle"
                    >
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-gray-900 dark:text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
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

            {/* Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    {/* Canvas Background */}
                    <canvas
                        ref={canvasRef}
                        className="fixed inset-0 w-full h-full pointer-events-none"
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-sm text-center border border-gray-200 dark:border-gray-800">
                        <div className="text-6xl mb-4">{effect.icon}</div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{effect.displayName}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                            Efekt önizlemesi arkaplanda çalışıyor. Beğendiyseniz "Ekle" butonunu kullanarak sitenize ekleyebilirsiniz.
                        </p>
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all"
                        >
                            Önizlemeyi Kapat
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
