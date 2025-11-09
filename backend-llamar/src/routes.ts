import express from 'express';
import type {ServiceClient} from './interfaces/service-client.js';
import type {ServiceProvider} from './interfaces/proveedor.js';
import {getParsedJSON} from './utils/get-json.js';
import {createVapiAssistant} from './assistant.js';
import {VapiClient, VapiError} from '@vapi-ai/server-sdk';
import {createVapiCredential} from './sip-trunk-credentials.js';
import {createVapiPhoneNumber} from './phone-number.js';

const { VAPI_TOKEN, VAPI_OUTGOING_CALL_NUMBER } = process.env
const PORT = 5342;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/llamar', async (req, res) => {
  const serviceClientID: ServiceClient['id'] = req.body.serviceClientID
  const serviceClient = getParsedJSON('src/mocks/service-client.json')
  const serviceProviderID: ServiceProvider['id'] = req.body.serviceProviderID
  const serviceProvider = getParsedJSON('src/mocks/services.json')
    .proveedores.filter((s: ServiceProvider) => s.id === serviceProviderID)
  const  availableSchedules = getParsedJSON('src/mocks/available-schedules.json')
  const amount = req.body.amount

  if(!serviceClientID || !serviceProviderID || !amount) throw new Error('all fields are required')
  if(!serviceProvider) throw new Error('The provided service provider doesn\'t exist')

  const vapiClient = new VapiClient({ token: VAPI_TOKEN! });

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
          url: 'https://nonmaturative-flamb-atticus.ngrok-free.dev/finalizar'
        }
      },
      phoneNumberId: vapiPhoneNumber.id,
      customer: { number: VAPI_OUTGOING_CALL_NUMBER! },
    });

    console.log({ call })

    return res.json(call)
  } catch (err) {
    if (err instanceof VapiError) {
      console.log(err.statusCode);
      console.log(err.message);
      console.log(err.body);
    }
  }
});

app.use('/finalizar', async (req, res) => {
  const metadata = req.body.message.call.assistantOverrides.metadata
  const structuredOutputs = req.body.message.artifact.structuredOutputs

  console.log({ metadata, structuredOutputs })

  return res.json({ metadata, structuredOutputs })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
