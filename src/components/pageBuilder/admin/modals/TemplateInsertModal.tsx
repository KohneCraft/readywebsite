'use client';

// ============================================
// Vav Yapı - Template Insert Modal
// Template ekleme seçenekleri modalı
// ============================================

import { useState } from 'react';
import { AlertTriangle, Plus, Trash2, X } from 'lucide-react';
import type { SectionTemplate } from '@/types/pageBuilder';

interface TemplateInsertModalProps {
    template: SectionTemplate;
    currentSectionCount: number;
    onInsert: (mode: 'append' | 'replace') => void;
    onCancel: () => void;
    loading?: boolean;
}

export function TemplateInsertModal({
    template,
    currentSectionCount,
    onInsert,
    onCancel,
    loading = false,
}: TemplateInsertModalProps) {
    const [insertMode, setInsertMode] = useState<'append' | 'replace'>('append');

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onCancel}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center gap-4 p-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                        <AlertTriangle size={24} className="text-amber-500" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Dikkat!
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Template ekleme seçenekleri
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Warning Message */}
                    <div className="mb-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                            Sayfanızda <strong className="text-primary-600 dark:text-primary-400">{currentSectionCount} section</strong> bulunuyor.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">
                            <strong className="text-gray-900 dark:text-white">{template.name}</strong> template'ini nasıl eklemek istersiniz?
                        </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {/* Option 1: Append */}
                        <label
                            className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${insertMode === 'append'
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                        >
                            <input
                                type="radio"
                                name="insertMode"
                                value="append"
                                checked={insertMode === 'append'}
                                onChange={() => setInsertMode('append')}
                                className="sr-only"
                            />
                            <div className="flex gap-4">
                                <div className={`w-14 h-14 flex items-center justify-center rounded-xl shrink-0 ${insertMode === 'append' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                    }`}>
                                    <Plus size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        Mevcut Section'ların ALTINA Ekle
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Mevcut {currentSectionCount} section korunur, template'deki {template.sections.length} section en alta eklenir.
                                    </p>
                                    {/* Preview */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="flex-1 py-2 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded border-2 border-dashed border-blue-300 dark:border-blue-700 text-center">
                                            Mevcut ({currentSectionCount})
                                        </div>
                                        <span className="text-lg font-bold text-gray-400">↓</span>
                                        <div className="flex-1 py-2 px-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded border-2 border-green-400 dark:border-green-600 text-center">
                                            Yeni ({template.sections.length})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>

                        {/* Option 2: Replace */}
                        <label
                            className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${insertMode === 'replace'
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                        >
                            <input
                                type="radio"
                                name="insertMode"
                                value="replace"
                                checked={insertMode === 'replace'}
                                onChange={() => setInsertMode('replace')}
                                className="sr-only"
                            />
                            <div className="flex gap-4">
                                <div className={`w-14 h-14 flex items-center justify-center rounded-xl shrink-0 ${insertMode === 'replace' ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                    }`}>
                                    <Trash2 size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        Sayfayı TEMİZLE ve Template Ekle
                                    </h3>
                                    <p className="text-sm text-red-500 dark:text-red-400 mt-1 font-medium">
                                        ⚠️ Mevcut {currentSectionCount} section SİLİNECEK! Sadece template kalacak.
                                    </p>
                                    {/* Preview */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="flex-1 py-2 px-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded border-2 border-dashed border-red-300 dark:border-red-700 line-through text-center">
                                            Silinecek ({currentSectionCount})
                                        </div>
                                        <span className="text-lg font-bold text-gray-400">×</span>
                                        <div className="flex-1 py-2 px-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded border-2 border-green-400 dark:border-green-600 text-center">
                                            Yeni ({template.sections.length})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Warning for Replace */}
                    {insertMode === 'replace' && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                            <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700 dark:text-red-300">
                                Bu işlem <strong>geri alınamaz</strong>! Mevcut tüm section'lar kalıcı olarak silinecektir.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                        İptal
                    </button>
                    <button
                        onClick={() => onInsert(insertMode)}
                        disabled={loading}
                        className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 ${insertMode === 'replace'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-primary-500 hover:bg-primary-600'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Ekleniyor...
                            </span>
                        ) : (
                            insertMode === 'append' ? 'Ekle' : 'Temizle ve Ekle'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TemplateInsertModal;
