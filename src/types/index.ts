// ============================================
// Vav Yapı - Type Exports
// Merkezi tip export dosyası
// ============================================

// Project Types
export type {
  ProjectStatus,
  ProjectType,
  Locale,
  ProjectTranslation,
  ProjectImage,
  Coordinates,
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
  ProjectSummary,
  ProjectFilters,
  ProjectSortField,
  SortDirection,
  ProjectSort,
  PaginationParams,
  PaginatedProjects,
} from './project';

// Contact Types
export type {
  ContactStatus,
  ContactSubject,
  ContactForm,
  ContactFormInput,
  ContactFormUpdate,
  ContactFormSummary,
  ContactFormFilters,
  PaginatedContactForms,
} from './contact';

export { CONTACT_SUBJECTS, CONTACT_STATUSES } from './contact';

// Settings Types
export type {
  Logo,
  SocialLinks,
  ContactInfo,
  SEOSettings,
  MaintenanceMode,
  HomepageSettings,
  FormSettings,
  Redirect,
  SiteSettings,
  SiteSettingsUpdate,
} from './settings';

export { DEFAULT_SITE_SETTINGS } from './settings';

// User Types
export type {
  UserRole,
  User,
  UserCreateInput,
  UserUpdateInput,
  AuthUser,
  AuthState,
  ActivityLog,
} from './user';

export { ROLE_PERMISSIONS, ROLE_LABELS, hasPermission, hasMinRole } from './user';

// Page Layout Types
export type {
  PageType,
  ElementType,
  ElementWidth,
  ElementPosition,
  ElementSettings,
  PageElement,
  PageLayout,
  PageLayoutCreateInput,
  PageLayoutUpdateInput,
} from './pageLayout';

// ResponsiveSettings'i pageLayout.ts'den export et (pageBuilder.ts'deki ile farklı)
export type { ResponsiveSettings as PageLayoutResponsiveSettings } from './pageLayout';

export {
  DEFAULT_ELEMENT_SETTINGS,
  PROJECT_DETAIL_DEFAULT_ELEMENTS,
  HOME_DEFAULT_ELEMENTS,
  CONTACT_DEFAULT_ELEMENTS,
  ELEMENT_TYPE_LABELS,
  PAGE_TYPE_LABELS,
  getDefaultElementsForPage,
} from './pageLayout';

// Page Content Types
export type {
  TextStyles,
  ImageSettings,
  ButtonSettings,
  ContentSection,
  PageContent,
  PageContentCreateInput,
  PageContentUpdateInput,
} from './pageContent';

export {
  DEFAULT_TEXT_STYLES,
  DEFAULT_CONTENT_SECTION,
  FONT_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  TEXT_ALIGN_OPTIONS,
} from './pageContent';

// Page Builder Types
export type {
  BlockType,
  Breakpoint,
  Spacing,
  Border,
  Overlay,
  Animation,
  ImageFilter,
  HoverEffect,
  ResponsiveSettings,
  Block,
  BlockProps,
  FormField,
  Column,
  ColumnSettings,
  Section,
  SectionSettings,
  Page,
  PageSettings,
  PageVersion,
  PageCreateInput,
  SectionCreateInput,
  ColumnCreateInput,
  BlockCreateInput,
  PageUpdateInput,
  SectionUpdateInput,
  ColumnUpdateInput,
  BlockUpdateInput,
} from './pageBuilder';

export {
  DEFAULT_SPACING,
  DEFAULT_BORDER,
  DEFAULT_ANIMATION,
  BLOCK_TYPE_LABELS,
  getDefaultBlockProps,
} from './pageBuilder';

// ============================================
// Common Types
// ============================================

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * API Error
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Form field error
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: FieldError[];
}

/**
 * Image upload result
 */
export interface UploadResult {
  url: string;
  path: string;
  filename: string;
  size: number;
  contentType: string;
}

/**
 * Batch operation result
 */
export interface BatchResult {
  success: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}

/**
 * Date range
 */
export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Supported locales tuple
 */
export const SUPPORTED_LOCALES = ['tr', 'en', 'de', 'fr'] as const;

/**
 * Local Locale type for LOCALE_METADATA
 */
type LocaleType = 'tr' | 'en' | 'de' | 'fr';

/**
 * Default locale
 */
export const DEFAULT_LOCALE = 'tr' as const;

/**
 * Locale metadata
 */
export const LOCALE_METADATA: Record<
  LocaleType,
  { name: string; flag: string; dir: 'ltr' | 'rtl' }
> = {
  tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
};
