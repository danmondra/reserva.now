// 'use client'

// import { useRouter } from 'next/navigation'
// import { use, useState } from 'react'
// import BottomNav from '@/components/BottomNav'
// import { categories } from '@/data/professionals'
// import { weekAvailability } from '@/data/availability'

// export default function ReservarPage ({ params }: { params: Promise<{ professionalId: string }> }) {
//   const router = useRouter()
//   const resolvedParams = use(params)
//   const professionalId = parseInt(resolvedParams.professionalId)

//   const [selectedDate, setSelectedDate] = useState<string | null>(null)
//   const [selectedTime, setSelectedTime] = useState<string | null>(null)
//   const [showAllHours, setShowAllHours] = useState(false)

//   // Find professional
//   const professional = (() => {
//     for (const category of categories) {
//       const found = category.profesionales.find(p => p.id === professionalId)
//       if (found) return found
//     }
//     return null
//   })()

//   if (!professional) {
//     return (
//       <div className='min-h-screen pb-20 bg-gray-50'>
//         <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
//           <h1 className='text-2xl font-bold'>Profesional no encontrado</h1>
//         </header>
//         <BottomNav />
//       </div>
//     )
//   }

//   const selectedDayData = selectedDate ? weekAvailability.find(day => day.date === selectedDate) : null

//   const handleConfirmBooking = () => {
//     if (selectedDate && selectedTime) {
//       alert(`Cita confirmada con ${professional.nombre} el ${selectedDate} a las ${selectedTime}`)
//       router.push('/citas')
//     }
//   }

//   return (
//     <div className='min-h-screen pb-20 bg-gray-50'>
//       <header className='bg-[#fbbf24] text-white p-6 shadow-md'>
//         <button
//           onClick={() => router.back()}
//           className='inline-block mb-3 text-white/90 hover:text-white'
//         >
//           ← Volver
//         </button>
//         <div className='flex items-center gap-3'>
//           <span className='text-3xl'>{professional.imagen}</span>
//           <div>
//             <h1 className='text-2xl font-bold'>Reservar Cita</h1>
//             <p className='text-sm text-white/90'>{professional.nombre}</p>
//           </div>
//         </div>
//       </header>

//       <main className='p-4 space-y-4'>
//         {/* Calendar Table */}
//         <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
//           <div className='p-4 border-b border-gray-100'>
//             <h2 className='font-semibold text-gray-900 flex items-center gap-2'>
//               <span>📅</span>
//               <span>Selecciona fecha y hora</span>
//             </h2>
//           </div>
          
//           <div className='overflow-x-auto'>
//             <div className='inline-block min-w-full'>
//               {/* Header with days - sticky */}
//               <div className='flex border-b border-gray-200 bg-gray-50 sticky top-0 z-10'>
//                 {weekAvailability.map((day, index) => {
//                   const date = new Date(day.date)
//                   const dayLabel = index === 0 ? 'Hoy' : index === 1 ? 'Mañana' : day.dayName
//                   const dateLabel = date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
                  
//                   return (
//                     <div key={day.date} className='flex-1 min-w-[80px] p-3 border-r border-gray-200 last:border-r-0'>
//                       <div className='text-center'>
//                         <p className='text-xs font-semibold text-gray-900'>{dayLabel}</p>
//                         <p className='text-xs text-gray-500 mt-0.5'>{dateLabel}</p>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>

//               {/* Time slots rows - scrollable */}
//               <div className={`${showAllHours ? 'max-h-[400px] overflow-y-auto' : ''}`}>
//                 {weekAvailability[0].slots.slice(0, showAllHours ? undefined : 5).map((_, slotIndex) => (
//                   <div key={slotIndex} className='flex border-b border-gray-100 last:border-b-0'>
//                     {weekAvailability.map((day) => {
//                       const slot = day.slots[slotIndex]
//                       const isSelected = selectedDate === day.date && selectedTime === slot.time
                      
//                       return (
//                         <button
//                           key={`${day.date}-${slot.time}`}
//                           onClick={() => {
//                             if (slot.available) {
//                               setSelectedDate(day.date)
//                               setSelectedTime(slot.time)
//                             }
//                           }}
//                           disabled={!slot.available}
//                           className={`flex-1 min-w-[80px] p-3 border-r border-gray-100 last:border-r-0 transition-all ${
//                             isSelected
//                               ? 'bg-[#fbbf24] text-white font-semibold'
//                               : slot.available
//                               ? 'hover:bg-[#fbbf24]/10 text-gray-900'
//                               : 'opacity-40 cursor-not-allowed'
//                           }`}
//                         >
//                           <span className={!slot.available ? 'line-through' : ''}>
//                             {slot.time}
//                           </span>
//                         </button>
//                       )
//                     })}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Show more button */}
//           {!showAllHours && weekAvailability[0].slots.length > 5 && (
//             <div className='p-3 border-t border-gray-100 text-center'>
//               <button
//                 onClick={() => setShowAllHours(true)}
//                 className='text-[#fbbf24] hover:text-[#f59e0b] text-sm font-medium inline-flex items-center gap-1'
//               >
//                 <span>Más horas</span>
//                 <span>↓</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Booking Summary */}
//         <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
//           <h2 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
//             <span>📋</span>
//             <span>Resumen de la cita</span>
//           </h2>
//           <div className='space-y-2 text-sm'>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Profesional:</span>
//               <span className='font-medium text-gray-900'>{professional.nombre}</span>
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Especialidad:</span>
//               <span className='font-medium text-gray-900'>{professional.especialidad}</span>
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Fecha:</span>
//               {selectedDate ? (
//                 <span className='font-medium text-gray-900'>{selectedDayData?.dayName}, {selectedDate}</span>
//               ) : (
//                 <span className='text-gray-400 italic'>Por favor selecciona una fecha</span>
//               )}
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Hora:</span>
//               {selectedTime ? (
//                 <span className='font-medium text-gray-900'>{selectedTime}</span>
//               ) : (
//                 <span className='text-gray-400 italic'>Por favor selecciona una hora</span>
//               )}
//             </div>
//             <div className='flex justify-between pt-2 border-t border-gray-200'>
//               <span className='text-gray-600'>Precio:</span>
//               <span className='font-bold text-[#fbbf24]'>{professional.precio}</span>
//             </div>
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirmBooking}
//           disabled={!selectedDate || !selectedTime}
//           className={`w-full py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-lg ${
//             selectedDate && selectedTime
//               ? 'bg-[#fbbf24] text-white hover:bg-[#f59e0b] cursor-pointer'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           <span>✅</span>
//           <span>Confirmar Cita</span>
//         </button>
//       </main>

