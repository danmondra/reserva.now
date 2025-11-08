'use client'

import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

type FilterType = 'Todas' | 'Completada' | 'Confirmada' | 'Cancelada' | 'En progreso'

const appointments = [
  {
    id: 1,
    profesionalNombre: 'Dr. Juan Pérez',
    profesionalEspecialidad: 'Medicina General',
    fecha: '2025-11-15',
    hora: '10:00',
    precio: 500,
    estadoCita: 'Confirmada' as const,
    calificacion: undefined
  },
  {
    id: 2,
    profesionalNombre: 'Dra. María González',
    profesionalEspecialidad: 'Dermatología',
    fecha: '2025-10-20',
    hora: '14:30',
    precio: 800,
    estadoCita: 'Completada' as const,
    calificacion: 5
  },
  {
    id: 3,
    profesionalNombre: 'Dr. Carlos Ramírez',
    profesionalEspecialidad: 'Cardiología',
    fecha: '2025-10-05',
    hora: '09:00',
    precio: 1200,
    estadoCita: 'Cancelada' as const,
    calificacion: undefined
  }
]

export default function CitasPage () {
  const [filtroActivo, setFiltroActivo] = useState<FilterType>('Todas')

  const handleCancel = (e: React.MouseEvent, citaId: number) => {
    e.preventDefault()
    e.stopPropagation()
    const confirmed = confirm('¿Estás seguro de que deseas cancelar esta cita?')
    if (confirmed) {
      alert(`Cita #${citaId} cancelada - Funcionalidad próximamente`)
    }
  }
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Completada':
        return 'bg-green-100 text-green-700'
      case 'Confirmada':
        return 'bg-blue-100 text-blue-700'
      case 'Cancelada':
        return 'bg-red-100 text-red-700'
      case 'En progreso':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateStr: string, hora: string) => {
    const date = new Date(dateStr)
    const dateFormatted = date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    return `${dateFormatted}, ${hora}`
  }

  const filteredAppointments = filtroActivo === 'Todas'
    ? appointments
    : appointments.filter(apt => apt.estadoCita === filtroActivo)

  const filters: FilterType[] = ['Todas', 'Completada', 'Confirmada', 'Cancelada', 'En progreso']

  const getFilterCount = (filter: FilterType) => {
    if (filter === 'Todas') return appointments.length
    return appointments.filter(apt => apt.estadoCita === filter).length
  }

  // Separate future and past appointments
  const now = new Date()
  const futureAppointments = filteredAppointments.filter(apt => {
    const aptDate = new Date(`${apt.fecha}T${apt.hora}`)
    return aptDate > now
  })
  const pastAppointments = filteredAppointments.filter(apt => {
    const aptDate = new Date(`${apt.fecha}T${apt.hora}`)
    return aptDate <= now
  })

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <div className='flex items-center gap-3 mb-2'>
          <span className='text-3xl'>📋</span>
          <h1 className='text-2xl font-bold'>Citas</h1>
        </div>
        <p className='text-sm text-white/90'>Revisa tus reservaciones anteriores</p>
      </header>

      <main className='p-4 space-y-4'>
        <div className='bg-white p-3 rounded-lg shadow-sm border border-gray-100'>
          <label htmlFor='filter-select' className='block text-sm font-medium text-gray-700 mb-2'>
            Filtrar por estado:
          </label>
          <div className='relative'>
            <select
              id='filter-select'
              value={filtroActivo}
              onChange={(e) => setFiltroActivo(e.target.value as FilterType)}
              className='w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent appearance-none cursor-pointer'
            >
              {filters.map((filter) => {
                const count = getFilterCount(filter)
                return (
                  <option key={filter} value={filter}>
                    {filter} ({count})
                  </option>
                )
              })}
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <span className='text-gray-500'>▼</span>
            </div>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-4xl mb-3'>📭</p>
            <p className='text-gray-600 font-medium'>No hay citas con este filtro</p>
            <p className='text-sm text-gray-500 mt-1'>Intenta con otro filtro</p>
          </div>
        ) : (
          <>
            {/* Future Appointments Section */}
            {futureAppointments.length > 0 && (
              <div className='space-y-3'>
                <div className='flex items-center gap-2 px-1'>
                  <span className='text-lg'>🔜</span>
                  <h2 className='text-lg font-bold text-gray-900'>Próximas Citas</h2>
                  <span className='bg-[#fbbf24] text-white text-xs font-bold px-2 py-1 rounded-full'>
                    {futureAppointments.length}
                  </span>
                </div>
                {futureAppointments.map((cita) => (
                  <Link
                    key={cita.id}
                    href={`/cita/${cita.id}`}
                    className='block bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>{cita.profesionalNombre}</h3>
                        <p className='text-sm text-gray-600'>{cita.profesionalEspecialidad}</p>
                      </div>
                      {cita.estadoCita === 'Confirmada' ? (
                        <button
                          onClick={(e) => handleCancel(e, cita.id)}
                          className='bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors'
                          title='Cancelar cita'
                        >
                          <span>Cancelar</span>
                        </button>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cita.estadoCita)}`}>
                          {cita.estadoCita}
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-gray-600 mb-1'>📅 {formatDate(cita.fecha, cita.hora)}</p>
                    <p className='text-sm text-gray-600 mb-2'>💰 ${cita.precio.toLocaleString('es-MX')}</p>
                    {cita.calificacion && (
                      <div className='mt-2 flex items-center'>
                        <span className='text-yellow-500'>{'⭐'.repeat(cita.calificacion)}</span>
                        <span className='text-xs text-gray-500 ml-2'>({cita.calificacion}/5)</span>
                      </div>
                    )}
                    {cita.estadoCita === 'Completada' && !cita.calificacion && (
                      <p className='mt-2 text-sm text-[#fbbf24] font-medium'>
                        Toca para calificar →
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* Past Appointments Section */}
            {pastAppointments.length > 0 && (
              <div className='space-y-3'>
                <div className='flex items-center gap-2 px-1'>
                  <span className='text-lg'>📜</span>
                  <h2 className='text-lg font-bold text-gray-900'>Historial</h2>
                  <span className='bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-full'>
                    {pastAppointments.length}
                  </span>
                </div>
                {pastAppointments.map((cita) => (
                  <Link
                    key={cita.id}
                    href={`/cita/${cita.id}`}
                    className='block bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>{cita.profesionalNombre}</h3>
                        <p className='text-sm text-gray-600'>{cita.profesionalEspecialidad}</p>
                      </div>
                      {cita.estadoCita === 'Confirmada' ? (
                        <button
                          onClick={(e) => handleCancel(e, cita.id)}
                          className='bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors'
                          title='Cancelar cita'
                        >
                          <span>🗑️</span>
                          <span>Cancelar</span>
                        </button>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cita.estadoCita)}`}>
                          {cita.estadoCita}
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-gray-600 mb-1'>📅 {formatDate(cita.fecha, cita.hora)}</p>
                    <p className='text-sm text-gray-600 mb-2'>💰 ${cita.precio.toLocaleString('es-MX')}</p>
                    {cita.calificacion && (
                      <div className='mt-2 flex items-center'>
                        <span className='text-yellow-500'>{'⭐'.repeat(cita.calificacion)}</span>
                        <span className='text-xs text-gray-500 ml-2'>({cita.calificacion}/5)</span>
                      </div>
                    )}
                    {cita.estadoCita === 'Completada' && !cita.calificacion && (
                      <p className='mt-2 text-sm text-[#fbbf24] font-medium'>
                        Toca para calificar →
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}