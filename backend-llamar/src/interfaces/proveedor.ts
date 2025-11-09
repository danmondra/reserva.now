export type ServiceProvider = {
  id: string
  nombre_servicio: string,
  imagen: string,
  experiencia: string,
  servicio: string,
  descripcion: string,
  categoria: string,
  ubicación: string,
  rango_precio_mxn: [number, number],
  telefono: `+${number}`,
  modalidad: "En establecimiento" | "A domicilio",
  servicios: Array<string>,
  todo_score: number // 1-5
}
