import { apiClient } from '@/lib/api-client'
import type { ApiResponse, ProviderStats, ClientStats } from '@/types/api'

export const statsService = {
  /**
   * Get provider statistics
   */
  async getProviderStats(
    startDate?: string,
    endDate?: string
  ): Promise<ProviderStats> {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    const queryString = params.toString()
    const endpoint = queryString
      ? `/stats/provider?${queryString}`
      : '/stats/provider'
    
    const response = await apiClient.get<ApiResponse<ProviderStats>>(endpoint)
    return response.data!
  },

  /**
   * Get client statistics
   */
  async getClientStats(): Promise<ClientStats> {
    const response = await apiClient.get<ApiResponse<ClientStats>>(
      '/stats/client'
    )
    return response.data!
  },

  /**
   * Get monthly revenue for provider
   */
  async getMonthlyRevenue(year: number): Promise<{
    month: string
    revenue: number
  }[]> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/stats/provider/revenue/monthly?year=${year}`
    )
    return response.data!
  },

  /**
   * Get appointment trends
   */
  async getAppointmentTrends(
    period: 'week' | 'month' | 'year'
  ): Promise<{
    date: string
    count: number
  }[]> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/stats/appointments/trends?period=${period}`
    )
    return response.data!
  },

  /**
   * Get top services
   */
  async getTopServices(limit = 5): Promise<{
    serviceName: string
    count: number
    revenue: number
  }[]> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/stats/services/top?limit=${limit}`
    )
    return response.data!
  },

  /**
   * Get customer satisfaction metrics
   */
  async getSatisfactionMetrics(): Promise<{
    averageRating: number
    totalReviews: number
    ratingDistribution: {
      rating: number
      count: number
    }[]
  }> {
    const response = await apiClient.get<ApiResponse<any>>(
      '/stats/satisfaction'
    )
    return response.data!
  },
}
