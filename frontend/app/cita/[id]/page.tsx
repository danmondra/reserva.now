'use client'

import Link from 'next/link'
import { use } from 'react'
import BottomNav from '@/components/BottomNav'
import { getAppointmentById } from '@/data/appointments'

export default function CitaPage ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const appointment = getAppointmentById(parseInt(id))

  const handleEditSection = (section: string) => {
    alert(`Editar ${section} - Funcionalidad próximamente`)
  }

  const handleCancelAppointment = () => {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas cancelar esta cita?\n\n' +
      'Ten en cuenta que las políticas de cancelación pueden aplicar.'
    )
    if (confirmed) {
      alert('Cita cancelada exitosamente. Se procesará el reembolso según las políticas.')
      // In a real app, this would update the appointment status
    }
  }

  if (!appointment) {
    return (
      <div className='min-h-screen pb-20 bg-gray-50'>
        <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
          <h1 className='text-2xl font-bold'>Cita no encontrada</h1>
        </header>
        <BottomNav />
      </div>
    )
  }

  const getEstadoCitaColor = (estado: string) => {
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

  const getEstadoPagoColor = (estado: string) => {
    switch (estado) {
      case 'Pagado':
        return 'bg-green-100 text-green-700'
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700'
      case 'En disputa':
        return 'bg-red-100 text-red-700'
      case 'Reembolsado':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <Link href='/citas' className='inline-block mb-3 text-white/90 hover:text-white'>
          ← Volver a citas
        </Link>
        <div className='flex items-center gap-3 mb-2'>
          <span className='text-3xl'>📋</span>
          <h1 className='text-2xl font-bold'>Detalles de Cita</h1>
        </div>
        <p className='text-sm text-white/90'>Cita #{appointment.id}</p>
      </header>

      <main className='p-4 space-y-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <Link href={`/profesional/${appointment.profesionalId}`} className='flex items-center gap-4 hover:bg-gray-50 -m-4 p-4 rounded-lg transition-colors'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0'>
              {appointment.profesionalImagen}
            </div>
            <div className='flex-1'>
              <h2 className='font-semibold text-gray-900'>{appointment.profesionalNombre}</h2>
              <p className='text-sm text-gray-600'>{appointment.profesionalEspecialidad}</p>
            </div>
            <span className='text-gray-400'>›</span>
          </Link>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='font-semibold text-gray-900 flex items-center gap-2'>
              <span>📅</span>
              <span>Información de la Cita</span>
            </h3>
            {appointment.estadoCita === 'Confirmada' && (
              <button
                onClick={() => alert('Reprogramar cita - Funcionalidad próximamente')}
                className='px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium'
              >
                Reprogramar
              </button>
            )}
          </div>
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Fecha:</span>
              <span className='text-gray-900 capitalize'>{formatDate(appointment.fecha)}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Hora:</span>
              <span className='text-gray-900'>{appointment.hora}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Duración:</span>
              <span className='text-gray-900'>{appointment.duracion}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Estado:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoCitaColor(appointment.estadoCita)}`}>
                {appointment.estadoCita}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <span>📍</span>
            <span>Ubicación</span>
          </h3>
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Modalidad:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                appointment.modalidad === 'A domicilio'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {appointment.modalidad}
              </span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Dirección:</span>
              <span className='text-gray-900'>{appointment.direccion}</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <span>💰</span>
            <span>Información de Pago - Interledger</span>
          </h3>
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-32 flex-shrink-0'>Precio:</span>
              <span className='text-[#fbbf24] font-bold text-lg'>${appointment.precio.toLocaleString('es-MX')}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-32 flex-shrink-0'>Estado:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoPagoColor(appointment.estadoPago)}`}>
                {appointment.estadoPago}
              </span>
            </div>
            {appointment.transactionId && (
              <div className='flex items-start gap-3'>
                <span className='text-gray-500 text-sm w-32 flex-shrink-0'>Transaction ID:</span>
                <span className='text-gray-900 font-mono text-xs break-all'>{appointment.transactionId}</span>
              </div>
            )}
            {appointment.signature && (
              <div className='flex items-start gap-3'>
                <span className='text-gray-500 text-sm w-32 flex-shrink-0'>Signature:</span>
                <span className='text-gray-900 font-mono text-xs break-all'>{appointment.signature}</span>
              </div>
            )}
          </div>
        </div>

        {appointment.notas && (
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='font-semibold text-gray-900 flex items-center gap-2'>
                <span>📝</span>
                <span>Notas</span>
              </h3>
              <button
                onClick={() => handleEditSection('notas')}
                className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                title='Editar notas'
              >
                ✏️
              </button>
            </div>
            <p className='text-gray-700 text-sm'>{appointment.notas}</p>
          </div>
        )}

        {appointment.calificacion && (
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
            <h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
              <span>⭐</span>
              <span>Tu Calificación</span>
            </h3>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-yellow-500 text-xl'>{'⭐'.repeat(appointment.calificacion)}</span>
              <span className='text-gray-600 text-sm'>({appointment.calificacion}/5)</span>
            </div>
            {appointment.comentario && (
              <p className='text-gray-700 text-sm mt-2 italic'>&quot;{appointment.comentario}&quot;</p>
            )}
          </div>
        )}

        {appointment.estadoCita === 'Completada' && !appointment.calificacion && (
          <button className='w-full bg-[#fbbf24] text-white py-3 rounded-lg font-semibold hover:bg-[#f59e0b] transition-colors'>
            Calificar Servicio
          </button>
        )}

        {appointment.estadoCita === 'Confirmada' && (
          <button
            onClick={handleCancelAppointment}
            className='w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
          >
            <span>❌</span>
            <span>Cancelar Cita</span>
          </button>
        )}

        {appointment.estadoPago === 'En disputa' && (
          <div className='bg-red-50 border border-red-200 p-4 rounded-lg'>
            <p className='text-red-800 text-sm font-medium mb-2'>⚠️ Pago en disputa</p>
            <p className='text-red-700 text-sm'>Nuestro equipo está revisando tu caso. Te contactaremos pronto.</p>
            <button className='mt-3 text-sm text-red-700 font-medium hover:text-red-800'>
              Ver detalles de la disputa →
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}