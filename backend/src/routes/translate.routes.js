import { Router } from 'express';
import { handleTranslation } from '../controllers/translate.controller.js';

const router = Router();

router.post('/translate', handleTranslation);

export default router;