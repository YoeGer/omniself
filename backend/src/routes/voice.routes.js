import { Router } from 'express';
import { getDailyMantra } from '../controllers/voice.controller.js';

const router = Router();

router.get('/daily-mantra', getDailyMantra);

export default router;