import NotificationToggle from './NotificationToggle'

interface NotificationItem {
  key: string
  label: string
  description: string
}

interface NotificationSectionProps {
  title: string
  icon: string
  items: NotificationItem[]
  settings: Record<string, boolean>
  onToggle: (key: string) => void
}

export default function NotificationSection({
  title,
  icon,
  items,
  settings,
  onToggle
}: NotificationSectionProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
      <h2 className='font-semibold text-lg mb-4 flex items-center gap-2'>
        <span>{icon}</span> {title}
      </h2>
      
      <div className='space-y-3'>
        {items.map((item, index) => (
          <div key={item.key} className={index !== 0 ? 'border-t border-gray-100' : ''}>
            <NotificationToggle
              label={item.label}
              description={item.description}
              isEnabled={settings[item.key]}
              onToggle={() => onToggle(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}