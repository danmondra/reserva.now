import prisma from '../lib/prisma.js';
import { initiatePayment } from '../../utils/openPayments.js';

/**
 * Crea una nueva cita e inicia el pago automáticamente
 */
export const createCita = async (req, res) => {
  try {
    const clienteUserId = req.user.id;

    const {
      profesionalId, 
      servicioId,    
      fecha,         
      horario,
      monto          // Agregar monto del servicio
    } = req.body;

    if (!profesionalId || !servicioId || !fecha || !horario || !monto) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // 1. Crear la cita en la base de datos
    const newCita = await prisma.cita.create({
      data: {
        fecha: new Date(fecha),
        horario: horario,
        usuario: { connect: { id: clienteUserId } },
        profesional: { connect: { id: parseInt(profesionalId) } },
        servicio: { connect: { id: parseInt(servicioId) } }
      },
      include: {
        usuario: { select: { id: true, nombre: true, walletAddress: true } },
        profesional: { 
          select: { 
            id: true, 
            nombre: true,
            usuario: { select: { walletAddress: true } }
          } 
        },
        servicio: { select: { id: true, nombre: true } }
      }
    });

    // 2. Obtener los wallet addresses del cliente y profesional
    const clienteWallet = newCita.usuario.walletAddress;
    const profesionalWallet = newCita.profesional.usuario.walletAddress;

    if (!clienteWallet || !profesionalWallet) {
      return res.status(400).json({ 
        message: "El cliente o profesional no tiene wallet configurado" 
      });
    }

    // 3. Iniciar el pago automáticamente
    const descripcionPago = `Cita: ${newCita.servicio.nombre} - ${newCita.profesional.nombre}`;
    
    const paymentResult = await initiatePayment(
      clienteWallet,
      profesionalWallet,
      parseFloat(monto),
      descripcionPago
    );

    // 4. Retornar tanto la cita como la información del pago
    res.status(201).json({
      cita: newCita,
      pago: paymentResult
    });

  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene "Mis Citas"
 * Ruta: GET /api/citas/me
 */
export const getMyCitas = async (req, res) => {
  try {
    const clienteUserId = req.user.id;

    const misCitas = await prisma.cita.findMany({
      where: {
        usuarioId: clienteUserId
      },
      include: {
        profesional: { select: { id: true, nombre: true } },
        servicio: { select: { id: true, nombre: true } }
      },
      orderBy: {
        fecha: 'desc' 
      }
    });

    res.status(200).json(misCitas);

  } catch (error) {
    console.error("Error al obtener mis citas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene las citas de "Mi Perfil Profesional"
 * Ruta: GET /api/citas/profesional
 */
export const getMyProfesionalCitas = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const profesional = await prisma.profesional.findUnique({
            where: { usuarioId: userId },
            select: { id: true } // Solo necesitamos el ID del perfil
        });

        if (!profesional) {
            return res.status(404).json({ message: "Perfil profesional no encontrado." });
        }

        const citasDeMiPerfil = await prisma.cita.findMany({
            where: {
                profesionalId: profesional.id
            },
            include: {
                // Incluimos quién reservó y qué servicio
                usuario: { select: { id: true, nombre: true, email: true } },
                servicio: { select: { id: true, nombre: true } }
            },
            orderBy: {
                fecha: 'desc'
            }
        });

        res.status(200).json(citasDeMiPerfil);

    } catch (error) {
        console.error("Error al obtener citas del profesional:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};