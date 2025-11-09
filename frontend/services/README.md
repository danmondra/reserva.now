# API Services Documentation

This directory contains all the API service modules for connecting to the backend. Each service is organized by domain and provides typed methods for API calls.

## Setup

1. Set your API base URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

2. Import services in your components:
```typescript
import { authService, professionalService, appointmentService } from '@/services'
```

## Services Overview

### 1. Auth Service (`auth.service.ts`)
Handles authentication and user management.

**Methods:**
- `login(credentials)` - Login user
- `signup(userData)` - Register new user
- `logout()` - Logout user
- `getCurrentUser()` - Get current user profile
- `updateProfile(updates)` - Update user profile
- `changePassword(currentPassword, newPassword)` - Change password
- `requestPasswordReset(email)` - Request password reset
- `resetPassword(token, newPassword)` - Reset password with token
- `refreshToken(refreshToken)` - Refresh auth token

**Example:**
```typescript
'use client'

import { useState } from 'react'
import { authService } from '@/services'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login({
        email,
        password,
        userType: 'client'
      })
      
      // Token is automatically stored in localStorage
      console.log('Logged in:', response.user)
      
      // Redirect based on user type
      if (response.user.userType === 'client') {
        router.push('/')
      } else {
        router.push('/profesional-dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
```

### 2. Professional Service (`professional.service.ts`)
Manages professional profiles and searches.

**Methods:**
- `getProfessionals(filters)` - Get all professionals with filters
- `getProfessionalById(id)` - Get professional by ID
- `getProfessionalsByCategory(categoryId)` - Get professionals by category
- `searchProfessionals(query)` - Search professionals
- `createProfessional(data)` - Create professional profile
- `updateProfessional(id, updates)` - Update professional profile
- `deleteProfessional(id)` - Delete professional profile
- `getProfessionalReviews(professionalId, page, limit)` - Get reviews
- `getNearbyProfessionals(lat, lng, radius)` - Get nearby professionals
- `toggleAvailability(professionalId, disponible)` - Toggle availability
- `uploadImage(professionalId, file)` - Upload professional image

