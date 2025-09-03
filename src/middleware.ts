import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;

  if (!token && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (token && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Bỏ qua api, static, image, favicon
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
