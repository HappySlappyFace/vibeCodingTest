"use client";

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';

export interface AuthUser {
  username: string;
  email?: string;
  roles: string[];
  id?: number;
  // Add other user properties as needed
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: AuthUser | null;
  userRoles: string[];
  logout: () => void;
  login: (username: string, password: string) => Promise<any>;
  refreshToken: () => Promise<boolean>;
  loading: boolean;
}

/**
 * Custom hook to access authentication state and user information
 * from the AuthContext throughout the application.
 */
export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
