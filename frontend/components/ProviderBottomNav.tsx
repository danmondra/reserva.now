'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProviderBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/profesional-dashboard', icon: '🏠', label: 'Inicio' },
    { href: '/provider/appointments', icon: '📅', label: 'Citas' },
    { href: '/provider/resumen', icon: '💰', label: 'Resumen' },
    { href: '/provider/profile', icon: '👤', label: 'Perfil' },
  ]

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50'>
      <div className='flex justify-around items-center h-16'>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-[#fbbf24]'
                  : 'text-gray-600 hover:text-[#fbbf24]'
              }`}
            >
              <span className='text-2xl mb-1'>{item.icon}</span>
              <span className='text-xs font-medium'>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}