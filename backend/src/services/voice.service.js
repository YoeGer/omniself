import openai from '../config/openai.config.js';
import { spiritualPhrases } from '../data/phrases.js';

export const generateDailyMantra = async () => {
  if (!spiritualPhrases || spiritualPhrases.length === 0) {
    throw new Error("El array de frases está vacío o no se importó bien");
  }

  const randomIndex = Math.floor(Math.random() * spiritualPhrases.length);
  const selectedPhrase = spiritualPhrases[randomIndex];

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "shimmer", 
      input: selectedPhrase,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return { buffer, text: selectedPhrase };
  } catch (error) {
    console.error("Error en Daily Mantra:", error);
    throw error;
  }
};