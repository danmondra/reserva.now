import { apiClient } from '@/lib/api-client'
import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from '@/types/api'

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials,
      { requiresAuth: false }
    )
    
    if (response.data) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userType', response.data.user.userType)
      localStorage.setItem('userId', response.data.user.id)
      localStorage.setItem('userName', response.data.user.name)
      localStorage.setItem('userEmail', response.data.user.email)
      localStorage.setItem('isLoggedIn', 'true')
    }
    
    return response.data!
  },

  /**
   * Signup new user
   */
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/signup',
      userData,
      { requiresAuth: false }
    )
    
    if (response.data) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userType', response.data.user.userType)
      localStorage.setItem('userId', response.data.user.id)
      localStorage.setItem('userName', response.data.user.name)
      localStorage.setItem('userEmail', response.data.user.email)
      localStorage.setItem('isLoggedIn', 'true')
    }
    
    return response.data!
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      // Clear localStorage regardless of API response
      localStorage.removeItem('authToken')
      localStorage.removeItem('userType')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('isLoggedIn')
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me')
    return response.data!
  },

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(
      '/auth/profile',
      updates
    )
    
    if (response.data) {
      // Update localStorage
      if (response.data.name) {
        localStorage.setItem('userName', response.data.name)
      }
      if (response.data.email) {
        localStorage.setItem('userEmail', response.data.email)
      }
    }
    
    return response.data!
  },

  /**
   * Change password
   */
  // async changePassword(
  //   currentPassword: string,
  //   newPassword: string
  // ): Promise<void> {
  //   await apiClient.post('/auth/change-password', {
  //     currentPassword,
  //     newPassword,
  //   })
  // },

  /**
   * Request password reset
   */
  // async requestPasswordReset(email: string): Promise<void> {
  //   await apiClient.post(
  //     '/auth/forgot-password',
  //     { email },
  //     { requiresAuth: false }
  //   )
  // },

  /**
   * Reset password with token
   */
  // async resetPassword(token: string, newPassword: string): Promise<void> {
  //   await apiClient.post(
  //     '/auth/reset-password',
  //     { token, newPassword },
  //     { requiresAuth: false }
  //   )
  // },

  /**
   * Refresh auth token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/refresh',
      { refreshToken },
      { requiresAuth: false }
    )
    
    if (response.data) {
      localStorage.setItem('authToken', response.data.token)
    }
    
    return response.data!
  },
}
