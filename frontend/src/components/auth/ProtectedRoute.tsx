"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

/**
 * Component that protects routes requiring authentication and specific roles
 * Use this inside page components that need protection
 */
const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const isAuthenticated = authService.isLoggedIn();
      
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.replace(`/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      
      // Check role if specified
      if (requiredRole) {
        const hasRequiredRole = authService.hasRole(requiredRole);
        
        if (!hasRequiredRole) {
          // Redirect to dashboard if lacking required role
          router.replace('/dashboard');
          return;
        }
      }
      
      // User is authenticated and has required role (if any)
      setIsAuthorized(true);
      setIsLoading(false);
    };
    
    checkAuth();
  }, [router, requiredRole]);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render children only if authorized
  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute;
