// ============================================
// Vav Yapı - Firebase Exports
// Merkezi firebase modül export
// ============================================

// Config & Instances
export { default as app, auth, db, storage } from './config';

// Firestore Functions
export {
  // Projects
  getProjects,
  getProjectById,
  getProjectBySlug,
  getFeaturedProjects,
  getOngoingProjects,
  getCompletedProjects,
  createProject,
  updateProject,
  deleteProject,
  deleteProjects,
  // Contact Forms
  getContactForms,
  getContactFormById,
  createContactForm,
  updateContactForm,
  deleteContactForm,
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
} from './firestore';

// Storage Functions
export {
  STORAGE_PATHS,
  uploadFile,
  uploadFileWithProgress,
  uploadProjectCover,
  uploadProjectGalleryImage,
  uploadProjectGalleryImages,
  uploadLogo,
  deleteFile,
  deleteProjectImages,
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
