import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import cookieManager from '@/utils/cookieManager';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/auth';

// Cookie settings
const TOKEN_COOKIE_NAME = 'accessToken';
const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
const USER_COOKIE_NAME = 'userData';
const ROLES_COOKIE_NAME = 'userRoles';
const COOKIE_EXPIRY = 7; // days
const TOKEN_EXPIRY_BUFFER = 60; // seconds buffer before token expires

// Cookie options to ensure cross-page persistence
const COOKIE_OPTIONS = {
  expires: COOKIE_EXPIRY,
  path: '/', // This is crucial - ensures cookies are accessible across all paths
  sameSite: 'lax' as const, // Allow cookies in same-site navigations (more permissive than 'strict')
  secure: process.env.NODE_ENV === 'production' // Only use secure in production
};

// Types for request and response
export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  roles: string[];
  accessToken: string;
  refreshToken?: string; // Optional refresh token
  tokenType: string;
}

// Interface for JWT token payload
interface JwtPayload {
  sub: string; // subject (username)
  exp: number; // expiration time in unix timestamp
  iat: number; // issued at time in unix timestamp
  roles?: string[];
  // Add other claims as needed
}

// Authentication service
class AuthService {
  // Login method
  async login(loginData: LoginData): Promise<AuthResponse> {
    console.log('Starting login process...');
    try {
      const response = await axios.post(`${API_URL}/signin`, loginData);
      console.log('Login successful, response:', response.data);
      
      // Always create normalized data structure to ensure consistent field names
      const normalizedData: AuthResponse = {
        ...response.data,
        // Use token field or accessToken field, whichever exists
        accessToken: response.data.token || response.data.accessToken || '',
        tokenType: response.data.type || response.data.tokenType || 'Bearer',
        // Ensure all required fields exist with defaults if needed
        id: response.data.id || 0,
        username: response.data.username || '',
        email: response.data.email || '',
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        phoneNumber: response.data.phoneNumber || '',
        profilePictureUrl: response.data.profilePictureUrl || null,
        roles: response.data.roles || []
      };
      
      // Only proceed with token storage if we actually have a token
      if (normalizedData.accessToken) {
        console.log('Setting auth data with token');
        
        console.log('Normalized auth data:', { 
          accessToken: !!normalizedData.accessToken,
          refreshToken: !!normalizedData.refreshToken,
          roles: normalizedData.roles
        });
        
        this.setAuthData(normalizedData);
        
        // Verify auth data was set by reading it back
        const tokenVerify = cookieManager.get(TOKEN_COOKIE_NAME);
        console.log('Verification - Token exists:', !!tokenVerify);
      } else {
        console.error('No token found in response - expecting token or accessToken field');
      }
      
      // Return normalized data to ensure consistent field names throughout the app
      return normalizedData || response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register method
  async register(registerData: RegisterData): Promise<any> {
    return axios.post(`${API_URL}/signup`, registerData);
  }
  
  // Logout method
  logout(): void {
    console.log('Logging out user...');
    // Clear all auth cookies and localStorage
    cookieManager.remove(TOKEN_COOKIE_NAME);
    cookieManager.remove(REFRESH_TOKEN_COOKIE_NAME);
    cookieManager.remove(USER_COOKIE_NAME);
    cookieManager.remove(ROLES_COOKIE_NAME);
  }
  
  // Store authentication data
  setAuthData(data: AuthResponse): void {
    try {
      // Store user data
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      };
      
      console.log('Setting authentication data...');
      
      // Use our cookie manager utility for consistent behavior
      console.log('Setting user data cookie');
      cookieManager.set(USER_COOKIE_NAME, JSON.stringify(userData));
      
      console.log('Setting token cookie');
      cookieManager.set(TOKEN_COOKIE_NAME, data.accessToken);
      
      // Store refresh token if available
      if (data.refreshToken) {
        console.log('Setting refresh token cookie');
        cookieManager.set(REFRESH_TOKEN_COOKIE_NAME, data.refreshToken);
      }
      
      console.log('Setting roles cookie');
      cookieManager.set(ROLES_COOKIE_NAME, JSON.stringify(data.roles));
      
      // Verify cookies were set
      const tokenCheck = cookieManager.get(TOKEN_COOKIE_NAME);
      const userCheck = cookieManager.get(USER_COOKIE_NAME);
      const rolesCheck = cookieManager.get(ROLES_COOKIE_NAME);
      
      console.log('Auth data verification - token:', !!tokenCheck, 
        'user:', !!userCheck, 'roles:', !!rolesCheck);
    } catch (error) {
      console.error('Error setting auth data:', error);
    }
  }
  
  // Get current user
  getCurrentUser(): any {
    try {
      const userStr = cookieManager.get(USER_COOKIE_NAME);
      if (userStr) {
        return JSON.parse(userStr);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
    return null;
  }
  
  // Get JWT token
  getToken(): string | null {
    return cookieManager.get(TOKEN_COOKIE_NAME);
  }
  
  // Get refresh token
  getRefreshToken(): string | null {
    return cookieManager.get(REFRESH_TOKEN_COOKIE_NAME);
  }
  
  // Get user roles
  getRoles(): string[] {
    try {
      const rolesStr = cookieManager.get(ROLES_COOKIE_NAME);
      if (rolesStr) {
        return JSON.parse(rolesStr);
      }
    } catch (error) {
      console.error('Error retrieving roles:', error);
    }
    return [];
  }
  
  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    // Only check for token existence, not expiration
    // This matches middleware behavior which only checks token presence
    return !!token;
  }
  
  // Check if token is expired or about to expire
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
      
      // Check if token is expired or about to expire within buffer period
      return decoded.exp < (currentTime + TOKEN_EXPIRY_BUFFER);
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }
  
  // Check if user has role
  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role) || false;
  }
  
  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN') || this.hasRole('ROLE_SUPER_ADMIN');
  }
  
  // Check if user is super admin
  isSuperAdmin(): boolean {
    return this.hasRole('ROLE_SUPER_ADMIN');
  }
  
  // Refresh the JWT token
  async refreshToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return false;
    }
    
    try {
      const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
      
      if (response.data.accessToken) {
        // Use cookieManager for consistent token storage
        cookieManager.set(TOKEN_COOKIE_NAME, response.data.accessToken);
        
        // Update refresh token if provided
        if (response.data.refreshToken) {
          cookieManager.set(REFRESH_TOKEN_COOKIE_NAME, response.data.refreshToken);
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }
}

export default new AuthService();
