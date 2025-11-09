'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useState } from 'react'

export default function UpdateProfilePage() {
  const { isLoading } = useAuth('provider')
  const [formData, setFormData] = useState({
    nombre: 'Dr. Carlos García',
    especialidad: 'Dentista',
    telefono: '55-1234-5678',
    email: 'carlos.garcia@email.com',
    direccion: 'Polanco, CDMX',
    experiencia: '15',
    descripcion: 'Especialista en odontología general y estética dental con más de 15 años de experiencia.',
    precioMin: '500',
    precioMax: '1200',
    horarioInicio: '09:00',
    horarioFin: '19:00',
    diasLaborales: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  })
  const [profileImage, setProfileImage] = useState<string>('🦷')
  const [showSuccess, setShowSuccess] = useState(false)

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='text-4xl mb-4'>⏳</div>
          <p className='text-gray-600'>Cargando...</p>
        </div>
      </div>
    )
  }

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

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  const toggleDia = (dia: string) => {
    setFormData(prev => ({
      ...prev,
      diasLaborales: prev.diasLaborales.includes(dia)
        ? prev.diasLaborales.filter(d => d !== dia)
        : [...prev.diasLaborales, dia]
    }))
  }

  return (
    <div className='min-h-screen pb-6 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md sticky top-0 z-10'>
        <div className='flex items-center gap-3'>
          <Link href='/provider/profile' className='text-2xl'>
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
                {profileImage !== '🦷' && (
                  <button
                    type='button'
                    onClick={() => setProfileImage('🦷')}
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
                  Especialidad
                </label>
                <input
                  type='text'
                  value={formData.especialidad}
                  onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
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
                  Dirección
                </label>
                <input
                  type='text'
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
            <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
              <span>💼</span> Información Profesional
            </h2>
            
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Años de Experiencia
                </label>
                <input
                  type='number'
                  value={formData.experiencia}
                  onChange={(e) => setFormData({...formData, experiencia: e.target.value})}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Descripción de Servicios
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows={4}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Precio Mínimo ($)
                  </label>
                  <input
                    type='number'
                    value={formData.precioMin}
                    onChange={(e) => setFormData({...formData, precioMin: e.target.value})}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Precio Máximo ($)
                  </label>
                  <input
                    type='number'
                    value={formData.precioMax}
                    onChange={(e) => setFormData({...formData, precioMax: e.target.value})}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
            <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
              <span>🕐</span> Horario de Atención
            </h2>
            
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Hora de Inicio
                  </label>
                  <input
                    type='time'
                    value={formData.horarioInicio}
                    onChange={(e) => setFormData({...formData, horarioInicio: e.target.value})}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Hora de Fin
                  </label>
                  <input
                    type='time'
                    value={formData.horarioFin}
                    onChange={(e) => setFormData({...formData, horarioFin: e.target.value})}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Días Laborales
                </label>
                <div className='flex flex-wrap gap-2'>
                  {diasSemana.map(dia => (
                    <button
                      key={dia}
                      type='button'
                      onClick={() => toggleDia(dia)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        formData.diasLaborales.includes(dia)
                          ? 'bg-[#fbbf24] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {dia.slice(0, 3)}
                    </button>
                  ))}
                </div>
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
    </div>
  )
}