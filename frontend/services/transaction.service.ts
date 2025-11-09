import { apiClient } from '@/lib/api-client'
import type {
  ApiResponse,
  PaginatedResponse,
  Transaction,
  CreateTransactionRequest,
  Wallet,
  CreateWalletRequest,
} from '@/types/api'

export const transactionService = {
  /**
   * Get all transactions for current user
   */
  async getTransactions(
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Transaction>> {
    return apiClient.get<PaginatedResponse<Transaction>>(
      `/transactions?page=${page}&limit=${limit}`
    )
  },

  /**
   * Get transaction by ID
   */
  async getTransactionById(id: string): Promise<Transaction> {
    const response = await apiClient.get<ApiResponse<Transaction>>(
      `/transactions/${id}`
    )
    return response.data!
  },

  /**
   * Create new transaction
   */
  async createTransaction(
    data: CreateTransactionRequest
  ): Promise<Transaction> {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      '/transactions',
      data
    )
    return response.data!
  },

  /**
   * Get transaction by appointment ID
   */
  async getTransactionByAppointment(
    appointmentId: string
  ): Promise<Transaction> {
    const response = await apiClient.get<ApiResponse<Transaction>>(
      `/transactions/appointment/${appointmentId}`
    )
    return response.data!
  },

  /**
   * Process payment for appointment
   */
  async processPayment(
    appointmentId: string,
    paymentData: {
      metodoPago: string
      walletAddress?: string
    }
  ): Promise<Transaction> {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      `/transactions/payment`,
      {
        appointmentId,
        ...paymentData,
      }
    )
    return response.data!
  },

  /**
   * Request refund
   */
  async requestRefund(transactionId: string, reason: string): Promise<Transaction> {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      `/transactions/${transactionId}/refund`,
      { reason }
    )
    return response.data!
  },

  /**
   * Get transaction statistics
   */
  async getTransactionStats(startDate?: string, endDate?: string): Promise<{
    totalTransactions: number
    totalAmount: number
    successfulTransactions: number
    failedTransactions: number
    pendingTransactions: number
  }> {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    const queryString = params.toString()
    const endpoint = queryString
      ? `/transactions/stats?${queryString}`
      : '/transactions/stats'
    
    const response = await apiClient.get<ApiResponse<any>>(endpoint)
    return response.data!
  },

  // Wallet/Interledger methods
  
  /**
   * Get user wallet
   */
  async getWallet(): Promise<Wallet> {
    const response = await apiClient.get<ApiResponse<Wallet>>('/wallet')
    return response.data!
  },

  /**
   * Create wallet
   */
  async createWallet(data: CreateWalletRequest): Promise<Wallet> {
    const response = await apiClient.post<ApiResponse<Wallet>>('/wallet', data)
    return response.data!
  },

  /**
   * Update wallet
   */
  async updateWallet(updates: Partial<CreateWalletRequest>): Promise<Wallet> {
    const response = await apiClient.patch<ApiResponse<Wallet>>(
      '/wallet',
      updates
    )
    return response.data!
  },

  /**
   * Get wallet balance
   */
  async getWalletBalance(): Promise<number> {
    const response = await apiClient.get<ApiResponse<{ balance: number }>>(
      '/wallet/balance'
    )
    return response.data!.balance
  },

  /**
   * Send payment via Interledger
   */
  async sendInterledgerPayment(data: {
    destinationAddress: string
    amount: number
    appointmentId: string
  }): Promise<Transaction> {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      '/wallet/send',
      data
    )
    return response.data!
  },
}
