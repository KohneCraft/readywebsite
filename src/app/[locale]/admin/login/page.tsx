'use client';

// ============================================
// Page Builder - Admin Login Page
// Authentication page for admin panel
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { signIn, getCurrentUser } from '@/lib/firebase/auth';
import type { Locale } from '@/i18n';

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const t = useTranslations('admin.auth');
  const locale = useLocale() as Locale;
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const getLocalizedHref = useCallback((href: string) => {
    if (locale === 'tr') return href;
    return `/${locale}${href}`;
  }, [locale]);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Geçici session kontrolü
        const tempSession = localStorage.getItem('temp_admin_session');
        if (tempSession) {
          const session = JSON.parse(tempSession);
          // Session 24 saat geçerli
          if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
            router.push(getLocalizedHref('/admin'));
            return;
          } else {
            localStorage.removeItem('temp_admin_session');
          }
        }
        
        // Firebase kullanıcı kontrolü
        const user = await getCurrentUser();
        if (user) {
          router.push(getLocalizedHref('/admin'));
        }
      } catch {
        // Not logged in, stay on login page
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router, getLocalizedHref]);

  // Firebase hata kodlarını kullanıcı dostu mesajlara çevir
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      const message = error.message;
      
      // Firebase Auth hata kodları
      if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password')) {
        return 'E-posta veya şifre hatalı';
      }
      if (message.includes('auth/user-not-found')) {
        return 'Bu e-posta ile kayıtlı kullanıcı bulunamadı';
      }
      if (message.includes('auth/invalid-email')) {
        return 'Geçersiz e-posta adresi';
      }
      if (message.includes('auth/too-many-requests')) {
        return 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin';
      }
      if (message.includes('auth/user-disabled')) {
        return 'Bu hesap devre dışı bırakılmış';
      }
      if (message.includes('auth/network-request-failed')) {
        return 'Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin';
      }
      
      return message;
    }
    return t('loginError');
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Geçici admin girişi (Firebase olmadan)
      if (data.email === 'admin@pagebuilder.com' && data.password === 'admin123') {
        // Geçici session oluştur
        localStorage.setItem('temp_admin_session', JSON.stringify({
          id: 'temp-admin-001',
          email: 'admin@pagebuilder.com',
          displayName: 'Admin',
          role: 'admin',
          timestamp: Date.now(),
        }));
        router.push(getLocalizedHref('/admin'));
        return;
      }
      
      // Normal Firebase authentication
      await signIn(data.email, data.password);
      router.push(getLocalizedHref('/admin'));
    } catch (err) {
      console.error('Login error:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">PB</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('loginTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('loginSubtitle')}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="admin@pagebuilder.com"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    {...register('password')}
                    placeholder="••••••••"
                    className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {t('forgotPassword')}
                </button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size="sm" className="mr-2" />
                ) : (
                  <LogIn className="w-4 h-4 mr-2" />
                )}
                {t('login')}
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Firebase Authentication ile giriş yapın.
                <br />
                <span className="text-xs">
                  İlk kullanım için Firebase Console&apos;dan kullanıcı oluşturun.
                </span>
                <br />
                <br />
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                  Geçici Giriş: admin@pagebuilder.com / admin123
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
