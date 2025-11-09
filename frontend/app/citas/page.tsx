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
    <div className='min-h-screen pb-20 bg-white'>
      <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
        <h1 className='text-2xl font-bold mb-2'>Citas</h1>
        <p className='text-sm text-[#312311]/80'>Revisa tus reservaciones anteriores</p>
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
            <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className='text-gray-600 font-medium'>No hay citas con este filtro</p>
            <p className='text-sm text-gray-500 mt-1'>Intenta con otro filtro</p>
          </div>
        ) : (
          <>
            {/* Future Appointments Section */}
            {futureAppointments.length > 0 && (
              <div className='space-y-3'>
                <div className='flex items-center gap-2 px-1'>
                  <svg className="w-5 h-5 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className='text-lg font-bold text-gray-900'>Próximas Citas</h2>
                  <span className='bg-[#e79c26] text-white text-xs font-bold px-2 py-1 rounded-full'>
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
                    <div className='flex items-center gap-1 text-sm text-gray-600 mb-1'>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(cita.fecha, cita.hora)}
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-600 mb-2'>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ${cita.precio.toLocaleString('es-MX')}
                    </div>
                    {cita.calificacion && (
                      <div className='mt-2 flex items-center gap-1'>
                        {[...Array(cita.calificacion)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className='text-xs text-gray-500 ml-1'>({cita.calificacion}/5)</span>
                      </div>
                    )}
                    {cita.estadoCita === 'Completada' && !cita.calificacion && (
                      <p className='mt-2 text-sm text-[#e79c26] font-medium'>
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
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Cancelar</span>
                        </button>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cita.estadoCita)}`}>
                          {cita.estadoCita}
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-600 mb-1'>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(cita.fecha, cita.hora)}
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-600 mb-2'>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ${cita.precio.toLocaleString('es-MX')}
                    </div>
                    {cita.calificacion && (
                      <div className='mt-2 flex items-center gap-1'>
                        {[...Array(cita.calificacion)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className='text-xs text-gray-500 ml-1'>({cita.calificacion}/5)</span>
                      </div>
                    )}
                    {cita.estadoCita === 'Completada' && !cita.calificacion && (
                      <p className='mt-2 text-sm text-[#e79c26] font-medium'>
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