**Example:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import { professionalService, type Professional } from '@/services'

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfessionals()
  }, [])

  const loadProfessionals = async () => {
    try {
      const response = await professionalService.getProfessionals({
        disponible: true,
        calificacionMin: 4,
        page: 1,
        limit: 10,
        sortBy: 'calificacion',
        sortOrder: 'desc'
      })
      
      setProfessionals(response.data)
    } catch (error) {
      console.error('Failed to load professionals:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {professionals.map(prof => (
        <div key={prof.id}>
          <h3>{prof.nombre}</h3>
          <p>{prof.especialidad}</p>
          <p>Rating: {prof.calificacion}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Appointment Service (`appointment.service.ts`)
Handles appointment booking and management.

**Methods:**
- `getAppointments(page, limit, status)` - Get all appointments
- `getAppointmentById(id)` - Get appointment by ID
- `createAppointment(data)` - Create new appointment
- `updateAppointment(id, updates)` - Update appointment
- `cancelAppointment(id, reason)` - Cancel appointment
- `confirmAppointment(id)` - Confirm appointment (provider)
- `completeAppointment(id)` - Complete appointment (provider)
- `rateAppointment(id, rating)` - Rate appointment (client)
- `getUpcomingAppointments()` - Get upcoming appointments
- `getPastAppointments(page, limit)` - Get past appointments
- `getProfessionalAvailability(request)` - Get availability
- `checkAvailability(professionalId, fecha, hora)` - Check time slot
- `getProviderAppointments(filters)` - Get provider appointments
- `getAppointmentStats(startDate, endDate)` - Get statistics

**Example:**
```typescript
'use client'

import { useState } from 'react'
import { appointmentService } from '@/services'

export default function BookingPage({ professionalId }: { professionalId: string }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)

  const handleBooking = async () => {
    setLoading(true)
    
    try {
      // Check availability first
      const isAvailable = await appointmentService.checkAvailability(
        professionalId,
        selectedDate,
        selectedTime
      )

      if (!isAvailable) {
        alert('This time slot is not available')
        return
      }

      // Create appointment
      const appointment = await appointmentService.createAppointment({
        profesionalId: professionalId,
        fecha: selectedDate,
        hora: selectedTime,
        duracion: 60,
        ubicacion: 'A domicilio',
        notas: 'Please call before arriving'
      })

      alert('Appointment booked successfully!')
      console.log('Appointment:', appointment)
    } catch (error: any) {
      alert(error.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
      <button onClick={handleBooking} disabled={loading}>
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </div>
  )
}
```

### 4. Category Service (`category.service.ts`)
Manages service categories.

**Methods:**
- `getCategories()` - Get all categories
- `getCategoryById(id)` - Get category by ID
- `createCategory(data)` - Create category (admin)
- `updateCategory(id, updates)` - Update category (admin)
- `deleteCategory(id)` - Delete category (admin)

### 5. Transaction Service (`transaction.service.ts`)
Handles payments and wallet operations.

**Methods:**
- `getTransactions(page, limit)` - Get all transactions
- `getTransactionById(id)` - Get transaction by ID
- `createTransaction(data)` - Create transaction
- `getTransactionByAppointment(appointmentId)` - Get transaction by appointment
- `processPayment(appointmentId, paymentData)` - Process payment
- `requestRefund(transactionId, reason)` - Request refund
- `getTransactionStats(startDate, endDate)` - Get statistics
- `getWallet()` - Get user wallet
- `createWallet(data)` - Create wallet
- `updateWallet(updates)` - Update wallet
- `getWalletBalance()` - Get wallet balance
- `sendInterledgerPayment(data)` - Send Interledger payment

**Example:**
```typescript
'use client'

import { transactionService } from '@/services'

export default function PaymentPage({ appointmentId }: { appointmentId: string }) {
  const handlePayment = async () => {
    try {
      const transaction = await transactionService.processPayment(
        appointmentId,
        {
          metodoPago: 'Interledger',
          walletAddress: '$ilp.example.com/user'
        }
      )

      console.log('Payment successful:', transaction)
      alert('Payment completed!')
    } catch (error: any) {
      alert(error.message || 'Payment failed')
    }
  }

  return (
    <button onClick={handlePayment}>
      Pay Now
    </button>
  )
}
```

### 6. Notification Service (`notification.service.ts`)
Manages user notifications.

**Methods:**
- `getNotifications(page, limit)` - Get all notifications
- `getUnreadCount()` - Get unread count
- `markAsRead(id)` - Mark as read
- `markAllAsRead()` - Mark all as read
- `deleteNotification(id)` - Delete notification
- `deleteAllNotifications()` - Delete all
- `getSettings()` - Get notification settings
- `updateSettings(settings)` - Update settings
- `subscribeToPush(subscription)` - Subscribe to push
- `unsubscribeFromPush()` - Unsubscribe from push

### 7. Stats Service (`stats.service.ts`)
Provides statistics and analytics.

**Methods:**
- `getProviderStats(startDate, endDate)` - Get provider statistics
- `getClientStats()` - Get client statistics
- `getMonthlyRevenue(year)` - Get monthly revenue
- `getAppointmentTrends(period)` - Get appointment trends
- `getTopServices(limit)` - Get top services
- `getSatisfactionMetrics()` - Get satisfaction metrics

## Error Handling

All services throw `ApiError` with the following structure:

```typescript
try {
  await authService.login(credentials)
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Status:', error.statusCode)
    console.error('Message:', error.message)
    console.error('Data:', error.data)
  }
}
```

## Custom Requests

For custom API calls not covered by services:

```typescript
import { apiClient } from '@/services'

// GET request
const data = await apiClient.get('/custom-endpoint')

// POST request
const result = await apiClient.post('/custom-endpoint', { data: 'value' })

// Without authentication
const publicData = await apiClient.get('/public-endpoint', { requiresAuth: false })
```

## TypeScript Types

All request/response types are available:

```typescript
import type {
  User,
  Professional,
  Appointment,
  Transaction,
  // ... etc
} from '@/services'
```

## Migration from Mock Data

When your backend is ready:

1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Replace mock data imports with service calls
3. Add error handling and loading states
4. Test each endpoint

Example migration:

```typescript
// Before (mock data)
import { professionals } from '@/data/professionals'

// After (API service)
import { professionalService } from '@/services'

const professionals = await professionalService.getProfessionals()
```
