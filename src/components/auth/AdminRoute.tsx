"use client";

import { ReactNode } from 'react';
import ProtectedRoute from './ProtectedRoute';

interface AdminRouteProps {
  children: ReactNode;
}

/**
 * Component that protects routes requiring ADMIN role
 * Use this inside admin page components
 */
const AdminRoute = ({ children }: AdminRouteProps) => {
  return <ProtectedRoute requiredRole="ROLE_ADMIN">{children}</ProtectedRoute>;
};

export default AdminRoute;
