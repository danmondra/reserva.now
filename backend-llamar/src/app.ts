import { VapiClient } from "@vapi-ai/server-sdk";
import { VapiError } from "@vapi-ai/server-sdk";
import {createVapiCredential} from "./sip-trunk-credentials.js";
import {createVapiAssistant} from "./assistant.js";
import {createVapiPhoneNumber} from "./phone-number.js";
import type {ServiceClient} from "./interfaces/service-client.js";
import type {ServiceProvider} from "./interfaces/proveedor.js";
import {getParsedJSON} from "./utils/get-json.js";

const { VAPI_TOKEN, VAPI_OUTGOING_CALL_NUMBER } = process.env
const vapiClient = new VapiClient({ token: VAPI_TOKEN! });

const serviceProviders: { proveedores: Array<ServiceProvider> } = getParsedJSON('src/mocks/services.json')
const serviceProvider = serviceProviders.proveedores[2]!
const availableSchedules = getParsedJSON('src/mocks/available-schedules.json')
const serviceClient: ServiceClient = { id: crypto.randomUUID(), name: 'Daniel', gender: 'hombre', email: 'dan@gmail.com' }
const amount = 300

const vapiAssistant = await createVapiAssistant(vapiClient, serviceClient, serviceProvider, availableSchedules)
const SIPTrunkCredentials = await createVapiCredential()
const vapiPhoneNumber = await createVapiPhoneNumber(SIPTrunkCredentials)

try {
  const call = await vapiClient.calls.create({
    assistantId: vapiAssistant.id, // assistant.id,
    assistantOverrides: {
      serverMessages: ['end-of-call-report'],
      artifactPlan: { structuredOutputIds: ['23984339-848f-43f3-b758-3591c4fd76f1'] },
      metadata: {
        serviceProviderID: serviceProvider.id,
        serviceClientID: serviceClient.id,
        amount: amount,
        generatedAt: Date.now()
      },
      server: {
        url: 'https://nonmaturative-flamb-atticus.ngrok-free.dev'
      }
    },
    phoneNumberId: vapiPhoneNumber.id,
    customer: { number: VAPI_OUTGOING_CALL_NUMBER! },
  });
  console.log({ call })

} catch (err) {
  if (err instanceof VapiError) {
    console.log(err.statusCode);
    console.log(err.message);
    console.log(err.body);
  }
}
