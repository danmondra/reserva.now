// Export all services
export { authService } from './auth.service'
//export { professionalService } from './professional.service'
export { appointmentService } from './appointment.service'
export { categoryService } from './category.service'
export { transactionService } from './transaction.service'
//export { notificationService } from './notification.service'
//export { statsService } from './stats.service'

// Export API client for custom requests
export { apiClient, ApiError } from '@/lib/api-client'

// Export types
export type * from '@/types/api'
