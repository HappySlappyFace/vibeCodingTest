"use client";

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { AuthUser } from '@/hooks/useAuth';
import axiosInstance from '@/services/axiosConfig';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  userRoles: string[];
  loading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  userRoles: [],
  loading: true,
  login: async () => ({}),
  logout: () => {},
  refreshToken: async () => false,
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Initialize auth state from cookies
  const initializeAuth = useCallback(async () => {
    try {
      // Check for token existence - if no token, simply set not authenticated
      const token = authService.getToken();
      console.log('AuthProvider initialization - Token exists:', !!token);
      
      if (!token) {
        console.log('No token found, setting not authenticated');
        setIsAuthenticated(false);
        setUser(null);
        setUserRoles([]);
        setLoading(false);
        return;
      }
      
      // We have a token, get user data
      const userData = authService.getCurrentUser();
      const roles = authService.getRoles();
      
      console.log('User data found:', !!userData, 'Roles:', roles);
      
      // Set authenticated regardless of token expiration
      // This matches middleware behavior
      if (userData) {
        setUser(userData);
        setUserRoles(roles);
        setIsAuthenticated(true);
      }
      
      // Check token expiration in the background, but don't affect current auth state
      if (authService.isTokenExpired()) {
        console.log('Token is expired, attempting refresh');
        // Don't wait for refresh to complete or affect authentication state
        authService.refreshToken().catch(error => {
          console.error('Background token refresh failed:', error);
        });
      }
    } catch (error) {
      console.error('Error during auth initialization:', error);
    } finally {
      // Always set loading to false to prevent UI from getting stuck
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
    
    // Set up a timer to check token expiration every minute
    const tokenCheckInterval = setInterval(async () => {
      if (isAuthenticated && authService.isTokenExpired()) {
        const refreshed = await authService.refreshToken();
        if (!refreshed) {
          // If refresh failed, logout
          logout();
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(tokenCheckInterval);
  }, [initializeAuth, isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login({ username, password });
      
      setUser({
        id: response.id,
        username: response.username,
        email: response.email,
        roles: response.roles,
      });
      setUserRoles(response.roles);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setUserRoles([]);
    setIsAuthenticated(false);
    router.push('/');
  };

  const refreshToken = async () => {
    try {
      const refreshed = await authService.refreshToken();
      return refreshed;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    userRoles,
    loading,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
