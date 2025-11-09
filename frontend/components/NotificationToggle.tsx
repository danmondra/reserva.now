interface NotificationToggleProps {
  label: string
  description: string
  isEnabled: boolean
  onToggle: () => void
}

export default function NotificationToggle({ 
  label, 
  description, 
  isEnabled, 
  onToggle 
}: NotificationToggleProps) {
  return (
    <div className='flex items-center justify-between py-2'>
      <div>
        <p className='font-medium'>{label}</p>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-colors ${
          isEnabled ? 'bg-[#fbbf24]' : 'bg-gray-300'
        }`}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
          isEnabled ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </button>
    </div>
  )
}