import { createAuthenticatedClient, isFinalizedGrant, OpenPaymentsClientError } from '@interledger/open-payments';
import { readFileSync } from 'fs';
import path from 'path';

// Configuración de wallets
const walletPrincipal = "https://ilp.interledger-test.dev/reserve-now-demo";
const keyId = "818ac865-8812-4dc4-bdc2-9d50effea1f0";

const cliente = "https://ilp.interledger-test.dev/cliente-jorge";
const proveedor = "https://ilp.interledger-test.dev/proveedor-mariachis";

// Cliente autenticado (reutilizable)
let authenticatedClient = null;

/**
 * Obtiene o crea un cliente autenticado
 */
async function getClient() {
  if (authenticatedClient) {
    return authenticatedClient;
  }

  try {
    const privateKeyPath = path.join(process.cwd(), 'keys', 'private.key');
    
    console.log("Private key path:", privateKeyPath);
    
    const privateKey = readFileSync(privateKeyPath, 'utf8');
    console.log("LOADED PRIVATE KEY", privateKey);
    
    // Crear cliente autenticado
    authenticatedClient = await createAuthenticatedClient({
      walletAddressUrl: walletPrincipal,
      privateKey: privateKey,
      keyId: keyId
    });

    console.log("✓ Authenticated client created");
    return authenticatedClient;

  } catch (error) {
    console.error("Error creating client:", error.message);
    throw error;
  }
}

/**
 * Obtiene información de un wallet
 */
async function getWalletInfo(walletUrl) {
  const client = await getClient();
  console.log("Authenticated client:", client)
  
  try {
    const walletInfo = await client.walletAddress.get({
      url: walletUrl
    });

    console.log(`✓ Wallet info retrieved: ${walletInfo.id}`);
    return walletInfo;

  } catch (error) {
    console.error("Error getting wallet info:", error.message);
    throw error;
  }
}

/**
 * Crea un incoming payment para el proveedor
 */
async function createIncomingPayment(amount, description, expiresInMinutes = 60) {
  try {
    const client = await getClient();
    console.log("CLIENT TO CREATE A NREW INCOMING PAYMENT: ", client);
    const receiverWallet = await getWalletInfo(proveedor);

    console.log(`Creating incoming payment for ${amount} ${receiverWallet.assetCode}`);

    // Solicitar grant para crear incoming payment
    const incomingGrant = await client.grant.request(
      {
        url: receiverWallet.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: "incoming-payment",
              actions: ["read", "complete", "create"],
            },
          ],
        },
      },
    );

    if (!isFinalizedGrant(incomingGrant)) {
      throw new Error('Expected finalized incoming payment grant');
    }

    console.log("✓ Incoming payment grant created");

    // Crear incoming payment
    const incomingPayment = await client.incomingPayment.create(
      {
        url: receiverWallet.resourceServer,
        accessToken: incomingGrant.access_token.value,
      },
      {
        walletAddress: receiverWallet.id,
        incomingAmount: {
          value: Math.round(amount * Math.pow(10, receiverWallet.assetScale)).toString(),
          assetCode: receiverWallet.assetCode,
          assetScale: receiverWallet.assetScale,
        },
        expiresAt: new Date(Date.now() + expiresInMinutes * 60_000).toISOString(),
        metadata: {
          description: description || 'Payment request'
        }
      }
    );

    console.log("✓ Created incoming payment:", incomingPayment.id);
    return incomingPayment;

  } catch (error) {
    console.error("Error creating incoming payment:", error);
    throw new Error(`Failed to create incoming payment: ${error.message}`);
  }
}

/**
 * Crea un quote para calcular costos
 */
async function createQuote(incomingPaymentUrl) {
  try {
    const client = await getClient();
    const sendingWallet = await getWalletInfo(cliente);

    console.log(`Creating quote for payment to ${incomingPaymentUrl}`);

    // Solicitar grant para quote
    const quoteGrant = await client.grant.request(
      {
        url: sendingWallet.authServer, 
      },
      {
        access_token: {
          access: [
            {
              type: "quote",
              actions: ["create", "read"],
            },
          ],
        },
      },
    );

    if (!isFinalizedGrant(quoteGrant)) {
      throw new Error("Expected finalized quote grant");
    }

    console.log("✓ Quote grant created");

    // Crear quote
    const quote = await client.quote.create(
      {
        url: sendingWallet.resourceServer,
        accessToken: quoteGrant.access_token.value,
      }, 
      {
        method: "ilp",
        walletAddress: sendingWallet.id,
        receiver: incomingPaymentUrl
      }
    );

    console.log("✓ Created quote:", quote.id);

    return quote;

  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error(`Failed to create quote: ${error.message}`);
  }
}

/**
 * Crea un outgoing payment (requiere autorización del usuario)
 */
