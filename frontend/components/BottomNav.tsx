'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav () {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            isActive('/') 
              ? 'text-[#e79c26] bg-[#ffedd5]' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg 
            className="w-6 h-6" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-xs font-medium">Inicio</span>
        </Link>
        
        <Link
          href="/buscar"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            isActive('/buscar') 
              ? 'text-[#e79c26] bg-[#ffedd5]' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg 
            className="w-6 h-6" 
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <span className="text-xs font-medium">Buscar</span>
        </Link>
        
        <Link
          href="/citas"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            isActive('/citas') 
              ? 'text-[#e79c26] bg-[#ffedd5]' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg 
            className="w-6 h-6" 
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-xs font-medium">Citas</span>
        </Link>
        
        <Link
          href="/cuenta-cliente"
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
            isActive('/cuenta-cliente') 
              ? 'text-[#e79c26] bg-[#ffedd5]' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg 
            className="w-6 h-6" 
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
          <span className="text-xs font-medium">Perfil</span>
        </Link>
      </div>
    </nav>
  )
}