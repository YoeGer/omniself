import openai from "../config/openai.config.js";
import protocols from "../data/protocols.json" with { type: "json" };

export const getProtocolAdvice = async (userQuestion, history = []) => {
  // Fundamento: Context Injection.
  // Convertimos el JSON en un string para que la IA lo use como su única fuente de verdad.
  const context = JSON.stringify(protocols, null, 2);

  const systemMessageObject = {
    role: "system",
    content: `
    Eres el "OmniSelf Protocol Advisor".
    Genera un REPORTE TÉCNICO basado en este JSON: ${context}

    INSTRUCCIONES DE FORMATO:
    - Usa Títulos en negrita (ej: **SUPLEMENTO:**).
    - Usa Listas con puntos para los beneficios.
    - Resalta las ⚠️ ADVERTENCIAS en una línea separada.
    - Si hay varios suplementos relacionados, sepáralos con una línea horizontal (---).

    REGLAS DE ORO:
    1. Responde ÚNICAMENTE a lo que se te pregunta de forma directa.
    2. Si el usuario pregunta por un detalle específico (ej: dosis), no repitas todo el protocolo.
    3. Usa un formato Markdown limpio pero conciso.
    4. No dupliques advertencias si ya se mencionaron en el historial.
  `,
  };

  // 2. Construimos el array de mensajes para OpenAI
  // Estructura: [Sistema] + [Historial (últimos 6)] + [Pregunta Actual]
  const messages = [
    systemMessageObject, 
    ...history, 
    { role: "user", content: userQuestion }, 
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 200,
      temperature: 0.2, // Fundamento: Determinismo. Queremos precisión, no creatividad.
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error en ProtocolService:", error);
    throw new Error("Error al procesar la consulta de protocolos.");
  }
};
