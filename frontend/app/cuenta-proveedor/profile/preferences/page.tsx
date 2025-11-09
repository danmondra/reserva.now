'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useState } from 'react'

interface AppointmentPreferences {
  autoConfirm: boolean
  allowCancellation: boolean
  cancellationHours: string
  bufferTime: string
  maxDailyAppointments: string
  advanceBookingDays: string
  allowWaitlist: boolean
  instantBooking: boolean
  paymentMode: 'partial' | 'prepaid' | 'postpaid'
  partialPaymentPercentage: string
}

export default function PreferencesPage() {
  const { isLoading } = useAuth('provider')
  const [preferences, setPreferences] = useState<AppointmentPreferences>({
    autoConfirm: true,
    allowCancellation: true,
    cancellationHours: '24',
    bufferTime: '15',
    maxDailyAppointments: '10',
    advanceBookingDays: '30',
    allowWaitlist: true,
    instantBooking: true,
    paymentMode: 'partial',
    partialPaymentPercentage: '30'
  })
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

  const togglePreference = (key: keyof AppointmentPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleInputChange = (key: keyof AppointmentPreferences, value: string | 'partial' | 'prepaid' | 'postpaid') => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className='min-h-screen pb-6 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md sticky top-0 z-10'>
        <div className='flex items-center gap-3'>
          <Link href='/provider/profile' className='text-2xl'>
            ←
          </Link>
          <h1 className='text-2xl font-bold'>Preferencias de Cita</h1>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <span>❌</span> Política de Cancelación
          </h2>
          
          <div className='space-y-4'>
            <div className='flex items-center justify-between py-2'>
              <div className='flex-1'>
                <p className='font-medium'>Permitir Cancelaciones</p>
                <p className='text-sm text-gray-500'>Los clientes pueden cancelar sus citas</p>
              </div>
              <button
                onClick={() => togglePreference('allowCancellation')}
                className={`w-12 h-6 rounded-full transition-colors ml-4 ${
                  preferences.allowCancellation ? 'bg-[#fbbf24]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.allowCancellation ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {preferences.allowCancellation && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Horas Mínimas para Cancelar sin Penalización
                </label>
                <select
                  value={preferences.cancellationHours}
                  onChange={(e) => handleInputChange('cancellationHours', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                >
                  <option value='2'>2 horas</option>
                  <option value='6'>6 horas</option>
                  <option value='12'>12 horas</option>
                  <option value='24'>24 horas</option>
                  <option value='48'>48 horas</option>
                  <option value='72'>72 horas</option>
                </select>
                <p className='text-xs text-gray-500 mt-1'>Tiempo mínimo antes de la cita para cancelar gratis</p>
              </div>
            )}
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <span>💰</span> Modalidad de Transacción
          </h2>
          
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Selecciona cómo deseas recibir el pago al momento de la reserva
              </label>
              
              <div className='space-y-3'>
                <div
                  className={`w-full p-4 border-2 rounded-lg transition-all ${
                    preferences.paymentMode === 'partial'
                      ? 'border-[#fbbf24] bg-yellow-50'
                      : 'border-gray-200'
                  }`}
                >
                  <button
                    type='button'
                    onClick={() => handleInputChange('paymentMode', 'partial')}
                    className='w-full'
                  >
                    <div className='flex items-start gap-3'>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        preferences.paymentMode === 'partial'
                          ? 'border-[#fbbf24] bg-[#fbbf24]'
                          : 'border-gray-300'
                      }`}>
                        {preferences.paymentMode === 'partial' && (
                          <div className='w-2.5 h-2.5 bg-white rounded-full' />
                        )}
                      </div>
                      <div className='flex-1 text-left'>
                        <p className='font-semibold text-gray-900'>Pago Parcial</p>
                        <p className='text-sm text-gray-600 mt-1'>
                          El cliente paga un porcentaje al reservar y el resto al finalizar el servicio
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className='mt-4 pl-8'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Porcentaje de Pago Inicial (%)
                    </label>
                    <input
                      type='number'
                      min='10'
                      max='90'
                      step='5'
                      value={preferences.partialPaymentPercentage || '30'}
                      onChange={(e) => handleInputChange('partialPaymentPercentage', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      Porcentaje del costo total que el cliente pagará al reservar
                    </p>

                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3'>
                      <div className='flex gap-2'>
                        <span className='text-lg'>ℹ️</span>
                        <div className='text-sm'>
                          <p className='font-medium text-blue-900'>Ejemplo:</p>
                          <p className='text-blue-700 mt-1'>
                            Si tu servicio cuesta $800 y solicitas {preferences.partialPaymentPercentage || '30'}% al reservar:
                          </p>
                          <ul className='text-blue-700 mt-2 space-y-1 ml-4'>
                            <li>• Pago al reservar: ${(800 * parseInt(preferences.partialPaymentPercentage || '30') / 100).toFixed(0)}</li>
                            <li>• Pago al finalizar: ${(800 - (800 * parseInt(preferences.partialPaymentPercentage || '30') / 100)).toFixed(0)}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type='button'
                  onClick={() => handleInputChange('paymentMode', 'prepaid')}
                  className={`w-full p-4 border-2 rounded-lg transition-all ${
                    preferences.paymentMode === 'prepaid'
                      ? 'border-[#fbbf24] bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className='flex items-start gap-3'>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      preferences.paymentMode === 'prepaid'
                        ? 'border-[#fbbf24] bg-[#fbbf24]'
                        : 'border-gray-300'
                    }`}>
                      {preferences.paymentMode === 'prepaid' && (
                        <div className='w-2.5 h-2.5 bg-white rounded-full' />
                      )}
                    </div>
                    <div className='flex-1 text-left'>
                      <p className='font-semibold text-gray-900'>Pre-pago Completo</p>
                      <p className='text-sm text-gray-600 mt-1'>
                        El cliente paga el 100% del costo antes de la cita
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type='button'
                  onClick={() => handleInputChange('paymentMode', 'postpaid')}
                  className={`w-full p-4 border-2 rounded-lg transition-all ${
                    preferences.paymentMode === 'postpaid'
                      ? 'border-[#fbbf24] bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className='flex items-start gap-3'>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      preferences.paymentMode === 'postpaid'
                        ? 'border-[#fbbf24] bg-[#fbbf24]'
                        : 'border-gray-300'
                    }`}>
                      {preferences.paymentMode === 'postpaid' && (
                        <div className='w-2.5 h-2.5 bg-white rounded-full' />
                      )}
                    </div>
                    <div className='flex-1 text-left'>
                      <p className='font-semibold text-gray-900'>Post-pago Completo</p>
                      <p className='text-sm text-gray-600 mt-1'>
                        El cliente paga el 100% del costo después de la cita
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>



            {preferences.paymentMode === 'prepaid' && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-3 mt-3'>
                <div className='flex gap-2'>
                  <span className='text-lg'>✓</span>
                  <div className='text-sm'>
                    <p className='font-medium text-green-900'>Pre-pago Completo Activado</p>
                    <p className='text-green-700 mt-1'>
                      Los clientes pagarán el 100% del costo del servicio al momento de hacer la reserva. No habrá pagos pendientes al finalizar la cita.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {preferences.paymentMode === 'postpaid' && (
              <div className='bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3'>
                <div className='flex gap-2'>
                  <span className='text-lg'>ℹ️</span>
                  <div className='text-sm'>
                    <p className='font-medium text-purple-900'>Post-pago Completo Activado</p>
                    <p className='text-purple-700 mt-1'>
                      Los clientes pagarán el 100% del costo del servicio después de completar la cita. El pago se procesará automáticamente al finalizar.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          className='w-full bg-[#fbbf24] text-white py-3 rounded-lg font-semibold hover:bg-[#f59e0b] transition-colors'
        >
          Guardar Preferencias
        </button>
      </main>

      {showSuccess && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'>
          ✓ Preferencias guardadas exitosamente
        </div>
      )}
    </div>
  )
}