export interface Appointment {
  id: number
  profesionalId: number
  profesionalNombre: string
  profesionalEspecialidad: string
  profesionalImagen: string
  fecha: string
  hora: string
  modalidad: 'En establecimiento' | 'A domicilio'
  direccion: string
  precio: number
  estadoCita: 'Completada' | 'Confirmada' | 'Cancelada' | 'En progreso'
  estadoPago: 'Pagado' | 'Pendiente' | 'En disputa' | 'Reembolsado'
  transactionId?: string
  signature?: string
  calificacion?: number
  comentario?: string
  duracion: string
  notas?: string
}

export const appointments: Appointment[] = [
  {
    id: 1,
    profesionalId: 1,
    profesionalNombre: 'Dr. Carlos García',
    profesionalEspecialidad: 'Dentista',
    profesionalImagen: '🦷',
    fecha: '2024-11-15',
    hora: '10:00',
    modalidad: 'En establecimiento',
    direccion: 'Av. Polanco 123, Polanco, CDMX',
    precio: 800,
    estadoCita: 'Completada',
    estadoPago: 'Pagado',
    transactionId: 'ILP-2024-1115-A7F3E9',
    signature: '0x8f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a',
    calificacion: 5,
    comentario: 'Excelente servicio, muy profesional',
    duracion: '45 minutos',
    notas: 'Recordar usar hilo dental diariamente'
  },
  {
    id: 2,
    profesionalId: 5,
    profesionalNombre: 'Salón Bella Vista',
    profesionalEspecialidad: 'Estilista',
    profesionalImagen: '💇‍♀️',
    fecha: '2025-11-18',
    hora: '15:00',
    modalidad: 'En establecimiento',
    direccion: 'Calle Coyoacán 456, Coyoacán, CDMX',
    precio: 450,
    estadoCita: 'Confirmada',
    estadoPago: 'Pendiente',
    duracion: '1 hora',
    notas: 'Traer foto de referencia del corte deseado'
  },
  {
    id: 3,
    profesionalId: 9,
    profesionalNombre: 'Plomería Express',
    profesionalEspecialidad: 'Plomero',
    profesionalImagen: '🚰',
    fecha: '2024-11-10',
    hora: '09:00',
    modalidad: 'A domicilio',
    direccion: 'Mi domicilio - Calle Reforma 789, Del Valle, CDMX',
    precio: 1200,
    estadoCita: 'Completada',
    estadoPago: 'Pagado',
    transactionId: 'ILP-2024-1110-B2D8F4',
    signature: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    calificacion: 4,
    comentario: 'Buen trabajo, llegó a tiempo',
    duracion: '2 horas'
  },
  {
    id: 4,
    profesionalId: 13,
    profesionalNombre: 'Gym Fitness Pro',
    profesionalEspecialidad: 'Entrenador Personal',
    profesionalImagen: '🏋️',
    fecha: '2024-11-05',
    hora: '18:00',
    modalidad: 'En establecimiento',
    direccion: 'Gym Polanco, Av. Presidente Masaryk 234, Polanco, CDMX',
    precio: 500,
    estadoCita: 'Cancelada',
    estadoPago: 'Reembolsado',
    transactionId: 'ILP-2024-1105-C9E4A1',
    signature: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
    duracion: '1 hora',
    notas: 'Cancelada por el cliente con 24h de anticipación'
  },
  {
    id: 5,
    profesionalId: 17,
    profesionalNombre: 'Veterinaria Patitas',
    profesionalEspecialidad: 'Veterinario',
    profesionalImagen: '🐕',
    fecha: '2024-11-01',
    hora: '11:00',
    modalidad: 'En establecimiento',
    direccion: 'Av. Coyoacán 567, Coyoacán, CDMX',
    precio: 650,
    estadoCita: 'Completada',
    estadoPago: 'Pagado',
    transactionId: 'ILP-2024-1101-D5F7B3',
    signature: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
    calificacion: 5,
    comentario: 'Muy amable con mi mascota, excelente atención',
    duracion: '30 minutos'
  },
  {
    id: 6,
    profesionalId: 10,
    profesionalNombre: 'Electricidad Total',
    profesionalEspecialidad: 'Electricista',
    profesionalImagen: '⚡',
    fecha: '2024-10-28',
    hora: '14:00',
    modalidad: 'A domicilio',
    direccion: 'Mi domicilio - Calle Insurgentes 321, Benito Juárez, CDMX',
    precio: 800,
    estadoCita: 'Completada',
    estadoPago: 'En disputa',
    transactionId: 'ILP-2024-1028-E8A2C6',
    signature: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    duracion: '1.5 horas',
    notas: 'Cliente reportó que la instalación no quedó correctamente'
  },
  {
    id: 7,
    profesionalId: 2,
    profesionalNombre: 'Dra. María Hernández',
    profesionalEspecialidad: 'Médico General',
    profesionalImagen: '👩‍⚕️',
    fecha: '2025-11-22',
    hora: '09:30',
    modalidad: 'En establecimiento',
    direccion: 'Consultorio Roma Norte, Calle Álvaro Obregón 145, Roma Norte, CDMX',
    precio: 600,
    estadoCita: 'Confirmada',
    estadoPago: 'Pendiente',
    duracion: '30 minutos'
  }
]

export const getAppointmentById = (id: number): Appointment | undefined => {
  return appointments.find(apt => apt.id === id)
}