import { getProtocolAdvice } from '../services/protocol.service.js';

export const getAdvice = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ 
        success: false, 
        message: "La pregunta es obligatoria para consultar el protocolo." 
      });
    }

    const advice = await getProtocolAdvice(question);

    res.status(200).json({
      success: true,
      data: advice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};