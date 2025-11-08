'use client'

import Link from 'next/link'
import { useState } from 'react'
import BottomNav from '@/components/BottomNav'

export default function ClientUpdateProfilePage() {
  const [formData, setFormData] = useState({
    nombre: 'María González',
    telefono: '55-9876-5432',
    email: 'maria.gonzalez@email.com',
    direccion: 'Condesa, CDMX',
    fechaNacimiento: '1990-05-15',
    genero: 'Femenino'
  })
  const [profileImage, setProfileImage] = useState<string>('👤')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md sticky top-0 z-10'>
        <div className='flex items-center gap-3'>
          <Link href='/cuenta' className='text-2xl'>
            ←
          </Link>
          <h1 className='text-2xl font-bold'>Actualizar Perfil</h1>
        </div>
      </header>

      <main className='p-4'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
            <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
              <span>📸</span> Foto de Perfil
            </h2>
            
            <div className='flex flex-col items-center gap-4'>
              <div className='relative'>
                {profileImage.startsWith('data:') ? (
                  <img 
                    src={profileImage} 
                    alt='Profile' 
                    className='w-32 h-32 rounded-full object-cover border-4 border-gray-200'
                  />
                ) : (
                  <div className='w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-6xl border-4 border-gray-200'>
                    {profileImage}
                  </div>
                )}
              </div>
              
              <div className='flex gap-2'>
                <label className='px-4 py-2 bg-[#fbbf24] text-white rounded-lg font-medium hover:bg-[#f59e0b] transition-colors cursor-pointer'>
                  Cambiar Foto
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </label>
                {profileImage !== '👤' && (
                  <button
                    type='button'
                    onClick={() => setProfileImage('👤')}
                    className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors'
                  >
                    Eliminar
                  </button>
                )}
              </div>
              
              <p className='text-sm text-gray-500 text-center'>
                Formatos permitidos: JPG, PNG, GIF (máx. 5MB)
              </p>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
            <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
              <span>👤</span> Información Personal
            </h2>
            
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Nombre Completo
                </label>
                <input
                  type='text'
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Teléfono
                </label>
                <input
                  type='tel'
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Fecha de Nacimiento
                </label>
                <input
                  type='date'
                  value={formData.fechaNacimiento}
                  onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Género
                </label>
                <select
                  value={formData.genero}
                  onChange={(e) => setFormData({...formData, genero: e.target.value})}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                >
                  <option value='Masculino'>Masculino</option>
                  <option value='Femenino'>Femenino</option>
                  <option value='Otro'>Otro</option>
                  <option value='Prefiero no decir'>Prefiero no decir</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-[#fbbf24] text-white py-3 rounded-lg font-semibold hover:bg-[#f59e0b] transition-colors'
          >
            Guardar Cambios
          </button>
        </form>
      </main>

      {showSuccess && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'>
          ✓ Perfil actualizado exitosamente
        </div>
      )}

      <BottomNav />
    </div>
  )
}