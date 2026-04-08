import { generateDailyMantra } from '../services/voice.service.js';

export const getDailyMantra = async (req, res) => {
  try {
    const { buffer, text } = await generateDailyMantra();
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'X-Mantra-Text': encodeURIComponent(text), 
      'Content-Length': buffer.length,
      'Access-Control-Expose-Headers': 'X-Mantra-Text'
    });

    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Error al generar mantra" });
  }
};