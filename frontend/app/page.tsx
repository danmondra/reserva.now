'use client'

import Link from 'next/link'
import Image from 'next/image'
import BottomNav from '@/components/BottomNav'
import { categories } from '@/data/professionals'

export default function Home() {
  return (
    <div className='min-h-screen pb-20 bg-[#ffedd5]'>
      <header className='bg-[#e79c26] text-[#312311] p-6 shadow-md'>
        <h1 className='text-2xl font-bold mb-2'>Reserva.Now</h1>
        <p className='text-sm text-[#312311]/80'>Encuentra profesionales cerca de ti</p>
      </header>

      <main className='p-4 space-y-6'>
        <section>
          <h2 className='text-xl font-bold text-[#312311] mb-4'>Categorías</h2>
          <div className='grid grid-cols-1 gap-4'>
            {categories.map((categoria) => (
              <Link
                key={categoria.id}
                href={`/categoria/${categoria.id}`}
                className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all hover:border-[#e79c26]'
              >
                <div className='p-4'>
                  <div className='flex items-center gap-4 mb-3'>
                    <div className='flex-1'>
                      <h3 className='font-bold text-[#312311] text-lg'>{categoria.nombre}</h3>
                      <p className='text-sm text-gray-600'>{categoria.profesionales.length} profesionales</p>
                    </div>
                    <span className='text-[#e79c26]'>→</span>
                  </div>
                  
                  <div className='grid grid-cols-3 gap-2'>
                    {categoria.profesionales.slice(0, 3).map((prof) => (
                      <div key={prof.id} className='flex flex-col items-center'>
                        <div className='w-16 h-16 bg-[#ffedd5] rounded-lg overflow-hidden mb-1 relative'>
                          <Image
                            src={prof.imagen}
                            alt={prof.especialidad}
                            fill
                            className='object-contain p-2'
                          />
                        </div>
                        <p className='text-xs text-gray-600 text-center truncate w-full'>{prof.especialidad}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
