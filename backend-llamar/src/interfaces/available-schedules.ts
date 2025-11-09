export const Days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

export type AvailableSchedules = {
  [day: string]: {
    dayname: typeof Days[number],
    availableSchedules: Array<[string, string]>,
    timestamp: number,
    duration_ms: number
  }
}
