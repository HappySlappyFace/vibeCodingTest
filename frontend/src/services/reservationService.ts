import axiosInstance from './axiosConfig';

const API_URL = '/api/reservations';

// Types for reservation data
export interface ReservationData {
  id?: number;
  userId?: number;
  courtId: number;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod?: 'CREDIT_CARD' | 'TOKENS' | 'CASH';
  price?: number;
  createdAt?: string;
  updatedAt?: string;
  courtName?: string;
  facilityName?: string;
}

// Interface for available time slots
export interface TimeSlot {
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  available: boolean;
  price: number;
}

// Filter for searching reservations
export interface ReservationFilter {
  userId?: number;
  courtId?: number;
  facilityId?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// Reservation service for managing court bookings
class ReservationService {
  // Get all reservations for the current user
  async getUserReservations(): Promise<ReservationData[]> {
    const response = await axiosInstance.get(`${API_URL}/user`);
    return response.data;
  }

  // Get reservations by filter criteria
  async getReservations(filter: ReservationFilter): Promise<ReservationData[]> {
    // Convert filter object to query string
    const queryParams = new URLSearchParams();
    
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await axiosInstance.get(`${API_URL}?${queryParams.toString()}`);
    return response.data;
  }

  // Get a specific reservation by ID
  async getReservation(id: number): Promise<ReservationData> {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  }

  // Create a new reservation
  async createReservation(data: ReservationData): Promise<ReservationData> {
    const response = await axiosInstance.post(`${API_URL}`, data);
    return response.data;
  }

  // Update an existing reservation
  async updateReservation(id: number, data: Partial<ReservationData>): Promise<ReservationData> {
    const response = await axiosInstance.put(`${API_URL}/${id}`, data);
    return response.data;
  }

  // Cancel a reservation
  async cancelReservation(id: number): Promise<ReservationData> {
    const response = await axiosInstance.post(`${API_URL}/${id}/cancel`);
    return response.data;
  }

  // Get available time slots for a specific court on a specific date
  async getAvailableTimeSlots(courtId: number, date: string): Promise<TimeSlot[]> {
    const response = await axiosInstance.get(`/api/courts/${courtId}/availability?date=${date}`);
    return response.data;
  }
  
  // Get upcoming reservations for the current user
  async getUpcomingReservations(): Promise<ReservationData[]> {
    const response = await axiosInstance.get(`${API_URL}/user/upcoming`);
    return response.data;
  }

  // Get past reservations for the current user
  async getPastReservations(): Promise<ReservationData[]> {
    const response = await axiosInstance.get(`${API_URL}/user/past`);
    return response.data;
  }
}

export default new ReservationService();
