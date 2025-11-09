export interface Professional {
  id: number
  nombre: string
  especialidad: string
  calificacion: number
  resenas: number
  precio: string
  disponible: boolean
  imagen: string
  direccion: string
  distancia: string
  descripcion?: string
  experiencia?: string
  modalidad?: string[]
  horario?: string
  telefono?: string
  servicios?: string[]
}

export interface Category {
  id: string
  nombre: string
  icon?: string
  profesionales: Professional[]
}

export const categories: Category[] = [
  {
    id: 'plomeria',
    nombre: 'Plomería',
    profesionales: [
      {
        id: 1,
        nombre: 'Plomería Express',
        especialidad: 'Plomero',
        calificacion: 4.7,
        resenas: 142,
        precio: '$300 - $1,500',
        disponible: true,
        imagen: '/images/plumber.png',
        direccion: 'Narvarte, CDMX',
        distancia: '1.4 km',
        descripcion: 'Servicio de plomería profesional. Reparaciones, instalaciones y mantenimiento.',
        experiencia: '12 años',
        modalidad: ['A domicilio', 'Urgencias 24/7'],
        horario: 'Lun-Dom: 7:00-22:00',
        telefono: '55-1234-5678',
        servicios: ['Fugas de agua', 'Destapado de drenaje', 'Instalación de tuberías', 'Calentadores', 'Tinacos']
      }
    ]
  },
  {
    id: 'electricidad',
    nombre: 'Electricidad',
    profesionales: [
      {
        id: 2,
        nombre: 'Electricidad Total',
        especialidad: 'Electricista',
        calificacion: 4.8,
        resenas: 167,
        precio: '$400 - $2,000',
        disponible: true,
        imagen: '/images/electrician.png',
        direccion: 'Benito Juárez, CDMX',
        distancia: '0.9 km',
        descripcion: 'Instalaciones eléctricas residenciales y comerciales. Certificado por CFE.',
        experiencia: '15 años',
        modalidad: ['A domicilio', 'Urgencias'],
        horario: 'Lun-Sáb: 8:00-20:00',
        telefono: '55-2345-6789',
        servicios: ['Instalación eléctrica', 'Reparación de cortos', 'Tableros', 'Iluminación', 'Contactos']
      }
    ]
  },
  {
    id: 'mecanica',
    nombre: 'Mecánica',
    profesionales: [
      {
        id: 3,
        nombre: 'Taller Mecánico Express',
        especialidad: 'Mecánico Automotriz',
        calificacion: 4.6,
        resenas: 198,
        precio: '$500 - $3,000',
        disponible: true,
        imagen: '/images/mechanic.png',
        direccion: 'Iztacalco, CDMX',
        distancia: '2.5 km',
        descripcion: 'Servicio mecánico completo. Diagnóstico computarizado y reparaciones.',
        experiencia: '20 años',
        modalidad: ['En taller', 'A domicilio'],
        horario: 'Lun-Vie: 8:00-19:00, Sáb: 8:00-15:00',
        telefono: '55-3456-7890',
        servicios: ['Afinación', 'Frenos', 'Suspensión', 'Transmisión', 'Diagnóstico']
      }
    ]
  },
  {
    id: 'carpinteria',
    nombre: 'Carpintería',
    profesionales: [
      {
        id: 4,
        nombre: 'Carpintería Fina',
        especialidad: 'Carpintero',
        calificacion: 4.9,
        resenas: 156,
        precio: '$800 - $5,000',
        disponible: true,
        imagen: '/images/carpenter.png',
        direccion: 'San Ángel, CDMX',
        distancia: '2.2 km',
        descripcion: 'Muebles a medida y restauración. Trabajos en madera de alta calidad.',
        experiencia: '22 años',
        modalidad: ['En taller', 'A domicilio'],
        horario: 'Lun-Vie: 9:00-18:00, Sáb: 9:00-14:00',
        telefono: '55-7890-1234',
        servicios: ['Muebles a medida', 'Restauración', 'Closets', 'Cocinas integrales', 'Puertas de madera']
      }
    ]
  },
  {
    id: 'joyeria',
    nombre: 'Joyería',
    profesionales: [
      {
        id: 5,
        nombre: 'Joyería Artesanal',
        especialidad: 'Joyero',
        calificacion: 4.9,
        resenas: 123,
        precio: '$600 - $8,000',
        disponible: true,
        imagen: '/images/jeweler.png',
        direccion: 'Polanco, CDMX',
        distancia: '1.2 km',
        descripcion: 'Diseño y fabricación de joyería personalizada. Reparaciones.',
        experiencia: '18 años',
        modalidad: ['En taller'],
        horario: 'Lun-Vie: 10:00-19:00, Sáb: 10:00-16:00',
        telefono: '55-0123-4567',
        servicios: ['Diseño personalizado', 'Reparación', 'Grabado', 'Restauración', 'Anillos de compromiso']
      }
    ]
  },
  {
    id: 'sastreria',
    nombre: 'Sastrería',
    profesionales: [
      {
        id: 6,
        nombre: 'Sastrería Elegante',
        especialidad: 'Sastre',
        calificacion: 4.7,
        resenas: 145,
        precio: '$500 - $4,000',
        disponible: true,
        imagen: '/images/tailor.png',
        direccion: 'Condesa, CDMX',
        distancia: '1.6 km',
        descripcion: 'Confección y ajustes de ropa. Trajes a la medida.',
        experiencia: '25 años',
        modalidad: ['En taller'],
        horario: 'Lun-Vie: 10:00-19:00, Sáb: 10:00-15:00',
        telefono: '55-1234-5670',
        servicios: ['Trajes a medida', 'Ajustes', 'Reparaciones', 'Vestidos', 'Uniformes']
      }
    ]
  },
  {
    id: 'odontologia',
    nombre: 'Odontología',
    profesionales: [
      {
        id: 7,
        nombre: 'Dr. Carlos García',
        especialidad: 'Dentista',
        calificacion: 4.9,
        resenas: 234,
        precio: '$500 - $2,500',
        disponible: true,
        imagen: '/images/dentist.png',
        direccion: 'Polanco, CDMX',
        distancia: '1.0 km',
        descripcion: 'Odontología general y estética. Tecnología de vanguardia.',
        experiencia: '15 años',
        modalidad: ['En consultorio'],
        horario: 'Lun-Vie: 9:00-19:00, Sáb: 9:00-14:00',
        telefono: '55-3456-7012',
        servicios: ['Limpieza dental', 'Blanqueamiento', 'Ortodoncia', 'Implantes', 'Endodoncia']
      }
    ]
  },
  {
    id: 'legal',
    nombre: 'Legal',
    profesionales: [
      {
        id: 8,
        nombre: 'Lic. Ana Martínez',
        especialidad: 'Abogada',
        calificacion: 4.8,
        resenas: 167,
        precio: '$1,000 - $5,000',
        disponible: true,
        imagen: '/images/lawyer.png',
        direccion: 'Reforma, CDMX',
        distancia: '2.1 km',
        descripcion: 'Derecho civil, familiar y mercantil. Asesoría legal integral.',
        experiencia: '12 años',
        modalidad: ['En oficina', 'Virtual'],
        horario: 'Lun-Vie: 9:00-18:00',
        telefono: '55-4567-8123',
        servicios: ['Derecho civil', 'Derecho familiar', 'Contratos', 'Divorcios', 'Testamentos']
      }
    ]
  },
  {
    id: 'psicologia',
    nombre: 'Psicología',
    profesionales: [
      {
        id: 9,
        nombre: 'Psic. Patricia Gómez',
        especialidad: 'Psicóloga',
        calificacion: 4.9,
        resenas: 201,
        precio: '$600 - $1,500',
        disponible: true,
        imagen: '/images/psychologist.png',
        direccion: 'Roma Norte, CDMX',
        distancia: '1.3 km',
        descripcion: 'Terapia individual, de pareja y familiar. Enfoque cognitivo-conductual.',
        experiencia: '11 años',
        modalidad: ['En consultorio', 'Virtual'],
        horario: 'Lun-Vie: 10:00-20:00, Sáb: 10:00-15:00',
        telefono: '55-8901-2567',
        servicios: ['Terapia individual', 'Terapia de pareja', 'Terapia familiar', 'Ansiedad', 'Depresión']
      }
    ]
  }
]
