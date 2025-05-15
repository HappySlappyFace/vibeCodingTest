import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/faq',
];

// Routes that require specific roles
const adminRoutes = ['/admin'];
const superAdminRoutes = ['/super-admin'];

// Function to check if a path is a public route (no auth required)
const isPublicRoute = (path: string): boolean => {
  return publicRoutes.some(route => path.startsWith(route));
};

// Function to check if a path requires admin access
const isAdminRoute = (path: string): boolean => {
  return adminRoutes.some(route => path.startsWith(route));
};

// Function to check if a path requires super admin access
const isSuperAdminRoute = (path: string): boolean => {
  return superAdminRoutes.some(route => path.startsWith(route));
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the route is public - allow access without authentication
  if (isPublicRoute(path)) {
    // Add debug statement to response headers
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-store');
    return response;
  }
  
  // Get stored token from cookies - this is server-side so can only access cookies, not localStorage
  // This is a fundamental limitation - server middleware can't access client localStorage
  const token = request.cookies.get('accessToken')?.value;
  const userRolesJson = request.cookies.get('userRoles')?.value;
  
  console.log(`Middleware processing ${path}: Token exists: ${!!token}`);
  console.log('IMPORTANT: Server middleware cannot access localStorage - must use cookies for auth');
  
  // No token - redirect to login
  if (!token) {
    console.log(`No token found for ${path}, redirecting to login`);
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', path);
    const response = NextResponse.redirect(url);
    response.headers.set('x-middleware-cache', 'no-store');
    return response;
  }
  
  console.log(`Token found for ${path}, proceeding with auth checks`);
  
  // Parse user roles
  let userRoles: string[] = [];
  try {
    if (userRolesJson) {
      userRoles = JSON.parse(userRolesJson);
    }
  } catch (error) {
    console.error('Error parsing user roles:', error);
  }
  
  // Check if user has correct permissions for admin routes
  if (isAdminRoute(path) && !userRoles.includes('ROLE_ADMIN') && !userRoles.includes('ROLE_SUPER_ADMIN')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Check if user has correct permissions for super admin routes
  if (isSuperAdminRoute(path) && !userRoles.includes('ROLE_SUPER_ADMIN')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Allow access for authenticated and authorized users
  return NextResponse.next();
}

// Configure which routes this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files like favicon.ico, robots.txt, etc.
     */
    '/((?!api|_next|static|.*\..*).*)'
  ],
};
