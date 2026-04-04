import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const translateTextRequest = async (text, targetLanguage) => {
  try {
    const response = await api.post('/translate', { text, targetLanguage });
    return response.data;
  } catch (error) {
    console.error("Error en translateTextRequest:", error.response?.data || error.message);
    throw error;
  }
};

export const getProtocolAdviceRequest = async (question, threadId = null) => {
  try {
    const response = await api.post('/protocols/advice', { question, threadId });
    return response.data;
  } catch (error) {
    console.error("Error en getProtocolAdviceRequest:", error.response?.data || error.message);
    throw error;
  }
};

export const generateAvatarRequest = async (userData) => {
  try {
    const response = await api.post('/avatar/generate', userData);
    return response.data;
  } catch (error) {
    console.error("Error en generateAvatarRequest:", error.response?.data || error.message);
    throw error;
  }
};

export default api;