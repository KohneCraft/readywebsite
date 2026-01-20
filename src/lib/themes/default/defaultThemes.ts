// ============================================
// Page Builder - Default Themes
// Tüm varsayılan temaları export eder
// ============================================

import type { ThemeData } from '@/types/theme';
import { modernBusinessTheme } from '../ModernBusiness/modernBusinessTheme';
import { minimalTheme } from '../Minimal/minimalTheme';
import { corporateTheme } from '../Corporate/corporateTheme';
import { constructionTheme } from '../Construction/constructionTheme';
import { restoranTheme } from '../Restoran/restoranTheme';
import { saglikTheme } from '../Saglik/saglikTheme';
import { egitimTheme } from '../Egitim/egitimTheme';
import { eticaretTheme } from '../Eticaret/eticaretTheme';

/**
 * Tüm varsayılan temaları getir
 */
export function getDefaultThemes(): ThemeData[] {
  return [
    modernBusinessTheme,
    minimalTheme,
    corporateTheme,
    constructionTheme,
    restoranTheme,
    saglikTheme,
    egitimTheme,
    eticaretTheme,
  ];
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
export { restoranTheme } from '../Restoran/restoranTheme';
export { saglikTheme } from '../Saglik/saglikTheme';
export { egitimTheme } from '../Egitim/egitimTheme';
export { eticaretTheme } from '../Eticaret/eticaretTheme';
