import { Router } from 'express';
import { getNutritionPlan } from '../controllers/nutrition.controller.js';

const router = Router();

router.post('/generate', getNutritionPlan);

export default router;