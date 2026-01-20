'use client';

// ============================================
// Page Builder - Theme Preview Page
// Tema önizleme sayfası - Varsayılan temalardan yükler
// ============================================

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { getDefaultThemes } from '@/lib/themes/default/defaultThemes';
import { ArrowLeft, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ThemePreviewPage() {
    const params = useParams();
    const themeId = params?.themeId as string;

    // Temayı bul
    const theme = useMemo(() => {
        const themes = getDefaultThemes();
        return themes.find(t => t.metadata.id === themeId);
    }, [themeId]);

    if (!theme) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <Palette className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Tema Bulunamadı
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Aradığınız tema mevcut değil.
                    </p>
                    <Link href="/admin/themes">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Temalara Dön
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Tema ana sayfasını al
    const homePage = theme.pages?.home;
    const settings = theme.metadata.settings;

    return (
        <div className="min-h-screen" style={{ backgroundColor: settings?.bodyBackground || '#ffffff' }}>
            {/* Preview Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/admin/themes">
                        <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Geri
                        </Button>
                    </Link>
                    <span className="text-sm text-gray-400">|</span>
                    <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-primary-400" />
                        <span className="font-medium">{theme.metadata.name}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                        v{theme.metadata.version}
                    </span>
                    <Link href="/admin/themes">
                        <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                            Bu Temayı Yükle
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Theme Preview Content */}
            <div className="pt-14">
                {/* Header Preview */}
                {settings?.header && (
                    <header
                        className="py-4 px-6"
                        style={{
                            backgroundColor: settings.header.backgroundColor || '#ffffff',
                            color: settings.header.textColor || '#1a1a1a',
                        }}
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {settings.header.logoText && (
                                    <span className="text-xl font-bold">{settings.header.logoText}</span>
                                )}
                            </div>
                            <nav className="hidden md:flex items-center gap-6">
                                {settings.header.navItems?.slice(0, 5).map((item: any, i: number) => (
                                    <span key={i} className="text-sm hover:opacity-70 cursor-pointer">
                                        {item.label}
                                    </span>
                                ))}
                            </nav>
                        </div>
                    </header>
                )}

                {/* Page Sections */}
                {homePage?.sections?.map((section, sectionIndex) => (
                    <section
                        key={sectionIndex}
                        className="relative"
                        style={{
                            backgroundColor: section.settings?.backgroundColor || 'transparent',
                            backgroundImage: section.settings?.backgroundImage ? `url(${section.settings.backgroundImage})` : undefined,
                            backgroundSize: section.settings?.backgroundSize || 'cover',
                            minHeight: section.settings?.minHeight,
                            padding: section.settings?.padding
                                ? `${section.settings.padding.top}px ${section.settings.padding.right}px ${section.settings.padding.bottom}px ${section.settings.padding.left}px`
                                : '60px 40px',
                        }}
                    >
                        {/* Overlay */}
                        {section.settings?.overlay?.enabled && (
                            <div
                                className="absolute inset-0"
                                style={{ backgroundColor: section.settings.overlay.color }}
                            />
                        )}

                        {/* Content */}
                        <div className="relative max-w-7xl mx-auto">
                            <div className="flex flex-wrap -mx-4">
                                {section.columns?.map((column, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="px-4"
                                        style={{
                                            width: `${column.width}%`,
                                            textAlign: (column.settings?.textAlign as any) || 'left',
                                        }}
                                    >
                                        {column.blocks?.map((block, blockIndex) => {
                                            if (block.type === 'heading') {
                                                const Tag = (block.props?.level || 'h2') as keyof JSX.IntrinsicElements;
                                                return (
                                                    <Tag
                                                        key={blockIndex}
                                                        style={{
                                                            fontSize: block.props?.fontSize,
                                                            color: block.props?.color,
                                                            fontWeight: block.props?.fontWeight,
                                                            marginBottom: '0.5rem',
                                                        }}
                                                    >
                                                        {block.props?.content}
                                                    </Tag>
                                                );
                                            }
                                            if (block.type === 'text') {
                                                return (
                                                    <p
                                                        key={blockIndex}
                                                        style={{
                                                            fontSize: block.props?.fontSize,
                                                            color: block.props?.color,
                                                            lineHeight: block.props?.lineHeight,
                                                            marginBottom: '1rem',
                                                        }}
                                                    >
                                                        {block.props?.content}
                                                    </p>
                                                );
                                            }
                                            if (block.type === 'button') {
                                                return (
                                                    <button
                                                        key={blockIndex}
                                                        className="inline-block px-6 py-3 rounded-lg font-medium transition-colors mr-2 mb-2"
                                                        style={{
                                                            backgroundColor: block.props?.style === 'outline' ? 'transparent' : (block.props?.backgroundColor || settings?.primaryColor || '#3b82f6'),
                                                            color: block.props?.textColor || (block.props?.style === 'outline' ? block.props?.borderColor || '#ffffff' : '#ffffff'),
                                                            border: block.props?.style === 'outline' ? `2px solid ${block.props?.borderColor || '#ffffff'}` : 'none',
                                                        }}
                                                    >
                                                        {block.props?.text}
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                {/* Footer Preview */}
                {settings?.footer && (
                    <footer
                        className="py-8 px-6"
                        style={{
                            backgroundColor: settings.footer.backgroundColor || '#1a1a1a',
                            color: settings.footer.textColor || '#ffffff',
                        }}
                    >
                        <div className="max-w-7xl mx-auto text-center">
                            <p className="text-sm opacity-70">
                                {settings.footer.copyright || `© ${new Date().getFullYear()} ${theme.metadata.name}. Tüm hakları saklıdır.`}
                            </p>
                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
}
