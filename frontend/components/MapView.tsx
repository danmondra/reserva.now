'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { LatLngExpression } from 'leaflet'

const MapContainer = dynamic(
  async () => (await import('react-leaflet')).MapContainer,
  { ssr: false }
)
const TileLayer = dynamic(
  async () => (await import('react-leaflet')).TileLayer,
  { ssr: false }
)
const Marker = dynamic(
  async () => (await import('react-leaflet')).Marker,
  { ssr: false }
)
const Popup = dynamic(
  async () => (await import('react-leaflet')).Popup,
  { ssr: false }
)

interface Servicio {
  id: number
  nombre: string
  tipo: string
  lat: number
  lng: number
  disponible: boolean
  distancia: string
}

const servicios: Servicio[] = [
  { id: 1, nombre: 'Clínica Dental Sonrisa', tipo: 'Dentista', lat: 19.4326, lng: -99.1332, disponible: true, distancia: '0.5 km' },
  { id: 2, nombre: 'Salón de Belleza Glamour', tipo: 'Estética', lat: 19.4280, lng: -99.1276, disponible: true, distancia: '0.8 km' },
  { id: 3, nombre: 'Plomería Rápida', tipo: 'Plomero', lat: 19.4370, lng: -99.1410, disponible: false, distancia: '1.2 km' },
  { id: 4, nombre: 'Veterinaria Patitas', tipo: 'Veterinario', lat: 19.4250, lng: -99.1380, disponible: true, distancia: '1.5 km' },
  { id: 5, nombre: 'Gym Fitness Pro', tipo: 'Gimnasio', lat: 19.4340, lng: -99.1300, disponible: true, distancia: '0.7 km' },
  { id: 6, nombre: 'Taller Mecánico Express', tipo: 'Mecánico', lat: 19.4290, lng: -99.1350, disponible: true, distancia: '0.9 km' }
]

export default function MapView () {
  const [isClient, setIsClient] = useState(false)
  const [customIcon, setCustomIcon] = useState<any>(null)
  const [userIcon, setUserIcon] = useState<any>(null)

  const mexicoCityCenter: LatLngExpression = [19.4326, -99.1332]

  useEffect(() => {
    setIsClient(true)
    
    const loadIcons = async () => {
      const L = await import('leaflet')
      
      const icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      const userMarker = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      setCustomIcon(icon)
      setUserIcon(userMarker)
    }

    loadIcons()
  }, [])

  if (!isClient || !customIcon || !userIcon) {
    return (
      <div className='bg-gray-200 rounded-lg h-[500px] flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-4xl mb-2'>🗺️</p>
          <p className='text-gray-600'>Cargando mapa...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='rounded-lg overflow-hidden shadow-md h-[500px]'>
      <MapContainer
        center={mexicoCityCenter}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        
        <Marker position={mexicoCityCenter} icon={userIcon}>
          <Popup>
            <div className='text-center'>
              <p className='font-bold text-blue-600'>Tu ubicación</p>
              <p className='text-sm text-gray-600'>Ciudad de México</p>
            </div>
          </Popup>
        </Marker>

        {servicios.map((servicio) => (
          <Marker
            key={servicio.id}
            position={[servicio.lat, servicio.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className='min-w-[200px]'>
                <h3 className='font-bold text-gray-900'>{servicio.nombre}</h3>
                <p className='text-sm text-gray-600 mt-1'>{servicio.tipo}</p>
                <p className='text-xs text-gray-500 mt-1'>{servicio.distancia}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                  servicio.disponible
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {servicio.disponible ? 'Disponible' : 'Ocupado'}
                </span>
                <button className='w-full mt-2 bg-[#fbbf24] text-white py-1.5 rounded text-sm font-medium hover:bg-[#f59e0b]'>
                  Ver Detalles
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}