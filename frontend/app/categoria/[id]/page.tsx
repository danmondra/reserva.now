import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { categories } from '@/data/professionals'

export default async function CategoriaPage ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const categoria = categories.find(cat => cat.id === id)

  if (!categoria) {
    return (
      <div className='min-h-screen pb-20 bg-white'>
        <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
          <h1 className='text-2xl font-bold'>Categoría no encontrada</h1>
        </header>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-20 bg-[#ffedd5]'>
      <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
        <Link href='/' className='inline-flex items-center gap-2 mb-3 text-[#312311]/80 hover:text-[#312311]'>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>
        <div className='flex items-center gap-3 mb-2'>
          <span className='text-3xl'>{categoria.icon}</span>
          <h1 className='text-2xl font-bold'>{categoria.nombre}</h1>
        </div>
        <p className='text-sm text-[#312311]/80'>{categoria.profesionales.length} profesionales disponibles</p>
      </header>

      <main className='p-4'>
        <div className='space-y-3'>
          {categoria.profesionales.map((profesional) => (
            <div key={profesional.id} className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
              <Link href={`/profesional/${profesional.id}`} className='block p-4 hover:bg-gray-50 transition-colors'>
                <div className='flex gap-4'>
                  <div className='w-16 h-16 bg-[#ffedd5] rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden'>
                    <img src={profesional.imagen} alt={profesional.especialidad} className='w-full h-full object-contain p-2' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-gray-900 truncate'>{profesional.nombre}</h3>
                        <p className='text-sm text-gray-600'>{profesional.especialidad}</p>
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
              <div className='flex gap-2 px-4 pb-4'>
                <Link
                  href={`/reservar/${profesional.id}`}
                  className='flex-1 bg-[#e79c26] text-white py-2 rounded-lg font-medium hover:bg-[#ffc87c] transition-colors text-sm flex items-center justify-center gap-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Reservar</span>
                </Link>
                <a
                  href={`tel:${profesional.telefono}`}
                  className='px-4 bg-[#312311] text-white py-2 rounded-lg font-medium hover:bg-[#312311]/90 transition-colors text-sm flex items-center justify-center gap-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Llamar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}