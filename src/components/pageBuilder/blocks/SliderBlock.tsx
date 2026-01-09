'use client';

// ============================================
// Page Builder - Slider Block
// Birden fazla görsel/video içeren slider
// ============================================

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sanitizeCSS } from '@/lib/sanitize';
import { useThemeColor } from '@/hooks/useThemeColor';
import type { BlockProps, SliderSlide } from '@/types/pageBuilder';

interface SliderBlockProps {
    props: BlockProps;
}

export function SliderBlock({ props }: SliderBlockProps) {
    const {
        slides = [],
        autoPlay = true,
        autoPlaySpeed = 5000,
        sliderLoop = true,
        showArrows = true,
        showDots = true,
        pauseOnHover = true,
        direction = 'ltr',
        sliderHeight = 400,
        transitionSpeed = 500,
        transitionEffect = 'slide',
        padding,
        margin,
        borderRadius,
        customCSS,
    } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Slaytları sırala
    const sortedSlides = useMemo(() => {
        return [...slides].sort((a, b) => a.order - b.order);
    }, [slides]);

    // Sonraki slayta geç
    const goToNext = useCallback(() => {
        if (sortedSlides.length === 0) return;
        setCurrentIndex((prev) => {
            if (direction === 'rtl') {
                return prev === 0 ? (sliderLoop ? sortedSlides.length - 1 : 0) : prev - 1;
            }
            return prev === sortedSlides.length - 1 ? (sliderLoop ? 0 : prev) : prev + 1;
        });
    }, [sortedSlides.length, sliderLoop, direction]);

    // Önceki slayta geç
    const goToPrev = useCallback(() => {
        if (sortedSlides.length === 0) return;
        setCurrentIndex((prev) => {
            if (direction === 'rtl') {
                return prev === sortedSlides.length - 1 ? (sliderLoop ? 0 : prev) : prev + 1;
            }
            return prev === 0 ? (sliderLoop ? sortedSlides.length - 1 : 0) : prev - 1;
        });
    }, [sortedSlides.length, sliderLoop, direction]);

    // Belirli slayta git
    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    // Otomatik oynatma
    useEffect(() => {
        if (autoPlay && !isPaused && !(pauseOnHover && isHovered) && sortedSlides.length > 1) {
            intervalRef.current = setInterval(goToNext, autoPlaySpeed);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [autoPlay, autoPlaySpeed, isPaused, isHovered, pauseOnHover, goToNext, sortedSlides.length]);

    // Slayt yoksa boş göster
    if (sortedSlides.length === 0) {
        return (
            <div
                className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
                style={{
                    height: typeof sliderHeight === 'number' ? `${sliderHeight}px` : 'auto',
                    minHeight: '200px',
                }}
            >
                <p className="text-gray-500 dark:text-gray-400">Slider - Henüz slayt eklenmedi</p>
            </div>
        );
    }

    // currentSlide kaldırıldı - doğrudan sortedSlides[currentIndex] kullanılıyor

    // Slider stili
    const sliderStyle: React.CSSProperties = {
        height: typeof sliderHeight === 'number' ? `${sliderHeight}px` : 'auto',
        padding: padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined,
        margin: margin ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px` : undefined,
        borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    };

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={sliderStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Slaytlar */}
            <div
                className="relative w-full h-full"
                style={{
                    height: typeof sliderHeight === 'number' ? `${sliderHeight}px` : '400px',
                }}
            >
                {sortedSlides.map((slide, index) => (
                    <SlideItem
                        key={slide.id}
                        slide={slide}
                        isActive={index === currentIndex}
                        transitionSpeed={transitionSpeed}
                        transitionEffect={transitionEffect}
                    />
                ))}
            </div>

            {/* Navigasyon Okları */}
            {showArrows && sortedSlides.length > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all z-10"
                        aria-label="Önceki slayt"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all z-10"
                        aria-label="Sonraki slayt"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Sayfa Göstergeleri (Dots) */}
            {showDots && sortedSlides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                    {sortedSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                'w-3 h-3 rounded-full transition-all',
                                index === currentIndex
                                    ? 'bg-white scale-110'
                                    : 'bg-white/50 hover:bg-white/75'
                            )}
                            aria-label={`Slayt ${index + 1}`}
                        />
                    ))}
                    {/* Sayfa Numarası */}
                    <span className="ml-3 text-sm text-white bg-black/30 px-2 py-1 rounded">
                        {currentIndex + 1} / {sortedSlides.length}
                    </span>
                </div>
            )}

            {/* Oynat/Duraklat Butonu */}
            {autoPlay && sortedSlides.length > 1 && (
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="absolute bottom-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all z-10"
                    aria-label={isPaused ? 'Oynat' : 'Duraklat'}
                >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
            )}

            {/* Custom CSS */}
            {customCSS && (
                <style dangerouslySetInnerHTML={{ __html: sanitizeCSS(customCSS) }} />
            )}
        </div>
    );
}

// Tek Slayt Bileşeni
interface SlideItemProps {
    slide: SliderSlide;
    isActive: boolean;
    transitionSpeed: number;
    transitionEffect: 'slide' | 'fade';
}

function SlideItem({ slide, isActive, transitionSpeed, transitionEffect }: SlideItemProps) {
    // Tema renkleri
    const titleColor = useThemeColor({
        lightColor: slide.titleColor,
        darkColor: slide.titleColorDark || 'auto',
    });

    const descriptionColor = useThemeColor({
        lightColor: slide.descriptionColor,
        darkColor: slide.descriptionColorDark || 'auto',
    });

    const transitionStyle: React.CSSProperties = transitionEffect === 'fade'
        ? {
            opacity: isActive ? 1 : 0,
            transition: `opacity ${transitionSpeed}ms ease-in-out`,
        }
        : {
            transform: isActive ? 'translateX(0)' : 'translateX(100%)',
            transition: `transform ${transitionSpeed}ms ease-in-out`,
        };

    const content = (
        <div
            className={cn(
                'absolute inset-0 w-full h-full',
                !isActive && 'pointer-events-none'
            )}
            style={transitionStyle}
        >
            {/* Görsel/Video */}
            {slide.type === 'image' ? (
                <div className="relative w-full h-full">
                    <Image
                        src={slide.src}
                        alt={slide.alt || 'Slider görseli'}
                        fill
                        className="object-cover"
                        priority={isActive}
                    />
                </div>
            ) : (
                <video
                    src={slide.src}
                    className="w-full h-full object-cover"
                    autoPlay={isActive}
                    muted
                    loop
                    playsInline
                />
            )}

            {/* Overlay Metin */}
            {(slide.title || slide.description) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="text-center px-8">
                        {slide.title && (
                            <h2
                                className="text-3xl md:text-4xl font-bold mb-4"
                                style={{ color: titleColor || '#ffffff' }}
                            >
                                {slide.title}
                            </h2>
                        )}
                        {slide.description && (
                            <p
                                className="text-lg md:text-xl"
                                style={{ color: descriptionColor || '#ffffff' }}
                            >
                                {slide.description}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // Link varsa sarmalayıcı ekle
    if (slide.link) {
        return (
            <Link
                href={slide.link}
                target={slide.linkTarget || '_self'}
                className="block w-full h-full"
            >
                {content}
            </Link>
        );
    }

    return content;
}
