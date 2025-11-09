import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import {
  createPayment,
  completePayment,
  getWallets
} from '../controllers/open-payments.controller.js';

const router = Router();

router.post('/payments', createPayment);

router.post('/payments/complete', completePayment);

export default router;