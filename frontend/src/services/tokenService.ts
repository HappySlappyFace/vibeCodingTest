import axiosInstance from './axiosConfig';

const API_URL = '/api/tokens';

// Types for token-related operations
export interface TokenBalance {
  userId: number;
  balance: number;
  lastUpdated: string;
}

export interface TokenTransaction {
  id: number;
  userId: number;
  amount: number; // Positive for purchases, negative for usage
  type: 'PURCHASE' | 'RESERVATION_PAYMENT' | 'REFUND' | 'ADMIN_ADJUSTMENT';
  description?: string;
  reservationId?: number;
  createdAt: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface TokenPackage {
  id: number;
  name: string;
  tokenAmount: number;
  price: number;
  discount?: number; // Percentage discount compared to buying tokens individually
  description?: string;
  isPopular?: boolean;
}

export interface TokenPurchaseRequest {
  packageId: number;
  paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';
  paymentDetails?: any; // Additional payment details if needed
}

export interface TokenUsageRequest {
  amount: number;
  reservationId?: number;
  description?: string;
}

// Service for managing token operations
class TokenService {
  // Get current user's token balance
  async getUserBalance(): Promise<TokenBalance> {
    const response = await axiosInstance.get(`${API_URL}/balance`);
    return response.data;
  }

  // Get transaction history for current user
  async getTransactionHistory(): Promise<TokenTransaction[]> {
    const response = await axiosInstance.get(`${API_URL}/transactions`);
    return response.data;
  }

  // Get available token packages
  async getTokenPackages(): Promise<TokenPackage[]> {
    const response = await axiosInstance.get(`${API_URL}/packages`);
    return response.data;
  }

  // Purchase tokens using a package
  async purchaseTokens(data: TokenPurchaseRequest): Promise<TokenTransaction> {
    const response = await axiosInstance.post(`${API_URL}/purchase`, data);
    return response.data;
  }

  // Use tokens (for reservations or other services)
  async useTokens(data: TokenUsageRequest): Promise<TokenTransaction> {
    const response = await axiosInstance.post(`${API_URL}/use`, data);
    return response.data;
  }

  // Get token transaction by ID
  async getTransaction(id: number): Promise<TokenTransaction> {
    const response = await axiosInstance.get(`${API_URL}/transactions/${id}`);
    return response.data;
  }
  
  // Calculate token cost for a reservation (before confirming)
  async calculateReservationCost(courtId: number, startTime: string, endTime: string): Promise<{tokenCost: number, equivalentPrice: number}> {
    const response = await axiosInstance.get(
      `/api/courts/${courtId}/cost?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`
    );
    return response.data;
  }

  // For admins: adjust user token balance
  async adjustUserBalance(userId: number, amount: number, reason: string): Promise<TokenBalance> {
    const response = await axiosInstance.post(`/api/admin/tokens/adjust`, {
      userId,
      amount,
      reason
    });
    return response.data;
  }
}

export default new TokenService();
