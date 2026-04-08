import openai from '../config/openai.config.js';

export const generateNutritionPlan = async (userData) => {
  const { weight, height, age, gender, activity, goal, mealsPerDay, allergies, dietType } = userData;

  const systemInstructions = `
    Eres un Nutricionista experto. Tu objetivo es generar un plan nutricional semanal (7 días).
    
    REGLAS ESTRICTAS:
    1. Responde ÚNICAMENTE con un JSON.
    2. El plan debe cubrir de Lunes a Domingo.
    3. Cada día debe tener exactamente ${mealsPerDay} comidas.
    4. Los macros deben calcularse por cada plato individualmente.
    5. Si hay alergias, ignora CUALQUIER ingrediente que las contenga.
    6. Los macros deben ser coherentes con el objetivo: ${goal}.
    
    ESTRUCTURA DEL JSON:
    {
      "resumen_semanal": "Breve análisis de la estrategia (ej: ciclado de carbohidratos)",
      "dias": [
        {
          "nombre": "Lunes",
          "comidas": [
            {
              "momento": "Desayuno",
              "plato": "Nombre del plato",
              "ingredientes": ["item 1", "item 2"],
              "macros": { "p": "g", "c": "g", "f": "g", "kcal": "kcal" }
            }
          ]
        }
      ]
    }
  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: systemInstructions },
        { role: "user", content: `Genera el plan para: ${gender}, ${weight}kg, objetivo: ${goal}, dieta: ${dietType}, alergias: ${allergies}` },
      ],
      max_tokens: 3000,
      temperature: 0.5,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error en Nutrition AI Service:", error);
    throw error;
  }
};