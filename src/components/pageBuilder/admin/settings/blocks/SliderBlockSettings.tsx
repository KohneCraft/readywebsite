'use client';

// ============================================
// Page Builder - Slider Block Settings
// Slider bloğu ayarları
// ============================================

import { useState } from 'react';
import {
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Video,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { DualColorPicker } from '../../controls/DualColorPicker';
import { SpacingControl } from '../../controls/SpacingControl';
import { MediaSelector } from '../../media/MediaSelector';
import { cn } from '@/lib/utils';
import type { BlockProps, SliderSlide, Spacing } from '@/types/pageBuilder';

interface SliderBlockSettingsProps {
    block: { id: string; props: BlockProps };
    activeTab: 'style' | 'settings' | 'advanced'; // dış tab sistemi
    onUpdate: (props: Partial<BlockProps>) => void;
}

export function SliderBlockSettings({ block, activeTab, onUpdate }: SliderBlockSettingsProps) {
    const props = block.props;
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
    const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

    const slides = props.slides || [];

    // Slayt ekle
    const addSlide = (type: 'image' | 'video', src: string) => {
        const newSlide: SliderSlide = {
            id: `slide-${Date.now()}`,
            type,
            src,
            order: slides.length,
        };
        onUpdate({ slides: [...slides, newSlide] });
    };

    // Slayt sil
    const removeSlide = (slideId: string) => {
        const updatedSlides = slides
            .filter(s => s.id !== slideId)
            .map((s, index) => ({ ...s, order: index }));
        onUpdate({ slides: updatedSlides });
        if (selectedSlideId === slideId) {
            setSelectedSlideId(null);
        }
    };

    // Slayt güncelle
    const updateSlide = (slideId: string, updates: Partial<SliderSlide>) => {
        const updatedSlides = slides.map(s =>
            s.id === slideId ? { ...s, ...updates } : s
        );
        onUpdate({ slides: updatedSlides });
    };

    // Slayt sırasını değiştir
    const moveSlide = (slideId: string, direction: 'up' | 'down') => {
        const index = slides.findIndex(s => s.id === slideId);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= slides.length) return;

        const newSlides = [...slides];
        [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];

        // Sıra numaralarını güncelle
        const reorderedSlides = newSlides.map((s, i) => ({ ...s, order: i }));
        onUpdate({ slides: reorderedSlides });
    };

    const selectedSlide = slides.find(s => s.id === selectedSlideId);

    return (
        <div className="space-y-4">
            {/* Stil sekmesi = Slaytlar yönetimi */}
            {activeTab === 'style' && (
                <div className="space-y-4">
                    {/* Slayt Ekle Butonları */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setMediaType('image');
                                setIsMediaSelectorOpen(true);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors text-sm"
                        >
                            <ImageIcon className="w-4 h-4" />
                            Görsel Ekle
                        </button>
                        <button
                            onClick={() => {
                                setMediaType('video');
                                setIsMediaSelectorOpen(true);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
                        >
                            <Video className="w-4 h-4" />
                            Video Ekle
                        </button>
                    </div>

                    {/* Slayt Listesi */}
                    {slides.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Henüz slayt eklenmedi
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {slides.sort((a, b) => a.order - b.order).map((slide, index) => (
                                <div
                                    key={slide.id}
                                    onClick={() => setSelectedSlideId(slide.id)}
                                    className={cn(
                                        'flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all',
                                        selectedSlideId === slide.id
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    )}
                                >
                                    {/* Sürükle İkonu */}
                                    <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />

                                    {/* Önizleme */}
                                    <div className="w-16 h-10 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                        {slide.type === 'image' && slide.src ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={slide.src} alt="" className="w-full h-full object-cover" />
                                        ) : slide.type === 'video' ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Video className="w-5 h-5 text-gray-400" />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="w-5 h-5 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Bilgi */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {slide.title || `Slayt ${index + 1}`}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {slide.type === 'image' ? 'Görsel' : 'Video'}
                                        </p>
                                    </div>

                                    {/* Aksiyonlar */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveSlide(slide.id, 'up');
                                            }}
                                            disabled={index === 0}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ArrowUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveSlide(slide.id, 'down');
                                            }}
                                            disabled={index === slides.length - 1}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeSlide(slide.id);
                                            }}
                                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Seçili Slayt Düzenleme */}
                    {selectedSlide && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                Slayt Düzenle
                            </h4>

                            {/* Başlık */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Başlık
                                </label>
                                <Input
                                    type="text"
                                    value={selectedSlide.title || ''}
                                    onChange={(e) => updateSlide(selectedSlide.id, { title: e.target.value })}
                                    placeholder="Slayt başlığı"
                                />
                            </div>

                            {/* Başlık Rengi */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Başlık Rengi
                                </label>
                                <DualColorPicker
                                    lightColor={selectedSlide.titleColor || '#ffffff'}
                                    darkColor={selectedSlide.titleColorDark || 'auto'}
                                    onLightChange={(color: string) => updateSlide(selectedSlide.id, { titleColor: color })}
                                    onDarkChange={(colorDark: string | 'auto') => updateSlide(selectedSlide.id, { titleColorDark: colorDark })}
                                />
                            </div>

                            {/* Açıklama */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Açıklama
                                </label>
                                <Input
                                    type="text"
                                    value={selectedSlide.description || ''}
                                    onChange={(e) => updateSlide(selectedSlide.id, { description: e.target.value })}
                                    placeholder="Slayt açıklaması"
                                />
                            </div>

                            {/* Açıklama Rengi */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Açıklama Rengi
                                </label>
                                <DualColorPicker
                                    lightColor={selectedSlide.descriptionColor || '#ffffff'}
                                    darkColor={selectedSlide.descriptionColorDark || 'auto'}
                                    onLightChange={(color: string) => updateSlide(selectedSlide.id, { descriptionColor: color })}
                                    onDarkChange={(colorDark: string | 'auto') => updateSlide(selectedSlide.id, { descriptionColorDark: colorDark })}
                                />
                            </div>

                            {/* Link */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Link
                                </label>
                                <Input
                                    type="text"
                                    value={selectedSlide.link || ''}
                                    onChange={(e) => updateSlide(selectedSlide.id, { link: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            {/* Link Hedefi */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Link Hedefi
                                </label>
                                <select
                                    value={selectedSlide.linkTarget || '_self'}
                                    onChange={(e) => updateSlide(selectedSlide.id, { linkTarget: e.target.value as '_self' | '_blank' })}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                >
                                    <option value="_self">Aynı Pencere</option>
                                    <option value="_blank">Yeni Pencere</option>
                                </select>
                            </div>

                            {/* Alt Text (sadece görsel için) */}
                            {selectedSlide.type === 'image' && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Alt Metin
                                    </label>
                                    <Input
                                        type="text"
                                        value={selectedSlide.alt || ''}
                                        onChange={(e) => updateSlide(selectedSlide.id, { alt: e.target.value })}
                                        placeholder="Görsel açıklaması (SEO için)"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Media Selector Modal */}
                    {isMediaSelectorOpen && (
                        <MediaSelector
                            isOpen={isMediaSelectorOpen}
                            type={mediaType}
                            onSelect={(media) => {
                                addSlide(mediaType, media.url);
                                setIsMediaSelectorOpen(false);
                            }}
                            onClose={() => setIsMediaSelectorOpen(false)}
                        />
                    )}
                </div>
            )}

            {/* Ayarlar Sekmesi */}
            {activeTab === 'settings' && (
                <div className="space-y-4">
                    {/* Otomatik Oynatma */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Otomatik Oynatma
                        </label>
                        <input
                            type="checkbox"
                            checked={props.autoPlay !== false}
                            onChange={(e) => onUpdate({ autoPlay: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                    </div>

                    {/* Oynatma Hızı */}
                    {props.autoPlay !== false && (
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Oynatma Hızı (ms)
                            </label>
                            <Input
                                type="number"
                                value={props.autoPlaySpeed || 5000}
                                onChange={(e) => onUpdate({ autoPlaySpeed: parseInt(e.target.value) || 5000 })}
                                min={1000}
                                max={30000}
                                step={500}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {((props.autoPlaySpeed || 5000) / 1000).toFixed(1)} saniye
                            </p>
                        </div>
                    )}

                    {/* Döngü */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Döngü (Loop)
                        </label>
                        <input
                            type="checkbox"
                            checked={props.sliderLoop !== false}
                            onChange={(e) => onUpdate({ sliderLoop: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                    </div>

                    {/* İleri/Geri Butonları */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            İleri/Geri Butonları
                        </label>
                        <input
                            type="checkbox"
                            checked={props.showArrows !== false}
                            onChange={(e) => onUpdate({ showArrows: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                    </div>

                    {/* Sayfa Göstergeleri */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sayfa Göstergeleri (Dots)
                        </label>
                        <input
                            type="checkbox"
                            checked={props.showDots !== false}
                            onChange={(e) => onUpdate({ showDots: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                    </div>

                    {/* Fare Üzerinde Duraklat */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Fare Üzerinde Duraklat
                        </label>
                        <input
                            type="checkbox"
                            checked={props.pauseOnHover !== false}
                            onChange={(e) => onUpdate({ pauseOnHover: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                    </div>

                    {/* Döngü Yönü */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Döngü Yönü
                        </label>
                        <select
                            value={props.direction || 'ltr'}
                            onChange={(e) => onUpdate({ direction: e.target.value as 'ltr' | 'rtl' })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        >
                            <option value="ltr">Soldan Sağa</option>
                            <option value="rtl">Sağdan Sola</option>
                        </select>
                    </div>

                    {/* Geçiş Efekti */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Geçiş Efekti
                        </label>
                        <select
                            value={props.transitionEffect || 'slide'}
                            onChange={(e) => onUpdate({ transitionEffect: e.target.value as 'slide' | 'fade' | 'zoom' | 'flip' })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        >
                            <option value="slide">Kaydırma</option>
                            <option value="fade">Solma</option>
                            <option value="zoom">Yakınlaştırma</option>
                            <option value="flip">Çevirme</option>
                        </select>
                    </div>

                    {/* Geçiş Hızı */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Geçiş Hızı (ms)
                        </label>
                        <Input
                            type="number"
                            value={props.transitionSpeed || 500}
                            onChange={(e) => onUpdate({ transitionSpeed: parseInt(e.target.value) || 500 })}
                            min={100}
                            max={2000}
                            step={100}
                        />
                    </div>
                </div>
            )}

            {/* Gelişmiş sekmesi = Stil ayarları */}
            {activeTab === 'advanced' && (
                <div className="space-y-4">
                    {/* Yükseklik */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Yükseklik (px)
                        </label>
                        <Input
                            type="number"
                            value={typeof props.sliderHeight === 'number' ? props.sliderHeight : 400}
                            onChange={(e) => onUpdate({ sliderHeight: parseInt(e.target.value) || 400 })}
                            min={100}
                            max={1000}
                        />
                    </div>

                    {/* Border Radius */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Köşe Yuvarlaklığı (px)
                        </label>
                        <Input
                            type="number"
                            value={props.borderRadius || 0}
                            onChange={(e) => onUpdate({ borderRadius: parseInt(e.target.value) || 0 })}
                            min={0}
                            max={100}
                        />
                    </div>

                    {/* Padding */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            İç Boşluk (Padding)
                        </label>
                        <SpacingControl
                            value={props.padding || { top: 0, right: 0, bottom: 0, left: 0 }}
                            onChange={(padding: Spacing) => onUpdate({ padding })}
                        />
                    </div>

                    {/* Margin */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Dış Boşluk (Margin)
                        </label>
                        <SpacingControl
                            value={props.margin || { top: 0, right: 0, bottom: 0, left: 0 }}
                            onChange={(margin: Spacing) => onUpdate({ margin })}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
