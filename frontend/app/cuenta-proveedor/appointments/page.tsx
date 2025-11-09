'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import ProviderBottomNav from '@/components/ProviderBottomNav'
import Link from 'next/link'

export default function ProviderAppointmentsPage() {
  const { isLoading } = useAuth('provider')
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null)
  const [showAllHours, setShowAllHours] = useState(false)

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='text-4xl mb-4'>⏳</div>
          <p className='text-gray-600'>Cargando...</p>
        </div>
      </div>
    )
  }

  // Generate week dates
  const generateWeekDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('es-MX', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('es-MX', { month: 'short' })
      })
    }
    return dates
  }

  const weekDates = generateWeekDates()

  // Time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ]

  // Mock appointments data mapped to calendar
  const appointments = [
    {
      id: 1,
      clientName: 'María González',
      service: 'Corte de cabello',
      date: weekDates[2].date,
      time: '10:00',
      status: 'Pendiente',
      price: 450,
      location: 'A domicilio',
      phone: '555-0101'
    },
    {
      id: 2,
      clientName: 'Carlos Ramírez',
      service: 'Reparación de laptop',
      date: weekDates[2].date,
      time: '14:00',
      status: 'Confirmada',
      price: 1200,
      location: 'En consultorio',
      phone: '555-0102'
    },
    {
      id: 3,
      clientName: 'Ana Martínez',
      service: 'Limpieza profunda',
      date: weekDates[3].date,
      time: '09:00',
      status: 'Pendiente',
      price: 800,
      location: 'A domicilio',
      phone: '555-0103'
    },
    {
      id: 4,
      clientName: 'Luis Hernández',
      service: 'Masaje terapéutico',
      date: weekDates[4].date,
      time: '16:00',
      status: 'Pendiente',
      price: 650,
      location: 'En consultorio',
      phone: '555-0104'
    },
    {
      id: 5,
      clientName: 'Patricia López',
      service: 'Consulta nutricional',
      date: weekDates[1].date,
      time: '11:00',
      status: 'Confirmada',
      price: 500,
      location: 'En consultorio',
      phone: '555-0105'
    }
  ]

  const getAppointmentForSlot = (date: string, time: string) => {
    return appointments.find(apt => apt.date === date && apt.time === time)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return 'bg-green-500 text-white'
      case 'Pendiente':
        return 'bg-orange-500 text-white'
      case 'Completada':
        return 'bg-blue-500 text-white'
      case 'Cancelada':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const selectedApt = appointments.find(apt => apt.id === selectedAppointment)

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <Link href='/profesional-dashboard' className='inline-block mb-3 text-white/90 hover:text-white'>
          ← Volver al inicio
        </Link>
        <div className='flex items-center gap-3 mb-2'>
          <span className='text-3xl'>📅</span>
          <h1 className='text-2xl font-bold'>Mis Citas</h1>
        </div>
        <p className='text-sm text-white/90'>Gestiona tus citas programadas</p>
      </header>

      <main className='p-4 space-y-4'>
        {/* Summary */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center'>
            <p className='text-2xl font-bold text-gray-900'>{appointments.filter(a => a.status === 'Confirmada').length}</p>
            <p className='text-xs text-gray-600 mt-1'>Confirmadas</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center'>
            <p className='text-2xl font-bold text-gray-900'>{appointments.filter(a => a.status === 'Pendiente').length}</p>
            <p className='text-xs text-gray-600 mt-1'>Pendientes</p>
          </div>
        </div>

        {/* Calendar Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-4 border-b border-gray-100'>
            <h2 className='font-semibold text-gray-900 flex items-center gap-2'>
              <span>📅</span>
              <span>Calendario de Citas</span>
            </h2>
          </div>
          
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full'>
              {/* Header with days */}
              <div className='flex border-b border-gray-200 bg-gray-50'>
                {weekDates.map((day, index) => {
                  const dayLabel = index === 0 ? 'Hoy' : index === 1 ? 'Mañana' : day.dayName
                  
                  return (
                    <div key={day.date} className='flex-1 min-w-[80px] p-3 border-r border-gray-200 last:border-r-0'>
                      <div className='text-center'>
                        <p className='text-xs font-semibold text-gray-900 capitalize'>{dayLabel}</p>
                        <p className='text-xs text-gray-500 mt-0.5'>{day.dayNumber} {day.month}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Time slots rows */}
              <div className={`${showAllHours ? 'max-h-[400px] overflow-y-auto' : ''}`}>
                {timeSlots.slice(0, showAllHours ? undefined : 8).map((time) => (
                  <div key={time} className='flex border-b border-gray-100 last:border-b-0'>
                    {weekDates.map((day) => {
                      const appointment = getAppointmentForSlot(day.date, time)
                      
                      return (
                        <button
                          key={`${day.date}-${time}`}
                          onClick={() => appointment && setSelectedAppointment(appointment.id)}
                          className={`flex-1 min-w-[80px] p-2 border-r border-gray-100 last:border-r-0 transition-all text-xs relative ${
                            appointment
                              ? `${getStatusColor(appointment.status)} hover:opacity-90 cursor-pointer`
                              : 'bg-white text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {appointment ? (
                            <div className='text-left'>
                              <div className='flex items-center gap-1'>
                                <div className='font-semibold'>{time}</div>
                                {appointment.status === 'Pendiente' && (
                                  <span className='text-[10px]'>⚠️</span>
                                )}
                              </div>
                              <div className='text-[10px] mt-0.5 truncate'>{appointment.clientName}</div>
                            </div>
                          ) : (
                            <span>{time}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show more button */}
          {!showAllHours && timeSlots.length > 8 && (
            <div className='p-3 border-t border-gray-100 text-center'>
              <button
                onClick={() => setShowAllHours(true)}
                className='text-[#fbbf24] hover:text-[#f59e0b] text-sm font-medium inline-flex items-center gap-1'
              >
                <span>Más horas</span>
                <span>↓</span>
              </button>
            </div>
          )}
        </div>

        {/* Link to past appointments */}
        <div className='text-center'>
          <button className='text-gray-500 hover:text-gray-700 text-sm inline-flex items-center gap-1'>
            <span>Ver citas anteriores</span>
            <span>→</span>
          </button>
        </div>

      </main>

      {/* Appointment Details Modal */}
      {selectedApt && (
        <div 
          className='fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 p-4'
          onClick={() => setSelectedAppointment(null)}
        >
          <div 
            className='bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl'>
              <div className='flex items-start justify-between'>
                <h2 className='font-semibold text-gray-900 flex items-center gap-2'>
                  <span>📋</span>
                  <span>Detalles de la Cita</span>
                </h2>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className='text-gray-400 hover:text-gray-600 p-1'
                >
                  ✕
                </button>
              </div>
            </div>

            <div className='p-4 space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='font-semibold text-gray-900 text-lg'>{selectedApt.clientName}</h3>
                  <p className='text-sm text-gray-600'>{selectedApt.service}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApt.status)}`}>
                  {selectedApt.status}
                </span>
              </div>

              <div className='bg-gray-50 rounded-lg p-4 space-y-3 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>📅 Fecha:</span>
                  <span className='font-medium text-gray-900'>
                    {new Date(selectedApt.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>⏰ Hora:</span>
                  <span className='font-medium text-gray-900'>{selectedApt.time}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>📍 Ubicación:</span>
                  <span className='font-medium text-gray-900'>{selectedApt.location}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>📞 Teléfono:</span>
                  <span className='font-medium text-gray-900'>{selectedApt.phone}</span>
                </div>
              </div>

              <div className='bg-[#fbbf24]/10 rounded-lg p-4 flex justify-between items-center'>
                <span className='text-gray-700 font-medium'>💰 Precio del servicio:</span>
                <span className='font-bold text-[#fbbf24] text-xl'>${selectedApt.price.toLocaleString('es-MX')}</span>
              </div>

              <div className='space-y-2'>
                {selectedApt.status === 'Pendiente' && (
                  <button className='w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors'>
                    ✓ Confirmar Cita
                  </button>
                )}
                <button className='w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors'>
                  📞 Contactar Cliente
                </button>
                <button className='w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors'>
                  ❌ Cancelar Cita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProviderBottomNav />
    </div>
  )
}