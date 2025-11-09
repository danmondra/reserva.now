'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProviderBottomNav from '@/components/ProviderBottomNav'
import FinancialSummary from '@/components/FinancialSummary'
import { useAuth } from '@/hooks/useAuth'

export default function ProfesionalDashboard() {
  const router = useRouter()
  const { isLoading } = useAuth('provider')
  const [userName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || 'Profesional'
    }
    return 'Profesional'
  })

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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userType')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    router.push('/login')
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <div className='flex items-center justify-between mb-2'>
          <h1 className='text-2xl font-bold'>Panel de Proveedor</h1>
        </div>
        <p className='text-white/90'>Bienvenido, {userName}</p>
      </header>

      <main className='p-4 space-y-4 max-w-4xl mx-auto'>
        <FinancialSummary />

        <button className='w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left'>
          <div className='text-4xl mb-3'>⏰</div>
          <h3 className='font-semibold text-gray-900 mb-2'>Disponibilidad</h3>
          <p className='text-sm text-gray-600 mb-4'>Configurar horarios disponibles</p>
          <span className='text-[#fbbf24] font-medium text-sm hover:text-[#f59e0b]'>
            Configurar →
          </span>
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Link href='/provider/appointments' className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow block'>
            <div className='text-4xl mb-3'>📅</div>
            <h3 className='font-semibold text-gray-900 mb-2'>Mis Citas</h3>
            <p className='text-sm text-gray-600 mb-4'>Ver y gestionar tus citas programadas</p>
            <span className='text-[#fbbf24] font-medium text-sm hover:text-[#f59e0b]'>
              Ver citas →
            </span>
          </Link>

          <Link href='/provider/profile' className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow block'>
            <div className='text-4xl mb-3'>👤</div>
            <h3 className='font-semibold text-gray-900 mb-2'>Mi Perfil</h3>
            <p className='text-sm text-gray-600 mb-4'>Editar información profesional y servicios</p>
            <span className='text-[#fbbf24] font-medium text-sm hover:text-[#f59e0b]'>
              Editar perfil →
            </span>
          </Link>

          <Link href='/provider/resumen' className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow block'>
            <div className='text-4xl mb-3'>💰</div>
            <h3 className='font-semibold text-gray-900 mb-2'>Resumen</h3>
            <p className='text-sm text-gray-600 mb-4'>Ver estadísticas financieras y transacciones</p>
            <span className='text-[#fbbf24] font-medium text-sm hover:text-[#f59e0b]'>
              Ver Resumen →
            </span>
          </Link>
        </div>

        <div className='bg-blue-50 border border-blue-200 p-4 rounded-lg'>
          <p className='text-sm text-blue-800'>
            💡 <strong>Tip:</strong> Completa tu perfil profesional para que los clientes puedan encontrarte más fácilmente.
          </p>
        </div>
      </main>

      <ProviderBottomNav />
    </div>
  )
}