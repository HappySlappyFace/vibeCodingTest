import axiosInstance from './axiosConfig';

const API_URL = '/api/dashboard';

// Types for dashboard data
export interface UserStats {
  totalReservations: number;
  upcomingReservations: number;
  tokenBalance: number;
  favoriteCourtId?: number;
  favoriteCourtName?: string;
  totalPlayingHours: number;
  reservationHistory?: {
    month: string; // Format: 'YYYY-MM'
    count: number;
  }[];
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number; // Users with at least one reservation in the last 30 days
  totalReservations: number;
  currentMonthReservations: number;
  totalRevenue: number;
  currentMonthRevenue: number;
  occupancyRate: number; // Percentage of available court times that are booked
  popularCourts: {
    courtId: number;
    courtName: string;
    reservationCount: number;
  }[];
  reservationTrend: {
    date: string; // Format: 'YYYY-MM-DD'
    count: number;
  }[];
  userGrowth: {
    month: string; // Format: 'YYYY-MM'
    newUsers: number;
  }[];
}

export interface SuperAdminStats extends AdminStats {
  totalFacilities: number;
  activeFacilities: number;
  facilityPerformance: {
    facilityId: number;
    facilityName: string;
    totalReservations: number;
    revenue: number;
    occupancyRate: number;
  }[];
  systemStats: {
    totalTokensInCirculation: number;
    totalEquipmentRentals: number;
    systemRevenue: number; // Platform's cut of all transactions
  };
}

// Service for dashboard data and statistics
class DashboardService {
  // Get statistics for regular user dashboard
  async getUserStats(): Promise<UserStats> {
    const response = await axiosInstance.get(`${API_URL}/user-stats`);
    return response.data;
  }

  // Get statistics for facility admin dashboard
  async getAdminStats(): Promise<AdminStats> {
    const response = await axiosInstance.get(`${API_URL}/admin-stats`);
    return response.data;
  }

  // Get statistics for super admin dashboard
  async getSuperAdminStats(): Promise<SuperAdminStats> {
    const response = await axiosInstance.get(`${API_URL}/super-admin-stats`);
    return response.data;
  }

  // Get user activity history
  async getUserActivity(): Promise<{
    reservations: {date: string, courtName: string}[];
    equipmentRentals: {date: string, equipmentName: string}[];
    tokenTransactions: {date: string, amount: number, type: string}[];
  }> {
    const response = await axiosInstance.get(`${API_URL}/user-activity`);
    return response.data;
  }

  // Get facility-specific statistics for admin
  async getFacilityStats(facilityId: number): Promise<{
    dailyStats: {date: string, reservations: number, revenue: number}[];
    courtPerformance: {courtId: number, courtName: string, reservations: number, revenue: number}[];
    peakHours: {hour: number, reservationCount: number}[];
  }> {
    const response = await axiosInstance.get(`${API_URL}/facility-stats/${facilityId}`);
    return response.data;
  }

  // Get recommended courts based on user preferences and history
  async getRecommendedCourts(): Promise<{
    courtId: number;
    courtName: string;
    facilityName: string;
    matchScore: number; // 0-100 indicating how well this matches user preferences
    availableSlots: number; // Number of available slots in the next 7 days
  }[]> {
    const response = await axiosInstance.get(`${API_URL}/recommended-courts`);
    return response.data;
  }
}

export default new DashboardService();
