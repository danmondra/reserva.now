import type {VapiClient} from "@vapi-ai/server-sdk";
import {formatSchedules} from "./utils/format-schedules.js";
import type {ServiceClient} from "./interfaces/service-client.js";
import type {ServiceProvider} from "./interfaces/proveedor.js";
import type {AvailableSchedules} from "./interfaces/available-schedules.js";

type Assistant = Promise<ReturnType<VapiClient['assistants']['create']>>

export async function createVapiAssistant (
  vapiClient: VapiClient,
  serviceClient: ServiceClient,
  serviceProvider: ServiceProvider,
  availableDates: AvailableSchedules
): Assistant {
  const assistant = await vapiClient.assistants.create({
    name: 'Recepcionista Creadora de Citas',
    transcriber: { language: 'es', provider: 'deepgram' },
    model: {
      provider: 'openai',
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:  `
          [Identidad]
          Tu eres Ernesto, una asistente que ayuda a los clientes a reservar citas para el servicio:
          ${serviceProvider.nombre_servicio}.

          [Estilo]
          - Sé amigable
          - Mantén un tono profesional y cortés
          - Se conciso, dado que estás operando una conversación por voz (sé breve).

          [Respuesta]
          - Presenta fechas en un formato humano (mañana, el siguiente martes, 25 de mayo).

          [Tarea]
          1. Presentate con el usuario e indica que vas a ayudar a agendar el servicio.
          2. Pregunta sobre fecha y hora preferida.
          3. En caso que el usuario pregunte sobre la descripción del servicio ofrécelos brevemente.
          4. Afirma o cancela si el usuario ofrece el tipo de servicio esperado.
          5. Revisa si el horario indicado por el cliente está disponible según el día.
          - Si el horario no está disponible, lista los horarios disponibles para ese mismo día.
          - Cuando listes los horarios, dilo humanamente (2 de la tarde). Toma en cuenta que es un formato de 24 horas.

          [Detalles de servicio]
          ${serviceProvider.descripcion}

          [Servicios Ofrecidos por el proveedor]
          ${serviceProvider.servicios}

          [Horarios disponibles del servicio]
          ${formatSchedules(availableDates)}

          [Información extra del servicio]
          Año 2025
          ${Object.entries(serviceProvider).map(([key, value]) => `${key}: ${ value }\n`)}
          `
        }
      ]
    },
    voice: { provider: 'vapi', voiceId: 'Elliot' },
    firstMessage: `
      Hola ${serviceClient.name}, soy Ernesto, te estaré ayudando a agendar una cita para ${serviceProvider.nombre_servicio}.
      Por favor indica el día para el que quieres la cita.
    `
  });

  return assistant
} 
