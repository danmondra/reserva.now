'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service' // <-- 1. IMPORTAR SERVICIO

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'client' | 'provider'>('client')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null) // <-- 2. AÑADIR ESTADO DE ERROR

  // --- INICIO DE CORRECCIÓN ---

  // 3. REEMPLAZAR handleLogin con lógica REAL
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Limpiar errores

    try {
      // 4. Llamar al servicio real
      const response = await authService.login({ email, password, userType })

      // 'response' contiene { id, nombre, email, token, ... }
      // El servicio (auth.service.ts) ya guardó todo en localStorage

      alert(`¡Bienvenido, !`)

      // 5. Redirigir
      // OJO: El backend no devuelve 'userType', así que usamos el selector del UI
      if (userType === 'client') {
        router.push('/')
      } else {
        router.push('/profesional-dashboard')
      }
    } catch (err: any) {
      // 6. Manejar errores de la API
      console.error(err)
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.')
    }
  }

  // --- FIN DE CORRECCIÓN ---

  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-[#e79c26] text-[#312311] p-8 shadow-md'>
        <h1 className='text-3xl font-bold text-center'>Iniciar Sesión</h1>
      </div>

      <div className='max-w-md mx-auto p-6'>
        {/* User Type Selector */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6'>
          <p className='text-sm text-gray-700 mb-4 text-center font-medium'>¿Cómo deseas ingresar?</p>
          <div className='grid grid-cols-2 gap-4'>
            <button
              type='button'
              onClick={() => setUserType('client')}
              className={`p-5 rounded-lg border-2 transition-all ${
                userType === 'client'
                  ? 'border-[#e79c26] bg-[#ffedd5]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <svg className="w-10 h-10 mx-auto mb-2 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className='font-semibold text-sm text-gray-900'>Cliente</div>
              <div className='text-xs text-gray-600 mt-1'>Buscar servicios</div>
            </button>
            <button
              type='button'
              onClick={() => setUserType('provider')}
              className={`p-5 rounded-lg border-2 transition-all ${
                userType === 'provider'
                  ? 'border-[#e79c26] bg-[#ffedd5]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <svg className="w-10 h-10 mx-auto mb-2 text-[#e79c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className='font-semibold text-sm text-gray-900'>Proveedor</div>
              <div className='text-xs text-gray-600 mt-1'>Ofrecer servicios</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm font-medium mb-2 text-gray-900'>
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79c26] focus:border-transparent outline-none text-gray-900'
              placeholder='tu@email.com'
              required
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-900 mb-2'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e79c26] focus:border-transparent outline-none text-gray-900'
              placeholder='••••••••'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-[#e79c26] text-white py-3 rounded-lg font-semibold hover:bg-[#ffc87c] transition-colors'
          >
            Iniciar Sesión
          </button>

          <div className='mt-4 text-center'>
            <Link href='/forgot-password' className='text-sm text-[#e79c26] hover:text-[#ffc87c] font-medium'>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className='mt-6 text-center bg-white rounded-lg shadow-sm border border-gray-100 p-5'>
          <p className='text-gray-700 text-sm mb-2'>¿Aún no tienes una cuenta?</p>
          <Link
            href='/signup'
            className='inline-block text-[#e79c26] font-semibold hover:text-[#ffc87c] transition-colors'
          >
            Crear cuenta →
          </Link>
        </div>
      </div>
    </div>
  )
}