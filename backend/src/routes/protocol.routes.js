import { Router } from 'express';
import { getAdvice } from '../controllers/protocol.controller.js';

const router = Router();

router.post('/advice', getAdvice);

export default router;