async function createOutgoingPayment(quote) {
  try {
    const client = await getClient();
    const sendingWallet = await getWalletInfo(cliente);

    console.log(`Creating outgoing payment for quote: ${quote.id}`);

    // Solicitar grant con interacción
    const outgoingPaymentGrant = await client.grant.request(
      {
        url: sendingWallet.authServer,
      },
      {
        access_token: {
          access: [
            {
              identifier: sendingWallet.id,
              type: "outgoing-payment",
              actions: ["read", "create"],
              limits: {
                debitAmount: quote.debitAmount
              }
            },
          ],
        },
        interact: { 
          start: ["redirect"]
        }
      },
    );

    console.log('✓ Got pending outgoing payment grant', outgoingPaymentGrant);

    // Verificar si requiere autorización
    if (outgoingPaymentGrant.interact && outgoingPaymentGrant.interact.redirect) {
      console.log('✓ Payment requires user authorization');
      
      return {
        requiresInteraction: true,
        interactionUrl: outgoingPaymentGrant.interact.redirect,
        continueUri: outgoingPaymentGrant.continue.uri,
        continueToken: outgoingPaymentGrant.continue.access_token.value,
        message: "User authorization required"
      };
    }

    throw new Error("Unexpected grant state");
    
  } catch (error) {
    console.error("Error in createOutgoingPayment:", error);
    throw new Error(`Failed to create outgoing payment: ${error.message}`);
  }
}

/**
 * FUNCIÓN PRINCIPAL: Inicia el flujo completo de pago
 * Esta es la que llamas desde tu frontend/backend
 */
async function initiatePayment(amount, description = "Service payment") {
  try {
    console.log(`\n=== Starting Payment Flow ===`);
    console.log(`Amount: ${amount}`);
    console.log(`Description: ${description}`);

    // Paso 1: Crear incoming payment (proveedor)
    console.log("\n[Step 1/3] Creating incoming payment...");
    const incomingPayment = await createIncomingPayment(amount, description);
    
    // Paso 2: Crear quote (calcular costos)
    console.log("\n[Step 2/3] Creating quote...");
    const quote = await createQuote(incomingPayment.id);
      
    // Paso 3: Crear outgoing payment (cliente autoriza)
    console.log("\n[Step 3/3] Creating outgoing payment...");
    const outgoingPayment = await createOutgoingPayment(quote);

    // Formatear montos
    const debitAmount = {
      value: quote.debitAmount.value / Math.pow(10, quote.debitAmount.assetScale),
      assetCode: quote.debitAmount.assetCode,
      formatted: `${quote.debitAmount.value / Math.pow(10, quote.debitAmount.assetScale)} ${quote.debitAmount.assetCode}`
    };

    const receiveAmount = {
      value: quote.receiveAmount.value / Math.pow(10, quote.receiveAmount.assetScale),
      assetCode: quote.receiveAmount.assetCode,
      formatted: `${quote.receiveAmount.value / Math.pow(10, quote.receiveAmount.assetScale)} ${quote.receiveAmount.assetCode}`
    };

    if (outgoingPayment.requiresInteraction) {
      console.log("\n✓ Payment setup complete - awaiting user authorization");
      
      return {
        success: true,
        status: 'PENDING_AUTHORIZATION',
        requiresInteraction: true,
        authorizationUrl: outgoingPayment.interactionUrl,
        continueToken: outgoingPayment.continueToken,
        continueUri: outgoingPayment.continueUri,
        quoteId: quote.id,
        incomingPaymentId: incomingPayment.id,
        amount: amount,
        debitAmount: debitAmount,
        receiveAmount: receiveAmount,
        message: 'Cliente debe autorizar el pago en su wallet'
      };
    }
    
    console.log("\n✓ Payment completed without interaction");

    return {
      success: true,
      status: 'COMPLETED',
      paymentId: outgoingPayment.paymentId,
      incomingPaymentId: incomingPayment.id,
      quoteId: quote.id,
      amount: amount,
      debitAmount: debitAmount,
      receiveAmount: receiveAmount,
      message: 'Payment completed successfully'
    };
    
  } catch (error) {
    console.error("\n✗ Error in payment flow:", error);

    return {
      success: false,
      status: 'FAILED',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Completa el pago después de que el usuario autoriza
 */
async function completePaymentAfterAuth(quoteId, continueUri, continueToken) {
  try {
    const client = await getClient();
    const sendingWallet = await getWalletInfo(cliente);

    console.log('\n=== Completing Payment After Authorization ===');
    
    // Continuar el grant con la autorización
    const finalizedGrant = await client.grant.continue({
      url: continueUri,
      accessToken: continueToken
    });

    console.log("✓ Grant finalized after authorization");

    if (!isFinalizedGrant(finalizedGrant)) {
      throw new Error('Grant was not finalized after authorization');
    }

    // Crear el outgoing payment final
    const outgoingPayment = await client.outgoingPayment.create(
      {
        url: sendingWallet.resourceServer,
        accessToken: finalizedGrant.access_token.value,
      },
      {
        walletAddress: sendingWallet.id,
        quoteId: quoteId,
      },
    );

    console.log("✓ Payment created:", outgoingPayment.id);
    console.log("✓ Payment state:", outgoingPayment.state);

    return {
      success: true,
      status: 'COMPLETED',
      paymentId: outgoingPayment.id,
      state: outgoingPayment.state,
      message: 'Payment completed successfully'
    };

  } catch (error) {
    console.error("✗ Error completing payment:", error);
    return {
      success: false,
      status: 'FAILED',
      error: error.message
    };
  }
}

export {
    getClient,
    getWalletInfo,
    createIncomingPayment,
    createQuote,
    createOutgoingPayment,
    initiatePayment,
    completePaymentAfterAuth
};


async function testPaymentFlow() {
    try {
        console.log("Testing payment flow...");
        
        // Ejecutar el flujo completo con un monto de prueba
        const result = await initiatePayment(100, "Test payment");
        
        console.log("Payment flow result:", JSON.stringify(result, null, 2));
        
        return result;
    } catch (error) {
        console.error("Test failed:", error);
    }
}
testPaymentFlow();