import openai from '../config/openai.config.js';

export const translateText = async (text, targetLanguage) => {
  
  // Agrupamos todas las reglas en una sola constante clara
  const systemInstructions = `
    Eres un experto traductor especializado en medicina, bienestar y biohacking.
    Tu única función es proporcionar una traducción directa y precisa al ${targetLanguage}.
    
    REGLAS ESTRICTAS:
    1. No respondas con saludos ni introducciones.
    2. No expliques la traducción.
    3. Cualquier tipo de conversación o respuesta fuera de la traducción está TERMINANTEMENTE PROHIBIDA.
    4. Si el texto no se puede traducir, devuelve un string vacío.
  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: systemInstructions },
        { role: "user", content: text }, // Enviamos el texto limpio del usuario
      ],
      temperature: 0.3, // Añadimos temperatura baja para que sea más determinista (menos "creativo")
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error en el servicio de IA:", error);
    throw error;
  }
};