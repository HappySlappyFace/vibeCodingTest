import axiosInstance from './axiosConfig';

const API_URL = '/api';

// Interfaces for facility data
export interface Facility {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  contactPhone: string;
  contactEmail: string;
  description?: string;
  openingHours?: string;
  imageUrl?: string;
  rating?: number;
  ownerId?: number;
  active: boolean;
  courts?: Court[];
  amenities?: string[];
}

export interface Court {
  id: number;
  name: string;
  facilityId: number;
  type: 'INDOOR' | 'OUTDOOR' | 'SEMI_COVERED';
  surface: 'ARTIFICIAL_GRASS' | 'SYNTHETIC' | 'PANORAMIC' | 'CRYSTAL';
  status: 'AVAILABLE' | 'MAINTENANCE' | 'CLOSED';
  pricePerHour: number;
  description?: string;
  imageUrl?: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface FacilityFilter {
  city?: string;
  postalCode?: string;
  minRating?: number;
  hasIndoorCourts?: boolean;
  hasOutdoorCourts?: boolean;
}

// Facility service for managing facilities and courts
class FacilityService {
  // Get all facilities
  async getAllFacilities(): Promise<Facility[]> {
    const response = await axiosInstance.get(`${API_URL}/facilities`);
    return response.data;
  }

  // Get facilities with filtering
  async getFacilities(filter?: FacilityFilter): Promise<Facility[]> {
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
    const response = await axiosInstance.get(`${API_URL}/facilities${query}`);
    return response.data;
  }

  // Get a specific facility by ID
  async getFacility(id: number): Promise<Facility> {
    const response = await axiosInstance.get(`${API_URL}/facilities/${id}`);
    return response.data;
  }

  // Get all courts for a facility
  async getCourts(facilityId: number): Promise<Court[]> {
    const response = await axiosInstance.get(`${API_URL}/facilities/${facilityId}/courts`);
    return response.data;
  }

  // Get a specific court by ID
  async getCourt(courtId: number): Promise<Court> {
    const response = await axiosInstance.get(`${API_URL}/courts/${courtId}`);
    return response.data;
  }

  // Get featured facilities (for homepage)
  async getFeaturedFacilities(): Promise<Facility[]> {
    const response = await axiosInstance.get(`${API_URL}/facilities/featured`);
    return response.data;
  }

  // For admins: create a new facility
  async createFacility(facilityData: Omit<Facility, 'id'>): Promise<Facility> {
    const response = await axiosInstance.post(`${API_URL}/admin/facilities`, facilityData);
    return response.data;
  }

  // For admins: update a facility
  async updateFacility(id: number, facilityData: Partial<Facility>): Promise<Facility> {
    const response = await axiosInstance.put(`${API_URL}/admin/facilities/${id}`, facilityData);
    return response.data;
  }

  // For admins: create a new court in a facility
  async createCourt(facilityId: number, courtData: Omit<Court, 'id' | 'facilityId'>): Promise<Court> {
    const response = await axiosInstance.post(`${API_URL}/admin/facilities/${facilityId}/courts`, courtData);
    return response.data;
  }

  // For admins: update a court
  async updateCourt(id: number, courtData: Partial<Court>): Promise<Court> {
    const response = await axiosInstance.put(`${API_URL}/admin/courts/${id}`, courtData);
    return response.data;
  }

  // Get nearby facilities based on geolocation
  async getNearbyFacilities(latitude: number, longitude: number, radius: number = 10): Promise<Facility[]> {
    const response = await axiosInstance.get(
      `${API_URL}/facilities/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`
    );
    return response.data;
  }
}

export default new FacilityService();
