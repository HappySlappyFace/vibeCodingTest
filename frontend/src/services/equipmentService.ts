import axiosInstance from './axiosConfig';

const API_URL = '/api/equipment';

// Types for equipment-related operations
export interface Equipment {
  id: number;
  name: string;
  type: 'RACKET' | 'BALL' | 'SHOES' | 'CLOTHING' | 'ACCESSORY';
  brand: string;
  model?: string;
  description?: string;
  imageUrl?: string;
  dailyRentalPrice: number;
  deposit?: number;
  condition: 'NEW' | 'EXCELLENT' | 'GOOD' | 'FAIR';
  available: boolean;
  facilityId: number;
  facilityName?: string;
}

export interface EquipmentRental {
  id: number;
  userId: number;
  equipmentId: number;
  equipment?: Equipment;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  totalPrice: number;
  status: 'PENDING' | 'ACTIVE' | 'RETURNED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  paymentMethod?: 'CREDIT_CARD' | 'TOKENS' | 'CASH';
  depositPaid: boolean;
  depositReturned?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RentalRequest {
  equipmentId: number;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  paymentMethod: 'CREDIT_CARD' | 'TOKENS' | 'CASH';
  notes?: string;
}

export interface EquipmentFilter {
  facilityId?: number;
  type?: string;
  brand?: string;
  available?: boolean;
  maxPrice?: number;
}

// Service for equipment management and rentals
class EquipmentService {
  // Get all available equipment
  async getAllEquipment(): Promise<Equipment[]> {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
  }

  // Get equipment with filtering
  async getEquipment(filter?: EquipmentFilter): Promise<Equipment[]> {
    // Convert filter object to query string
    const queryParams = new URLSearchParams();
    
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await axiosInstance.get(`${API_URL}${query}`);
    return response.data;
  }

  // Get a specific equipment item by ID
  async getEquipmentItem(id: number): Promise<Equipment> {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  }

  // Get equipment available at a specific facility
  async getFacilityEquipment(facilityId: number): Promise<Equipment[]> {
    const response = await axiosInstance.get(`${API_URL}/facility/${facilityId}`);
    return response.data;
  }

  // Rent equipment
  async rentEquipment(data: RentalRequest): Promise<EquipmentRental> {
    const response = await axiosInstance.post(`${API_URL}/rent`, data);
    return response.data;
  }

  // Get current user's active equipment rentals
  async getUserActiveRentals(): Promise<EquipmentRental[]> {
    const response = await axiosInstance.get(`${API_URL}/rentals/active`);
    return response.data;
  }

  // Get current user's rental history
  async getUserRentalHistory(): Promise<EquipmentRental[]> {
    const response = await axiosInstance.get(`${API_URL}/rentals/history`);
    return response.data;
  }

  // Cancel an equipment rental
  async cancelRental(rentalId: number): Promise<EquipmentRental> {
    const response = await axiosInstance.post(`${API_URL}/rentals/${rentalId}/cancel`);
    return response.data;
  }

  // Check equipment availability for specific dates
  async checkAvailability(equipmentId: number, startDate: string, endDate: string): Promise<{available: boolean, conflictingDates?: string[]}> {
    const response = await axiosInstance.get(
      `${API_URL}/${equipmentId}/availability?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    );
    return response.data;
  }

  // For facility owners/admins: add new equipment
  async addEquipment(data: Omit<Equipment, 'id'>): Promise<Equipment> {
    const response = await axiosInstance.post(`/api/admin/equipment`, data);
    return response.data;
  }

  // For facility owners/admins: update equipment
  async updateEquipment(id: number, data: Partial<Equipment>): Promise<Equipment> {
    const response = await axiosInstance.put(`/api/admin/equipment/${id}`, data);
    return response.data;
  }

  // For facility owners/admins: mark equipment as returned
  async markEquipmentReturned(rentalId: number, condition: string, depositReturned: boolean): Promise<EquipmentRental> {
    const response = await axiosInstance.post(`/api/admin/equipment/rentals/${rentalId}/return`, {
      condition,
      depositReturned
    });
    return response.data;
  }
}

export default new EquipmentService();
