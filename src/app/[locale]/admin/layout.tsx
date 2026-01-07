'use client';

// ============================================
// Page Builder - Admin Layout
// Protected layout for admin panel
// ============================================

import { useState, useEffect, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  Bell,
  Layers,
  Palette,
  Image as ImageIcon,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { ToastProvider } from '@/components/providers';
import { onAuthStateChanged, signOut as firebaseSignOut, getUserProfile } from '@/lib/firebase/auth';
import { getSiteSettings } from '@/lib/firebase/firestore';
import { logger } from '@/lib/logger';
import Image from 'next/image';
import type { Locale } from '@/i18n';
import type { User as UserType } from '@/types';

// Auth context for admin
interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'editor' | 'superadmin';
  profile?: UserType | null;
}

interface AdminContextType {
  user: AdminUser | null;
  isLoading: boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [adminTitle, setAdminTitle] = useState<string>('Page Builder');
  const [adminIcon, setAdminIcon] = useState<string>('');

  // Check if on login page
  const isLoginPage = pathname?.includes('/admin/login');

  // Check auth on mount
  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    // Önce geçici session kontrolü yap
    const tempSession = localStorage.getItem('temp_admin_session');
    if (tempSession) {
      try {
        const session = JSON.parse(tempSession);
        // Session 24 saat geçerli
        if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
          setUser({
            id: session.id,
            email: session.email,
            displayName: session.displayName,
            role: session.role,
            profile: null,
          });
          setIsLoading(false);
          return;
        } else {
          localStorage.removeItem('temp_admin_session');
        }
      } catch (error) {
        logger.auth.error('Temp session error', error);
        localStorage.removeItem('temp_admin_session');
      }
    }

    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const profile = await getUserProfile(firebaseUser.uid);
          
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || profile?.displayName || 'Admin',
            role: profile?.role || 'admin',
            profile,
          });
        } catch (error) {
          logger.auth.error('Failed to get user profile', error);
          // Still allow access if Firebase Auth succeeds but profile fetch fails
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Admin',
            role: 'admin',
          });
        }
      } else {
        // Not logged in, redirect to login
        setUser(null);
        const loginPath = locale === 'tr' ? '/admin/login' : `/${locale}/admin/login`;
        router.push(loginPath);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [locale, router, isLoginPage]);

  // Admin panel başlık ve icon'u yükle
  useEffect(() => {
    async function loadAdminSettings() {
      try {
        const settings = await getSiteSettings();
        if (settings?.adminTitle) {
          setAdminTitle(settings.adminTitle);
        }
        if (settings?.adminIcon) {
          setAdminIcon(settings.adminIcon);
        }
      } catch (error) {
        logger.ui.error('Admin ayarları yükleme hatası', error);
      }
    }
    loadAdminSettings();
    
    // Theme güncellemelerini dinle
    const handleThemeUpdate = () => {
      loadAdminSettings();
    };
    window.addEventListener('theme-updated', handleThemeUpdate);
    
    return () => {
      window.removeEventListener('theme-updated', handleThemeUpdate);
    };
  }, []);

  const logout = async () => {
    try {
      // Geçici session'ı temizle
      localStorage.removeItem('temp_admin_session');
      
      // First sign out from Firebase
      await firebaseSignOut();
      // Clear local state
      setUser(null);
      // Force redirect with window.location for clean navigation
      const loginPath = locale === 'tr' ? '/admin/login' : `/${locale}/admin/login`;
      window.location.href = loginPath;
    } catch (error) {
      logger.auth.error('Logout failed', error);
      // Geçici session'ı temizle
      localStorage.removeItem('temp_admin_session');
      // Even if signOut fails, redirect to login
      const loginPath = locale === 'tr' ? '/admin/login' : `/${locale}/admin/login`;
      window.location.href = loginPath;
    }
  };

  // Navigation items
  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: t('dashboard.title') },
    { href: '/admin/page-builder', icon: Layers, label: t('pageBuilder.title') },
    { href: '/admin/themes', icon: Palette, label: t('themes.title') },
    { href: '/admin/media', icon: ImageIcon, label: 'Medya Yönetimi' },
    { href: '/admin/messages', icon: Mail, label: 'İletişim Mesajları' },
    { href: '/admin/settings', icon: Settings, label: t('settings.title') },
  ];

  const getLocalizedHref = (href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  };

  const isActive = (href: string) => {
    const localizedHref = getLocalizedHref(href);
    if (href === '/admin') {
      return pathname === localizedHref || pathname === `/${locale}/admin`;
    }
    return pathname.startsWith(localizedHref);
  };

  // Don't show admin layout on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <AdminContext.Provider value={{ user, isLoading, logout }}>
      <ToastProvider />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Mobile sidebar overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transition-all duration-300',
            isSidebarOpen ? 'w-64' : 'w-20',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            {isSidebarOpen && (
              <Link
                href={getLocalizedHref('/admin')}
                prefetch={false}
                className="flex items-center gap-2 w-full text-left"
              >
                {adminIcon ? (
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                    <Image
                      src={adminIcon}
                      alt={adminTitle}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">V</span>
                  </div>
                )}
                <span className="font-bold text-gray-900 dark:text-white">{adminTitle}</span>
              </Link>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedHref(item.href)}
                prefetch={false}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left',
                  isActive(item.href)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Logout button at bottom */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button
              onClick={logout}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span>{t('logout')}</span>}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div
          className={cn(
            'transition-all duration-300',
            isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
          )}
        >
          {/* Top bar */}
          <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sticky top-0 z-30">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="hidden lg:block" />

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.displayName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
