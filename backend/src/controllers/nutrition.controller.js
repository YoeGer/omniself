import { generateNutritionPlan } from '../services/nutrition.service.js';

export const getNutritionPlan = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.weight || !userData.height) {
      return res.status(400).json({ success: false, message: "Faltan datos biométricos" });
    }

    const plan = await generateNutritionPlan(userData);

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al procesar el protocolo nutricional"
    });
  }
};