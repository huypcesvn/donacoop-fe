import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookies = request.cookies;

  const accessToken = cookies.get('accessToken')?.value;
  const userInfo = cookies.get('userInfo')?.value;

  let tokenInfo = null;
  let isAdmin = false;
  let hasValidToken = false;
  let tokenExpired = false;
  let tokenInvalid = false;

  if (accessToken) {
    try {
      const tokenParts = accessToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
          tokenExpired = true;
        } else {
          hasValidToken = true;
          isAdmin = payload.roles && Array.isArray(payload.roles) && payload.roles.includes('Admin');
          tokenInfo = payload;
        }
      } else {
        tokenInvalid = true;
      }
    } catch {
      tokenInvalid = true;
    }
  }

  // Convert cookies to object
  const allCookies: Record<string, string> = {};
  cookies.getAll().forEach(cookie => {
    allCookies[cookie.name] = cookie.value;
  });

  return NextResponse.json({
    cookies: {
      accessToken: accessToken ? 'Present' : 'Missing',
      userInfo: userInfo ? 'Present' : 'Missing',
      allCookies
    },
    token: {
      hasValidToken,
      isAdmin,
      tokenExpired,
      tokenInvalid,
      tokenInfo
    },
    timestamp: new Date().toISOString()
  });
}
