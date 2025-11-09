import type { Professional } from './professionals'

export const getProfessionalDetails = (professional: Professional): Professional => {
  const defaults = {
    descripcion: `Profesional altamente calificado en ${professional.especialidad.toLowerCase()} con amplia experiencia en el sector. Comprometido con la excelencia y la satisfacción del cliente.`,
    experiencia: '8 años',
    modalidad: ['En establecimiento'],
    horario: 'Lun-Vie: 9:00-18:00, Sáb: 9:00-14:00',
    telefono: '55-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000),
    servicios: ['Consulta general', 'Atención personalizada', 'Seguimiento']
  }

  return {
    ...professional,
    descripcion: professional.descripcion || defaults.descripcion,
    experiencia: professional.experiencia || defaults.experiencia,
    modalidad: professional.modalidad || defaults.modalidad,
    horario: professional.horario || defaults.horario,
    telefono: professional.telefono || defaults.telefono,
    servicios: professional.servicios || defaults.servicios
  }
}