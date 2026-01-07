// ============================================
// Vav Yapı - Next.js Middleware
// Locale routing + maintenance mode check
// ============================================

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

// next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Default dil için prefix yok
  localeDetection: true, // Browser dilini algıla
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Static files ve API routes'u atla
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Admin routes için özel kontrol
  // (Auth kontrolü client-side yapılacak)
  if (pathname.includes('/admin')) {
    return intlMiddleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … if they contain a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

