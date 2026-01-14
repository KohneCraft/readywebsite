'use client';

// ============================================
// Page Builder - Media Filters Component
// Arama, sıralama ve görünüm kontrolleri
// ============================================

import { Search, Grid, List } from 'lucide-react';
import type { MediaSortBy, MediaViewMode } from '@/types/media';

interface MediaFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: MediaSortBy;
  onSortByChange: (sortBy: MediaSortBy) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  viewMode: MediaViewMode;
  onViewModeChange: (mode: MediaViewMode) => void;
}

export function MediaFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange,
}: MediaFiltersProps) {
  return (
    <div className="media-filters flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="filter-search flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Ara..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Sort By */}
      <div className="filter-sort flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Sırala:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as MediaSortBy)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="uploadedAt">Yüklenme Tarihi</option>
          <option value="size">Boyut</option>
          <option value="name">İsim</option>
        </select>

        <button
          onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          title={sortOrder === 'asc' ? 'Artan' : 'Azalan'}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* View Mode */}
      <div className="filter-view flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={viewMode === 'grid' 
            ? 'p-2 rounded bg-primary-500 text-white' 
            : 'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}
          title="Grid Görünümü"
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={viewMode === 'list' 
            ? 'p-2 rounded bg-primary-500 text-white' 
            : 'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}
          title="Liste Görünümü"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

