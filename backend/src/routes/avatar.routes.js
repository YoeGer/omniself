import { Router } from 'express';
import { generateAvatar } from '../controllers/avatar.controller.js';

const router = Router();

router.post('/generate', generateAvatar);

export default router;