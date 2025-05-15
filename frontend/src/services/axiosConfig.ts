import axios from 'axios';
import authService from './authService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add JWT token to requests
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't retried already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Check if we can refresh the token
        if (authService.getRefreshToken()) {
          const refreshSuccess = await authService.refreshToken();
          
          if (refreshSuccess) {
            // Update the Authorization header with the new token
            originalRequest.headers.Authorization = `Bearer ${authService.getToken()}`;
            return axios(originalRequest); // Retry the original request
          }
        }
        
        // If refresh failed or no refresh token available, logout and redirect
        if (typeof window !== 'undefined') {
          authService.logout();
          window.location.href = '/auth/login?expired=true';
        }
      } catch (refreshError) {
        console.error('Error during token refresh:', refreshError);
        
        // Logout on refresh failure
        if (typeof window !== 'undefined') {
          authService.logout();
          window.location.href = '/auth/login?expired=true';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
