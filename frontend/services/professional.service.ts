import { apiClient } from '@/lib/api-client'
import type {
  ApiResponse,
  PaginatedResponse,
  Professional,
  CreateProfessionalRequest,
  SearchFilters,
  Review,
} from '@/types/api'

export const professionalService = {
  /**
   * Get all professionals with optional filters
   */
  async getProfessionals(
    filters?: SearchFilters
  ): Promise<PaginatedResponse<Professional>> {
    const params = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            params.append(key, JSON.stringify(value))
          } else {
            params.append(key, String(value))
          }
        }
      })
    }
    
    const queryString = params.toString()
    const endpoint = queryString ? `/professionals?${queryString}` : '/professionals'
    
    return apiClient.get<PaginatedResponse<Professional>>(endpoint, {
      requiresAuth: false,
    })
  },

  /**
   * Get professional by ID
   */
  async getProfessionalById(id: string): Promise<Professional> {
    const response = await apiClient.get<ApiResponse<Professional>>(
      `/professionals/${id}`,
      { requiresAuth: false }
    )
    return response.data!
  },

  /**
   * Get professionals by category
   */
  async getProfessionalsByCategory(
    categoryId: string
  ): Promise<Professional[]> {
    const response = await apiClient.get<ApiResponse<Professional[]>>(
      `/professionals/category/${categoryId}`,
      { requiresAuth: false }
    )
    return response.data!
  },

  /**
   * Search professionals
   */
  async searchProfessionals(query: string): Promise<Professional[]> {
    const response = await apiClient.get<ApiResponse<Professional[]>>(
      `/professionals/search?q=${encodeURIComponent(query)}`,
      { requiresAuth: false }
    )
    return response.data!
  },

  /**
   * Create professional profile (for providers)
   */
  async createProfessional(
    data: CreateProfessionalRequest
  ): Promise<Professional> {
    const response = await apiClient.post<ApiResponse<Professional>>(
      '/professionals',
      data
    )
    return response.data!
  },

  /**
   * Update professional profile
   */
  async updateProfessional(
    id: string,
    updates: Partial<CreateProfessionalRequest>
  ): Promise<Professional> {
    const response = await apiClient.patch<ApiResponse<Professional>>(
      `/professionals/${id}`,
      updates
    )
    return response.data!
  },

  /**
   * Delete professional profile
   */
  async deleteProfessional(id: string): Promise<void> {
    await apiClient.delete(`/professionals/${id}`)
  },

  /**
   * Get professional reviews
   */
  async getProfessionalReviews(
    professionalId: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Review>> {
    return apiClient.get<PaginatedResponse<Review>>(
      `/professionals/${professionalId}/reviews?page=${page}&limit=${limit}`,
      { requiresAuth: false }
    )
  },

  /**
   * Get nearby professionals
   */
  async getNearbyProfessionals(
    lat: number,
    lng: number,
    radius = 10
  ): Promise<Professional[]> {
    const response = await apiClient.get<ApiResponse<Professional[]>>(
      `/professionals/nearby?lat=${lat}&lng=${lng}&radius=${radius}`,
      { requiresAuth: false }
    )
    return response.data!
  },

  /**
   * Toggle professional availability
   */
  async toggleAvailability(
    professionalId: string,
    disponible: boolean
  ): Promise<Professional> {
    const response = await apiClient.patch<ApiResponse<Professional>>(
      `/professionals/${professionalId}/availability`,
      { disponible }
    )
    return response.data!
  },

  /**
   * Upload professional image
   */
  async uploadImage(professionalId: string, file: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/professionals/${professionalId}/image`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.data.imageUrl
  },
}
