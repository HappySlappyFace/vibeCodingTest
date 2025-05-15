"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import userService, { UserProfile, UpdateProfileData, ChangePasswordData } from '@/services/userService';
import tokenService from '@/services/tokenService';
import reservationService, { ReservationData } from '@/services/reservationService';

function ProfilePageContent() {
  const { user: authUser, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  // State for user data
  const [initialUserData, setInitialUserData] = useState<UserProfile | null>(null);
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile');

  // Form state for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input change for profile data
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle input change for password form
  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Check authentication status but don't redirect - let middleware handle redirects
  useEffect(() => {
    console.log('Profile page auth state:', { isAuthenticated, authLoading });
  }, [isAuthenticated, authLoading]);
  
  // State for token balance and reservation history
  const [tokenBalance, setTokenBalance] = useState(0);
  const [recentReservations, setRecentReservations] = useState<ReservationData[]>([]);
  const [reservationsLoading, setReservationsLoading] = useState(false);

  // Load user profile data, token balance, and recent reservations
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || authLoading) return;
      
      try {
        setIsLoading(true);
        
        // Load profile data, token balance, and recent reservations in parallel
        const [profile, tokenData, reservations] = await Promise.all([
          userService.getCurrentUserProfile(),
          tokenService.getUserBalance().catch((error: any) => {
            console.error('Error fetching token balance:', error);
            return { balance: 0 };
          }),
          reservationService.getUserReservations().catch((error: any) => {
            console.error('Error fetching reservations:', error);
            return [] as ReservationData[];
          })
        ]);
        
        setInitialUserData(profile);
        setUserData(profile);
        setTokenBalance(tokenData.balance);
        setRecentReservations(
          reservations.sort((a: ReservationData, b: ReservationData) => 
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          ).slice(0, 5)
        );
        
        console.log('User data loaded successfully:', { profile, tokenBalance: tokenData.balance, reservationsCount: reservations.length });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage({ type: 'error', text: 'Failed to load profile data. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [isAuthenticated, authLoading]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare update data
      const updateData: UpdateProfileData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber || userData.phone, // Handle both property names
        address: userData.address,
        dateOfBirth: userData.dateOfBirth,
        preferredCourt: userData.preferredCourt,
        playingLevel: userData.playingLevel,
        notificationsEnabled: userData.notificationsEnabled,
        newsletter: userData.newsletter,
      };

      // Call API to update profile
      const updatedProfile = await userService.updateProfile(updateData);

      // Update state with response
      setInitialUserData(updatedProfile);
      setUserData(updatedProfile);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      setIsSubmitting(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "New password must be at least 8 characters long.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare password change data
      const passwordData: ChangePasswordData = {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      };

      // Call API to change password
      await userService.changePassword(passwordData);

      // Password changed successfully
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);

      // Handle specific API errors
      if (error.response && error.response.data) {
        setMessage({
          type: "error",
          text: error.response.data.message || "Failed to change password.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Failed to change password. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Show loading state while fetching profile data
  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div className="ml-3 text-sm text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      {message && (
        <div
          className={`mb-6 rounded-md p-4 ${
            message.type === "success" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === "success" ? (
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  message.type === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {message.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-6 ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-4 px-6 ${
              activeTab === 'security'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-4 px-6 ${
              activeTab === 'activity'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Activity & Reservations
          </button>
        </nav>
      </div>

      {/* Token Balance Card - Always visible at the top */}
      <div className="mb-6 bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Token Balance</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your current token balance for court reservations and services.</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-blue-600">{tokenBalance}</span>
            <p className="text-sm text-gray-500">Available Tokens</p>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 bg-gray-50">
          <div className="flex justify-end">
            <Link href="/dashboard/tokens/purchase" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Purchase Tokens
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Information Tab */}
      {activeTab === "profile" && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Profile Information
              </h2>
              {!editMode ? (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setUserData(initialUserData);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of birth
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="preferredCourt"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preferred court
                    </label>
                    <div className="mt-1">
                      <select
                        id="preferredCourt"
                        name="preferredCourt"
                        value={userData.preferredCourt}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Indoor</option>
                        <option>Outdoor</option>
                        <option>No preference</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="playingLevel"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Playing level
                    </label>
                    <div className="mt-1">
                      <select
                        id="playingLevel"
                        name="playingLevel"
                        value={userData.playingLevel}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Professional</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <h3 className="text-sm font-medium text-gray-500">
                    First name
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {userData.firstName}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <h3 className="text-sm font-medium text-gray-500">
                    Last name
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {userData.lastName}
                  </p>
                </div>

                <div className="sm:col-span-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Email address
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                </div>

                <div className="sm:col-span-3">
                  <h3 className="text-sm font-medium text-gray-500">
                    Phone number
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                </div>

                <div className="sm:col-span-3">
                  <h3 className="text-sm font-medium text-gray-500">
                    Date of birth
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {userData.dateOfBirth}
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {userData.address}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <h3 className="text-sm font-medium text-gray-500">
                    Preferred court
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {userData.preferredCourt}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <h3 className="text-sm font-medium text-gray-500">
                    Playing level
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {userData.playingLevel}
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Security Settings
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your password and account security.
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <form onSubmit={handlePasswordChange} className="space-y-6 px-4 py-5">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <div className="mt-1">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordInputChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={passwordForm.newPassword}
                    onChange={handlePasswordInputChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                  >
                    {isSubmitting ? "Updating..." : "Change Password"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activity & Reservations Tab */}
      {activeTab === "activity" && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Reservations
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your recent court bookings and upcoming reservations.
            </p>
          </div>

          <div className="border-t border-gray-200">
            {recentReservations.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentReservations.map((reservation) => (
                  <li key={reservation.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {reservation.courtName || `Court #${reservation.courtId}`}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          <span>{reservation.facilityName || 'Unknown Facility'}</span>
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${reservation.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                            reservation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                            reservation.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {reservation.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>
                            {formatDate(reservation.startTime)} - {new Date(reservation.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Link href={`/dashboard/reservations/${reservation.id}`} className="text-blue-600 hover:text-blue-900">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't made any court reservations yet.</p>
                <div className="mt-6">
                  <Link href="/dashboard/reservations/new" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Book a Court
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Showing your {recentReservations.length} most recent reservations</span>
              <Link href="/dashboard/reservations" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View All Reservations
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
