import { apiClient } from '@/lib/api-client'
import type {
  ApiResponse,
  PaginatedResponse,
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  RateAppointmentRequest,
  Availability,
  AvailabilityRequest,
} from '@/types/api'

export const appointmentService = {
  /**
   * Get all appointments for current user
   */
  async getAppointments(
    page = 1,
    limit = 10,
    status?: string
  ): Promise<PaginatedResponse<Appointment>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    if (status) params.append('status', status)
    
    return apiClient.get<PaginatedResponse<Appointment>>(
      `/appointments?${params.toString()}`
    )
  },

  /**
   * Get appointment by ID
   */
  async getAppointmentById(id: string): Promise<Appointment> {
    const response = await apiClient.get<ApiResponse<Appointment>>(
      `/appointments/${id}`
    )
    return response.data!
  },

  /**
   * Create new appointment
   */
  async createAppointment(
    data: CreateAppointmentRequest
  ): Promise<Appointment> {
    const response = await apiClient.post<ApiResponse<Appointment>>(
      '/appointments',
      data
    )
    return response.data!
  },

  /**
   * Update appointment
   */
  async updateAppointment(
    id: string,
    updates: UpdateAppointmentRequest
  ): Promise<Appointment> {
    const response = await apiClient.patch<ApiResponse<Appointment>>(
      `/appointments/${id}`,
      updates
    )
    return response.data!
  },

  /**
   * Cancel appointment
   */
  async cancelAppointment(id: string, reason?: string): Promise<Appointment> {
    const response = await apiClient.patch<ApiResponse<Appointment>>(
      `/appointments/${id}/cancel`,
      { reason }
    )
    return response.data!
  },

  /**
   * Confirm appointment (for providers)
   */
  async confirmAppointment(id: string): Promise<Appointment> {
    const response = await apiClient.patch<ApiResponse<Appointment>>(
      `/appointments/${id}/confirm`
    )
    return response.data!
  },

  /**
   * Complete appointment (for providers)
   */
  async completeAppointment(id: string): Promise<Appointment> {
    const response = await apiClient.patch<ApiResponse<Appointment>>(
      `/appointments/${id}/complete`
    )
    return response.data!
  },

  /**
   * Rate appointment (for clients)
   */
  async rateAppointment(
    id: string,
    rating: RateAppointmentRequest
  ): Promise<Appointment> {
    const response = await apiClient.post<ApiResponse<Appointment>>(
      `/appointments/${id}/rate`,
      rating
    )
    return response.data!
  },

  /**
   * Get upcoming appointments
   */
  async getUpcomingAppointments(): Promise<Appointment[]> {
    const response = await apiClient.get<ApiResponse<Appointment[]>>(
      '/appointments/upcoming'
    )
    return response.data!
  },

  /**
   * Get past appointments
   */
  async getPastAppointments(
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Appointment>> {
    return apiClient.get<PaginatedResponse<Appointment>>(
      `/appointments/past?page=${page}&limit=${limit}`
    )
  },

  /**
   * Get professional availability
   */
  async getProfessionalAvailability(
    request: AvailabilityRequest
  ): Promise<Availability[]> {
    const params = new URLSearchParams({
      fechaInicio: request.fechaInicio,
      fechaFin: request.fechaFin,
    })
    
    const response = await apiClient.get<ApiResponse<Availability[]>>(
      `/appointments/availability/${request.profesionalId}?${params.toString()}`,
      { requiresAuth: false }
    )
    return response.data!
  },

  /**
   * Check if time slot is available
   */
  async checkAvailability(
    professionalId: string,
    fecha: string,
    hora: string
  ): Promise<boolean> {
    const response = await apiClient.get<ApiResponse<{ available: boolean }>>(
      `/appointments/check-availability?professionalId=${professionalId}&fecha=${fecha}&hora=${hora}`,
      { requiresAuth: false }
    )
    return response.data!.available
  },

  /**
   * Get appointments for provider dashboard
   */
  async getProviderAppointments(
    filters?: {
      status?: string
      startDate?: string
      endDate?: string
      page?: number
      limit?: number
    }
  ): Promise<PaginatedResponse<Appointment>> {
    const params = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value))
        }
      })
    }
    
    const queryString = params.toString()
    const endpoint = queryString
      ? `/appointments/provider?${queryString}`
      : '/appointments/provider'
    
    return apiClient.get<PaginatedResponse<Appointment>>(endpoint)
  },

  /**
   * Get appointment statistics for provider
   */
  async getAppointmentStats(startDate?: string, endDate?: string): Promise<{
    total: number
    completed: number
    pending: number
    cancelled: number
    revenue: number
  }> {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    const queryString = params.toString()
    const endpoint = queryString
      ? `/appointments/stats?${queryString}`
      : '/appointments/stats'
    
    const response = await apiClient.get<ApiResponse<any>>(endpoint)
    return response.data!
  },
}
