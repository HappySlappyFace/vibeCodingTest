import axiosInstance from './axiosConfig';

const API_URL = '/api/users';

// Types for user data
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth?: string;
  preferredCourt?: string;
  playingLevel?: string;
  profilePictureUrl?: string;
  notificationsEnabled?: boolean;
  newsletter?: boolean;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  preferredCourt?: string;
  playingLevel?: string;
  notificationsEnabled?: boolean;
  newsletter?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// User service for profile management
class UserService {
  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile> {
    const response = await axiosInstance.get(`${API_URL}/profile`);
    return response.data;
  }

  // Update user profile
  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    const response = await axiosInstance.put(`${API_URL}/profile`, data);
    return response.data;
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<any> {
    return axiosInstance.post(`${API_URL}/change-password`, data);
  }

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post(`${API_URL}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Get user reservations
  async getUserReservations(): Promise<any> {
    const response = await axiosInstance.get(`${API_URL}/reservations`);
    return response.data;
  }

  // Get user token balance
  async getUserTokenBalance(): Promise<any> {
    const response = await axiosInstance.get(`${API_URL}/tokens/balance`);
    return response.data;
  }
}

export default new UserService();
