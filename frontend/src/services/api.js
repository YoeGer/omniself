import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const translateTextRequest = async (text, targetLanguage) => {
  try {
    const response = await api.post("/translate", { text, targetLanguage });
    return response.data;
  } catch (error) {
    console.error(
      "Error en translateTextRequest:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getProtocolAdviceRequest = async (question, threadId = null) => {
  try {
    const response = await api.post("/protocols/advice", {
      question,
      threadId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error en getProtocolAdviceRequest:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const generateAvatarRequest = async (userData) => {
  try {
    const response = await api.post("/avatar/generate", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error en generateAvatarRequest:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const generateNutritionPlanRequest = async (formData) => {
  try {
    const response = await api.post("/nutrition/generate", formData);
    return response.data;
  } catch (error) {
    console.error(
      "Error en generateNutritionPlanRequest:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const fetchDailyMantra = async () => {
  try {
    const response = await api.get('/voice/daily-mantra', { 
      responseType: 'blob', 
      headers: { 'Accept': 'audio/mpeg' }
    });
    
    const audioUrl = URL.createObjectURL(response.data);
    const audio = new Audio(audioUrl);
    
    const text = decodeURIComponent(response.headers['x-mantra-text'] || "Frase de luz");
    
    return { audio, text };
  } catch (error) {
    console.error("Error al obtener el mantra:", error);
    throw error;
  }
};

export default api;
