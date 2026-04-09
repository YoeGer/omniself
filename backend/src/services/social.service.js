import openai from "../config/openai.config.js";

export const generateSocialPost = async (userData) => {
  const { topic, tone, platform, goals } = userData;

  const systemInstructions = `
    Eres un experto en Estrategia de Contenido y Ghostwriting para perfiles de alto rendimiento.
    Tu objetivo es transformar pensamientos desordenados en una publicación de alto impacto para ${platform}.

    GUÍA DE TONOS:
    - Thought Leadership: Enfócate en insights únicos y visión a futuro.
    - Storytelling Vulnerable: Comparte aprendizajes a través de errores y experiencias personales.
    - Biohacker Disruptivo: Usa terminología de optimización, ciencia y alto rendimiento.
    - Motivacional Estoico: Breve, directo, enfocado en la disciplina y la virtud.
    - Copy Persuasivo: Usa frameworks como AIDA (Atención, Interés, Deseo, Acción).

    REGLAS ESTRICTAS:
    1. Tono: ${tone}.
    2. No uses hashtags genéricos en exceso.
    3. Incluye un "Hook" (gancho) potente en la primera línea.
    4. Estructura el contenido con espacios para que sea fácil de leer.
    5. Termina con una llamada a la acción (CTA) sutil.
    6. Responde ÚNICAMENTE con el texto del post, sin introducciones tuyas.
    7. La publicacion debe tener maximo 177 caracteres. 
  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemInstructions },
        {
          role: "user",
          content: `Tema/Ideas: ${topic}. Objetivos del post: ${goals}`,
        },
      ],
      temperature: 0.8,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error en Social Service:", error);
    throw error;
  }
};
