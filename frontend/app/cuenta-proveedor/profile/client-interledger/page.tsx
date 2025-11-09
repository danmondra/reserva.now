'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useState } from 'react'

export default function InterledgerPage() {
  const { isLoading } = useAuth('provider')
  const [walletAddress, setWalletAddress] = useState('$ilp.example.com/carlos.garcia')
  const [isConnected] = useState(true)
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
          <h1 className='text-2xl font-bold'>Interledger</h1>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='font-semibold text-lg flex items-center gap-2'>
              <span>💳</span> Estado de Wallet
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isConnected ? '✓ Conectado' : '✗ Desconectado'}
            </span>
          </div>

          <div className='bg-gray-50 rounded-lg p-4 mb-4'>
            <p className='text-sm text-gray-600 mb-2'>Tu Payment Pointer</p>
            <div className='flex items-center gap-2'>
              <input
                type='text'
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent font-mono text-sm'
              />
              <button
                onClick={() => navigator.clipboard.writeText(walletAddress)}
                className='px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors'
              >
                📋
              </button>
            </div>
          </div>

          <button
            onClick={handleSave}
            className='w-full bg-[#fbbf24] text-white py-2 rounded-lg font-semibold hover:bg-[#f59e0b] transition-colors'
          >
            Guardar Cambios
          </button>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <span>💰</span> Resumen de Pagos
          </h2>
          
          <div className='space-y-3'>
            <div className='flex justify-between items-center py-2'>
              <span className='text-gray-600'>Balance Disponible</span>
              <span className='font-semibold text-lg text-green-600'>$12,450.00</span>
            </div>
            <div className='flex justify-between items-center py-2 border-t border-gray-100'>
              <span className='text-gray-600'>Pagos Pendientes</span>
              <span className='font-semibold text-lg text-yellow-600'>$3,200.00</span>
            </div>
            <div className='flex justify-between items-center py-2 border-t border-gray-100'>
              <span className='text-gray-600'>Total del Mes</span>
              <span className='font-semibold text-lg'>$18,750.00</span>
            </div>
          </div>

          <button className='w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors'>
            Retirar Fondos
          </button>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <span>📊</span> Transacciones Recientes
          </h2>
          
          <div className='space-y-3'>
            {[
              { id: 1, cliente: 'María López', monto: 800, fecha: '05 Nov 2025', estado: 'completado' },
              { id: 2, cliente: 'Juan Pérez', monto: 1200, fecha: '04 Nov 2025', estado: 'completado' },
              { id: 3, cliente: 'Ana García', monto: 600, fecha: '03 Nov 2025', estado: 'pendiente' },
              { id: 4, cliente: 'Carlos Ruiz', monto: 950, fecha: '02 Nov 2025', estado: 'completado' }
            ].map((tx, index) => (
              <div key={tx.id} className={`flex items-center justify-between py-3 ${
                index !== 3 ? 'border-b border-gray-100' : ''
              }`}>
                <div>
                  <p className='font-medium'>{tx.cliente}</p>
                  <p className='text-sm text-gray-500'>{tx.fecha}</p>
                </div>
                <div className='text-right'>
                  <p className='font-semibold text-green-600'>${tx.monto.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tx.estado === 'completado' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {tx.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex gap-3'>
            <span className='text-2xl'>ℹ️</span>
            <div>
              <p className='font-medium text-blue-900'>Sobre Interledger</p>
              <p className='text-sm text-blue-700 mt-1'>
                Interledger permite pagos instantáneos y seguros entre diferentes sistemas de pago. 
                Los fondos se transfieren directamente a tu wallet sin intermediarios.
              </p>
            </div>
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'>
          ✓ Configuración guardada exitosamente
        </div>
      )}
    </div>
  )
}