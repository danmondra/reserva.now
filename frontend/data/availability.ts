export interface TimeSlot {
  time: string
  available: boolean
  appointmentId?: number
}

export interface DayAvailability {
  date: string
  dayName: string
  slots: TimeSlot[]
}

export const weekAvailability: DayAvailability[] = [
  {
    date: '2024-11-20',
    dayName: 'Miércoles',
    slots: [
      { time: '09:00', available: false, appointmentId: 2 },
      { time: '09:30', available: false, appointmentId: 7 },
      { time: '10:00', available: false, appointmentId: 1 },
      { time: '10:30', available: true },
      { time: '11:00', available: true },
      { time: '11:30', available: true },
      { time: '12:00', available: true },
      { time: '12:30', available: true },
      { time: '13:00', available: true },
      { time: '13:30', available: true },
      { time: '14:00', available: false, appointmentId: 5 },
      { time: '14:30', available: true },
      { time: '15:00', available: true },
      { time: '15:30', available: false, appointmentId: 3 },
      { time: '16:00', available: true },
      { time: '16:30', available: true },
      { time: '17:00', available: true },
      { time: '17:30', available: true },
      { time: '18:00', available: true }
    ]
  },
  {
    date: '2024-11-21',
    dayName: 'Jueves',
    slots: [
      { time: '09:00', available: true },
      { time: '09:30', available: true },
      { time: '10:00', available: false, appointmentId: 8 },
      { time: '10:30', available: true },
      { time: '11:00', available: true },
      { time: '11:30', available: true },
      { time: '12:00', available: true },
      { time: '12:30', available: true },
      { time: '13:00', available: true },
      { time: '13:30', available: true },
      { time: '14:00', available: false, appointmentId: 9 },
      { time: '14:30', available: false, appointmentId: 10 },
      { time: '15:00', available: false, appointmentId: 11 },
      { time: '15:30', available: false, appointmentId: 12 },
      { time: '16:00', available: false, appointmentId: 13 },
      { time: '16:30', available: true },
      { time: '17:00', available: true },
      { time: '17:30', available: true },
      { time: '18:00', available: true }
    ]
  },
  {
    date: '2024-11-22',
    dayName: 'Viernes',
    slots: [
      { time: '09:00', available: false, appointmentId: 14 },
      { time: '09:30', available: false, appointmentId: 15 },
      { time: '10:00', available: true },
      { time: '10:30', available: true },
      { time: '11:00', available: true },
      { time: '11:30', available: false, appointmentId: 16 },
      { time: '12:00', available: true },
      { time: '12:30', available: true },
      { time: '13:00', available: false, appointmentId: 17 },
      { time: '13:30', available: true },
      { time: '14:00', available: true },
      { time: '14:30', available: true },
      { time: '15:00', available: true },
      { time: '15:30', available: true },
      { time: '16:00', available: true },
      { time: '16:30', available: false, appointmentId: 18 },
      { time: '17:00', available: true },
      { time: '17:30', available: true },
      { time: '18:00', available: true }
    ]
  },
  {
    date: '2024-11-23',
    dayName: 'Sábado',
    slots: [
      { time: '09:00', available: true },
      { time: '09:30', available: true },
      { time: '10:00', available: true },
      { time: '10:30', available: false, appointmentId: 19 },
      { time: '11:00', available: true },
      { time: '11:30', available: true },
      { time: '12:00', available: false, appointmentId: 20 },
      { time: '12:30', available: true },
      { time: '13:00', available: true },
      { time: '13:30', available: true },
      { time: '14:00', available: true },
      { time: '14:30', available: true },
      { time: '15:00', available: true },
      { time: '15:30', available: true },
      { time: '16:00', available: true },
      { time: '16:30', available: true },
      { time: '17:00', available: false, appointmentId: 21 },
      { time: '17:30', available: true },
      { time: '18:00', available: true }
    ]
  },
  {
    date: '2024-11-24',
    dayName: 'Domingo',
    slots: [
      { time: '09:00', available: true },
      { time: '09:30', available: false, appointmentId: 22 },
      { time: '10:00', available: true },
      { time: '10:30', available: true },
      { time: '11:00', available: true },
      { time: '11:30', available: false, appointmentId: 23 },
      { time: '12:00', available: true },
      { time: '12:30', available: true },
      { time: '13:00', available: true },
      { time: '13:30', available: true },
      { time: '14:00', available: false, appointmentId: 24 },
      { time: '14:30', available: true },
      { time: '15:00', available: true },
      { time: '15:30', available: true },
      { time: '16:00', available: true },
      { time: '16:30', available: false, appointmentId: 25 },
      { time: '17:00', available: true },
      { time: '17:30', available: true },
      { time: '18:00', available: true }
    ]
  },
  {
    date: '2024-11-25',
    dayName: 'Lunes',
    slots: [
      { time: '09:00', available: false, appointmentId: 26 },
      { time: '09:30', available: false, appointmentId: 27 },
      { time: '10:00', available: false, appointmentId: 28 },
      { time: '10:30', available: false, appointmentId: 29 },
      { time: '11:00', available: false, appointmentId: 30 },
      { time: '11:30', available: true },
      { time: '12:00', available: true },
      { time: '12:30', available: true },
      { time: '13:00', available: true },
      { time: '13:30', available: true },
      { time: '14:00', available: false, appointmentId: 31 },
      { time: '14:30', available: false, appointmentId: 32 },
      { time: '15:00', available: false, appointmentId: 33 },
      { time: '15:30', available: true },
      { time: '16:00', available: false, appointmentId: 34 },
      { time: '16:30', available: true },
      { time: '17:00', available: false, appointmentId: 35 },
      { time: '17:30', available: true },
      { time: '18:00', available: true }
    ]
  },
  {
    date: '2024-11-26',
    dayName: 'Martes',
    slots: [
      { time: '09:00', available: true },
      { time: '09:30', available: true },
      { time: '10:00', available: true },
      { time: '10:30', available: true },
      { time: '11:00', available: false, appointmentId: 36 },
      { time: '11:30', available: true },
      { time: '12:00', available: false, appointmentId: 37 },
      { time: '12:30', available: true },
      { time: '13:00', available: true },
      { time: '13:30', available: true },
      { time: '14:00', available: true },
      { time: '14:30', available: true },
      { time: '15:00', available: false, appointmentId: 38 },
      { time: '15:30', available: true },
      { time: '16:00', available: true },
      { time: '16:30', available: true },
      { time: '17:00', available: true },
      { time: '17:30', available: true },
      { time: '18:00', available: true }
    ]
  }
]

export const getAvailabilityByDate = (date: string): DayAvailability | undefined => {
  return weekAvailability.find(day => day.date === date)
}

export const getAvailableSlots = (date: string): TimeSlot[] => {
  const dayAvailability = getAvailabilityByDate(date)
  return dayAvailability?.slots.filter(slot => slot.available) || []
}

export const getBookedSlots = (date: string): TimeSlot[] => {
  const dayAvailability = getAvailabilityByDate(date)
  return dayAvailability?.slots.filter(slot => !slot.available) || []
}