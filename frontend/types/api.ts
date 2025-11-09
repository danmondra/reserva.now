// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  userType: 'client' | 'provider'
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
  userType: 'client' | 'provider'
}

export interface SignupRequest {
  name: string
  email: string
  password: string
  phone?: string
  userType: 'client' | 'provider'
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

// Professional/Provider Types
export interface Professional {
  id: string
  userId: string
  nombre: string
  especialidad: string
  descripcion: string
  imagen: string
  calificacion: number
  resenas: number
  precio: string
  direccion: string
  distancia: string
  telefono: string
  disponible: boolean
  categoriaId: string
  categoria: string
  servicios: string[]
  horarios: WorkingHours[]
  ubicacion: {
    lat: number
    lng: number
  }
  createdAt: string
  updatedAt: string
}

export interface WorkingHours {
  dia: string
  inicio: string
  fin: string
  disponible: boolean
}

export interface CreateProfessionalRequest {
  nombre: string
  especialidad: string
  descripcion: string
  imagen?: string
  precio: string
  direccion: string
  telefono: string
  categoriaId: string
  servicios: string[]
  horarios: WorkingHours[]
  ubicacion: {
    lat: number
    lng: number
  }
}

// Category Types
export interface Category {
  id: string
  nombre: string
  descripcion: string
  icon: string
  profesionalesCount: number
  createdAt: string
}

// Appointment Types
export interface Appointment {
  id: string
  clienteId: string
  profesionalId: string
  fecha: string
  hora: string
  duracion: number
  precio: number
  estadoCita: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada' | 'En progreso'
  estadoPago: 'Pendiente' | 'Pagado' | 'Reembolsado'
  metodoPago?: string
  ubicacion: string
  notas?: string
  profesional: {
    nombre: string
    especialidad: string
    imagen: string
    telefono: string
  }
  cliente?: {
    nombre: string
    email: string
    telefono: string
  }
  calificacion?: number
  resena?: string
  createdAt: string
  updatedAt: string
}

export interface CreateAppointmentRequest {
  profesionalId: string
  fecha: string
  hora: string
  duracion: number
  ubicacion: string
  notas?: string
}

export interface UpdateAppointmentRequest {
  estadoCita?: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada' | 'En progreso'
  notas?: string
}

export interface RateAppointmentRequest {
  calificacion: number
  resena?: string
}

// Availability Types
export interface Availability {
  profesionalId: string
  fecha: string
  horasDisponibles: string[]
}

export interface AvailabilityRequest {
  profesionalId: string
  fechaInicio: string
  fechaFin: string
}

// Transaction Types
export interface Transaction {
  id: string
  appointmentId: string
  clienteId: string
  profesionalId: string
  monto: number
  moneda: string
  metodoPago: string
  estado: 'Pendiente' | 'Completado' | 'Fallido' | 'Reembolsado'
  walletAddress?: string
  transactionHash?: string
  fecha: string
  createdAt: string
}

export interface CreateTransactionRequest {
  appointmentId: string
  monto: number
  metodoPago: string
  walletAddress?: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  tipo: 'cita' | 'pago' | 'mensaje' | 'sistema'
  titulo: string
  mensaje: string
  leido: boolean
  data?: Record<string, any>
  createdAt: string
}

export interface NotificationSettings {
  confirmaciones: boolean
  recordatorios: boolean
  promociones: boolean
  mensajes: boolean
  email: boolean
  push: boolean
}

// Review Types
export interface Review {
  id: string
  appointmentId: string
  profesionalId: string
  clienteId: string
  calificacion: number
  comentario?: string
  respuesta?: string
  cliente: {
    nombre: string
    imagen?: string
  }
  createdAt: string
  updatedAt: string
}

// Search Types
export interface SearchFilters {
  query?: string
  categoriaId?: string
  precioMin?: number
  precioMax?: number
  calificacionMin?: number
  disponible?: boolean
  ubicacion?: {
    lat: number
    lng: number
    radio: number // in kilometers
  }
  page?: number
  limit?: number
  sortBy?: 'calificacion' | 'precio' | 'distancia' | 'resenas'
  sortOrder?: 'asc' | 'desc'
}

// Wallet/Interledger Types
export interface Wallet {
  id: string
  userId: string
  walletAddress: string
  balance: number
  moneda: string
  activo: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateWalletRequest {
  walletAddress: string
  moneda?: string
}

// Statistics Types
export interface ProviderStats {
  totalCitas: number
  citasCompletadas: number
  citasPendientes: number
  citasCanceladas: number
  ingresoTotal: number
  ingresoMesActual: number
  ingresoMesAnterior: number
  calificacionPromedio: number
  totalResenas: number
  crecimientoMensual: number
}

export interface ClientStats {
  totalCitas: number
  citasCompletadas: number
  citasPendientes: number
  gastoTotal: number
  serviciosFavoritos: string[]
}
