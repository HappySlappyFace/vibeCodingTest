"use client";

import Link from 'next/link';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { RegisterData } from '@/services/authService';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  [key: string]: string | boolean;
};

interface FormErrors {
  [key: string]: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name as keyof FormData;
    
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
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Required field validation
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      if (key !== 'phoneNumber' && !formData[key]) {
        const keyStr = String(key);
        newErrors[key] = `${keyStr.charAt(0).toUpperCase() + keyStr.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Terms acceptance
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    
    // Validate the form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare registration data for the API
      const registerData: RegisterData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || ''
      };
      
      // Import authService for registration since we don't have register in useAuth
      const authService = await import('@/services/authService').then(mod => mod.default);
      // Call the registration API
      await authService.register(registerData);
      
      // Registration successful - redirect to login page
      router.push('/auth/login?registered=true');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific API errors
      if (error.response && error.response.data) {
        setFormError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setFormError('Failed to connect to registration server. Please try again later.');
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
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="mt-2 text-gray-600">Join SuperAiPadel to book courts and more</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>

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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {formError && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
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

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
