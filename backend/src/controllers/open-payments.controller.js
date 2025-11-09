// import { initiatePayment, completePaymentAfterAuth } from '../utils/openPayments.js';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// /**
//  * Crear un nuevo pago usando wallets de la base de datos
//  */
// export const createPayment = async (req, res) => {
//   try {
//     const { amount, description, clienteId, proveedorId } = req.body;

//     // Validar que existan los usuarios y tengan wallet address
//     const [cliente, proveedor] = await Promise.all([
//       prisma.usuario.findUnique({ 
//         where: { id: clienteId },
//         select: { id: true, nombre: true, walletAddress: true }
//       }),
//       prisma.usuario.findUnique({ 
//         where: { id: proveedorId },
//         select: { id: true, nombre: true, walletAddress: true }
//       })
//     ]);

//     if (!cliente || !proveedor) {
//       return res.status(404).json({
//         success: false,
//         error: 'Cliente o proveedor no encontrado'
//       });
//     }

//     if (!cliente.walletAddress || !proveedor.walletAddress) {
//       return res.status(400).json({
//         success: false,
//         error: 'El cliente o proveedor no tiene wallet address configurado'
//       });
//     }

//     console.log(`Procesando pago: ${cliente.nombre} -> ${proveedor.nombre}`);
//     console.log(`Wallets: ${cliente.walletAddress} -> ${proveedor.walletAddress}`);

//     // Iniciar el pago en Open Payments
//     const paymentResult = await initiatePayment(amount, description);

//     res.json({
//       ...paymentResult,
//       clientes: {
//         id: cliente.id,
//         nombre: cliente.nombre,
//         wallet: cliente.walletAddress
//       },
//       proveedor: {
//         id: proveedor.id,
//         nombre: proveedor.nombre,
//         wallet: proveedor.walletAddress
//       }
//     });

//   } catch (error) {
//     console.error('Error creating payment:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Error interno del servidor'
//     });
//   }
// };

// /**
//  * Completar pago después de autorización
//  */
// export const completePayment = async (req, res) => {
//   try {
//     const { quoteId, continueUri, continueToken } = req.body;

//     // Completar el pago en Open Payments
//     const completionResult = await completePaymentAfterAuth(
//       quoteId,
//       continueUri,
//       continueToken
//     );

//     res.json(completionResult);

//   } catch (error) {
//     console.error('Error completing payment:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Error completando el pago'
//     });
//   }
// };

// /**
//  * Obtener usuarios/proveedores disponibles para pagos
//  */
// export const getPaymentUsers = async (req, res) => {
//   try {
//     // Obtener todos los usuarios que tienen wallet address
//     const usuarios = await prisma.usuario.findMany({
//       where: {
//         walletAddress: {
//           not: null
//         }
//       },
//       select: {
//         id: true,
//         nombre: true,
//         email: true,
//         walletAddress: true
//       }
//     });

//     res.json({
//       success: true,
//       usuarios
//     });

//   } catch (error) {
//     console.error('Error getting payment users:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Error obteniendo usuarios'
//     });
//   }
// };