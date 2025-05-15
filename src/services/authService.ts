import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/auth';

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
  tokenType: string;
}

// Authentication service
class AuthService {
  // Login method
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/signin`, loginData);
    
    if (response.data.accessToken) {
      this.setAuthData(response.data);
    }
    
    return response.data;
  }

  // Register method
  async register(registerData: RegisterData): Promise<any> {
    return axios.post(`${API_URL}/signup`, registerData);
  }
  
  // Logout method
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }
  
  // Store authentication data
  setAuthData(data: AuthResponse): void {
    localStorage.setItem('user', JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      roles: data.roles
    }));
    localStorage.setItem('accessToken', data.accessToken);
  }
  
  // Get current user
  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
  
  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  
  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
  
  // Check if user has role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) || false;
  }
  
  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }
  
  // Check if user is super admin
  isSuperAdmin(): boolean {
    return this.hasRole('ROLE_SUPER_ADMIN');
  }
}

export default new AuthService();
