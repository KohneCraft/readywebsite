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
  localePrefix: 'always', // Her zaman locale prefix kullan (routing için gerekli)
  localeDetection: true, // Browser dilini algıla
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Static files ve API routes'u atla
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … if they contain a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

