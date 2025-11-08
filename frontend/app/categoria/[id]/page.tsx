import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { categories } from '@/data/professionals'

export default async function CategoriaPage ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const categoria = categories.find(cat => cat.id === id)

  if (!categoria) {
    return (
      <div className='min-h-screen pb-20 bg-[#ffedd5]'>
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
        <Link href='/' className='inline-block mb-3 text-[#312311]/80 hover:text-[#312311]'>
          ← Volver
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
              <div className='flex gap-2 px-4 pb-4'>
                <Link
                  href={`/reservar/${profesional.id}`}
                  className='flex-1 bg-[#e79c26] text-white py-2 rounded-lg font-medium hover:bg-[#ffc87c] transition-colors text-sm flex items-center justify-center gap-2'
                >
                  <span>📅</span>
                  <span>Reservar</span>
                </Link>
                <a
                  href={`tel:${profesional.telefono}`}
                  className='px-4 bg-[#312311] text-white py-2 rounded-lg font-medium hover:bg-[#312311]/90 transition-colors text-sm flex items-center justify-center gap-2'
                >
                  <span>📞</span>
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