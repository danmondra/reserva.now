import type {AvailableSchedules} from "../interfaces/available-schedules.js";

export function formatSchedules(obj: AvailableSchedules) {
  let salida = "";

  for (const [fecha, datos] of Object.entries(obj)) {
    const diaNombre = datos.dayname.charAt(0).toUpperCase() + datos.dayname.slice(1);
    salida += `${diaNombre} ${fecha}:\n`;

    for (const [inicio, fin] of datos.availableSchedules) {
      salida += `  ${inicio} - ${fin}\n`;
    }

    salida += "\n";
  }

  return salida.trim();
}
