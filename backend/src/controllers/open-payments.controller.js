import { initiatePayment, completePaymentAfterAuth } from '../utils/openPayments.js';

/**
 * Crear un nuevo pago - solo procesa en Open Payments
 */
export const createPayment = async (req, res) => {
  try {
    const { amount, description } = req.body;

    // Iniciar el pago en Open Payments (sin guardar en DB)
    const paymentResult = await initiatePayment(amount, description);

    res.json(paymentResult);

  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

/**
 * Completar pago después de autorización
 */
export const completePayment = async (req, res) => {
  try {
    const { quoteId, continueUri, continueToken } = req.body;

    // Completar el pago en Open Payments
    const completionResult = await completePaymentAfterAuth(
      quoteId,
      continueUri,
      continueToken
    );

    res.json(completionResult);

  } catch (error) {
    console.error('Error completing payment:', error);
    res.status(500).json({
      success: false,
      error: 'Error completando el pago'
    });
  }
};

/**
 * Obtener wallets disponibles (opcional)
 */
export const getWallets = async (req, res) => {
  try {
    // Estos podrían venir de tu base de datos o ser fijos
    const wallets = [
      {
        id: 'cliente',
        name: 'Cliente Jorge',
        walletUrl: 'https://ilp.interledger-test.dev/cliente-jorge'
      },
      {
        id: 'proveedor', 
        name: 'Proveedor Mariachis',
        walletUrl: 'https://ilp.interledger-test.dev/proveedor-mariachis'
      }
    ];

    res.json({
      success: true,
      wallets
    });

  } catch (error) {
    console.error('Error getting wallets:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo wallets'
    });
  }
};