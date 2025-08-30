import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get token from cookies
  const token = req.cookies.get('accessToken')?.value;
  const userInfo = req.cookies.get('userInfo')?.value;
  
  // Check if user is admin and token validity
  let isAdmin = false;
  let hasValidToken = false;
  let tokenExpired = false;
  let tokenInvalid = false;

  if (token) {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
          tokenExpired = true;
        } else {
          hasValidToken = true;
          isAdmin = payload.roles && Array.isArray(payload.roles) && payload.roles.includes('Admin');
        }
      } else {
        tokenInvalid = true;
      }
    } catch {
      // Token is invalid or malformed
      tokenInvalid = true;
      hasValidToken = false;
      isAdmin = false;
    }
  }

  // If token is expired, invalid, or missing userInfo, clear it and treat as no token
  if (tokenExpired || tokenInvalid || (token && !userInfo)) {
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('userInfo');
    return response;
  }

  // If user is admin with valid token, redirect them to /admin if they try to access non-admin pages
  if (hasValidToken && isAdmin && !pathname.startsWith('/admin')) {
    // Allow access to test pages for debugging
    if (pathname === '/test-admin' || pathname === '/test-cookies' || pathname === '/debug-cookies') {
      return NextResponse.next();
    }
    // Redirect admin users to admin dashboard
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // If user is not admin but has valid token, redirect them away from admin pages
  if (hasValidToken && !isAdmin && pathname.startsWith('/admin')) {
    // Redirect regular users to main site instead of admin login
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user has no valid token, prevent access to admin pages
  if (!hasValidToken && pathname.startsWith('/admin')) {
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
