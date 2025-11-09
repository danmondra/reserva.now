import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import {
  createCita,
  getMyCitas,
  getMyProfesionalCitas
} from '../controllers/cita.controller.js';

const router = Router();

// Rutas de citas requieren autenticación
router.post('/citas', authRequired, createCita);
// Ver mis citas (como cliente)
router.get('/citas/me', authRequired, getMyCitas);
// Ver las citas (como proveedor)
router.get('/citas/profesional', authRequired, getMyProfesionalCitas);

export default router;