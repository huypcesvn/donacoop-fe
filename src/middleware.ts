import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const adminPaths = ['/admin'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (adminPaths.some(path => pathname.startsWith(pathname))) {
    const token = req.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.redirect(new URL('/', req.url));

    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      if (payload.role !== 'admin') return NextResponse.redirect(new URL('/', req.url));
    } catch {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
