'use client';

// ============================================
// Vav Yapı - Section Template Panel
// Hazır section template'leri seçim paneli
// ============================================

import { useState, useMemo } from 'react';
import { Search, Layers, Plus } from 'lucide-react';
import { defaultTemplates, templateCategories, getTemplatesByCategory } from '@/data/defaultTemplates';
import type { SectionTemplate } from '@/types/pageBuilder';
import { TemplateInsertModal } from '../modals/TemplateInsertModal';

// Basit section bilgisi (sadece görüntüleme için)
interface SimpleSection {
    id: string;
    name?: string;
    columns?: unknown[];
}

interface SectionTemplatePanelProps {
    currentSections: SimpleSection[];
    onTemplateInsert: (template: SectionTemplate, mode: 'append' | 'replace') => Promise<void>;
}

export function SectionTemplatePanel({
    currentSections,
    onTemplateInsert
}: SectionTemplatePanelProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTemplate, setSelectedTemplate] = useState<SectionTemplate | null>(null);
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Filtrelenmiş template'ler
    const filteredTemplates = useMemo(() => {
        let templates = getTemplatesByCategory(selectedCategory);

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            templates = templates.filter(t =>
                t.name.toLowerCase().includes(query) ||
                t.description.toLowerCase().includes(query) ||
                t.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return templates;
    }, [selectedCategory, searchQuery]);

    // Template seçildiğinde
    function handleTemplateSelect(template: SectionTemplate) {
        setSelectedTemplate(template);

        // Sayfa boşsa direkt ekle
        if (currentSections.length === 0) {
            handleDirectInsert(template);
        } else {
            // Modal göster
            setShowInsertModal(true);
        }
    }

    // Direkt ekleme (boş sayfa için)
    async function handleDirectInsert(template: SectionTemplate) {
        setLoading(true);
        try {
            await onTemplateInsert(template, 'append');
        } catch (error) {
            console.error('Template eklenemedi:', error);
        } finally {
            setLoading(false);
        }
    }

    // Modal'dan ekleme
    async function handleModalInsert(mode: 'append' | 'replace') {
        if (!selectedTemplate) return;

        setLoading(true);
        try {
            await onTemplateInsert(selectedTemplate, mode);
            setShowInsertModal(false);
            setSelectedTemplate(null);
        } catch (error) {
            console.error('Template eklenemedi:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="section-template-panel">
            {/* Mevcut Sayfa Düzeni */}
            <div className="mb-4">
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Layers size={18} className="text-primary-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mevcut Sayfa Düzeni
                    </span>
                    <span className="ml-auto bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-semibold px-2.5 py-1 rounded-full">
                        {currentSections.length} Section
                    </span>
                </div>
            </div>

            {/* Hazır Template'ler */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2 mb-3">
                    <Plus size={16} className="text-green-500" />
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Hazır Template'ler
                    </h3>
                    <span className="ml-auto text-xs text-gray-400">
                        {defaultTemplates.length} template
                    </span>
                </div>

                {/* Arama */}
                <div className="relative mb-3">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Template ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>

                {/* Kategoriler */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {templateCategories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${selectedCategory === cat.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>

                {/* Template Grid */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredTemplates.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            Template bulunamadı
                        </div>
                    ) : (
                        filteredTemplates.map(template => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onSelect={() => handleTemplateSelect(template)}
                                disabled={loading}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Insert Modal */}
            {showInsertModal && selectedTemplate && (
                <TemplateInsertModal
                    template={selectedTemplate}
                    currentSectionCount={currentSections.length}
                    onInsert={handleModalInsert}
                    onCancel={() => {
                        setShowInsertModal(false);
                        setSelectedTemplate(null);
                    }}
                    loading={loading}
                />
            )}
        </div>
    );
}

// Template Card Component
function TemplateCard({
    template,
    onSelect,
    disabled
}: {
    template: SectionTemplate;
    onSelect: () => void;
    disabled: boolean;
}) {
    return (
        <div
            className={`group relative p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer ${disabled ? 'opacity-50 pointer-events-none' : ''
                }`}
            onClick={onSelect}
        >
            <div className="flex items-start gap-3">
                {/* Thumbnail placeholder */}
                <div className="w-16 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded flex items-center justify-center text-2xl shrink-0">
                    {template.category === 'landing' && '🚀'}
                    {template.category === 'portfolio' && '💼'}
                    {template.category === 'blog' && '📝'}
                    {template.category === 'ecommerce' && '🛒'}
                    {template.category === 'business' && '🏢'}
                    {template.category === 'event' && '🎫'}
                    {template.category === 'restaurant' && '🍽️'}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                        {template.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">
                        {template.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded">
                            {template.sections.length} Section
                        </span>
                        <span className="text-xs text-primary-600 dark:text-primary-400 capitalize">
                            {template.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-primary-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                    Kullan
                </span>
            </div>
        </div>
    );
}

export default SectionTemplatePanel;
