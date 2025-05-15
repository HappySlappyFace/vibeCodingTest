"use client";

import Link from 'next/link';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import authService from '@/services/authService';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
  [key: string]: string | boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Check if user has just registered successfully
  useEffect(() => {
    if (searchParams?.get('registered') === 'true') {
      setSuccessMessage('Registration successful! Please log in with your credentials.');
    }
  }, [searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name as keyof LoginFormData;
    
    setFormData({
      ...formData,
      [fieldName]: type === 'checkbox' ? checked : value,
    });
    
    // Clear field-specific error when user starts typing
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: ''
      });
    }
    
    // Clear form error when user starts typing
    if (formError) {
      setFormError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Required field validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    // Validate the form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call the authentication service to sign in
      const response = await authService.login({
        username: formData.username,
        password: formData.password
      });
      
      // If we have a successful response with roles
      if (response && response.roles) {
        // Save remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        
        // Redirect based on role
        if (response.roles.includes('ROLE_SUPER_ADMIN')) {
          router.push('/super-admin/dashboard');
        } else if (response.roles.includes('ROLE_ADMIN')) {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific API errors
      if (error.response && error.response.data) {
        setFormError(error.response.data.message || 'Invalid username or password');
      } else {
        setFormError('Failed to connect to authentication server. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Sign in to your SuperAiPadel account</p>
            </div>
            
            {successMessage && (
              <div className="mb-4 rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}
            
            {formError && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{formError}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    onClick={() => setFormError('Social login is not available in this demo')}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.258 12.096c0-.768-.068-1.507-.195-2.216H12v4.19h5.754a4.923 4.923 0 01-2.136 3.232v2.688h3.46c2.026-1.864 3.18-4.61 3.18-7.894z" fill="#4285F4"/>
                      <path d="M12 23c2.889 0 5.308-.966 7.078-2.61l-3.46-2.688c-.959.645-2.186 1.025-3.618 1.025-2.783 0-5.144-1.875-5.987-4.398H2.04v2.77A10.56 10.56 0 0012 23z" fill="#34A853"/>
                      <path d="M6.013 14.329A6.335 6.335 0 015.675 12c0-.808.122-1.592.338-2.329V6.9H2.039A10.56 10.56 0 001 12a10.56 10.56 0 001.039 5.1l3.974-2.771z" fill="#FBBC05"/>
                      <path d="M12 5.273c1.568 0 2.975.539 4.084 1.598l3.067-3.067C17.308 2.109 14.889 1 12 1a10.56 10.56 0 00-9.961 7l3.974 2.77C6.856 7.147 9.217 5.273 12 5.273z" fill="#EA4335"/>
                    </svg>
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setFormError('Social login is not available in this demo')}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.897 12.647c0-2.648 1.45-5.297 2.95-6.747-1.099-1.35-2.848-2.4-4.998-2.4-2.098 0-3.498 1.05-4.648 1.05-1.2 0-2.999-1.05-4.848-1.05-2.45 0-5.048 1.5-6.447 4.098-1.8 3.248-.45 8.097 1.2 10.747.899 1.35 1.999 2.799 3.448 2.75 1.35-.05 1.85-.9 3.499-.9 1.599 0 2.099.9 3.499.85 1.45-.05 2.4-1.35 3.3-2.7.75-1.15 1.05-2.25 1.05-2.3-.05-.05-4.148-1.65-4.148-6.048 0-4.948 4.147-5.25 4.148-5.25z" fill="#000"/>
                      <path d="M17.248 3.951c1.05-1.3 1.8-3.099 1.599-4.95-1.549.1-3.448 1.05-4.548 2.349-.999 1.149-1.899 2.999-1.65 4.748 1.7.15 3.449-.849 4.599-2.147z" fill="#000"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
