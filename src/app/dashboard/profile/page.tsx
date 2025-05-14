"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  // Mock user data - in a real app, this would be fetched from the backend
  const initialUserData = {
    firstName: 'Ahmed',
    lastName: 'Ben Ali',
    email: 'ahmed@example.com',
    phone: '+216 55 123 456',
    address: '123 Rue de Carthage, Tunis',
    dateOfBirth: '1985-04-15',
    preferredCourt: 'Indoor',
    playingLevel: 'Intermediate',
    notificationsEnabled: true,
    newsletter: true,
    profileImage: null,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form state for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle input change for profile data
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle input change for password form
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you would call an API to update the user profile
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
      
      // Simulate API call latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditMode(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      setIsLoading(false);
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters long.' });
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real app, you would call an API to change the password
      // await fetch('/api/user/password', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword: passwordForm.currentPassword,
      //     newPassword: passwordForm.newPassword,
      //   }),
      // });
      
      // Simulate API call latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, check if the current password is 'password123'
      if (passwordForm.currentPassword === 'password123') {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setMessage({ type: 'error', text: 'Current password is incorrect.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
      console.error('Error changing password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-gray-600">Manage your profile information and account preferences</p>
        </div>
        
        {/* Message Notification */}
        {message.text && (
          <div className={`mb-6 rounded-md p-4 ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {message.type === 'success' ? (
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  {message.text}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`${activeTab === 'password' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Change Password
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`${activeTab === 'preferences' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Preferences
            </button>
          </nav>
        </div>
        
        {/* Profile Information Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
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
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
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
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
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
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
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
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of birth</label>
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
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
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
                      <label htmlFor="preferredCourt" className="block text-sm font-medium text-gray-700">Preferred court</label>
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
                      <label htmlFor="playingLevel" className="block text-sm font-medium text-gray-700">Playing level</label>
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
                      disabled={isLoading}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500">First name</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.firstName}</p>
                  </div>

                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500">Last name</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.lastName}</p>
                  </div>

                  <div className="sm:col-span-4">
                    <h3 className="text-sm font-medium text-gray-500">Email address</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                  </div>

                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500">Phone number</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                  </div>

                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500">Date of birth</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.dateOfBirth}</p>
                  </div>

                  <div className="sm:col-span-6">
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.address}</p>
                  </div>

                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500">Preferred court</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.preferredCourt}</p>
                  </div>

                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500">Playing level</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.playingLevel}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Change Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Change Password</h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-6 max-w-lg">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current password</label>
                  <div className="mt-1">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New password</label>
                  <div className="mt-1">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      minLength={8}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm new password</label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Password security</h3>
                <p className="text-sm text-gray-500">
                  For your security, we recommend using a strong password that you don't use elsewhere.
                  A strong password contains a mix of uppercase and lowercase letters, numbers, and special characters.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">User Preferences</h2>
              
              <form className="space-y-6">
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">Notifications</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notificationsEnabled"
                          name="notificationsEnabled"
                          type="checkbox"
                          checked={userData.notificationsEnabled}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationsEnabled" className="font-medium text-gray-700">Enable notifications</label>
                        <p className="text-gray-500">Receive notifications about your reservations, upcoming matches, and court availability.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          name="newsletter"
                          type="checkbox"
                          checked={userData.newsletter}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletter" className="font-medium text-gray-700">Subscribe to newsletter</label>
                        <p className="text-gray-500">Receive updates about new facilities, promotions, and padel events in Tunisia.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleProfileUpdate}
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                  >
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </form>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-red-600 mb-3">Danger Zone</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Once you delete your account, all of your data will be permanently removed.
                  This action cannot be undone.
                </p>
                <button
                  type="button"
                  onClick={() => setMessage({ type: 'error', text: 'Account deletion is not available in this demo.' })}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
