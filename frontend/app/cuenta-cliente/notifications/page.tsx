'use client'

import Link from 'next/link'
import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import NotificationSection from '@/components/NotificationSection'

interface NotificationSettings {
  confirmaciones: boolean
  recordatorios: boolean
  cancelaciones: boolean
  promociones: boolean
  ofertas: boolean
  recomendaciones: boolean
  email: boolean
  push: boolean
  sms: boolean
}

export default function ClientNotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    confirmaciones: true,
    recordatorios: true,
    cancelaciones: true,
    promociones: false,
    ofertas: true,
    recomendaciones: true,
    email: true,
    push: true,
    sms: false
  })

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !(prev as unknown as Record<string, boolean>)[key] }))
  }

  const notificationTypes = [
    { key: 'confirmaciones', label: 'Confirmaciones de Citas', description: 'Recibe confirmación de tus reservas' },
    { key: 'recordatorios', label: 'Recordatorios', description: 'Recordatorios de citas próximas' },
    { key: 'cancelaciones', label: 'Cancelaciones', description: 'Notificaciones de cambios en tus citas' },
    { key: 'promociones', label: 'Promociones', description: 'Ofertas especiales de profesionales' },
    { key: 'ofertas', label: 'Ofertas Personalizadas', description: 'Descuentos basados en tus preferencias' },
    { key: 'recomendaciones', label: 'Recomendaciones', description: 'Sugerencias de nuevos servicios' }
  ]

  const notificationChannels = [
    { key: 'email', label: 'Email', description: 'Notificaciones por correo electrónico' },
    { key: 'push', label: 'Notificaciones Push', description: 'Alertas en tu dispositivo' },
    { key: 'sms', label: 'SMS', description: 'Mensajes de texto' }
  ]

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md sticky top-0 z-10'>
        <div className='flex items-center gap-3'>
          <Link href='/cuenta-cliente' className='text-2xl'>
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
      </main>

      <BottomNav />
    </div>
  )
}