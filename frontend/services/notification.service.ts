import { apiClient } from '@/lib/api-client'
import type {
  ApiResponse,
  PaginatedResponse,
  Notification,
  NotificationSettings,
} from '@/types/api'

export const notificationService = {
  /**
   * Get all notifications for current user
   */
  async getNotifications(
    page = 1,
    limit = 20
  ): Promise<PaginatedResponse<Notification>> {
    return apiClient.get<PaginatedResponse<Notification>>(
      `/notifications?page=${page}&limit=${limit}`
    )
  },

  /**
   * Get unread notifications count
   */
  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<ApiResponse<{ count: number }>>(
      '/notifications/unread/count'
    )
    return response.data!.count
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id: string): Promise<Notification> {
    const response = await apiClient.patch<ApiResponse<Notification>>(
      `/notifications/${id}/read`
    )
    return response.data!
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    await apiClient.patch('/notifications/read-all')
  },

  /**
   * Delete notification
   */
  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`)
  },

  /**
   * Delete all notifications
   */
  async deleteAllNotifications(): Promise<void> {
    await apiClient.delete('/notifications')
  },

  /**
   * Get notification settings
   */
  async getSettings(): Promise<NotificationSettings> {
    const response = await apiClient.get<ApiResponse<NotificationSettings>>(
      '/notifications/settings'
    )
    return response.data!
  },

  /**
   * Update notification settings
   */
  async updateSettings(
    settings: Partial<NotificationSettings>
  ): Promise<NotificationSettings> {
    const response = await apiClient.patch<ApiResponse<NotificationSettings>>(
      '/notifications/settings',
      settings
    )
    return response.data!
  },

  /**
   * Subscribe to push notifications
   */
  async subscribeToPush(subscription: PushSubscription): Promise<void> {
    await apiClient.post('/notifications/push/subscribe', {
      subscription: subscription.toJSON(),
    })
  },

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribeFromPush(): Promise<void> {
    await apiClient.post('/notifications/push/unsubscribe')
  },

  /**
   * Test notification (for development)
   */
  async sendTestNotification(): Promise<void> {
    await apiClient.post('/notifications/test')
  },
}
