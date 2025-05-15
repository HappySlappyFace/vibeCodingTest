import axios from 'axios';

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
    const token = localStorage.getItem('accessToken');
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Here you could implement token refresh logic
      // For now, we'll just redirect to login page on auth errors
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
      }
      
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
