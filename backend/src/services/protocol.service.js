import openai from '../config/openai.config.js';
import protocols from '../data/protocols.json' with { type: 'json' };

export const getProtocolAdvice = async (userQuestion) => {
  // Fundamento: Context Injection. 
  // Convertimos el JSON en un string para que la IA lo use como su única fuente de verdad.
  const context = JSON.stringify(protocols, null, 2);

  const systemPrompt = `
    Eres el "OmniSelf Protocol Advisor".
    Genera un REPORTE TÉCNICO basado en este JSON: ${context}

    INSTRUCCIONES DE FORMATO:
    - Usa Títulos en negrita (ej: **SUPLEMENTO:**).
    - Usa Listas con puntos para los beneficios.
    - Resalta las ADVERTENCIAS en una línea separada.
    - Si hay varios suplementos relacionados, sepáralos con una línea horizontal (---).
    
    EJEMPLO DE RESPUESTA:
    **PROTOCOLO SELECCIONADO:** Magnesio
    * **Objetivo:** Relajación.
    * **Timing:** Noche.
    ⚠️ **ADVERTENCIA:** No tomar con antibióticos.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // O gpt-4o para mayor precisión
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuestion }
      ],
      max_tokens: 200,
      temperature: 0.2, // Fundamento: Determinismo. Queremos precisión, no creatividad.
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error en ProtocolService:", error);
    throw new Error("Error al procesar la consulta de protocolos.");
  }
};