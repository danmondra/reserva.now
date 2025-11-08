'use client'

import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { categories } from '@/data/professionals'
import { getProfessionalDetails } from '@/data/professionalDetails'
import { use, useMemo } from 'react'

export default function ProfesionalPage ({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const professionalId = parseInt(resolvedParams.id)

  const professional = useMemo(() => {
    for (const category of categories) {
      const found = category.profesionales.find(p => p.id === professionalId)
      if (found) {
        return getProfessionalDetails(found)
      }
    }
    return null
  }, [professionalId])

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

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <button
          onClick={() => router.back()}
          className='inline-block mb-3 text-white/90 hover:text-white'
        >
          ← Volver
        </button>
        <div className='flex items-center gap-4'>
          <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl'>
            {professional.imagen}
          </div>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{professional.nombre}</h1>
            <p className='text-sm text-white/90'>{professional.especialidad}</p>
          </div>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-500 text-lg'>⭐</span>
              <span className='text-lg font-bold text-gray-900'>{professional.calificacion}</span>
              <span className='text-sm text-gray-500'>({professional.resenas} reseñas)</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              professional.disponible
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {professional.disponible ? 'Disponible' : 'Ocupado'}
            </span>
          </div>
          <p className='text-gray-700 leading-relaxed'>{professional.descripcion}</p>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <span>💼</span>
            <span>Información General</span>
          </h2>
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Experiencia:</span>
              <span className='text-gray-900 font-medium'>{professional.experiencia}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Precio:</span>
              <span className='text-[#fbbf24] font-bold'>{professional.precio}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Ubicación:</span>
              <span className='text-gray-900'>{professional.direccion} • {professional.distancia}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Horario:</span>
              <span className='text-gray-900'>{professional.horario}</span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-gray-500 text-sm w-24 flex-shrink-0'>Teléfono:</span>
              <a href={`tel:${professional.telefono}`} className='text-blue-600 hover:underline'>{professional.telefono}</a>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <span>📍</span>
            <span>Modalidad de Servicio</span>
          </h2>
          <div className='flex flex-wrap gap-2'>
            {(professional.modalidad || []).map((mod, index) => (
              <span key={index} className='px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm'>
                {mod}
              </span>
            ))}
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
          <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
            <span>✨</span>
            <span>Servicios Ofrecidos</span>
          </h2>
          <ul className='space-y-2'>
            {(professional.servicios || []).map((servicio, index) => (
              <li key={index} className='flex items-center gap-2 text-gray-700'>
                <span className='text-[#fbbf24]'>•</span>
                <span>{servicio}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex gap-3 sticky bottom-20 bg-gray-50 py-3'>
          <button
            onClick={() => router.push(`/reservar/${professionalId}`)}
            className='flex-1 bg-[#fbbf24] text-white py-3 rounded-lg font-semibold hover:bg-[#f59e0b] transition-colors flex items-center justify-center gap-2'
          >
            <span>📅</span>
            <span>Reservar Cita</span>
          </button>
          <a
            href={`tel:${professional.telefono}`}
            className='px-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2'
          >
            <span>📞</span>
            <span>Llamar</span>
          </a>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}