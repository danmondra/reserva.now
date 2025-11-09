'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useState } from 'react'
import NotificationSection from '@/components/NotificationSection'

interface NotificationSettings {
  nuevasCitas: boolean
  cancelaciones: boolean
  recordatorios: boolean
  mensajes: boolean
  pagos: boolean
  promociones: boolean
  email: boolean
  push: boolean
  sms: boolean
}

export default function NotificationsPage() {
  const { isLoading } = useAuth('provider')
  const [settings, setSettings] = useState<NotificationSettings>({
    nuevasCitas: true,
    cancelaciones: true,
    recordatorios: true,
    mensajes: true,
    pagos: true,
    promociones: false,
    email: true,
    push: true,
    sms: false
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

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !(prev as unknown as Record<string, boolean>)[key] }))
  }

  const notificationTypes = [
    { key: 'nuevasCitas', label: 'Nuevas Citas', description: 'Recibe alertas de nuevas reservas' },
    { key: 'cancelaciones', label: 'Cancelaciones', description: 'Notificaciones de citas canceladas' },
    { key: 'recordatorios', label: 'Recordatorios', description: 'Recordatorios de citas próximas' },
    { key: 'mensajes', label: 'Mensajes', description: 'Mensajes de clientes' },
    { key: 'pagos', label: 'Pagos', description: 'Confirmaciones de pagos recibidos' },
    { key: 'promociones', label: 'Promociones', description: 'Ofertas y novedades de la plataforma' }
  ]

  const notificationChannels = [
    { key: 'email', label: 'Email', description: 'Notificaciones por correo electrónico' },
    { key: 'push', label: 'Notificaciones Push', description: 'Alertas en tu dispositivo' },
    { key: 'sms', label: 'SMS', description: 'Mensajes de texto' }
  ]

  return (
    <div className='min-h-screen pb-6 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md sticky top-0 z-10'>
        <div className='flex items-center gap-3'>
          <Link href='/provider/profile' className='text-2xl'>
            ←
          </Link>
          <h1 className='text-2xl font-bold'>Notificaciones</h1>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        <NotificationSection
          title='Canales de Notificación'
          icon='📱'
          items={notificationChannels}
          settings={settings as unknown as Record<string, boolean>}
          onToggle={toggleSetting}
        />

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex gap-3'>
            <span className='text-2xl'>💡</span>
            <div>
              <p className='font-medium text-blue-900'>Consejo</p>
              <p className='text-sm text-blue-700 mt-1'>
                Mantén activadas las notificaciones de nuevas citas y cancelaciones para no perder oportunidades de negocio.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}