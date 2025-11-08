// Tutorial del cliente de Open Payments
// Objetivo: Realizar un pago entre pares entre dos direcciones de billetera (usando cuentas en la cuenta de prueba)

// Configuración inicial
// a. Importar dependencias y configurar el cliente
import { createAuthenticatedClient, isFinalizedGrant, type AuthenticatedClient } from '@interledger/open-payments'
import fs from 'node:fs'
import path from 'node:path'
import Readline from 'readline/promises'

const cliente = '$ilp.interledger-test.dev/open-transporte'
const keyId = '0bede86c-05e1-4d89-bd0f-61a5bfb62227'

// remitente
const usuario = '$ilp.interledger-test.dev/mario-usuario-de-transporte-publico'
// receptor
const gobierno = '$ilp.interledger-test.dev/government'

// const conductor = '$ilp.interledger-test.dev/jorge-conductor'

const walletAddress = (s: string): string => s.replace('$', 'https://')

const authClient = async (): Promise<AuthenticatedClient> => {
  const privateKey = fs.readFileSync(path.join(import.meta.dirname, 'private.key'), 'utf8')
  // b. Crear una instancia del cliente Open Payments
  const client = await createAuthenticatedClient({
    walletAddressUrl: walletAddress(cliente),
    // c. Cargar la clave privada del archivo
    privateKey,
    keyId
  })

  return client
}

async function sendPayment (
  usuarioAddress: string,
  gobiernoAddress: string,
  total: string
): Promise<any> {
  const client = await authClient()

  // Flujo de pago entre pares
  // 1. Obtener una concesión para un pago entrante)
  const usuarioWallet = await client.walletAddress.get({
    url: walletAddress(usuarioAddress)
  })
  const gobiernoWallet = await client.walletAddress.get({
    url: walletAddress(gobiernoAddress)
  })

  // 2. Obtener una concesión para un pago entrante
  const inconmingPaymentGrant = await client.grant.request({
    url: gobiernoWallet.authServer
  }, {
    access_token: {
      access: [{
        type: 'incoming-payment',
        actions: ['create']
      }]
    }
  })

  if (!isFinalizedGrant(inconmingPaymentGrant))
    throw new Error('Se espera finalice la concesión')

  // 3. Crear un pago entrante para el receptor
  const incomingPayment = await client.incomingPayment.create({
    url: gobiernoWallet.resourceServer,
    accessToken: inconmingPaymentGrant.access_token.value
  }, {
    walletAddress: gobiernoWallet.id,
    incomingAmount: {
      assetCode: gobiernoWallet.assetCode,
      assetScale: gobiernoWallet.assetScale,
      value: total
    }
  })

  // 4. Crear un concesión para una cotización
  const quoteGrant = await client.grant.request(
    { url: usuarioWallet.authServer },
    {
      access_token: {
        access: [{
          type: 'quote',
          actions: ['create']
        }]
      }
    }
  )

  if (!isFinalizedGrant(quoteGrant))
    throw new Error('Se espera finalice la concesión')

  // 5. Obtener una cotización para el remitente
  const quote = await client.quote.create(
    {
      url: gobiernoWallet.resourceServer,
      accessToken: quoteGrant.access_token.value
    },
    {
      walletAddress: usuarioWallet.id,
      receiver: incomingPayment.id,
      method: 'ilp'
    }
  )

  // 6. Obtener una concesión para un pago saliente
  const outgoingPaymentGrant = await client.grant.request(
    { url: usuarioWallet.authServer },
    {
      access_token: {
        access: [{
          actions: ['create'],
          type: 'outgoing-payment',
          identifier: usuarioWallet.id,
          limits: {
            debitAmount: quote.debitAmount
          }
        }]
      },
      interact: {
        start: ['redirect']
      }
    }
  )

  // 7. Continuar con la concesión del pago saliente
  await Readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }).question('presiona enter para continuar')

  // 8. Finalizar la concesión del pago saliente
  // Es importante para verificar si se realizó la autorización en la interacción
  // o si no.
  const finalizarOutgoingPaymentGrant = await client.grant.continue({
    url: outgoingPaymentGrant.continue.uri,
    accessToken: outgoingPaymentGrant.continue.access_token.value
  })

  if (!isFinalizedGrant(finalizarOutgoingPaymentGrant))
    throw new Error('Se espera finalice la concesión')

  // 9. Continuar con la cotización de pago saliente
  const outgoingPayment = await client.outgoingPayment.create(
    {
      url: usuarioWallet.resourceServer,
      accessToken: finalizarOutgoingPaymentGrant.access_token.value
    },
    {
      walletAddress: usuarioWallet.id,
      quoteId: quote.id
    }
  )

  return outgoingPayment
}

sendPayment(usuario, gobierno, '500')
