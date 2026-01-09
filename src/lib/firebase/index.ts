// ============================================
// Page Builder - Firebase Exports
// Merkezi firebase modül export
// ============================================

// Config & Instances
export { default as app, auth, db, storage } from './config';

// Firestore Functions
export {
  // Settings
  getSiteSettings,
  updateSiteSettings,
  initializeSiteSettings,
  // Users
  getUserById,
  createUser,
  updateUser,
  updateLastLogin,
  getUsers,
  // Page Builder
  getAllPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn,
  getBlockById,
  createBlock,
  updateBlock,
  deleteBlock,
  moveBlock,
  // Themes
  getAvailableThemes,
  getThemeMetadata,
  getThemeData,
  createTheme,
  updateTheme,
  updateActiveThemeSettings,
  deleteCurrentTheme,
  installTheme,
} from './firestore';

// Storage Functions
export {
  STORAGE_PATHS,
  uploadFile,
  uploadFileWithProgress,
  uploadLogo,
  deleteFile,
  clearTempFolder,
  getFileUrl,
  getFolderUrls,
  isValidFileSize,
  isValidImageType,
  isValidFaviconType,
  validateImageFile,
} from './storage';

// Auth Functions
export {
  signIn,
  signOut,
  resetPassword,
  onAuthStateChanged,
  getCurrentUser,
  getCurrentUserId,
  getUserProfile,
  createUserProfile,
  updateUserPhoto,
  updateUserDisplayName,
  getUserRole,
  isAdmin,
  isSuperAdmin,
  hasPermission,
  firebaseUserToAuthUser,
  getAuthState,
  checkAdminAccess,
  checkRoleAccess,
} from './auth';
