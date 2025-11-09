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
    <div className='min-h-screen pb-20 bg-white'>
      <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
        <h1 className='text-2xl font-bold mb-2'>Buscar</h1>
        <p className='text-sm text-[#312311]/80'>Encuentra el servicio perfecto para ti</p>
      </header>

      <div className='flex border-b border-gray-200 bg-white sticky top-0 z-10'>
        <button
          onClick={() => setVistaActiva('buscar')}
          className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            vistaActiva === 'buscar'
              ? 'text-[#e79c26] border-b-2 border-[#e79c26]'
              : 'text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar
        </button>
        <button
          onClick={() => setVistaActiva('mapa')}
          className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            vistaActiva === 'mapa'
              ? 'text-[#e79c26] border-b-2 border-[#e79c26]'
              : 'text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Mapa
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
              <svg className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {searchQuery.trim() === '' ? (
              <div className='text-center py-12'>
                <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className='text-gray-600 font-medium'>Busca servicios profesionales</p>
                <p className='text-sm text-gray-500 mt-1'>Escribe el nombre del servicio o profesional</p>
              </div>
            ) : filteredProfessionals.length === 0 ? (
              <div className='text-center py-12'>
                <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
                            <div className='flex items-center gap-1 mt-1'>
                              <svg className="w-3 h-3 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                              </svg>
                              <p className='text-xs text-[#e79c26]'>{profesional.categoria}</p>
                            </div>
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
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className='text-sm font-medium text-gray-700 ml-1'>{profesional.calificacion}</span>
                            <span className='text-xs text-gray-500 ml-1'>({profesional.resenas})</span>
                          </div>
                        </div>

                        <div className='mt-2 space-y-1'>
                          <div className='flex items-center gap-1'>
                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className='text-xs text-gray-500'>{profesional.direccion} • {profesional.distancia}</p>
                          </div>
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