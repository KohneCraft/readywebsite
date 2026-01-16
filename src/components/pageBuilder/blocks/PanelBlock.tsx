'use client';

// ============================================
// Panel Block - Sabit Pozisyonlu Konteyner
// Sayfanın kenarlarına yapışan panel bloğu
// ============================================

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Settings, PanelRight } from 'lucide-react';
import { BlockRenderer } from '../renderers/BlockRenderer';
import type { BlockProps } from '@/types/pageBuilder';
import './PanelBlock.css';

interface PanelBlockProps {
    props: BlockProps;
    onSelect?: () => void;
    isSelected?: boolean;
    isAdminMode?: boolean;
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

// Admin mode detection
function useIsAdminMode(): boolean {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(window.location.pathname.includes('/admin/'));
    }, []);

    return isAdmin;
}

export function PanelBlock({ props, onSelect, isSelected, isAdminMode: propIsAdmin }: PanelBlockProps) {
    const {
        panelPosition = 'right',
        panelDimensions = { width: 320, height: 'auto' },
        panelPositioning = { type: 'fixed', zIndex: 1000 },
        panelAppearance = {},
        panelBehavior = { closeable: true, defaultOpen: true },
        panelResponsive = {},
        panelAnimation = { enabled: true, type: 'slide', duration: 0.3 },
        panelBlocks = [],
        // Yeni: Margin/Padding ayarları
        panelSpacing = { margin: { top: 0, right: 0, bottom: 0, left: 0 }, padding: { top: 20, right: 20, bottom: 20, left: 20 } },
        // Yeni: Sidebar modu (ana içeriği iter)
        panelMode = 'overlay', // 'overlay' | 'sidebar'
    } = props;

    const [isOpen, setIsOpen] = useState(panelBehavior.defaultOpen ?? true);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    const currentDevice = useCurrentDevice();
    const detectedAdminMode = useIsAdminMode();
    const isAdminMode = propIsAdmin ?? detectedAdminMode;

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

    // Sidebar mode: push content
    useEffect(() => {
        if (isAdminMode || panelMode !== 'sidebar') return;

        const panelWidth = typeof panelDimensions.width === 'number' ? panelDimensions.width : 320;
        const mainContent = document.querySelector('main, .page-renderer, body');

        if (mainContent && isOpen) {
            if (currentPosition === 'right') {
                (mainContent as HTMLElement).style.marginRight = `${panelWidth}px`;
            } else if (currentPosition === 'left') {
                (mainContent as HTMLElement).style.marginLeft = `${panelWidth}px`;
            }
        }

        return () => {
            if (mainContent) {
                (mainContent as HTMLElement).style.marginRight = '';
                (mainContent as HTMLElement).style.marginLeft = '';
            }
        };
    }, [isOpen, panelMode, currentPosition, panelDimensions.width, isAdminMode]);

    // ESC key handler
    useEffect(() => {
        if (!panelBehavior.closeOnEscape || isAdminMode) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, panelBehavior.closeOnEscape, isAdminMode]);

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
        if (panelBehavior.closeOnClickOutside && !isAdminMode) {
            closePanel();
        }
    }, [panelBehavior.closeOnClickOutside, closePanel, isAdminMode]);

    // Handle panel click (for admin selection)
    const handlePanelClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (onSelect) {
            onSelect();
        }
    }, [onSelect]);

    // Don't render if disabled on current device (but always show in admin mode)
    if (!isAdminMode && (!isEnabledOnDevice || !isVisible)) {
        return null;
    }

    // Calculate dimensions
    const getWidth = () => {
        if (currentPosition === 'top' || currentPosition === 'bottom') return '100%';
        if (responsiveSettings?.width) {
            return typeof responsiveSettings.width === 'number' ? `${responsiveSettings.width}px` : responsiveSettings.width;
        }
        const width = panelDimensions.width ?? 320;
        return typeof width === 'number' ? `${width}px` : width;
    };

    const getHeight = () => {
        if (responsiveSettings?.height) {
            return typeof responsiveSettings.height === 'number' ? `${responsiveSettings.height}px` : responsiveSettings.height;
        }

        const height = panelDimensions.height ?? 'auto';
        if (height === 'auto') {
            return 'auto';
        }
        if (height === '100vh' || height === 'full') {
            return '100vh';
        }
        return typeof height === 'number' ? `${height}px` : height;
    };

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

    // Admin mode görünümü - sadece preview kartı
    if (isAdminMode) {
        return (
            <div
                className={`panel-block-admin-preview ${isSelected ? 'selected' : ''}`}
                onClick={handlePanelClick}
                style={{
                    backgroundColor: panelAppearance.backgroundColor ?? '#ffffff',
                    borderColor: isSelected ? '#3b82f6' : (panelAppearance.borderColor ?? '#e5e7eb'),
                    borderWidth: isSelected ? 2 : (panelAppearance.borderWidth ?? 1),
                    borderStyle: 'solid',
                    borderRadius: panelAppearance.borderRadius ?? 8,
                    padding: '16px',
                    minHeight: '120px',
                    cursor: 'pointer',
                    position: 'relative',
                }}
            >
                <div className="panel-admin-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #e5e7eb',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PanelRight size={16} style={{ color: '#8b5cf6' }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>
                            {currentPosition === 'right' ? 'Sağ Panel' : currentPosition === 'left' ? 'Sol Panel' : currentPosition === 'top' ? 'Üst Panel' : 'Alt Panel'}
                        </span>
                        <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: panelMode === 'sidebar' ? '#dcfce7' : '#e0e7ff', color: panelMode === 'sidebar' ? '#166534' : '#4338ca' }}>
                            {panelMode === 'sidebar' ? 'Sidebar' : 'Overlay'}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Settings size={14} style={{ color: '#9ca3af' }} />
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                            {getWidth()} × {getHeight()}
                        </span>
                    </div>
                </div>

                <div className="panel-admin-content" style={{
                    color: '#6b7280',
                    fontSize: '13px',
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                }}>
                    {panelBlocks && panelBlocks.length > 0 ? (
                        <div>
                            <p style={{ marginBottom: '8px' }}>📦 {panelBlocks.length} blok içeriyor</p>
                            <p style={{ fontSize: '11px', color: '#9ca3af' }}>Önizlemede görünür</p>
                        </div>
                    ) : (
                        <div>
                            <p style={{ marginBottom: '8px' }}>Panel içeriği boş</p>
                            <p style={{ fontSize: '11px', color: '#9ca3af' }}>
                                Ayarlardan içerik ekleyebilirsiniz
                            </p>
                        </div>
                    )}
                </div>

                <div style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#3b82f6',
                }}>
                    💡 Canlı önizleme için "Önizle" butonuna tıklayın
                </div>
            </div>
        );
    }

    // Frontend görünüm (gerçek panel)
    const margin = panelSpacing?.margin || { top: 0, right: 0, bottom: 0, left: 0 };
    const padding = panelSpacing?.padding || { top: 20, right: 20, bottom: 20, left: 20 };

    const panelStyle: React.CSSProperties = {
        position: panelPositioning.type as 'fixed' | 'sticky' | 'absolute',
        zIndex: panelPositioning.zIndex ?? 1000,
        width: getWidth(),
        height: getHeight(),
        maxHeight: currentPosition === 'left' || currentPosition === 'right' ? '100vh' : undefined,
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

    // Position styles with margin support
    const positionStyle: React.CSSProperties = {};
    switch (currentPosition) {
        case 'right':
            positionStyle.top = margin.top;
            positionStyle.right = margin.right;
            positionStyle.bottom = margin.bottom;
            positionStyle.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
            break;
        case 'left':
            positionStyle.top = margin.top;
            positionStyle.left = margin.left;
            positionStyle.bottom = margin.bottom;
            positionStyle.transform = isOpen ? 'translateX(0)' : 'translateX(-100%)';
            break;
        case 'top':
            positionStyle.top = margin.top;
            positionStyle.left = margin.left;
            positionStyle.right = margin.right;
            positionStyle.transform = isOpen ? 'translateY(0)' : 'translateY(-100%)';
            break;
        case 'bottom':
            positionStyle.bottom = margin.bottom;
            positionStyle.left = margin.left;
            positionStyle.right = margin.right;
            positionStyle.transform = isOpen ? 'translateY(0)' : 'translateY(100%)';
            break;
    }

    // Content padding
    const contentStyle: React.CSSProperties = {
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
    };

    return (
        <>
            {/* Overlay */}
            {panelBehavior.overlay && isOpen && panelMode !== 'sidebar' && (
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

            {/* Toggle Button - Her zaman görünür (panel açık/kapalı) */}
            {panelBehavior.closeable && (
                <button
                    className={`panel-toggle-btn panel-toggle-${currentPosition} ${isOpen ? 'panel-open' : 'panel-closed'}`}
                    onClick={togglePanel}
                    aria-label={isOpen ? 'Paneli kapat' : 'Paneli aç'}
                    style={{
                        zIndex: (panelPositioning.zIndex ?? 1000) + 1,
                    }}
                >
                    {getToggleIcon()}
                </button>
            )}

            {/* Panel */}
            <div
                className={`panel-block panel-${currentPosition} ${isOpen ? 'open' : 'closed'} panel-mode-${panelMode}`}
                style={{ ...panelStyle, ...positionStyle }}
                role="dialog"
                aria-modal={panelBehavior.overlay}
                aria-hidden={!isOpen}
            >
                {/* Close Button (sadece panel açıkken ve kapatılabilirse) */}
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
                <div className="panel-content" style={contentStyle}>
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
            </div>
        </>
    );
}

export default PanelBlock;
