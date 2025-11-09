'use client'

import BottomNav from '@/components/BottomNav'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CuentaPage () {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [userName, setUserName] = useState('Usuario')
  const [userEmail, setUserEmail] = useState('usuario@email.com')

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Usuario')
    setUserEmail(localStorage.getItem('userEmail') || 'usuario@email.com')
  }, [])

  const menuItems = [
    { id: 1, titulo: 'Actualizar Perfil', icon: '✏️', descripcion: 'Edita tu información personal', href: '/cuenta-cliente/update' },
    { id: 2, titulo: 'Notificaciones', icon: '🔔', descripcion: 'Configura tus alertas', href: '/cuenta-cliente/notifications' },
    { id: 3, titulo: 'Interledger', icon: '💳', descripcion: 'Gestiona tu wallet y pagos', href: '/cuenta-cliente/interledger' },
    { id: 4, titulo: 'Ayuda y Soporte', icon: '❓', descripcion: 'Preguntas frecuentes y contacto', href: '/cuenta-cliente/help' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userType')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    window.location.href = '/login'
  }

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <div className='flex items-center gap-3 mb-3'>
          <h1 className='text-2xl font-bold'>Mi Cuenta</h1>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl'>
            👤
          </div>
          <div>
            <p className='font-semibold'>{userName}</p>
            <p className='text-sm text-white/90'>{userEmail}</p>
          </div>
        </div>
      </header>

      <main className='p-4'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors block ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className='text-2xl'>{item.icon}</span>
              <div className='flex-1 text-left'>
                <p className='font-medium'>{item.titulo}</p>
                <p className='text-sm text-gray-500 mt-0.5'>{item.descripcion}</p>
              </div>
              <span className='text-gray-400'>›</span>
            </Link>
          ))}
        </div>

        <div className='mt-4'>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className='w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center space-x-4 hover:bg-red-50 transition-colors text-red-600'
          >
            <span className='text-2xl'>🚪</span>
            <div className='flex-1 text-left'>
              <p className='font-medium'>Cerrar Sesión</p>
            </div>
          </button>
        </div>

        <div className='mt-6 text-center text-sm text-gray-500'>
          <p>Versión 1.0.0</p>
        </div>
      </main>

      {showLogoutConfirm && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full'>
            <h3 className='text-lg font-semibold mb-2'>¿Cerrar sesión?</h3>
            <p className='text-gray-600 mb-6'>¿Estás seguro que deseas cerrar tu sesión?</p>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}