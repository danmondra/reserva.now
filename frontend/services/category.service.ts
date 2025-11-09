import { apiClient } from '@/lib/api-client'
import type { ApiResponse, Category } from '@/types/api'

export const categoryService = {
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<ApiResponse<Category[]>>(
      '/categories',
      { requiresAuth: false }
    )
    return response.data!
  },

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<Category> {
    const response = await apiClient.get<ApiResponse<Category>>(
      `/categories/${id}`,
      { requiresAuth: false }
    )
    return response.data!
  },

  /**
   * Create new category (admin only)
   */
  // async createCategory(data: {
  //   nombre: string
  //   descripcion: string
  //   icon: string
  // }): Promise<Category> {
  //   const response = await apiClient.post<ApiResponse<Category>>(
  //     '/categories',
  //     data
  //   )
  //   return response.data!
  // },

  /**
   * Update category (admin only)
   */
  // async updateCategory(
  //   id: string,
  //   updates: Partial<{
  //     nombre: string
  //     descripcion: string
  //     icon: string
  //   }>
  // ): Promise<Category> {
  //   const response = await apiClient.patch<ApiResponse<Category>>(
  //     `/categories/${id}`,
  //     updates
  //   )
  //   return response.data!
  // },

  /**
   * Delete category (admin only)
   */
  // async deleteCategory(id: string): Promise<void> {
  //   await apiClient.delete(`/categories/${id}`)
  // },
}
