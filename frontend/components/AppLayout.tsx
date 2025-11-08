'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export default function AppLayout({ 
  children, 
  title = 'Citas',
  showBackButton = false 
}: AppLayoutProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Volver"
          >
            <svg 
              className="w-6 h-6 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
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
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
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
            href="/perfil"
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
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
    </div>
  );
}
