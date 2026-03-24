import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['es', 'en'];
const defaultLocale = 'es';

export function proxy(request: NextRequest) {
  // Discard API routes, static Next assets, images, etc.
  const { pathname } = request.nextUrl;
  
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next')
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Reading cookie precedence
  const storedLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const preferredLocale = locales.includes(storedLocale || '') 
    ? storedLocale 
    : defaultLocale;

  // Rewrite / redirect to the right locale explicitly adding fallback to URL
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
