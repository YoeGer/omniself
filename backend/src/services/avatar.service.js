import openai from "../config/openai.config.js";

export const generateAvatarImage = async (userData) => {
  const { gender, hairType, hairColor } = userData;

  const prompt = `Un solo icono de avatar moderno y profesional.
  Sujeto: Un busto perfectamente centrado de ${gender === "female" ? "una mujer" : "un hombre"} con cabello ${hairType.replace("_", " ")} de color ${hairColor}. 
 Un avatar de una persona amigable y accesible, rasgos faciales suaves, sonrisa cálida, tonos de piel naturales, 
 fondo limpio, iluminación suave, estilo de ilustración digital moderno, minimalista, alta calidad, retrato centrado, relación de aspecto 1:1`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "256x256",
    });

    return response.data[0].url;
  } catch (error) {
    console.error("Error en DALL-E:", error.message);
    throw error;
  }
};
