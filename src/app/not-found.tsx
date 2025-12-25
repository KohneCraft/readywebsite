// ============================================
// Vav Yapı - Not Found Page (404)
// ============================================

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <span className="text-9xl font-bold text-primary-600/20">404</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Sayfa Bulunamadı
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Ana sayfaya dönerek devam edebilirsiniz.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
