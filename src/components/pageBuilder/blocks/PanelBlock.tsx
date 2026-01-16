'use client';

// ============================================
// Panel Block - Sabit Pozisyonlu Konteyner
// Sayfanın kenarlarına yapışan panel bloğu
// ============================================

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { BlockRenderer } from '../renderers/BlockRenderer';
import type { BlockProps } from '@/types/pageBuilder';
import './PanelBlock.css';

interface PanelBlockProps {
    props: BlockProps;
}

// Device detection
function useCurrentDevice(): 'mobile' | 'tablet' | 'desktop' {
    const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    useEffect(() => {
        const updateDevice = () => {
            const width = window.innerWidth;
            if (width < 768) setDevice('mobile');
            else if (width < 1024) setDevice('tablet');
            else setDevice('desktop');
        };

        updateDevice();
        window.addEventListener('resize', updateDevice);
        return () => window.removeEventListener('resize', updateDevice);
    }, []);

    return device;
}

export function PanelBlock({ props }: PanelBlockProps) {
    const {
        panelPosition = 'right',
        panelDimensions = { width: 320, height: 'auto' },
        panelPositioning = { type: 'fixed', zIndex: 1000 },
        panelAppearance = {},
        panelBehavior = {},
        panelResponsive = {},
        panelAnimation = { enabled: true, type: 'slide', duration: 0.3 },
        panelBlocks = [],
    } = props;

    const [isOpen, setIsOpen] = useState(panelBehavior.defaultOpen ?? true);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    const currentDevice = useCurrentDevice();

    // Responsive settings
    const responsiveSettings = useMemo(() => {
        if (currentDevice === 'mobile') return panelResponsive.mobile;
        if (currentDevice === 'tablet') return panelResponsive.tablet;
        return null;
    }, [currentDevice, panelResponsive]);

    // Check if panel should be shown on current device
    const isEnabledOnDevice = useMemo(() => {
        if (currentDevice === 'desktop') return true;
        if (currentDevice === 'mobile') return panelResponsive.mobile?.enabled ?? true;
        if (currentDevice === 'tablet') return panelResponsive.tablet?.enabled ?? true;
        return true;
    }, [currentDevice, panelResponsive]);

    // Current position (may change on mobile)
    const currentPosition = useMemo(() => {
        if (currentDevice === 'mobile' && panelResponsive.mobile?.position) {
            return panelResponsive.mobile.position;
        }
        return panelPosition;
    }, [currentDevice, panelPosition, panelResponsive]);

    // Scroll event listener
    useEffect(() => {
        if (!panelBehavior.showOnScroll && !panelBehavior.hideOnScroll) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = panelBehavior.scrollThreshold ?? 100;
            setIsScrolled(scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [panelBehavior]);

    // Update visibility based on scroll
    useEffect(() => {
        if (panelBehavior.showOnScroll) {
            setIsVisible(isScrolled);
        } else if (panelBehavior.hideOnScroll) {
            setIsVisible(!isScrolled);
        }
    }, [isScrolled, panelBehavior]);

    // ESC key handler
    useEffect(() => {
        if (!panelBehavior.closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, panelBehavior.closeOnEscape]);

    // Toggle panel
    const togglePanel = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    // Close panel
    const closePanel = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Handle overlay click
    const handleOverlayClick = useCallback(() => {
        if (panelBehavior.closeOnClickOutside) {
            closePanel();
        }
    }, [panelBehavior.closeOnClickOutside, closePanel]);

    // Don't render if disabled on current device
    if (!isEnabledOnDevice || !isVisible) {
        return null;
    }

    // Calculate dimensions
    const getWidth = () => {
        if (currentPosition === 'top' || currentPosition === 'bottom') return '100%';
        if (responsiveSettings?.width) return typeof responsiveSettings.width === 'number' ? `${responsiveSettings.width}px` : responsiveSettings.width;
        return typeof panelDimensions.width === 'number' ? `${panelDimensions.width}px` : panelDimensions.width;
    };

    const getHeight = () => {
        if (currentPosition === 'left' || currentPosition === 'right') return '100vh';
        if (responsiveSettings?.height) return typeof responsiveSettings.height === 'number' ? `${responsiveSettings.height}px` : responsiveSettings.height;
        return typeof panelDimensions.height === 'number' ? `${panelDimensions.height}px` : panelDimensions.height;
    };

    // Panel style
    const panelStyle: React.CSSProperties = {
        position: panelPositioning.type as 'fixed' | 'sticky' | 'absolute',
        zIndex: panelPositioning.zIndex ?? 1000,
        width: getWidth(),
        height: getHeight(),
        backgroundColor: panelAppearance.backgroundColor ?? '#ffffff',
        borderColor: panelAppearance.borderColor ?? '#e5e7eb',
        borderWidth: panelAppearance.borderWidth ?? 1,
        borderStyle: panelAppearance.borderStyle ?? 'solid',
        boxShadow: panelAppearance.boxShadow ?? '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderRadius: panelAppearance.borderRadius ?? 0,
        transition: panelAnimation.enabled
            ? `transform ${panelAnimation.duration ?? 0.3}s ${panelAnimation.easing ?? 'ease-in-out'}`
            : 'none',
        overflow: 'auto',
    };

    // Position styles
    const positionStyle: React.CSSProperties = {};
    switch (currentPosition) {
        case 'right':
            positionStyle.top = panelPositioning.offset?.top ?? 0;
            positionStyle.right = 0;
            positionStyle.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
            break;
        case 'left':
            positionStyle.top = panelPositioning.offset?.top ?? 0;
            positionStyle.left = 0;
            positionStyle.transform = isOpen ? 'translateX(0)' : 'translateX(-100%)';
            break;
        case 'top':
            positionStyle.top = 0;
            positionStyle.left = 0;
            positionStyle.right = 0;
            positionStyle.transform = isOpen ? 'translateY(0)' : 'translateY(-100%)';
            break;
        case 'bottom':
            positionStyle.bottom = 0;
            positionStyle.left = 0;
            positionStyle.right = 0;
            positionStyle.transform = isOpen ? 'translateY(0)' : 'translateY(100%)';
            break;
    }

    // Toggle button icon
    const getToggleIcon = () => {
        const iconProps = { size: 20 };
        if (isOpen) {
            switch (currentPosition) {
                case 'right': return <ChevronRight {...iconProps} />;
                case 'left': return <ChevronLeft {...iconProps} />;
                case 'top': return <ChevronUp {...iconProps} />;
                case 'bottom': return <ChevronDown {...iconProps} />;
            }
        } else {
            switch (currentPosition) {
                case 'right': return <ChevronLeft {...iconProps} />;
                case 'left': return <ChevronRight {...iconProps} />;
                case 'top': return <ChevronDown {...iconProps} />;
                case 'bottom': return <ChevronUp {...iconProps} />;
            }
        }
    };

    return (
        <>
            {/* Overlay */}
            {panelBehavior.overlay && isOpen && (
                <div
                    className="panel-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: panelBehavior.overlayColor ?? 'rgba(0, 0, 0, 0.5)',
                        zIndex: (panelPositioning.zIndex ?? 1000) - 1,
                    }}
                    onClick={handleOverlayClick}
                />
            )}

            {/* Panel */}
            <div
                className={`panel-block panel-${currentPosition} ${isOpen ? 'open' : 'closed'}`}
                style={{ ...panelStyle, ...positionStyle }}
                role="dialog"
                aria-modal={panelBehavior.overlay}
                aria-hidden={!isOpen}
            >
                {/* Close Button */}
                {panelBehavior.closeable && isOpen && (
                    <button
                        className="panel-close-btn"
                        onClick={closePanel}
                        aria-label="Paneli kapat"
                    >
                        <X size={20} />
                    </button>
                )}

                {/* Panel Content */}
                <div className="panel-content">
                    {panelBlocks && panelBlocks.length > 0 ? (
                        panelBlocks.map((blockId, index) => (
                            <BlockRenderer key={blockId} blockId={blockId} index={index} />
                        ))
                    ) : (
                        <div className="panel-empty">
                            <p>Panel içeriği boş</p>
                        </div>
                    )}
                </div>

                {/* Toggle Button (when closed) */}
                {panelBehavior.closeable && !isOpen && (
                    <button
                        className={`panel-toggle-btn panel-toggle-${currentPosition}`}
                        onClick={togglePanel}
                        aria-label="Paneli aç"
                    >
                        {getToggleIcon()}
                    </button>
                )}
            </div>
        </>
    );
}

export default PanelBlock;