//       <BottomNav />
//     </div>
//   )
// }

// app/reservar/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default function ReservarPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [citaData, setCitaData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  const [formData, setFormData] = useState({
    profesionalId: '',
    servicioId: '',
    fecha: '',
    horario: '',
    monto: ''
  });

  // Tu código del flujo de reserva aquí...
  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`${API_URL}/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la cita');
      }

      const result = await response.json();
      console.log('✓ Resultado del backend:', result);

      setCitaData(result.cita);
      const payment = result.pago;

      if (payment.success && payment.requiresInteraction) {
        setPaymentData({
          citaId: result.cita.id,
          authorizationUrl: payment.authorizationUrl,
          quoteId: payment.quoteId,
          continueUri: payment.continueUri,
          continueToken: payment.continueToken,
          debitAmount: payment.debitAmount.formatted,
          receiveAmount: payment.receiveAmount.formatted
        });

        setStep(2);
        setTimeout(() => openAuthorizationPopup(payment.authorizationUrl), 500);
      } else if (payment.success && payment.status === 'COMPLETED') {
        setStep(3);
      } else {
        throw new Error(payment.error || 'Error en el pago');
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openAuthorizationPopup = (authUrl: string) => {
    const authWindow = window.open(authUrl, 'authorization', 'width=600,height=700');
    if (!authWindow) {
      setError('Habilita los popups para continuar');
      return;
    }

    const checkClosed = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkClosed);
        setTimeout(() => completePayment(), 2000);
      }
    }, 1000);
  };

  const completePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_URL}/citas/${paymentData.citaId}/complete-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            quoteId: paymentData.quoteId,
            continueUri: paymentData.continueUri,
            continueToken: paymentData.continueToken
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al completar');
      }

      const result = await response.json();
      if (result.success) {
        setStep(3);
      }
    } catch (err: any) {
      setError(err.message);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setCitaData(null);
    setPaymentData(null);
    setError('');
    setFormData({
      profesionalId: '',
      servicioId: '',
      fecha: '',
      horario: '',
      monto: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">ReserveNow</h1>
          <p className="text-gray-600">Reserva y paga con Open Payments</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* STEP 1: FORMULARIO */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Nueva Reserva</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Profesional ID"
                value={formData.profesionalId}
                onChange={(e) => setFormData({...formData, profesionalId: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Servicio ID"
                value={formData.servicioId}
                onChange={(e) => setFormData({...formData, servicioId: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="time"
                value={formData.horario}
                onChange={(e) => setFormData({...formData, horario: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Monto (USD)"
                value={formData.monto}
                onChange={(e) => setFormData({...formData, monto: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleCreateReservation}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-300"
              >
                {loading ? 'Procesando...' : 'Reservar y Pagar'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: AUTORIZACIÓN */}
        {step === 2 && paymentData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Autorizando Pago</h2>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="mb-4">Monto a pagar: {paymentData.debitAmount}</p>
              <p className="mb-6">Profesional recibirá: {paymentData.receiveAmount}</p>
              <ol className="text-left max-w-md mx-auto space-y-2 mb-6">
                <li>1. Haz clic en "Accept" en la ventana</li>
                <li>2. Verás "Accepted"</li>
                <li>3. Cierra la ventana</li>
                <li>4. Se completará automáticamente</li>
              </ol>
              <button
                onClick={() => openAuthorizationPopup(paymentData.authorizationUrl)}
                className="mb-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 w-full"
              >
                Reabrir Autorización
              </button>
              <button
                onClick={completePayment}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-300"
              >
                {loading ? 'Completando...' : 'Ya Autoricé - Completar'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COMPLETADO */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">¡Reserva Confirmada!</h2>
            <p className="text-gray-600 mb-6">Tu pago se procesó exitosamente</p>
            {citaData && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p>Cita ID: {citaData.id}</p>
                <p>Fecha: {new Date(citaData.fecha).toLocaleDateString()}</p>
                <p>Horario: {citaData.horario}</p>
              </div>
            )}
            <button
              onClick={handleReset}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 mb-3"
            >
              Hacer Otra Reserva
            </button>
            <button
              onClick={() => router.push('/citas')}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300"
            >
              Ver Mis Citas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}