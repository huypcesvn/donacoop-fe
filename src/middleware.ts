import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const adminPaths = ['/admin'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (adminPaths.some(path => pathname.startsWith(path))) {
    // Lấy token từ cookie
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.redirect(new URL('/', req.url));

    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

      if (payload.role !== 'admin') return NextResponse.redirect(new URL('/', req.url));
    } catch (e) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

// Config để middleware chỉ chạy với những route cần
export const config = {
  matcher: ['/admin/:path*'],
};
