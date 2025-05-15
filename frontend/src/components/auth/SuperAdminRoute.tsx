"use client";

import { ReactNode } from 'react';
import ProtectedRoute from './ProtectedRoute';

interface SuperAdminRouteProps {
  children: ReactNode;
}

/**
 * Component that protects routes requiring SUPER_ADMIN role
 * Use this inside super admin page components
 */
const SuperAdminRoute = ({ children }: SuperAdminRouteProps) => {
  return <ProtectedRoute requiredRole="ROLE_SUPER_ADMIN">{children}</ProtectedRoute>;
};

export default SuperAdminRoute;
