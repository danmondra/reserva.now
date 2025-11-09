'use client'

import Link from 'next/link'
import { useState } from 'react'
import BottomNav from '@/components/BottomNav'

export default function ClientHelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    asunto: '',
    mensaje: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const faqs = [
    {
      id: 1,
      pregunta: '¿Cómo reservo una cita?',
      respuesta: 'Busca el profesional que necesitas, selecciona un horario disponible y confirma tu reserva. Recibirás una confirmación por email y notificación.'
    },
    {
      id: 2,
      pregunta: '¿Puedo cancelar una cita?',
      respuesta: 'Sí, puedes cancelar hasta 24 horas antes de la cita sin penalización. Cancelaciones de último momento pueden tener un cargo.'
    },
    {
      id: 3,
      pregunta: '¿Cómo funcionan los pagos?',
      respuesta: 'Los pagos se procesan automáticamente a través de Interledger después de cada cita. Puedes agregar fondos a tu wallet en cualquier momento.'
    },
    {
      id: 4,
      pregunta: '¿Qué pasa si llego tarde?',
      respuesta: 'Te recomendamos llegar 5-10 minutos antes. Si llegas tarde, el profesional puede reducir el tiempo de servicio o reprogramar la cita.'
    },
    {
      id: 5,
      pregunta: '¿Cómo califico un servicio?',
      respuesta: 'Después de cada cita, recibirás una notificación para calificar el servicio. Tu opinión ayuda a otros usuarios y mejora la calidad de la plataforma.'
    },
    {
      id: 6,
      pregunta: '¿Puedo guardar profesionales favoritos?',
      respuesta: 'Sí, puedes marcar como favoritos a los profesionales que más te gusten para encontrarlos fácilmente en el futuro.'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setContactForm({ asunto: '', mensaje: '' })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className='min-h-screen pb-20 bg-gray-50'>
      <header className='bg-[#fbbf24] text-white p-6 shadow-md sticky top-0 z-10'>
        <div className='flex items-center gap-3'>
          <Link href='/cuenta-cliente' className='text-2xl'>
            ←
          </Link>
          <h1 className='text-2xl font-bold'>Ayuda y Soporte</h1>
        </div>
      </header>

      <main className='p-4 space-y-4'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <span>❓</span> Preguntas Frecuentes
          </h2>
          
          <div className='space-y-2'>
            {faqs.map((faq) => (
              <div key={faq.id} className='border border-gray-200 rounded-lg overflow-hidden'>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className='w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left'
                >
                  <span className='font-medium'>{faq.pregunta}</span>
                  <span className='text-xl'>{expandedFaq === faq.id ? '−' : '+'}</span>
                </button>
                {expandedFaq === faq.id && (
                  <div className='px-4 pb-4 text-gray-600 text-sm'>
                    {faq.respuesta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <span>📞</span> Contacto Directo
          </h2>
          
          <div className='space-y-3 mb-4'>
            <a href='tel:5555555555' className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
              <span className='text-2xl'>📱</span>
              <div>
                <p className='font-medium'>Teléfono</p>
                <p className='text-sm text-gray-600'>55-5555-5555</p>
              </div>
            </a>
            
            <a href='mailto:soporte@reserva.com' className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
              <span className='text-2xl'>✉️</span>
              <div>
                <p className='font-medium'>Email</p>
                <p className='text-sm text-gray-600'>soporte@reserva.com</p>
              </div>
            </a>
            
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
              <span className='text-2xl'>🕐</span>
              <div>
                <p className='font-medium'>Horario de Atención</p>
                <p className='text-sm text-gray-600'>Lun-Vie: 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
          <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <span>💬</span> Enviar Mensaje
          </h2>
          
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Asunto
              </label>
              <input
                type='text'
                value={contactForm.asunto}
                onChange={(e) => setContactForm({...contactForm, asunto: e.target.value})}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                placeholder='¿En qué podemos ayudarte?'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Mensaje
              </label>
              <textarea
                value={contactForm.mensaje}
                onChange={(e) => setContactForm({...contactForm, mensaje: e.target.value})}
                required
                rows={5}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent'
                placeholder='Describe tu consulta o problema...'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-[#fbbf24] text-white py-3 rounded-lg font-semibold hover:bg-[#f59e0b] transition-colors'
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='flex gap-3'>
            <span className='text-2xl'>💡</span>
            <div>
              <p className='font-medium text-green-900'>Consejo</p>
              <p className='text-sm text-green-700 mt-1'>
                Antes de contactarnos, revisa las preguntas frecuentes. La mayoría de las dudas se resuelven allí.
              </p>
            </div>
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'>
          ✓ Mensaje enviado exitosamente
        </div>
      )}

      <BottomNav />
    </div>
  )
}