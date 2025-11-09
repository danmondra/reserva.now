'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'client' | 'provider'>('client')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate signup
    if (fullName && email && password) {
      // Store user data in localStorage for demo purposes
      localStorage.setItem('userType', userType)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', fullName)
      
      alert(`Cuenta creada exitosamente como ${userType === 'client' ? 'Cliente' : 'Proveedor de Servicios'}`)
      
      // Redirect based on user type
      if (userType === 'client') {
        router.push('/')
      } else {
        router.push('/profesional-dashboard')
      }
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-[#fbbf24] text-white p-6 shadow-md'>
        <h1 className='text-2xl font-bold text-center'>Crear Cuenta</h1>
      </div>

      <div className='max-w-md mx-auto p-6'>
        {/* User Type Selector */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
          <p className='text-sm text-gray-600 mb-3 text-center'>¿Cómo deseas registrarte?</p>
          <div className='grid grid-cols-2 gap-3'>
            <button
              type='button'
              onClick={() => setUserType('client')}
              className={`p-4 rounded-lg border-2 transition-all ${
                userType === 'client'
                  ? 'border-[#fbbf24] bg-[#fbbf24]/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className='text-3xl mb-2'>👤</div>
              <div className='font-semibold text-sm'>Cliente</div>
              <div className='text-xs text-gray-500 mt-1'>Buscar servicios</div>
            </button>
            <button
              type='button'
              onClick={() => setUserType('provider')}
              className={`p-4 rounded-lg border-2 transition-all ${
                userType === 'provider'
                  ? 'border-[#fbbf24] bg-[#fbbf24]/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className='text-3xl mb-2'>💼</div>
              <div className='font-semibold text-sm'>Proveedor</div>
              <div className='text-xs text-gray-500 mt-1'>Ofrecer servicios</div>
            </button>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='mb-4'>
            <label htmlFor='fullName' className='block text-sm font-medium text-gray-700 mb-2'>
              Nombre completo
            </label>
            <input
              type='text'
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent outline-none'
              placeholder='Juan Pérez'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent outline-none'
              placeholder='tu@email.com'
              required
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent outline-none'
              placeholder='••••••••'
              required
              minLength={6}
            />
            <p className='text-xs text-gray-500 mt-1'>Mínimo 6 caracteres</p>
          </div>

          {userType === 'provider' && (
            <div className='mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-sm text-blue-800'>
                ℹ️ Como proveedor, podrás crear tu perfil profesional y ofrecer tus servicios después de registrarte.
              </p>
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-[#fbbf24] text-white py-3 rounded-lg font-semibold hover:bg-[#f59e0b] transition-colors'
          >
            Crear Cuenta
          </button>

          <p className='text-xs text-gray-500 text-center mt-4'>
            Al crear una cuenta, aceptas nuestros{' '}
            <Link href='/terms' className='text-blue-600 hover:text-blue-700'>
              Términos y Condiciones
            </Link>
          </p>
        </form>

        {/* Login Link */}
        <div className='mt-6 text-center bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <p className='text-gray-600 text-sm mb-2'>¿Ya tienes una cuenta?</p>
          <Link
            href='/login'
            className='inline-block text-[#fbbf24] font-semibold hover:text-[#f59e0b] transition-colors'
          >
            Iniciar sesión →
          </Link>
        </div>
      </div>
    </div>
  )
}