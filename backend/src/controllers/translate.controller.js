import * as aiService from '../services/ai.service.js';

export const handleTranslation = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    const result = await aiService.translateText(text, targetLanguage);
    
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};