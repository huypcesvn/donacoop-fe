import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get token from cookies
  const token = req.cookies.get('accessToken')?.value;
  
  // Check if user is admin
  let isAdmin = false;
  if (token) {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
        isAdmin = payload.roles && Array.isArray(payload.roles) && payload.roles.includes('Admin');
      }
    } catch {
      // Token is invalid, treat as non-admin
      isAdmin = false;
    }
  }

  // If user is admin, redirect them to /admin if they try to access non-admin pages
  if (isAdmin && !pathname.startsWith('/admin')) {
    // Allow access to test-admin page for debugging
    if (pathname === '/test-admin') {
      return NextResponse.next();
    }
    // Redirect admin users to admin dashboard
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // If user is not admin, prevent access to admin pages
  if (!isAdmin && pathname.startsWith('/admin')) {
    // Allow access to admin login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    // Redirect to admin login page
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = { 
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ] 
};
