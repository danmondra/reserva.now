export default function FinancialSummary() {
  const currentMonth = new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString('es-MX', { month: 'long' })

  const financialSummary = {
    currentMonth: {
      total: 45800,
      completed: 12,
      pending: 3,
      growth: 15.3
    },
    lastMonth: {
      total: 39700,
      completed: 10
    }
  }

  return (
    <div className='grid grid-cols-2 gap-3'>
      <div className='bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg shadow-md flex flex-col'>
        <p className='text-xs opacity-90 h-8 flex items-center'>Recaudado</p>
        <p className='text-2xl font-bold my-1'>${financialSummary.currentMonth.total.toLocaleString('es-MX')}</p>
        <p className='text-xs opacity-75 h-8 flex items-center'>
          ↑ {financialSummary.currentMonth.growth}% vs mes anterior
        </p>
      </div>

      <div className='bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-md flex flex-col'>
        <p className='text-xs opacity-90 h-8 flex items-center'>Servicios</p>
        <p className='text-2xl font-bold my-1'>{financialSummary.currentMonth.completed}</p>
        <p className='text-xs opacity-75 h-8 flex items-center'>
          {financialSummary.currentMonth.pending} pendientes de confirmar
        </p>
      </div>
    </div>
  )
}