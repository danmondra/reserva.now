'use client'

import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import BottomNav from '@/components/BottomNav'
import { categories } from '@/data/professionals'
import { weekAvailability } from '@/data/availability'

export default function ReservarPage ({ params }: { params: Promise<{ professionalId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const professionalId = parseInt(resolvedParams.professionalId)

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showAllHours, setShowAllHours] = useState(false)

  // Find professional
  const professional = (() => {
    for (const category of categories) {
      const found = category.profesionales.find(p => p.id === professionalId)
      if (found) return found
    }
    return null
  })()

  if (!professional) {
    return (
      <div className='min-h-screen pb-20 bg-gray-50'>
        <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
          <h1 className='text-2xl font-bold'>Profesional no encontrado</h1>
        </header>
        <BottomNav />
      </div>
    )
  }

  const selectedDayData = selectedDate ? weekAvailability.find(day => day.date === selectedDate) : null

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Cita confirmada con ${professional.nombre} el ${selectedDate} a las ${selectedTime}`)
      router.push('/citas')
    }
  }

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <button
          onClick={() => router.back()}
          className='inline-block mb-3 text-white/90 hover:text-white'
        >
          ← Volver
        </button>
        <div className='flex items-center gap-3'>
          <span className='text-3xl'>{professional.imagen}</span>
          <div>
            <h1 className='text-2xl font-bold'>Reservar Cita</h1>
            <p className='text-sm text-white/90'>{professional.nombre}</p>
          </div>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        {/* Calendar Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-4 border-b border-gray-100'>
            <h2 className='font-semibold text-gray-900 flex items-center gap-2'>
              <span>📅</span>
              <span>Selecciona fecha y hora</span>
            </h2>
          </div>
          
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full'>
              {/* Header with days - sticky */}
              <div className='flex border-b border-gray-200 bg-gray-50 sticky top-0 z-10'>
                {weekAvailability.map((day, index) => {
                  const date = new Date(day.date)
                  const dayLabel = index === 0 ? 'Hoy' : index === 1 ? 'Mañana' : day.dayName
                  const dateLabel = date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
                  
                  return (
                    <div key={day.date} className='flex-1 min-w-[80px] p-3 border-r border-gray-200 last:border-r-0'>
                      <div className='text-center'>
                        <p className='text-xs font-semibold text-gray-900'>{dayLabel}</p>
                        <p className='text-xs text-gray-500 mt-0.5'>{dateLabel}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Time slots rows - scrollable */}
              <div className={`${showAllHours ? 'max-h-[400px] overflow-y-auto' : ''}`}>
                {weekAvailability[0].slots.slice(0, showAllHours ? undefined : 5).map((_, slotIndex) => (
                  <div key={slotIndex} className='flex border-b border-gray-100 last:border-b-0'>
                    {weekAvailability.map((day) => {
                      const slot = day.slots[slotIndex]
                      const isSelected = selectedDate === day.date && selectedTime === slot.time
                      
                      return (
                        <button
                          key={`${day.date}-${slot.time}`}
                          onClick={() => {
                            if (slot.available) {
                              setSelectedDate(day.date)
                              setSelectedTime(slot.time)
                            }
                          }}
                          disabled={!slot.available}
                          className={`flex-1 min-w-[80px] p-3 border-r border-gray-100 last:border-r-0 transition-all ${
                            isSelected
                              ? 'bg-[#fbbf24] text-white font-semibold'
                              : slot.available
                              ? 'hover:bg-[#fbbf24]/10 text-gray-900'
                              : 'opacity-40 cursor-not-allowed'
                          }`}
                        >
                          <span className={!slot.available ? 'line-through' : ''}>
                            {slot.time}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show more button */}
          {!showAllHours && weekAvailability[0].slots.length > 5 && (
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

        {/* Booking Summary */}
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <span>📋</span>
            <span>Resumen de la cita</span>
          </h2>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Profesional:</span>
              <span className='font-medium text-gray-900'>{professional.nombre}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Especialidad:</span>
              <span className='font-medium text-gray-900'>{professional.especialidad}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Fecha:</span>
              {selectedDate ? (
                <span className='font-medium text-gray-900'>{selectedDayData?.dayName}, {selectedDate}</span>
              ) : (
                <span className='text-gray-400 italic'>Por favor selecciona una fecha</span>
              )}
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Hora:</span>
              {selectedTime ? (
                <span className='font-medium text-gray-900'>{selectedTime}</span>
              ) : (
                <span className='text-gray-400 italic'>Por favor selecciona una hora</span>
              )}
            </div>
            <div className='flex justify-between pt-2 border-t border-gray-200'>
              <span className='text-gray-600'>Precio:</span>
              <span className='font-bold text-[#fbbf24]'>{professional.precio}</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-lg ${
            selectedDate && selectedTime
              ? 'bg-[#fbbf24] text-white hover:bg-[#f59e0b] cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>✅</span>
          <span>Confirmar Cita</span>
        </button>
      </main>

      <BottomNav />
    </div>
  )
}