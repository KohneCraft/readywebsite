// ============================================
// Page Builder - Default Themes
// Tüm varsayılan temaları export eder
// ============================================

import type { ThemeData } from '@/types/theme';
import { modernBusinessTheme } from '../ModernBusiness/modernBusinessTheme';
import { minimalTheme } from '../Minimal/minimalTheme';
import { corporateTheme } from '../Corporate/corporateTheme';
import { constructionTheme } from '../Construction/constructionTheme';

/**
 * Tüm varsayılan temaları getir
 */
export function getDefaultThemes(): ThemeData[] {
  return [modernBusinessTheme, minimalTheme, corporateTheme, constructionTheme];
}

/**
 * Tema ID'sine göre tema getir
 */
export function getThemeById(themeId: string): ThemeData | undefined {
  const themes = getDefaultThemes();
  return themes.find(theme => theme.metadata.id === themeId);
}

/**
 * Tüm temaları export et (direkt import için)
 */
export { modernBusinessTheme } from '../ModernBusiness/modernBusinessTheme';
export { minimalTheme } from '../Minimal/minimalTheme';
export { corporateTheme } from '../Corporate/corporateTheme';
export { constructionTheme } from '../Construction/constructionTheme';

