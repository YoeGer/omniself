const API_URL = import.meta.env.VITE_API_URL;

export const translateTextRequest = async (text, targetLanguage) => {
  try {
    const response = await fetch(`${API_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, targetLanguage }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error en translateTextRequest:", error);
    throw error;
  }
};