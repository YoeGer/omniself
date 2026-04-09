import { Router } from 'express';
import { createPost } from '../controllers/social.controller.js';

const router = Router();

router.post('/generate', createPost); 

export default router;