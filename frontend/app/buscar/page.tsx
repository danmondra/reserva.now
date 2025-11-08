'use client'

import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MapView from '@/components/MapView'
import { categories } from '@/data/professionals'

export default function BuscarPage () {
  const [vistaActiva, setVistaActiva] = useState<'buscar' | 'mapa'>('buscar')
  const [searchQuery, setSearchQuery] = useState('')

  const allProfessionals = categories.flatMap(cat =>
    cat.profesionales.map(prof => ({
      ...prof,
      categoria: cat.nombre,
      categoriaId: cat.id
    }))
  )

  const filteredProfessionals = searchQuery.trim()
    ? allProfessionals.filter(prof =>
      prof.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.especialidad.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.categoria.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : []

  return (
    <div className='min-h-screen pb-20 bg-[#ffedd5]'>
      <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
        <h1 className='text-2xl font-bold mb-2'>Buscar</h1>
        <p className='text-sm text-[#312311]/80'>Encuentra el servicio perfecto para ti</p>
      </header>

      <div className='flex border-b border-gray-200 bg-white sticky top-0 z-10'>
        <button
          onClick={() => setVistaActiva('buscar')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            vistaActiva === 'buscar'
              ? 'text-[#e79c26] border-b-2 border-[#e79c26]'
              : 'text-gray-600'
          }`}
        >
          🔍 Buscar
        </button>
        <button
          onClick={() => setVistaActiva('mapa')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            vistaActiva === 'mapa'
              ? 'text-[#e79c26] border-b-2 border-[#e79c26]'
              : 'text-gray-600'
          }`}
        >
          🗺️ Mapa
        </button>
      </div>

      <main className='p-4'>
        {vistaActiva === 'buscar' ? (
          <div className='space-y-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Buscar servicios, profesionales...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e79c26] focus:border-transparent'
              />
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl'>
                🔍
              </span>
            </div>

            {searchQuery.trim() === '' ? (
              <div className='text-center py-12'>
                <p className='text-4xl mb-3'>🔍</p>
                <p className='text-gray-600 font-medium'>Busca servicios profesionales</p>
                <p className='text-sm text-gray-500 mt-1'>Escribe el nombre del servicio o profesional</p>
              </div>
            ) : filteredProfessionals.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-4xl mb-3'>😕</p>
                <p className='text-gray-600 font-medium'>No se encontraron resultados</p>
                <p className='text-sm text-gray-500 mt-1'>Intenta con otra búsqueda</p>
              </div>
            ) : (
              <div className='space-y-3'>
                <p className='text-sm text-gray-600'>
                  {filteredProfessionals.length} resultado{filteredProfessionals.length !== 1 ? 's' : ''} encontrado{filteredProfessionals.length !== 1 ? 's' : ''}
                </p>
                {filteredProfessionals.map((profesional) => (
                  <Link
                    key={profesional.id}
                    href={`/profesional/${profesional.id}`}
                    className='block bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-[#e79c26] hover:shadow-md transition-all'
                  >
                    <div className='flex gap-4'>
                      <div className='w-16 h-16 bg-[#ffedd5] rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden'>
                        <img src={profesional.imagen} alt={profesional.especialidad} className='w-full h-full object-contain p-2' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2'>
                          <div className='flex-1 min-w-0'>
                            <h3 className='font-semibold text-gray-900 truncate'>{profesional.nombre}</h3>
                            <p className='text-sm text-gray-600'>{profesional.especialidad}</p>
                            <p className='text-xs text-[#e79c26] mt-1'>📂 {profesional.categoria}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            profesional.disponible
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {profesional.disponible ? 'Disponible' : 'Ocupado'}
                          </span>
                        </div>
                        
                        <div className='flex items-center gap-2 mt-2'>
                          <div className='flex items-center'>
                            <span className='text-yellow-500 text-sm'>⭐</span>
                            <span className='text-sm font-medium text-gray-700 ml-1'>{profesional.calificacion}</span>
                            <span className='text-xs text-gray-500 ml-1'>({profesional.resenas})</span>
                          </div>
                        </div>

                        <div className='mt-2 space-y-1'>
                          <p className='text-xs text-gray-500'>📍 {profesional.direccion} • {profesional.distancia}</p>
                          <p className='text-sm font-medium text-[#e79c26]'>{profesional.precio}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <MapView />
        )}
      </main>

      <BottomNav />
    </div>
  )
}